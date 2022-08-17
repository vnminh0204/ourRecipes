from urllib import response
import requests
import config
import json

API_END_POINT = "https://api.spoonacular.com/food/ingredients/{id}/information"
KEY_WORDS = "Calories Fat Saturated Fat Net Carbohydrates Sugar Fiber Protein Sodium"


def get_100g_ingredient_nutritions_by_id(id):
    end_point = API_END_POINT.replace("{id}", str(id))
    params = {"apiKey": config.SPOONACULAR_API_KEY, "amount": str(100), "unit": "grams"}
    response = requests.get(url=end_point, params=params).json()
    retJson = truncate_100g_response(response)
    return retJson


def get_ingredient_by_id(id):
    pass


def get_ingredient_by_name(name):
    pass


def truncate_100g_response(responseJSON):
    rsJSON = {}
    rsJSON["name"] = responseJSON["name"]
    rsJSON["id"] = responseJSON["id"]
    rsJSON["possibleUnits"] = responseJSON["possibleUnits"]
    rsJSON["edit"] = False
    rsJSON["amount"] = responseJSON["amount"]
    rsJSON["unit"] = responseJSON["unit"]
    rsJSON["nutrition"] = {}
    rsJSON["nutrition"]["kcal"] = [
        x for x in responseJSON["nutrition"]["nutrients"] if x["name"] == "Calories"
    ][0]
    rsJSON["nutrition"]["fat"] = [
        x for x in responseJSON["nutrition"]["nutrients"] if x["name"] == "Fat"
    ][0]
    rsJSON["nutrition"]["saturates"] = [
        x
        for x in responseJSON["nutrition"]["nutrients"]
        if x["name"] == "Saturated Fat"
    ][0]
    rsJSON["nutrition"]["carbs"] = [
        x
        for x in responseJSON["nutrition"]["nutrients"]
        if x["name"] == "Net Carbohydrates"
    ][0]
    rsJSON["nutrition"]["sugars"] = [
        x for x in responseJSON["nutrition"]["nutrients"] if x["name"] == "Sugar"
    ][0]
    rsJSON["nutrition"]["fibre"] = [
        x for x in responseJSON["nutrition"]["nutrients"] if x["name"] == "Fiber"
    ][0]
    rsJSON["nutrition"]["protein"] = [
        x for x in responseJSON["nutrition"]["nutrients"] if x["name"] == "Protein"
    ][0]
    rsJSON["nutrition"]["sodium"] = [
        x for x in responseJSON["nutrition"]["nutrients"] if x["name"] == "Sodium"
    ][0]
    rsJSON["hover"] = False
    return json.dumps(rsJSON, indent=4)


print(get_100g_ingredient_nutritions_by_id(99184))


# print("Saturated fat" in KEY_WORDS)