import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IngredientsSearch from "./search/ingredientsSearch";
import NutritionTable from "./nutritionTable";
import IngredientsList from "./ingredientsList";
import CookingMethod from "./cooking-method/cookingMethod";
import Title from "./title";
import config from "../../config.json";
import "./recipeForm.css";

const RecipeForm = ({ toast }) => {
  const { id: recipeID } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [cookingMethod, setCookingMethod] = useState("");
  const [title, setTitle] = useState("");
  const [numServings, setNumServings] = useState(1);
  const [mealType, setMealType] = useState("");
  const [nutritionTable, setNutritionTable] = useState({
    kcal: { amount: 0, unit: "", percentOfDailyNeeds: 0 },
    fat: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    saturates: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    carbs: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    sugars: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    fibre: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    protein: { amount: 0, unit: "g", percentOfDailyNeeds: 0 },
    sodium: { amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
  });

  const [editTitle, setEditTile] = useState(true);
  const [editCookingMethod, setEditCookingMethod] = useState(true);

  useEffect(() => {
    const updateNutritionTable = () => {
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
        setEditMode(false);
        const apiEndpoint = config.apiEndpoint + "/recipes/" + recipeID;
        await fetch(apiEndpoint)
          .then((response) => {
            handleExpectedError(response);
            return response.json();
          })
          .then((data) => {
            // const data = await response.json();
            console.log(data);
            setEditTile(false);
            setEditCookingMethod(false);
            setCookingMethod(data.data.cookingMethod);
            setNumServings(data.data.numServings);
            setIngredients(data.data.ingredients);
            setTitle(data.data.title);
            setMealType(data.data.mealType);
            setNutritionTable(data.data.nutritionTable);
          })
          .catch((error) => {
            toast.error(error.message);
            return;
          });
      }
    };
    fetchData();
  }, [recipeID, toast]);

  const handleExpectedError = (response) => {
    if (!response.ok) {
      throw new Error("Server error: Error code " + response.status + "!");
    }

    return response;
  };

  const setImg = () => {
    console.log("Upload your recipe image!");
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

  const editItem = (ingredient) => {
    console.log("edit");
    const index = ingredients.indexOf(ingredient);
    const newIngredients = [...ingredients];
    const newIngredient = { ...ingredient, edit: true };
    newIngredients[index] = newIngredient;
    setIngredients(newIngredients);
  };

  const saveItem = async (ingredient) => {
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
        console.log(data);
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
  };

  const onSubmit = async () => {
    let check = true;
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
    check = check && editTitle === false && editCookingMethod === false;

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
    console.log(obj);
    const requestOptions = {
      method: "POST",
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
        console.log(data);

        toast.success("Your recipe is submitted");
        navigate("/recipes");
      })
      .catch((error) => {
        toast.error(error.message);
        return;
      });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col recipe-form-container">
          <div className="row title-row">
            <Title
              title={title}
              setTitle={setTitle}
              numServings={numServings}
              setNumServings={setNumServings}
              mealType={mealType}
              setMealType={setMealType}
              toast={toast}
              editTitle={editTitle}
              setEditTile={setEditTile}
              editMode={editMode}
              uploadImg={setImg}
            />
          </div>
          <div className="row nutrition-row">
            <NutritionTable nutritionTable={nutritionTable} />
          </div>
          <div className="row recipes-row">
            <div className="col">
              <IngredientsList
                removeItem={removeItem}
                saveItem={saveItem}
                editItem={editItem}
                ingredients={ingredients}
                setIngredients={setIngredients}
                editMode={editMode}
              />
            </div>
            <div className="col">
              <CookingMethod
                cookingMethod={cookingMethod}
                setCookingMethod={setCookingMethod}
                editCookingMethod={editCookingMethod}
                setEditCookingMethod={setEditCookingMethod}
                editMode={editMode}
              />
            </div>
            {editMode && (
              <button onClick={() => onSubmit()} className="submit-btn">
                Submit
              </button>
            )}
          </div>
        </div>
        {editMode && (
          <div className="col-md-3 justify-content-end">
            <IngredientsSearch addItem={addItem} toast={toast} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default RecipeForm;
