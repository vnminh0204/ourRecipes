import React from "react";
import Select from "../../common/select";
import "./title.scss";

const Title = ({
                   title,
                   setTitle,
                   numServings,
                   mealType,
                   setNumServings,
                   setMealType,
                   toast,
                   editMode,
               }) => {
    const handleTitleChange = ({currentTarget: input}) => {
        setTitle(input.value);
    };

    // const setTitleState = () => {
    //     if (editTitle === true) {
    //
    //     }
    //     const newState = !editTitle;
    //     setEditTile(newState);
    // };

    const handleNumServingsChange = ({currentTarget: input}) => {
        setNumServings(parseInt(input.value));
    };

    const handleMealTypeChange = ({currentTarget: input}) => {
        setMealType(input.value);
    };

    const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

    if (!editMode) {
        return (
            <div>
                <h1>{title}</h1>
                <div className="meal-info-box">
                    <p className="meal-info1">MAKES </p>
                    <p className="meal-info2">{numServings} Servings</p>
                    <p className="meal-info1">TYPE </p>
                    <p className="meal-info2">{mealType}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="title-container">
                <input
                    name="title"
                    type="text"
                    className="my-input-title"
                    value={title}
                    placeholder="Please fill your recipe's title"
                    onChange={handleTitleChange}
                ></input>

                <div className="meal-info-box">
                    <p className="meal-info1">MAKES </p>
                    <p className="meal-info2">
                            <input
                                type="number"
                                className="title-input-amount"
                                value={numServings}
                                onChange={handleNumServingsChange}
                            ></input>
                            Servings
                    </p>
                    <p className="meal-info1">TYPE </p>
                    <div className="meal-info2">
                        <Select
                            name="meal-type"
                            label=""
                            options={mealTypes}
                            className="meal-type-select"
                            errors={{}}
                            value={mealType}
                            onChange={handleMealTypeChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default Title;
