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


def convert_unit(
    amount: float, unit_ratio: dict = {"mg": 0.001, "g": 1}, unit_from: str = "mg"
) -> float:
    """
    Convert an amount from unit_from to g. Unit ratio is a dict that shows how much of the key is equal to 1g.
    For example, "mg": 0.001 means 1 mg = 0.001g.
    """
    try:
        to_amount = amount * unit_ratio[unit_from]
    except KeyError:
        print("Units don't exist in the ration dict")
        return None
    return to_amount


def extract_req_fields(data: dict, req_fields: list) -> dict:
    """Read in a nutrition dictionary follow format returned by AWS DynamoDB API. Then return the needed fields in appropriate type.
    Symbols that
    Example:
    {'M': {'percentOfDailyNeeds': {'N': '10.4'},
      'amount': {'N': '2.6'},
      'unit': {'S': 'g'}}}
    Supported types: 'S', 'N', 'M', 'BOOL'
    """
    result = {}
    for field in req_fields:
        field_data = data[field]
        field_keys = field_data.keys()
        for key in field_keys:
            if key in set(["M", "S", "BOOL"]):
                result[field] = field_data[key]
            elif key == "N":
                result[field] = float(field_data[key])
            else:
                print(f"Type of {field} field not supported: {key}")
                return None
    return result


def preprocess_nutrition(nutri_table: dict, req_nutri: list) -> list:
    """
    Preprocess nutritions of a recipe, convert to g, and adding to a list.
    The input req_nutri provides the list of required nutritions. The returned list will follow the order provided in req_nutri.
    Example: ["kcal" ,"sodium", "sugars", "carbs", "protein", "fat", "saturates", "fibre"].
    """
    result = []
    for nutri in req_nutri:
        nutri_detail = extract_req_fields(
            nutri_table[nutri]["M"], req_fields=["amount", "unit"]
        )
        org_amount = nutri_detail["amount"]
        transformed_amount = convert_unit(
            amount=org_amount,
            unit_ratio={"": 1, "mg": 0.001, "g": 1},
            unit_from=nutri_detail["unit"],
        )
        result.append(transformed_amount)
    return result


def preprocess_recipe(recipe: dict, req_nutri: list) -> list:
    """
    Preprocess a recipe and put relevant data into a list.
    Recipe is a dict with the following keys: ['date', 'nutriScore', 'id', 'data']
    The returned list follows the Recipes table modelling.
    """
    result = []
    recipe_data = recipe["data"]["M"]
    recipe_id = int(recipe["id"]["N"])
    recipe_title = recipe_data["title"]["S"]
    recipe_score = float(recipe["nutriScore"]["N"])
    recipe_meal_type = recipe_data["mealType"]["S"]
    result.extend([recipe_id, recipe_title, recipe_score, recipe_meal_type])
    nutri_table = recipe_data["nutritionTable"]["M"]
    result.extend(preprocess_nutrition(nutri_table, req_nutri=req_nutri))
    return result


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

    s3_client = boto3.client(
        "s3",
        region_name=AWS_DEFAULT_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )
    dynamo_client = boto3.client(
        "dynamodb",
        region_name=AWS_DEFAULT_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )
    dynamopaginator = dynamo_client.get_paginator("scan")
    dynamoresponse = dynamopaginator.paginate(
        TableName=targettabname,
        Select="ALL_ATTRIBUTES",
        ReturnConsumedCapacity="NONE",
        ConsistentRead=True,
    )

    # Download data from DynamoDB -> JSON.
    with open("Recipes.json", "w") as f:
        for page in dynamoresponse:
            data_batch = page
            json.dump(data_batch, f)
    # Read data from JSON.
    with open("Recipes.json", "r") as f:
        recipe_data = json.load(f)
    recipe_data = recipe_data["Items"]

    nutrition_list = [
        "kcal",
        "sodium",
        "sugars",
        "carbs",
        "protein",
        "fat",
        "saturates",
        "fibre",
    ]
    all_recipes_inf = []
    for recipe in recipe_data:
        all_recipes_inf.append(preprocess_recipe(recipe, req_nutri=nutrition_list))
    df_cols = [
        "id",
        "title",
        "nutriScore",
        "mealType",
        "kcal",
        "sodium",
        "sugars",
        "carbs",
        "protein",
        "fat",
        "saturates",
        "fibre",
    ]
    recipe_df = pd.DataFrame(all_recipes_inf, columns=df_cols)
    # print(recipe_df)
    save_to_local = recipe_df.to_csv("recipes.csv", index=False)
    if save_to_local is not None:
        print("Not able to save file to local")
    s3_client.upload_file("recipes.csv", bucket_name, file_name)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Ingest recipes from DynamoDB, preprocess it and upload as a csv file to S3."
    )
    parser.add_argument("--table-name", help="DynamoDB table name")
    parser.add_argument("--bucket-name", help="Name of the bucket to upload to")
    parser.add_argument("--file-name", help="Name of the file to save in S3 bucket")
    args = parser.parse_args()
    main(args)
