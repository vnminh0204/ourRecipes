import React from "react";
import MealsSearch from "./meal-search/search/mealsSearch";
import { IoIosInformationCircleOutline } from "react-icons/io";
import "./mealPlanner.css";
import { useState, useEffect } from "react";
import MealList from "./meal-list/mealList";
import MacroCal from "./macro-calculator/macroCal";

const MealPlanner = ({ toast, user }) => {
  const [breakfastMeals, setBreakFastMeals] = useState([]);
  const [breakfastNutrition, setBreakFastNutrition] = useState({});
  const [lunchMeals, setLunchMeals] = useState([]);
  const [lunchNutrition, setLunchNutrition] = useState({});
  const [dinnerMeals, setDinnerMeals] = useState([]);
  const [dinnerNutrition, setDinnerNutrition] = useState({});
  const [snackMeals, setSnackMeals] = useState([]);
  const [snackNutrition, setSnackNutrition] = useState({});

  const addMeal = (newMeal, mealType) => {
    toast.success("Meal is added");
    console.log(mealType);
    switch (mealType) {
      case "Breakfast":
        const newbreakfastMeals = [...breakfastMeals, newMeal];
        setBreakFastMeals(newbreakfastMeals);
        break;
      case "Lunch":
        const newlunchMeals = [...lunchMeals, newMeal];
        setLunchMeals(newlunchMeals);
        break;
      case "Dinner":
        const newdinnerMeals = [...dinnerMeals, newMeal];
        setDinnerMeals(newdinnerMeals);
        break;
      case "Snack":
        const newsnackMeals = [...snackMeals, newMeal];
        setSnackMeals(newsnackMeals);
        break;
      default:
        toast.error("Meal type does not exist");
    }
  };

  useEffect(() => {
    const updatedBreakfastNutrition = getNutritionTotal(breakfastMeals);
    setBreakFastNutrition(updatedBreakfastNutrition);
  }, [breakfastMeals]);

  useEffect(() => {
    const updatedLunchNutrition = getNutritionTotal(lunchMeals);
    setLunchNutrition(updatedLunchNutrition);
  }, [lunchMeals]);

  useEffect(() => {
    const updatedDinnerNutrition = getNutritionTotal(dinnerMeals);
    setDinnerNutrition(updatedDinnerNutrition);
  }, [dinnerMeals]);

  useEffect(() => {
    const updatedSnackNutrition = getNutritionTotal(snackMeals);
    setSnackNutrition(updatedSnackNutrition);
  }, [snackMeals]);

  const getNutritionTotal = (mealList) => {
    const newNutritionTable = {
      kcal: { amount: 0, unit: "", percentOfDailyNeeds: 0 },
      fat: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
      saturates: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
      carbs: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
      sugars: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
      fibre: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
      protein: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
      sodium: { amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
    };
    for (const meal of mealList) {
      if (meal.nutritionTable) {
        if (meal.nutritionTable.kcal) {
          newNutritionTable.kcal.amount +=
            parseInt(meal.nutritionTable.kcal.amount) * meal.quantity;
          newNutritionTable.kcal.percentOfDailyNeeds +=
            parseInt(meal.nutritionTable.kcal.percentOfDailyNeeds) *
            meal.quantity;
        }
        if (meal.nutritionTable.fat) {
          newNutritionTable.fat.amount +=
            parseInt(meal.nutritionTable.fat.amount) * meal.quantity;
          newNutritionTable.fat.percentOfDailyNeeds +=
            parseInt(meal.nutritionTable.fat.percentOfDailyNeeds) *
            meal.quantity;
        }
        if (meal.nutritionTable.saturates) {
          newNutritionTable.saturates.amount +=
            parseInt(meal.nutritionTable.saturates.amount) * meal.quantity;
          newNutritionTable.saturates.percentOfDailyNeeds +=
            parseInt(meal.nutritionTable.saturates.percentOfDailyNeeds) *
            meal.quantity;
        }
        if (meal.nutritionTable.carbs) {
          newNutritionTable.carbs.amount +=
            parseInt(meal.nutritionTable.carbs.amount) * meal.quantity;
          newNutritionTable.carbs.percentOfDailyNeeds +=
            parseInt(meal.nutritionTable.carbs.percentOfDailyNeeds) *
            meal.quantity;
        }
        if (meal.nutritionTable.sugars) {
          newNutritionTable.sugars.amount +=
            parseInt(meal.nutritionTable.sugars.amount) * meal.quantity;
          newNutritionTable.sugars.percentOfDailyNeeds +=
            parseInt(meal.nutritionTable.sugars.percentOfDailyNeeds) *
            meal.quantity;
        }
        if (meal.nutritionTable.fibre) {
          newNutritionTable.fibre.amount +=
            parseInt(meal.nutritionTable.fibre.amount) * meal.quantity;
          newNutritionTable.fibre.percentOfDailyNeeds +=
            parseInt(meal.nutritionTable.fibre.percentOfDailyNeeds) *
            meal.quantity;
        }
        if (meal.nutritionTable.protein.amount) {
          newNutritionTable.protein.amount +=
            parseInt(meal.nutritionTable.protein.amount) * meal.quantity;
          newNutritionTable.protein.percentOfDailyNeeds +=
            parseInt(meal.nutritionTable.protein.percentOfDailyNeeds) *
            meal.quantity;
        }
        if (meal.nutritionTable.sodium) {
          newNutritionTable.sodium.amount +=
            parseInt(meal.nutritionTable.sodium.amount) * meal.quantity;
          newNutritionTable.sodium.percentOfDailyNeeds +=
            parseInt(meal.nutritionTable.sodium.percentOfDailyNeeds) *
            meal.quantity;
        }
      }
    }
    return newNutritionTable;
  };

  return (
    <React.Fragment>
      <div className="planner-container">
        <h1>MealPlanner</h1>
        {/* <MacroCal></MacroCal> */}
        <div className="meal-plan-continer">
          <div className="day-plan-container">
            <div className="day-header">
              <h3 className="day-title fs-3">Your Meal Plan</h3>
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
            <MealList
              mealType={"Snack"}
              meals={snackMeals}
              nutrition={snackNutrition}
            ></MealList>
          </div>
          <MealsSearch addItem={addMeal} toast={toast}></MealsSearch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MealPlanner;
