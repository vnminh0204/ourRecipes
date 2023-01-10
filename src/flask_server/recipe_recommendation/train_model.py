#!/usr/bin/env python
# coding: utf-8

# - Calculate randomized base ration according to https://www.omnicalculator.com/health/meal-calorie. Randomize the first 2/3 meals
# - Calculate the remaining nutrition based on already chosen meals.
# - Re-normalize the remaining ratios.
# - Train the model
# - Output the predictions. Randomize the top 3 choices and output one of them.
import io
import os
import json
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import boto3

with open("sample_request.json", "r") as f:
    sample_request = json.load(f)
sample_request.keys()

sample_request["suggestNutriIntake"]

# # Calculate randomized ratio

num_meals = sample_request["numMeals"]

org_ratios = {
    3: [(0.30, 0.35), (0.35, 0.4), (0.25, 0.35)],
    4: [(0.25, 0.3), (0.35, 0.4), (0.05, 0.1), (0.25, 0.3)]
}
def randomize_meal_ratios(org_ratios: dict, num_meals: int, smallest_step = 0.01) -> list:
    """
    Given a dictionary with lits of meal ratios ranges, key is the number of meals. Randomize the ratio
    for each meal then return the result list. For example [(0.3, 0.35)] -> randomize to a number in the range
    of 0.3 - 0.35.
    """
    randomized_ratios = []
    smallest_step = 0.01

    # The last meal is not randomized.
    try:
        for min_ratio, max_ratio in org_ratios[num_meals][:-1]:
            rand_ratio = np.around(np.random.choice(np.arange(min_ratio, max_ratio + smallest_step, smallest_step), size=1)[0], 2)
            randomized_ratios.append(rand_ratio)
    except KeyError:
        error_log = {"error": f"{num_meals} meals is not implemented"}
        return error_log

    randomized_ratios.append(np.around(1 - sum(randomized_ratios), 2))
    return randomized_ratios

randomized_ratios = randomize_meal_ratios(org_ratios, num_meals)
print(randomized_ratios, sum(randomized_ratios))


# # Calculate remaining nutrition based on already chosen meals

# In[124]:


def subtract_nutri(total_nutri: dict, target_nutri: dict) -> dict:
    """
    Calculate the remaning nutrition by subtracting target_nutri from total_nutri.
    """
    result = {}
    try:
        for nutri in total_nutri.keys():
            result[nutri] = total_nutri[nutri] - target_nutri[nutri]
    except KeyError:
        return {"error": f"{nutri} does not exist in the recipe"}
    return result


# In[125]:


subtract_nutri(sample_request["suggestNutriIntake"], sample_request["Breakfast"])


# In[154]:


meal_names = {
    3: ["Breakfast", "Lunch", "Dinner"],
    4: ["Breakfast", "Lunch", "Snack", "Dinner"]
}
def remain_total_NutriRatio(meal_request: dict, meal_names: dict, meal_ratios: dict) -> (float, dict):
    """
    Iterating through all chosen meals and calculate the remaining meal nutrition. Also
    calculating remaining meal ratios.
    """
    totalRec_nutri = meal_request["suggestNutriIntake"]
    num_meals = meal_request["numMeals"]
    total_ratio = 1.0
    for meal_index, meal in enumerate(meal_names[num_meals]):
        meal_nutri = meal_request[meal]
        # Empty meals need to be recommended
        if not meal_nutri:
            pass
        else:
            total_ratio -= meal_ratios[meal_index]
            totalRec_nutri = subtract_nutri(totalRec_nutri, meal_nutri)
    return np.round(total_ratio, 2), totalRec_nutri


# In[153]:


remain_ratio, remain_nutrition = remain_total_NutriRatio(sample_request, meal_names, randomized_ratios)
remain_ratio, remain_nutrition


# In[165]:


remain_total_NutriRatio({"suggestNutriIntake": sample_request["suggestNutriIntake"], 
                         "numMeals": 4,
                        "Breakfast": {}, 
                        "Lunch": {},
                        "Snack": {},
                        "Dinner": {}}, meal_names, randomized_ratios)


# # Renormalize Ratios

# In[150]:


def reNormalize_ratio(base_ratios: list, remain_ratio: float) -> list:
    """
    Renormalize base ratios based on the remaining ratio.
    """
    new_base_ratios = np.round(np.array(base_ratios) / remain_ratio, 2)
    return list(new_base_ratios)


# In[164]:


normalized_ratios = reNormalize_ratio(randomized_ratios, remain_ratio)
normalized_ratios


# # Train models

# In[183]:


def recommend_recipes(df: pd.DataFrame, meal_request: dict, total_nutrition: dict, meal_names: dict, meal_ratios: list, n_neighbors = 3) -> dict:
    """
    Recommend recipes based on the request, empty dict means need to be recommended.
    For each meal, take out the top 3 -> randomize a choice -> recommend.
    """
    num_meals = meal_request["numMeals"]
    result = {}
    for meal_index, meal in enumerate(meal_names[num_meals]):
        meal_nutri = meal_request[meal]
        # Empty meals need to be recommended
        if not meal_nutri:
            total_nutrition_arr = []
            allMeal_arr = df.loc[df["mealType"].str.contains(meal), "kcal":].to_numpy()
            allMeal_df = df.loc[df["mealType"].str.contains(meal), :]
            
            nutrition_order = list(allMeal_df.loc[:, "kcal":].columns)
            for nutri in nutrition_order:
                total_nutrition_arr.append(total_nutrition[nutri])
            
            meal_arr = meal_ratios[meal_index] * np.array(total_nutrition_arr)
            top_rec_indx = NearestNeighbors(n_neighbors=n_neighbors).fit(allMeal_arr).kneighbors(meal_arr.reshape(1, -1), return_distance=False)
            randomized_rec_indx = np.random.choice(top_rec_indx[0])
            result[meal] = dict(allMeal_df.iloc[randomized_rec_indx, :])
    return result

recommend_recipes(df, sample_request, remain_nutrition, meal_names, normalized_ratios)