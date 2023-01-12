"""
Utilities functions for the purpose of extracting and processing data from AWS DynamoDB.
"""

def convert_unit(amount: float, unit_ratio: dict = {"mg": 0.001, "g": 1}, unit_from: str = 'mg') -> float:
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
            if key in set(['M', 'S', 'BOOL']):
                result[field] = field_data[key]
            elif key == 'N':
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
        nutri_detail = extract_req_fields(nutri_table[nutri]['M'], req_fields = ["amount", "unit"])
        org_amount = nutri_detail["amount"]
        transformed_amount = convert_unit(amount = org_amount, unit_ratio = {'': 1, "mg": 0.001, "g": 1}, unit_from = nutri_detail["unit"])
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
    nutri_table = recipe_data["nutritionTable"]['M']
    result.extend(preprocess_nutrition(nutri_table, req_nutri = req_nutri))
    return result