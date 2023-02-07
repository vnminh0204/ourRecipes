import React from "react";
import MealList from "../meal-list/mealList";
import "./dayPlan.scss"

const DayPlan = ({
                     toast,
                     user,
                     numMeals,
                     breakfastMeals,
                     breakfastNutrition,
                     lunchMeals,
                     lunchNutrition,
                     dinnerMeals,
                     dinnerNutrition,
                     snackMeals,
                     snackNutrition,
                 }) => {
    return (
        <div className="day-plan-content">
            <div className="day-plan-meal">
                <MealList
                    mealType={"Breakfast"}
                    meals={breakfastMeals}
                    nutrition={breakfastNutrition}
                ></MealList>
                <MealList
                    mealType={"Lunch"}
                    meals={lunchMeals}
                    nutrition={lunchNutrition}
                ></MealList>
                <MealList
                    mealType={"Dinner"}
                    meals={dinnerMeals}
                    nutrition={dinnerNutrition}
                ></MealList>
                {numMeals && numMeals === 4 && (
                    <MealList
                        mealType={"Snack"}
                        meals={snackMeals}
                        nutrition={snackNutrition}
                    ></MealList>
                )}
            </div>
        </div>)
}

export default DayPlan;