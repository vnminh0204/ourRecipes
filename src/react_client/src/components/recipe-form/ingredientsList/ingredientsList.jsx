import React from "react";
import {RiCloseCircleFill} from "react-icons/ri";
import Select from "../../common/select";
import "./ingredientsList.css";
import MyCheckbox from "../../common/myCheckbox";

const IngredientsList = ({
                             removeItem,
                             editItem,
                             ingredients,
                             setIngredients,
                             editMode,
                         }) => {

    const handleUnitChange = ({currentTarget: input}) => {
        const newIngredients = [...ingredients];
        const ingredient = newIngredients.find(
            (element) => element.id === parseInt(input.name)
        );
        const index = newIngredients.indexOf(ingredient);
        ingredient.unit = input.value;
        newIngredients[index] = ingredient;
        setIngredients(newIngredients);
    };

    const handleAmountChange = ({currentTarget: input}) => {
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
        let newIngredient = {...ingredient};
        newIngredient.hover = true;
        newIngredients[index] = newIngredient;
        setIngredients(newIngredients);
    };

    const onMouseLeaveHandler = (ingredient) => {
        const index = ingredients.indexOf(ingredient);
        const newIngredients = [...ingredients];
        let newIngredient = {...ingredient};
        newIngredient.hover = false;
        newIngredients[index] = newIngredient;
        setIngredients(newIngredients);
    };

    const renderIngredient = (ingredient) => {
        if (!editMode) {
            return (<div className="ingredients-li-container">
                <li className="ingredients-li" key={ingredient.id}>
                    <article
                        className="ingredient-item2"
                    >
                        <p className="ingredient-name">
                            {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </p>
                    </article>
                </li>
            </div>)
        }


        if (ingredient.edit === true) {
            return (<div className="ingredients-li-container-edit">
                <MyCheckbox checked={!ingredient.edit}
                            onHandleTickChange={() => editItem(ingredient)}></MyCheckbox>
                <li className="ingredients-li-edit" key={ingredient.id}>
                    <article className="ingredient-item2">
                        <article className="ingredient-edit">
                            <input
                                name={ingredient.id}
                                type="number"
                                step="any"
                                className="input-amount"
                                value={ingredient.amount ? ingredient.amount : "0"}
                                onChange={handleAmountChange}
                            ></input>
                            <Select
                                name={ingredient.id}
                                label=""
                                options={ingredient.possibleUnits}
                                errors={{}}
                                value={ingredient.unit ? ingredient.unit : ""}
                                className="input-unit"
                                defaultValue="choose unit"
                                onChange={handleUnitChange}
                            />
                            <p className="ingredient-name">{ingredient.name}</p>
                        </article>
                    </article>
                </li>
            </div>);
        } else {
            return (
                <div className="ingredients-li-container-edit"
                     onMouseEnter={() => onMouseEnterHandler(ingredient)}
                     onMouseLeave={() => onMouseLeaveHandler(ingredient)}>
                    <MyCheckbox checked={!ingredient.edit}
                                onHandleTickChange={() => editItem(ingredient)}></MyCheckbox>
                    <li className="ingredients-li-edit" key={ingredient.id}>
                        <article
                            className="ingredient-item2"
                        >
                            <div className="ingredient-hover-container">
                                <p className="ingredient-name">
                                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                                </p>
                                {ingredient.hover && (
                                    <button
                                        type="button"
                                        className="remove-ingredient-btn"
                                        onClick={() => removeItem(ingredient)}
                                    >
                                        <RiCloseCircleFill size={17}/>
                                    </button>
                                )}
                            </div>
                        </article>
                    </li>
                </div>
            );
        }
    };

    return (
        <section className="section-ingredients">
            <h3 className="fs-5 ingredient-heading">INGREDIENTS</h3>
            <ul className={editMode ? "ingredients-ul-edit" : "ingredients-ul"}>
                {ingredients.map((ingredient) => (
                    renderIngredient(ingredient)
                ))}
            </ul>
        </section>
    );
};

IngredientsList.propTypes = {};

export default IngredientsList;
