import React from "react";
import MealsSearch from "./meal-search/mealsSearch";
import "./mealPlanner.scss";
import {useState, useEffect} from "react";
import MacroCal from "./macro-calculator/macroCal";
import config from "../../config.json";
import DayPlan from "./day-plan/dayPlan";
import {MyTab, MyTabs} from "../common/tabs";
import PlannerNav from "./plannerNav/plannerNav";

const MealPlanner = ({toast, user}) => {
    const [numMeals, setNumMeals] = useState(3);

    const [userMacro, setUserMacro] = useState({
        kcal: 0,
        sodium: 2300,
        sugars: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        saturates: 0,
        fibre: 0,
    });

    const [showFront, setShowFront] = useState(true);
    // Fiber = calo/1000 * 14 grams

    // Sodium = 2300 mg

    // Sugars = calo * 0.025

    // Proteins = calo * 0.15 / 4

    // Fat = calo * 0.25 / 9

    // Carbs = (calo - protein * 4 - fat * 9) / 4

    // Saturates = calo/1000*11 grams

    const [breakfastMeals, setBreakFastMeals] = useState([]);
    const [breakfastNutrition, setBreakFastNutrition] = useState({
        kcal: {amount: 0, unit: "", percentOfDailyNeeds: 0},
        fat: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        saturates: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        carbs: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        sugars: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        fibre: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        protein: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        sodium: {amount: 0, unit: "mg", percentOfDailyNeeds: 0},
    });
    const [lunchMeals, setLunchMeals] = useState([]);
    const [lunchNutrition, setLunchNutrition] = useState({
        kcal: {amount: 0, unit: "", percentOfDailyNeeds: 0},
        fat: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        saturates: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        carbs: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        sugars: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        fibre: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        protein: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        sodium: {amount: 0, unit: "mg", percentOfDailyNeeds: 0},
    });
    const [dinnerMeals, setDinnerMeals] = useState([]);
    const [dinnerNutrition, setDinnerNutrition] = useState({
        kcal: {amount: 0, unit: "", percentOfDailyNeeds: 0},
        fat: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        saturates: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        carbs: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        sugars: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        fibre: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        protein: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        sodium: {amount: 0, unit: "mg", percentOfDailyNeeds: 0},
    });
    const [snackMeals, setSnackMeals] = useState([]);
    const [snackNutrition, setSnackNutrition] = useState({
        kcal: {amount: 0, unit: "", percentOfDailyNeeds: 0},
        fat: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        saturates: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        carbs: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        sugars: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        fibre: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        protein: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        sodium: {amount: 0, unit: "mg", percentOfDailyNeeds: 0},
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

    const handleExpectedError = (response) => {
        if (!response.ok) {
            throw new Error("Server error: Error code " + response.status + "!");
        }

        return response;
    };

    // TODO
    // This is not a correct way to handle suggested recipe
    // Now we have to request each recipe after getting suggestions. However it should be done in the backend
    const getMeal = async (mealType, recipeID) => {
        if (recipeID !== "new") {
            const apiEndpoint = config.apiEndpoint + "/recipes/" + recipeID;
            await fetch(apiEndpoint)
                .then((response) => {
                    handleExpectedError(response);
                    return response.json();
                })
                .then((item) => {
                    const newMeal = {
                        ...item.data,
                        dateObject: new Date(item.date),
                        date: new Date(item.date).toLocaleDateString("en-GB"),
                        id: item.id,
                        nutriScore: item.nutriScore,
                        author: item.author,
                        quantity: 1,
                    };
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
                })
                .catch((error) => {
                    toast.error(error.message);
                    return null;
                });
        }
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
            numMeals: numMeals,
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
                for (const [key, value] of Object.entries(data)) {
                    console.log(`${key}: ${value}`);
                    // const newMeal = {
                    //     "nutriScore": value.nutriScore,
                    //     "mealType": key,
                    //     "nutritionTable": {
                    //         "protein": {
                    //             "amount": value.protein,
                    //             "unit": "g",
                    //         },
                    //         "carbs": {
                    //             "amount": value.carb,
                    //             "unit": "g",
                    //         },
                    //         "fat": {
                    //             "amount": value.fat,
                    //             "unit": "g",
                    //         },
                    //         "fibre": {
                    //             "amount": value.fibre,
                    //             "unit": "g",
                    //         },
                    //         "kcal": {
                    //             "amount": value.kcal,
                    //             "unit": "",
                    //         },
                    //         "saturates": {
                    //             "amount": value.saturates,
                    //             "unit": "g",
                    //         },
                    //         "sodium": {
                    //             "amount": value.sodium,
                    //             "unit": "mg",
                    //         },
                    //         "sugars": {
                    //             "amount": value.sugars,
                    //             "unit": "g",
                    //         },
                    //     },
                    //     "title": value.title,
                    //     "id": value.id,
                    // };
                    getMeal(key, value.id);
                    // console.log(newMeal);
                    // switch (key) {
                    //     case "Breakfast":
                    //         const newbreakfastMeals = [...breakfastMeals, newMeal];
                    //         setBreakFastMeals(newbreakfastMeals);
                    //         break;
                    //     case "Lunch":
                    //         const newlunchMeals = [...lunchMeals, newMeal];
                    //         setLunchMeals(newlunchMeals);
                    //         break;
                    //     case "Dinner":
                    //         const newdinnerMeals = [...dinnerMeals, newMeal];
                    //         setDinnerMeals(newdinnerMeals);
                    //         break;
                    //     case "Snack":
                    //         const newsnackMeals = [...snackMeals, newMeal];
                    //         setSnackMeals(newsnackMeals);
                    //         break;
                    //     default:
                    //         toast.error("Meal type does not exist");
                    // }
                }
                // TODO
                // if (data.error === "false") {
                //     toast.success("Meal planner is updated");
                // } else {
                //     toast.error("Meal planner is not updated");
                // }
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
            kcal: {amount: 0, unit: "", percentOfDailyNeeds: 0},
            fat: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
            saturates: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
            carbs: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
            sugars: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
            fibre: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
            protein: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
            sodium: {amount: 0, unit: "mg", percentOfDailyNeeds: 0},
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

    const onNumMealsChange = (event) => {
        setNumMeals(parseInt(event.target.value));
    };

    const resetMealPlan = () => {
        setBreakFastMeals([]);
        setDinnerMeals([]);
        setLunchMeals([]);
        setSnackMeals([]);
    };

    return (
        <div className="planner-page">
            <div className="planner-container">
                <div className="planner-header">
                    <h1 className="day-title">Your Meal Plan</h1>
                </div>
                <PlannerNav
                    suggestMealNutriPlan={suggestMealNutriPlan}
                    onNumMealsChangeHandler={onNumMealsChange}
                    resetMealPlan={resetMealPlan}>
                </PlannerNav>

                <div className="planner-content">
                    <DayPlan
                        numMeals={numMeals}
                        toast={toast}
                        user={user}
                        breakfastMeals={breakfastMeals}
                        breakfastNutrition={breakfastNutrition}
                        lunchMeals={lunchMeals}
                        lunchNutrition={lunchNutrition}
                        dinnerMeals={dinnerMeals}
                        dinnerNutrition={dinnerNutrition}
                        snackMeals={snackMeals}
                        snackNutrition={snackNutrition}

                        addMeal={addMeal}
                        setUserMacro={setUserMacro}
                    ></DayPlan>

                    <div className="planner-tools">
                        <MyTabs>
                            <MyTab label={"calculator"} tabName={"Macro Calculator"}>
                                <MacroCal setShowFront={setShowFront} showFront={showFront} toast={toast}
                                          setMacro={setUserMacro} userMacro={userMacro}></MacroCal>
                            </MyTab>
                            <MyTab label={"search"} tabName={"Meals Search"}>
                                <MealsSearch addItem={addMeal} toast={toast}></MealsSearch>
                            </MyTab>
                        </MyTabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealPlanner;
