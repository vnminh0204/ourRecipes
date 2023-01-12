#!/usr/bin/env python
# coding: utf-8
"""
Extract data from DynamoDB and upload it to S3.
recipe_model = {
    Id: number,
    title: string,
    nutriScore: float,
    mealType: string,
    kcal: float,
    sodium: float,
    sugars: float,
    carbs: float,
    protein: float,
    fat: float,
    saturates: float,
    fibre: float,
}
"""
import json
import os
import argparse
import pandas as pd
import boto3

from utils import dynamo_preprocessing

def main(params):
    """
    Defaults:
    targettabname = "Recipes"
    bucket_name = "toeat-mlbucket"
    file_name = "recipes.csv"
    """
    targettabname = params.table_name
    bucket_name = params.bucket_name
    file_name = params.file_name
    AWS_ACCESS_KEY_ID = os.environ["AWS_ACCESS_KEY_ID"]
    AWS_SECRET_ACCESS_KEY = os.environ["AWS_SECRET_ACCESS_KEY"]
    AWS_DEFAULT_REGION = os.environ["AWS_DEFAULT_REGION"]

    s3_client = boto3.client('s3', region_name=AWS_DEFAULT_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    dynamo_client = boto3.client('dynamodb', region_name=AWS_DEFAULT_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    dynamopaginator = dynamo_client.get_paginator('scan')
    dynamoresponse = dynamopaginator.paginate(
        TableName=targettabname,
        Select='ALL_ATTRIBUTES',
        ReturnConsumedCapacity='NONE',
        ConsistentRead=True
    )

    # Download data from DynamoDB -> JSON.
    with open("Recipes.json", 'w') as f:
        for page in dynamoresponse:
            data_batch = page
            json.dump(data_batch, f)
    # Read data from JSON.
    with open("Recipes.json", 'r') as f:
        recipe_data = json.load(f)
    recipe_data = recipe_data["Items"]

    nutrition_list =  ["kcal" ,"sodium", "sugars", "carbs", "protein", "fat", "saturates", "fibre"]
    all_recipes_inf = []
    for recipe in recipe_data:
        all_recipes_inf.append(dynamo_preprocessing.preprocess_recipe(recipe, req_nutri = nutrition_list))
    df_cols = ["id", "title", "nutriScore", "mealType", "kcal" ,"sodium", "sugars", "carbs", "protein", "fat", "saturates", "fibre"]
    recipe_df = pd.DataFrame(all_recipes_inf, columns=df_cols)
    recipe_df.to_csv("recipes.csv", index = False)
    s3_client.upload_file("recipes.csv", bucket_name, file_name)



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Ingest recipes from DynamoDB, preprocess it and upload as a csv file to S3.')
    parser.add_argument('--table-name', help = 'DynamoDB table name')
    parser.add_argument('--bucket-name', help = 'Name of the bucket to upload to')
    parser.add_argument('--file-name', help = 'Name of the file to save in S3 bucket')
    args = parser.parse_args()
    main(args)