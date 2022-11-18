import React, { useState } from "react";
import { RiEdit2Fill, RiCheckboxCircleFill } from "react-icons/ri";
import Select from "../common/select";
const Title = ({
  title,
  setTitle,
  numServings,
  mealType,
  setNumServings,
  setMealType,
  toast,
  editTitle,
  setEditTile,
}) => {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const handleTitleChange = ({ currentTarget: input }) => {
    setTitle(input.value);
  };

  const setTitleState = () => {
    if (editTitle === true) {
      if (numServings < 1) {
        toast.error("Servings cannot be smaller than 1");
        return;
      }
      if (title.length <= 0 || mealType.length <= 0) {
        toast.error("Text field cannot be empty");
        return;
      }
    }
    const newState = !editTitle;
    setEditTile(newState);
  };

  const onMouseEnterHandler = () => {
    setShowEditIcon(true);
  };

  const onMouseLeaveHandler = () => {
    setShowEditIcon(false);
  };

  const handleNumServingsChange = ({ currentTarget: input }) => {
    setNumServings(parseInt(input.value));
  };

  const handleMealTypeChange = ({ currentTarget: input }) => {
    setMealType(input.value);
  };

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  if (editTitle) {
    return (
      <div>
        <input
          name="title"
          type="text"
          className="input-title"
          value={title}
          onChange={handleTitleChange}
        ></input>
        <button type="button" className="add-btn" onClick={setTitleState}>
          <RiCheckboxCircleFill size={25} />
        </button>
        <div className="meal-info-box">
          <p className="meal-info1">MAKES </p>
          <p className="meal-info2">
            <input
              type="number"
              className="input-amount"
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
              errors={{}}
              value={mealType}
              className="input-meal-type"
              onChange={handleMealTypeChange}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <h1>{title}</h1>
        {showEditIcon && (
          <button type="button" className="add-btn" onClick={setTitleState}>
            <RiEdit2Fill size={25} />
          </button>
        )}
        <div className="meal-info-box">
          <p className="meal-info1">MAKES </p>
          <p className="meal-info2">{numServings} Servings</p>
          <p className="meal-info1">TYPE </p>
          <p className="meal-info2">{mealType}</p>
        </div>
      </div>
    );
  }
};

export default Title;
