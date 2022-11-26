from boto3 import client, resource
from boto3.dynamodb.conditions import Key, Attr

import os
import json

AWS_ACCESS_KEY_ID = os.environ["AWS_ACCESS_KEY_ID"]
AWS_SECRET_ACCESS_KEY = os.environ["AWS_SECRET_ACCESS_KEY"]
REGION_NAME = os.environ["AWS_DEFAULT_REGION"]

resource = resource(
    "dynamodb",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=REGION_NAME
    # endpoint_url="http://localhost:5000/"
    # aws_session_token     = AWS_SESSION_TOKEN,
)


def create_token_blacklist_table():
    # try:
    table = resource.create_table(
        TableName="Blacklist",  # Name of the table
        KeySchema=[
            {
                "AttributeName": "token",
                "KeyType": "HASH",  # RANGE = sort key, HASH = partition key
            }
        ],
        AttributeDefinitions=[
            {
                "AttributeName": "token",  # Name of the attribute
                "AttributeType": "S",  # N = Number (B= Binary, S = String)
            }
        ],
        ProvisionedThroughput={"ReadCapacityUnits": 10, "WriteCapacityUnits": 10},
    )
    # except resource.exceptions.ResourceInUseException:
    #     # return "Table already exists"
    #     pass
    return table


# create_token_blacklist_table()
blacklist_table = resource.Table("Blacklist")


def invalidate_token(token):
    try:
        response = blacklist_table.put_item(
            Item={
                "token": token,
            },
        )
    except Exception as e:
        return {"msg": e, "status": "fail"}, 500
    return {"msg": "Logged out successfully", "status": "success"}, 200


def check_token_validity(token):
    response = blacklist_table.query(KeyConditionExpression=Key("token").eq(token))
    if len(response["Items"]) < 1:
        return True
    return False
