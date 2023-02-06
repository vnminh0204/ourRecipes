import React from "react";
import MealList from "../meal-list/mealList";
import "./dayPlan.scss"
import {IoReloadSharp} from "react-icons/io5";
import {SlNote} from "react-icons/sl"

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
                     suggestMealNutriPlan,
                     onNumMealsChangeHandler,
                     resetMealPlan,
                 }) => {
    const options = [3, 4];

    return (
        <div className="day-plan-container">
            <div className="day-header">
                <h3 className="day-title fs-3">Your Meal Plan</h3>
            </div>
            <div className="day-plan-nav">
                <div className="day-plan-nav-select">
                    <h3 className="day-plan-nav-title">Num meals:</h3>
                    <select className="day-plan-nav-btn" onChange={onNumMealsChangeHandler}>
                        {options.map((option, index) => {
                            return <option key={index}>{option}</option>;
                        })}
                    </select>
                </div>

                <button className="day-plan-nav-btn" onClick={() => resetMealPlan()}>
                    <IoReloadSharp className="day-plan-nav-icon" size={22}></IoReloadSharp>
                    <span className="day-plan-nav-text">
                        Reset
                    </span>
                </button>
                <button className="day-plan-nav-btn" onClick={() => suggestMealNutriPlan()}>
                    <SlNote className="day-plan-nav-icon" size={22}></SlNote>
                    <span className="day-plan-nav-text">Suggest</span>
                </button>
            </div>

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
        </div>)
}

export default DayPlan;