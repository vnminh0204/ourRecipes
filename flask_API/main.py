from urllib import response
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
import dynamoDB.controller as dynamodb

# Init app
app = Flask(__name__)

# Models
class Ingredient:
    def __init__(self, name, amount):
        self.name = name
        self.amount = amount


# i1 = Ingredient("beef", "200g")
# print(i1.name, i1.amount)

# i2 = Ingredient("beef", "200g")
# print(i2.name, i2.amount)


class Food:
    def __init__(self, ingredients, description):
        self.ingredients = ingredients
        self.description = description


# f1 = Food([i1, i2], "cx")
# print(f1.ingredients, f1.description)


@app.route("/", methods=["GET"])
def root_route():
    try:
        dynamodb.create_table_foodList()
    except Exception:
        return "Table already exists"
        # pass
    return "Table created"


@app.route("/food", methods=["POST", "GET"])
def add_food():
    if request.method == "POST":

        data = request.get_json()
        print(data["id"], data["ingredients"], data["description"])
        response = dynamodb.write_to_foodList(
            data["id"], data["ingredients"], data["description"]
        )
        # response = dynamodb.write_to_foodList(
        #     2,
        #     [{"name": "beef", "amount": "100g"}, {"name": "kdal", "amount": "200g"}],
        #     "dascxz",
        # )

        # return response
        if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
            return {
                "msg": "Add food successful",
            }
        return {"msg": "error occurred", "response": response}
    # else:
    return {"msg": "GET REQUEST, RENDER NAOTHER PAGE"}


@app.route("/food/<int:id>")
def getFood(id):
    try:
        response = dynamodb.get_food_from_foodList(id)
        print(response)
        print("000000000000000")
    except Exception:
        return {"msg": "Some error occured"}

    # if response["ResponseMetadata"]["HTTPStatusCode"] == 200:

    #     if "Item" in response:
    #         return {"Item": response["Item"]}

    #     return {"msg": "Item not found!"}

    return {"msg": "Some error occured", "response": response}


@app.route("/food/<int:id>", methods=["DELETE"])
def deleteFood(id):

    response = dynamodb.delete_food_from_db(id)

    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        return {
            "msg": "Deleted successfully",
        }

    return {"msg": "Some error occcured", "response": response}


@app.route("/food/<int:id>", methods=["PUT"])
def updateFood(id):

    data = request.get_json()

    response = dynamodb.update_food(id, data)

    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        return {
            "msg": "Updated successfully",
            "ModifiedAttributes": response["Attributes"],
            "response": response["ResponseMetadata"],
        }

    return {"msg": "Some error occured", "response": response}


# Run Server
if __name__ == "__main__":
    app.run(debug=True)
