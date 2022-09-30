from audioop import add
from inspect import Attribute
from urllib import response
from boto3 import client, resource
from datetime import datetime
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr

import json
import uuid
import bcrypt
import os

# import config

AWS_ACCESS_KEY_ID = os.environ["AWS_ACCESS_KEY_ID"]
AWS_SECRET_ACCESS_KEY = os.environ["AWS_SECRET_ACCESS_KEY"]
REGION_NAME = os.environ["REGION_NAME"]
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


def create_users_table():
    # try:
    table = resource.create_table(
        TableName="Users",  # Name of the table
        KeySchema=[
            {
                "AttributeName": "username",
                "KeyType": "HASH",  # RANGE = sort key, HASH = partition key
            }
        ],
        AttributeDefinitions=[
            {
                "AttributeName": "username",  # Name of the attribute
                "AttributeType": "S",  # N = Number (B= Binary, S = String)
            }
        ],
        ProvisionedThroughput={"ReadCapacityUnits": 10, "WriteCapacityUnits": 10},
    )
    # except resource.exceptions.ResourceInUseException:
    #     # return "Table already exists"
    #     pass
    return table


def create_ingredients_table():
    # try:
    table = resource.create_table(
        TableName="Ingredients",  # Name of the table
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

# create_users_table()
users_table = resource.Table("Users")

# create_ingredients_table()

ingredients_table = resource.Table("Ingredients")


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


def get_specific_recipe(id):
    id = int(id)
    response = RecipesTable.get_item(Key={"id": id})
    # return response
    if not ("Item" in response.keys()):
        return {"msg": "Recipe not found"}
    item = response["Item"]
    return item


def update_recipe(id, new_data, new_nutri_score):
    new_data = json.loads(json.dumps(new_data), parse_float=Decimal)
    new_nutri_score = Decimal(new_nutri_score)
    # return {"data": new_data, "new_nutri_score": new_nutri_score}
    now = datetime.now()
    stringifiedTime = now.strftime("%m/%d/%Y, %H:%M:%S")
    response = RecipesTable.update_item(
        Key={"id": int(id)},
        ConditionExpression="attribute_exists(id)",
        UpdateExpression="SET #d = :val1, #ns = :val2, #date = :val3",
        ReturnValues="UPDATED_NEW",
        ExpressionAttributeValues={
            ":val1": new_data,
            ":val2": new_nutri_score,
            ":val3": stringifiedTime,
        },
        ExpressionAttributeNames={"#d": "data", "#ns": "nutriScore", "#date": "date"},
    )

    return response


def delete_recipe(id):
    response = RecipesTable.delete_item(Key={"id": int(id)})
    return response


def getAllRecipes():
    response = RecipesTable.scan()
    data = response["Items"]
    while "LastEvaluatedKey" in response:
        print(response["LastEvaluatedKey"])
        response = RecipesTable.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        data.extend(response["Items"])
        data = json.loads(json.dumps(data), parse_float=float)
    return response


def add_user(username, password, data):
    data = json.loads(json.dumps(data), parse_float=Decimal)
    uid = uuid.uuid4().hex
    salt = bcrypt.gensalt()
    pw = password.encode("utf-8")
    hashed_pass = bcrypt.hashpw(pw, salt)
    try:
        response = users_table.put_item(
            Item={
                "user_id": uid,
                "username": username,
                "password": hashed_pass,
                "data": data,
            },
            ConditionExpression="attribute_not_exists(username)",
        )
    except Exception as e:
        return {"msg": "Username already taken", "code": 409}
    return {"msg": "User created successfully", "code": 200}


def verify_user(username, plain_text_password):
    response = users_table.query(KeyConditionExpression=Key("username").eq(username))
    if len(response["Items"]) < 1:
        return {"Username not found"}, False
    item = response["Items"][0]
    hashed_pass = item["password"]
    # print(hashed_pass.value.decode("utf-8"))
    # print(plain_text_password.encode("utf-8"))
    if bcrypt.checkpw(plain_text_password.encode("utf-8"), hashed_pass.value):
        return {"uid": item["user_id"], "data": item["data"]}, True
    # print(response)
    return {"Wrong password"}, False


def add_ingredient(id, name, data):
    data = json.loads(json.dumps(data), parse_float=Decimal)
    response = RecipesTable.put_item(
        Item={
            "id": int(id),
            "name": name,
            "nutritions": data,
        }
    )

    # print(response)
    return response


def get_ingredient(id):
    response = ingredients_table.query(KeyConditionExpression=Key("id").eq(id))
    if len(response["Items"]) < 1:
        # return {"Username not found"}, False
        # not found, call spoonacular api to get infor and then add_ingredient
        # get_100g_ingredient_nutritions_from_spoonacular(id)
        # return ingredient
        pass
    # if found:
    item = response["Items"][0]
    return {"id": item["id"], "name": item["name"], "nutritions": item["nutritions"]}


def partial_name_query(substring):
    pass
