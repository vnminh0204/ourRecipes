import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import IngredientsSearch from "./search/ingredientsSearch";
import NutritionTable from "./nutritionTable/nutritionTable";
import IngredientsList from "./ingredientsList/ingredientsList";
import CookingMethod from "./cooking-method/cookingMethod";
import Title from "./title/title";
import config from "../../config.json";
import "./recipeForm.scss";
import ImgUpload from "./img-upload/imgUpload";

const RecipeForm = ({toast}) => {
    const {id: recipeID, edit: editOption} = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(true);
    const [ingredients, setIngredients] = useState([]);
    const [cookingMethod, setCookingMethod] = useState("");
    const [title, setTitle] = useState("");
    const [numServings, setNumServings] = useState(1);
    const [mealType, setMealType] = useState("");
    const [nutritionTable, setNutritionTable] = useState({
        kcal: {amount: 0, unit: "", percentOfDailyNeeds: 0},
        fat: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        saturates: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        carbs: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        sugars: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        fibre: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        protein: {amount: 0, unit: "g", percentOfDailyNeeds: 0},
        sodium: {amount: 0, unit: "mg", percentOfDailyNeeds: 0},
    });

    useEffect(() => {
        const updateNutritionTable = () => {
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
            for (const ingredient of ingredients) {
                if (ingredient.nutrition) {
                    if (ingredient.nutrition.kcal) {
                        newNutritionTable.kcal.amount += parseInt(
                            ingredient.nutrition.kcal.amount
                        );
                        newNutritionTable.kcal.percentOfDailyNeeds += parseInt(
                            ingredient.nutrition.kcal.percentOfDailyNeeds
                        );
                    }
                    if (ingredient.nutrition.fat) {
                        newNutritionTable.fat.amount += parseInt(
                            ingredient.nutrition.fat.amount
                        );
                        newNutritionTable.fat.percentOfDailyNeeds += parseInt(
                            ingredient.nutrition.fat.percentOfDailyNeeds
                        );
                    }
                    if (ingredient.nutrition.saturates) {
                        newNutritionTable.saturates.amount += parseInt(
                            ingredient.nutrition.saturates.amount
                        );
                        newNutritionTable.saturates.percentOfDailyNeeds += parseInt(
                            ingredient.nutrition.saturates.percentOfDailyNeeds
                        );
                    }
                    if (ingredient.nutrition.carbs) {
                        newNutritionTable.carbs.amount += parseInt(
                            ingredient.nutrition.carbs.amount
                        );
                        newNutritionTable.carbs.percentOfDailyNeeds += parseInt(
                            ingredient.nutrition.carbs.percentOfDailyNeeds
                        );
                    }
                    if (ingredient.nutrition.sugars) {
                        newNutritionTable.sugars.amount += parseInt(
                            ingredient.nutrition.sugars.amount
                        );
                        newNutritionTable.sugars.percentOfDailyNeeds += parseInt(
                            ingredient.nutrition.sugars.percentOfDailyNeeds
                        );
                    }
                    if (ingredient.nutrition.fibre) {
                        newNutritionTable.fibre.amount += parseInt(
                            ingredient.nutrition.fibre.amount
                        );
                        newNutritionTable.fibre.percentOfDailyNeeds += parseInt(
                            ingredient.nutrition.fibre.percentOfDailyNeeds
                        );
                    }
                    if (ingredient.nutrition.protein.amount) {
                        newNutritionTable.protein.amount += parseInt(
                            ingredient.nutrition.protein.amount
                        );
                        newNutritionTable.protein.percentOfDailyNeeds += parseInt(
                            ingredient.nutrition.protein.percentOfDailyNeeds
                        );
                    }
                    if (ingredient.nutrition.sodium) {
                        newNutritionTable.sodium.amount += parseInt(
                            ingredient.nutrition.sodium.amount
                        );
                        newNutritionTable.sodium.percentOfDailyNeeds += parseInt(
                            ingredient.nutrition.sodium.percentOfDailyNeeds
                        );
                    }
                }
            }

            Object.keys(newNutritionTable).forEach(function (key) {
                newNutritionTable[key].amount =
                    Math.round((newNutritionTable[key].amount * 100) / numServings) / 100;
                newNutritionTable[key].percentOfDailyNeeds =
                    Math.round(
                        (newNutritionTable[key].percentOfDailyNeeds * 100) / numServings
                    ) / 100;
            });
            setNutritionTable(newNutritionTable);
        };
        updateNutritionTable();
    }, [numServings, ingredients]);

    useEffect(() => {
        const fetchData = async () => {
            if (recipeID !== "new") {
                // setEditMode(false);
                if (editOption === "true") {
                    setEditMode(true);
                } else if (editOption === "false") {
                    setEditMode(false);
                }
                const apiEndpoint = config.apiEndpoint + "/recipes/" + recipeID;
                await fetch(apiEndpoint)
                    .then((response) => {
                        handleExpectedError(response);
                        return response.json();
                    })
                    .then((data) => {
                        // const data = await response.json();
                        setCookingMethod(data.data.cookingMethod);
                        setNumServings(data.data.numServings);
                        setIngredients(data.data.ingredients);
                        setTitle(data.data.title);
                        setMealType(data.data.mealType);
                        setNutritionTable(data.data.nutritionTable);

                        console.log(data);
                    })
                    .catch((error) => {
                        toast.error(error.message);
                        return;
                    });
            }
        };
        fetchData();
    }, [recipeID, toast, editOption]);

    const handleExpectedError = (response) => {
        if (!response.ok) {
            throw new Error("Server error: Error code " + response.status + "!");
        }

        return response;
    };

    const addItem = (newIngredient) => {
        // const { name, id, possibleUnits } = newIngredient;
        toast.success("Ingerdient is added");
        newIngredient.edit = true;
        const newIngredients = [...ingredients, newIngredient];
        setIngredients(newIngredients);
    };

    const removeItem = (ingredient) => {
        const newIngredients = ingredients.filter(
            (element) => element.id !== ingredient.id
        );
        setIngredients(newIngredients);
    };

    const findNutritionObject = (data, nutritionName) => {
        const list = data.nutrition.nutrients;
        const object = list.filter((element) => element.name === nutritionName)[0];
        return object;
    };

    // const editItem = (ingredient) => {
    //
    // };

    const editItem = async (ingredient) => {

        if (ingredient.edit === true) {
            if (!ingredient.amount || !ingredient.unit) {
                toast.error("You need to fill both amount and unit");
                return;
            }
            if (ingredient.amount && ingredient.amount < 0) {
                toast.error("Ingredient amount cannot be negative");
                return;
            }
            const apiEndpoint =
                config.spoonacularAPIEndpoint +
                "/food/ingredients/" +
                ingredient.id +
                "/information?apiKey=" +
                config.spoonacularAPIKey +
                "&amount=" +
                ingredient.amount +
                "&unit=" +
                ingredient.unit;

            await fetch(apiEndpoint)
                .then((response) => {
                    handleExpectedError(response);
                    return response.json();
                })
                .then((data) => {
                    const kcal = findNutritionObject(data, "Calories");
                    const fat = findNutritionObject(data, "Fat");
                    const saturates = findNutritionObject(data, "Saturated Fat");
                    const carbs = findNutritionObject(data, "Net Carbohydrates");
                    const sugars = findNutritionObject(data, "Sugar");
                    const fibre = findNutritionObject(data, "Fiber");
                    const protein = findNutritionObject(data, "Protein");
                    const sodium = findNutritionObject(data, "Sodium");

                    const nutrition = {
                        kcal: kcal,
                        fat: fat,
                        saturates: saturates,
                        carbs: carbs,
                        sugars: sugars,
                        fibre: fibre,
                        protein: protein,
                        sodium: sodium,
                    };
                    const index = ingredients.indexOf(ingredient);
                    const newIngredients = [...ingredients];
                    ingredient.nutrition = nutrition;
                    ingredient.edit = false;
                    newIngredients[index] = ingredient;
                    setIngredients(newIngredients);
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        } else {
            const index = ingredients.indexOf(ingredient);
            const newIngredients = [...ingredients];
            const newIngredient = {...ingredient, edit: true};
            newIngredients[index] = newIngredient;
            setIngredients(newIngredients);
        }


    };

    const onSubmit = async () => {
        let check = true;
        if (numServings < 1) {
            toast.error("Servings cannot be smaller than 1");
            check = false;
        }
        if (title.length <= 0 || mealType.length <= 0) {
            toast.error("Text field cannot be empty");
            check = false;
        }
        if (cookingMethod.length === 0) {
            toast.error("Cooking method cannot be empty");
            check = false;
        }
        if (ingredients.length === 0) {
            toast.error("Ingredients cannot be empty");
            check = false;
            return;
        } else {
            for (const ingredient of ingredients) {
                check = check && ingredient.edit === false;
            }
        }

        if (!check) {
            toast.error("Every fields need to be saved before submitting");
            return;
        }
        const jwt = localStorage.getItem("token");

        const obj = {
            ingredients,
            cookingMethod,
            title,
            numServings,
            mealType,
            nutritionTable,
            "x-access-token": jwt,
        };

        let requestMethod = "PUT";

        if (recipeID === "new") {
            requestMethod = "POST"
        }

        const requestOptions = {
            method: requestMethod,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        };

        const apiEndpoint = config.apiEndpoint + "/recipes/" + recipeID;

        await fetch(apiEndpoint, requestOptions)
            .then((response) => {
                handleExpectedError(response);
                return response.json();
            })
            .then((data) => {
                toast.success("Your recipe is submitted");
                navigate("/recipes");
            })
            .catch((error) => {
                toast.error(error.message);
                return;
            });
    };

    return (
        <div className="edit-form-container">
            <div className="recipe-form-container">
                <div className="img-row">
                    <ImgUpload></ImgUpload>
                </div>
                <div className="title-row">
                    <Title
                        title={title}
                        setTitle={setTitle}
                        numServings={numServings}
                        setNumServings={setNumServings}
                        mealType={mealType}
                        setMealType={setMealType}
                        toast={toast}
                        editMode={editMode}
                    />
                </div>
                <div className="nutrition-row">
                    <NutritionTable nutritionTable={nutritionTable}/>
                    <span className="nutrition-row-caption">Nutrition: Per serving</span>
                </div>
                <div className="recipes-row">
                    <div className="sub-container">
                        <IngredientsList
                            removeItem={removeItem}
                            editItem={editItem}
                            ingredients={ingredients}
                            setIngredients={setIngredients}
                            editMode={editMode}
                        />
                    </div>
                    <div className="sub-container">
                        <CookingMethod
                            cookingMethod={cookingMethod}
                            setCookingMethod={setCookingMethod}
                            editMode={editMode}
                        />
                    </div>

                </div>
                {editMode && (
                    <div className="center-button">
                        <button onClick={() => onSubmit()} className="form-submit-btn">
                            SUBMIT
                        </button>
                    </div>
                )}
            </div>
            {editMode && (
                <IngredientsSearch addItem={addItem} toast={toast}/>
            )}
        </div>
    );
};

export default RecipeForm;
