import React from "react";
import MealsSearch from "./meal-search/search/mealsSearch";
import "./mealPlanner.css";
import { useState, useEffect } from "react";
import MealList from "./meal-list/mealList";
import MacroCal from "./macro-calculator/macroCal";
import config from "../../config.json";

const MealPlanner = ({ toast, user }) => {
  const [numMeals, setNumMeals] = useState(3);

  const [userMacro, setUserMacro] = useState({});

  // Fiber = calo/1000 * 14 grams

  // Sodium = 2300 mg

  // Sugars = calo * 0.025

  // Proteins = calo * 0.15 / 4

  // Fat = calo * 0.25 / 9

  // Carbs = (calo - protein * 4 - fat * 9) / 4

  // Saturates = calo/1000*11 grams

  const [breakfastMeals, setBreakFastMeals] = useState([]);
  const [breakfastNutrition, setBreakFastNutrition] = useState({
    kcal: { amount: 0, unit: "", percentOfDailyNeeds: 0 },
    fat: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    saturates: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    carbs: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    sugars: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    fibre: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    protein: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    sodium: { amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
  });
  const [lunchMeals, setLunchMeals] = useState([]);
  const [lunchNutrition, setLunchNutrition] = useState({
    kcal: { amount: 0, unit: "", percentOfDailyNeeds: 0 },
    fat: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    saturates: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    carbs: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    sugars: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    fibre: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    protein: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    sodium: { amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
  });
  const [dinnerMeals, setDinnerMeals] = useState([]);
  const [dinnerNutrition, setDinnerNutrition] = useState({
    kcal: { amount: 0, unit: "", percentOfDailyNeeds: 0 },
    fat: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    saturates: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    carbs: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    sugars: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    fibre: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    protein: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    sodium: { amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
  });
  const [snackMeals, setSnackMeals] = useState([]);
  const [snackNutrition, setSnackNutrition] = useState({
    kcal: { amount: 0, unit: "", percentOfDailyNeeds: 0 },
    fat: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    saturates: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    carbs: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    sugars: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    fibre: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    protein: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    sodium: { amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
  });

  const convertNutriTableToObject = (nutriTable) => {
    if (
      nutriTable.fibre.amount === 0 &&
      nutriTable.kcal.amount === 0 &&
      nutriTable.sodium.amount === 0 &&
      nutriTable.sugars.amount === 0 &&
      nutriTable.carbs.amount === 0 &&
      nutriTable.protein.amount === 0 &&
      nutriTable.fat.amount === 0 &&
      nutriTable.saturates.amount === 0
    ) {
      return {};
    }

    const nutriObject = {
      kcal: nutriTable.kcal.amount,
      sodium: nutriTable.sodium.amount,
      sugars: nutriTable.sugars.amount,
      carbs: nutriTable.carbs.amount,
      protein: nutriTable.protein.amount,
      fat: nutriTable.fat.amount,
      saturates: nutriTable.saturates.amount,
      fibre: nutriTable.fibre.amount,
    };

    return nutriObject;
  };

  // const getMealNutriRatio = () => {
  //   if (numMeals === 3) {
  //     const breakfastRatio = 30 + Math.floor(Math.random() * 6);
  //     const lunchRatio = 35 + Math.floor(Math.random() * 6);
  //     const dinnerRatio = 100 - breakfastRatio - lunchRatio;
  //     return [breakfastRatio, lunchRatio, dinnerRatio];
  //   }

  //   if (numMeals === 4) {
  //     const breakfastRatio = 26 + Math.floor(Math.random() * 5);
  //     const lunchRatio = 36 + Math.floor(Math.random() * 5);
  //     const dinnerRatio = 26 + Math.floor(Math.random() * 5);
  //     const snackRation = 100 - breakfastRatio - lunchRatio - dinnerRatio;
  //     return [breakfastRatio, lunchRatio, dinnerRatio];
  //   }
  // };

  const handleExpectedError = (response) => {
    if (!response.ok) {
      throw new Error("Server error: Error code " + response.status + "!");
    }

    return response;
  };

  const suggestMealNutriPlan = async () => {
    if (Object.keys(userMacro).length === 0) {
      toast.error("You need to fill macro calculator to get the suggestion");
      return;
    }
    var snackObject = {};
    if (numMeals === 4) {
      snackObject = convertNutriTableToObject(snackNutrition);
    }
    const jwt = localStorage.getItem("token");
    const obj = {
      "x-access-token": jwt,
      suggestNutriIntake: userMacro,
      numMeals: 4,
      Breakfast: convertNutriTableToObject(breakfastNutrition),
      Lunch: convertNutriTableToObject(lunchNutrition),
      Dinner: convertNutriTableToObject(dinnerNutrition),
      Snack: snackObject,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };
    console.log(JSON.stringify(obj));
    await fetch(config.apiEndpoint + "/mealPlanner", requestOptions)
      .then(async (response) => {
        handleExpectedError(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error === "false") {
          toast.success("Meal planner is updated");
        } else {
          toast.error("Meal planner is not updated");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const addMeal = (newMeal, mealType) => {
    toast.success("Meal is added");
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

  const options = [3, 4];
  const onOptionChangeHandler = (event) => {
    setNumMeals(parseInt(event.target.value));
  };

  const resetMealPlan = () => {
    setBreakFastMeals([]);
    setDinnerMeals([]);
    setLunchMeals([]);
    setSnackMeals([]);
  };

  return (
    <React.Fragment>
      <div className="planner-container">
        <MacroCal toast={toast} setMacro={setUserMacro}></MacroCal>
        <div className="meal-plan-continer">
          <div className="day-plan-container">
            <div className="day-header">
              <h3 className="day-title fs-3">Your Meal Plan</h3>
            </div>
            <select className="select-btn" onChange={onOptionChangeHandler}>
              {options.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
            <button onClick={() => resetMealPlan()}>Reset</button>
            <button onClick={() => suggestMealNutriPlan()}>Suggest</button>
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
          <MealsSearch addItem={addMeal} toast={toast}></MealsSearch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MealPlanner;
