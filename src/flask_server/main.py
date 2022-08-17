from decimal import Decimal
from urllib import response
from flask import Flask, request, jsonify, session, make_response
import os
import dynamoDB.controller as dynamodb
from lib.nutritionCalculator import calculate_score
import jwt
from datetime import datetime, timedelta
from functools import wraps

# import json
# from decimal import Decimal

# Init app
app = Flask(__name__)

app.config["SECRET_KEY"] = "c68df6752f4e460e90859655e2b77db3"


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "x-access-token" in request.headers:
            token = request.headers["x-access-token"]

        if not token:
            return jsonify({"message": "Token is missing!"}), 401

        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except:
            return {"msg": "Token is invalid", "token": str(token)}, 401
        return f(*args, **kwargs)

    return decorated


@app.route("/", methods=["GET"])
def root_route():
    try:
        # dynamodb.create_table_foodList()
        dynamodb.createRecipesTable()
    except Exception:
        return "Table already exists"
        # pass
    return "Table created"


@app.route("/home")
def home():
    if not session.get("logged_in"):
        return {"msg": "Not yet loggedin, handle"}
    else:
        return {"msg": "Logged in, handle"}


@app.route("/register", methods=["POST"])
#
def register():
    """
    Data is of the form {username, password, data: {height, ....}}
    """
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    data = data["data"]
    response = dynamodb.add_user(username=username, password=password, data=data)
    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        return {"msg": "Add user successful"}
    return {"msg": "error occurred", "response": response}


@app.route("/login", methods=["POST"])
def login():
    """
    Login flow: login -> acquire token, save user info to session (session ends on closing brwoser...)
    On request to route which need authentication, request header must contains x-access-token fields which is the token received from logging in
    """
    data = request.get_json()
    # TODO: check login credential with db
    response, result = dynamodb.verify_user(data["username"], data["password"])
    if result:
        session["logged_in"] = True
        token = jwt.encode(
            {
                "user": data["username"],
                "expiration": str(datetime.utcnow() + timedelta(seconds=120)),
            },
            app.config["SECRET_KEY"],
        )
        return jsonify({"token": token, "data": response})
    else:
        return make_response(
            "Unable to verify",
            403,
            {"WWW-Authenticate": 'Basic realm: "Authentication Failed "'},
        )


@app.route("/auth")
@token_required
def auth():
    """
    Sample authentication required route, need token in header in order to receive response from server,
    otw return a 401 response
    """
    return "JWT verified"


@app.route("/recipes/<recipeid>", methods=["POST", "GET"])
def addRecipe(recipeid):
    if request.method == "POST":
        if recipeid == "new":
            data = request.get_json()
            # print(data["id"], data["ingredients"], data["description"])
        data = request.get_json()
        # print(data["id"], data["ingredients"], data["description"])

        totalCalories = 0
        totalSugar = 0
        totalSaturatedFat = 0
        totalFat = 0
        totalSodium = 0
        totalProtein = 0
        totalFiber = 0
        totalCarb = 0
        nutritionTable = data["nutritionTable"]
        totalCalories = nutritionTable.get("kcal", {}).get("amount", 0)
        totalSugar = nutritionTable.get("sugars", {}).get("amount", 0)
        totalSaturatedFat = nutritionTable.get("saturates", {}).get("amount", 0)
        totalFat = nutritionTable.get("fat", {}).get("amount", 0)
        totalSodium = nutritionTable.get("sodium", {}).get("amount", 0)
        totalProtein = nutritionTable.get("protein", {}).get("amount", 0)
        totalFiber = nutritionTable.get("fibre", {}).get("amount", 0)
        totalCarb = nutritionTable.get("carbs", {}).get("amount", 0)

        nutritionScore = calculate_score(
            totalCalories,
            totalSugar,
            totalSaturatedFat,
            totalFat,
            totalSodium,
            totalProtein,
            totalFiber,
            totalCarb,
        )
        # return response
        # print(data)
        nutritionScore = str(round(nutritionScore, 2))
        response = dynamodb.addRecipe(data, nutriScore=nutritionScore)
        if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
            return {"msg": "Add food successful", "nutritionScore": nutritionScore}
        return {"msg": "error occurred", "response": response}
    elif request.method == "GET":
        # getResponse = dynamodb.getAllRecipes()
        # print(getResponse)
        # print(getResponse["Count"])
        # for recipe in getResponse["Items"]:
        #     if str(recipe["id"]) == str(recipeid):
        #         return recipe
        return dynamodb.get_specific_recipe(recipeid)
        return make_response(
            "Recipe not found",
            404,
        )


@app.route("/recipes/<recipeid>", methods=["PUT"])
def update_recipe(recipeid):
    data = request.get_json()
    totalCalories = 0
    totalSugar = 0
    totalSaturatedFat = 0
    totalFat = 0
    totalSodium = 0
    totalProtein = 0
    totalFiber = 0
    totalCarb = 0
    nutritionTable = data["nutritionTable"]
    totalCalories = nutritionTable.get("kcal", {}).get("amount", 0)
    totalSugar = nutritionTable.get("sugars", {}).get("amount", 0)
    totalSaturatedFat = nutritionTable.get("saturates", {}).get("amount", 0)
    totalFat = nutritionTable.get("fat", {}).get("amount", 0)
    totalSodium = nutritionTable.get("sodium", {}).get("amount", 0)
    totalProtein = nutritionTable.get("protein", {}).get("amount", 0)
    totalFiber = nutritionTable.get("fibre", {}).get("amount", 0)
    totalCarb = nutritionTable.get("carbs", {}).get("amount", 0)

    nutritionScore = calculate_score(
        totalCalories,
        totalSugar,
        totalSaturatedFat,
        totalFat,
        totalSodium,
        totalProtein,
        totalFiber,
        totalCarb,
    )
    nutritionScore = str(round(nutritionScore, 2))
    response = dynamodb.update_recipe(recipeid, data, nutritionScore)
    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        return {"msg": "Update successful", "nutritionScore": nutritionScore}
    return {"msg": "error occurred", "response": response}


@app.route("/recipes/<recipeid>", methods=["DELETE"])
def delete_recipe(recipeid):
    response = dynamodb.delete_recipe(recipeid)
    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        return {"msg": "Delete successful", "Deleted ID": recipeid}
    return {"msg": "error occurred", "response": response}


@app.route("/recipes", methods=["GET"])
def getAllRecipes():
    getResponse = dynamodb.getAllRecipes()
    return getResponse


# Run Server
if __name__ == "__main__":
    app.run(debug=True)
