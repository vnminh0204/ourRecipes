from inspect import Attribute
from urllib import response
from boto3 import client, resource
from datetime import datetime
from decimal import Decimal

import dynamoDB.config as config
import json

# import config

AWS_ACCESS_KEY_ID = config.AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = config.AWS_SECRET_ACCESS_KEY
REGION_NAME = config.REGION_NAME
# AWS_SESSION_TOKEN     = config("AWS_SESSION_TOKEN")

# client = client(
#     'dynamodb',
#     aws_access_key_id     = AWS_ACCESS_KEY_ID,
#     aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
#     region_name           = REGION_NAME,
#     # aws_session_token     = AWS_SESSION_TOKEN,
# )

resource = resource(
    "dynamodb",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=REGION_NAME
    # endpoint_url="http://localhost:5000/"
    # aws_session_token     = AWS_SESSION_TOKEN,
)


# def create_table_foodList():
#     # try:
#     table = resource.create_table(
#         TableName="Foods",  # Name of the table
#         KeySchema=[
#             {
#                 "AttributeName": "id",
#                 "KeyType": "HASH",  # RANGE = sort key, HASH = partition key
#             }
#         ],
#         AttributeDefinitions=[
#             {
#                 "AttributeName": "id",  # Name of the attribute
#                 "AttributeType": "N",  # N = Number (B= Binary, S = String)
#             }
#         ],
#         ProvisionedThroughput={"ReadCapacityUnits": 10, "WriteCapacityUnits": 10},
#     )
#     # except resource.exceptions.ResourceInUseException:
#     #     # return "Table already exists"
#     #     pass
#     return table


def createRecipesTable():
    # try:
    table = resource.create_table(
        TableName="Recipes",  # Name of the table
        KeySchema=[
            {
                "AttributeName": "id",
                "KeyType": "HASH",  # RANGE = sort key, HASH = partition key
            }
        ],
        AttributeDefinitions=[
            {
                "AttributeName": "id",  # Name of the attribute
                "AttributeType": "N",  # N = Number (B= Binary, S = String)
            }
        ],
        ProvisionedThroughput={"ReadCapacityUnits": 10, "WriteCapacityUnits": 10},
    )
    # except resource.exceptions.ResourceInUseException:
    #     # return "Table already exists"
    #     pass
    return table


# create_table_movie()

# create_table_foodList()
# FoodListTable = resource.Table("Foods")
RecipesTable = resource.Table("Recipes")


def addRecipe(data, nutriScore):
    data = json.loads(json.dumps(data), parse_float=Decimal)
    nutriScore = Decimal(nutriScore)
    hashedId = hash(data["cookingMethod"] + data["mealType"])
    now = datetime.now()
    stringifiedTime = now.strftime("%m/%d/%Y, %H:%M:%S")

    response = RecipesTable.put_item(
        Item={
            "id": hashedId,
            "data": data,
            "nutriScore": nutriScore,
            "date": stringifiedTime,
        }
    )

    print(response)
    return response


def getAllRecipes():
    response = RecipesTable.scan()
    data = response["Items"]
    while "LastEvaluatedKey" in response:
        print(response["LastEvaluatedKey"])
        response = RecipesTable.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        data.extend(response["Items"])
    return response


# def get_all_items():
#     return FoodListTable


# def get_food_from_foodList(id):
#     # print(FoodListTable)
#     response = FoodListTable.get_item(
#         Key={
#             "id": id,
#         },
#     )
#     print(response)
#     return response["Item"]


# # get_food_from_foodList(1)


# def update_food(id, data: dict):
#     ingredients = data["ingredients"]
#     description = data["description"]
#     response = FoodListTable.update_item(
#         Key={
#             "id": id,
#         },
#         ConditionExpression="attribute_exists(id)",
#         UpdateExpression="SET ingredients = :val1, description = :val2",
#         ReturnValues="UPDATED_NEW",
#         ExpressionAttributeValues={":val1": ingredients, ":val2": description},
#     )

#     return response


# # update_food(
# #     1,
# #     {
# #         "ingredients": [
# #             {"name": "beef", "amount": "100g"},
# #             {"name": "kool", "amount": "200g"},
# #         ],
# #         "description": "vkl",
# #     },
# # )


# def delete_food_from_db(id):
#     response = FoodListTable.delete_item(Key={"id": id})
