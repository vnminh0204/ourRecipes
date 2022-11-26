import React from "react";
import {
  RiCloseCircleFill,
  RiCheckboxCircleFill,
  RiEdit2Fill,
} from "react-icons/ri";
import Select from "../common/select";
import "./ingredientsList.css";

const IngredientsList = ({
  removeItem,
  saveItem,
  editItem,
  ingredients,
  setIngredients,
}) => {

  const handleUnitChange = ({ currentTarget: input }) => {
    const newIngredients = [...ingredients];
    const ingredient = newIngredients.find(
      (element) => element.id === parseInt(input.name)
    );
    const index = newIngredients.indexOf(ingredient);
    ingredient.unit = input.value;
    newIngredients[index] = ingredient;
    setIngredients(newIngredients);
  };

  const handleAmountChange = ({ currentTarget: input }) => {
    const newIngredients = [...ingredients];
    const ingredient = newIngredients.find(
      (element) => element.id === parseInt(input.name)
    );
    const index = newIngredients.indexOf(ingredient);
    ingredient.amount = input.value;
    newIngredients[index] = ingredient;
    setIngredients(newIngredients);
  };

  const onMouseEnterHandler = (ingredient) => {
    const index = ingredients.indexOf(ingredient);
    const newIngredients = [...ingredients];
    let newIngredient = { ...ingredient };
    newIngredient.hover = true;
    newIngredients[index] = newIngredient;
    setIngredients(newIngredients);
  };

  const onMouseLeaveHandler = (ingredient) => {
    const index = ingredients.indexOf(ingredient);
    const newIngredients = [...ingredients];
    let newIngredient = { ...ingredient };
    newIngredient.hover = false;
    newIngredients[index] = newIngredient;
    setIngredients(newIngredients);
  };

  const renderIngredient = (ingredient) => {
    if (ingredient.edit === true) {
      return (
        <article className="ingredient-item2">
          <article className="ingredient-edit">
            <input
              name={ingredient.id}
              type="number"
              step="any"
              className="input-amount"
              value={ingredient.amount ? ingredient.amount : ""}
              onChange={handleAmountChange}
            ></input>
            <Select
              name={ingredient.id}
              label=""
              options={ingredient.possibleUnits}
              errors={{}}
              value={ingredient.unit ? ingredient.unit : ""}
              className="input-unit"
              onChange={handleUnitChange}
            />
            <p className="ingredient-name">{ingredient.name}</p>
          </article>
          <div>
            <button
              type="button"
              className="add-btn"
              onClick={() => saveItem(ingredient)}
            >
              <RiCheckboxCircleFill size={17} />
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => removeItem(ingredient)}
            >
              <RiCloseCircleFill size={17} />
            </button>
          </div>
        </article>
      );
    } else {
      return (
        <article
          className="ingredient-item2"
          onMouseEnter={() => onMouseEnterHandler(ingredient)}
          onMouseLeave={() => onMouseLeaveHandler(ingredient)}
        >
          <p className="ingredient-name">
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </p>
          {ingredient.hover && (
            <button
              type="button"
              className="add-btn"
              onClick={() => editItem(ingredient)}
            >
              <RiEdit2Fill size={17} />
            </button>
          )}
        </article>
      );
    }
  };

  return (
    <section className="section-ingredients">
      <h3 className="fs-5 recipe-heading">INGREDIENTS</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>{renderIngredient(ingredient)}</li>
        ))}
      </ul>
    </section>
  );
};

IngredientsList.propTypes = {};

export default IngredientsList;
