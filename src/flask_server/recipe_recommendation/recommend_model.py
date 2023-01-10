import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
def k_nearest_recipes(df: pd.DataFrame, meal_request: dict, total_nutrition: dict, meal_names: dict, meal_ratios: list, n_neighbors = 3) -> dict:
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
            all_meal_arr = df.loc[df["mealType"].str.contains(meal), "kcal":].to_numpy()
            all_meal_df = df.loc[df["mealType"].str.contains(meal), :]
            
            nutrition_order = list(all_meal_df.loc[:, "kcal":].columns)
            for nutri in nutrition_order:
                total_nutrition_arr.append(total_nutrition[nutri])
            
            meal_arr = meal_ratios[meal_index] * np.array(total_nutrition_arr)
            top_rec_indx = NearestNeighbors(n_neighbors=n_neighbors).fit(all_meal_arr).kneighbors(meal_arr.reshape(1, -1), return_distance=False)
            randomized_rec_indx = np.random.choice(top_rec_indx[0])
            result[meal] = dict(all_meal_df.iloc[randomized_rec_indx, :])
    return result