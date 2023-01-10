#!/usr/bin/env python
# coding: utf-8

"""
Functions to calculate useful nutrition information.
"""
import numpy as np
import typing
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

def remain_total_nutri_ratio(meal_request: dict, meal_names: dict, meal_ratios: dict) -> typing.Tuple[float, dict]:
    """
    Iterating through all chosen meals and calculate the remaining meal nutrition. Also
    calculating remaining meal ratios.
    """
    total_rec_nutri = meal_request["suggestNutriIntake"]
    num_meals = meal_request["numMeals"]
    total_ratio = 1.0
    for meal_index, meal in enumerate(meal_names[num_meals]):
        meal_nutri = meal_request[meal]
        # Empty meals need to be recommended
        if not meal_nutri:
            pass
        else:
            total_ratio -= meal_ratios[meal_index]
            total_rec_nutri = subtract_nutri(total_rec_nutri, meal_nutri)
    return np.round(total_ratio, 2), total_rec_nutri

def re_normalize_ratio(base_ratios: list, remain_ratio: float) -> list:
    """
    Renormalize base ratios based on the remaining ratio.
    """
    new_base_ratios = np.round(np.array(base_ratios) / remain_ratio, 2)
    return list(new_base_ratios)