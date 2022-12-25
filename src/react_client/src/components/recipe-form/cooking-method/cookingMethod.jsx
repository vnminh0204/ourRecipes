import React, { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

import "./cookingMethod.css";

const CookingMethod = ({
  cookingMethod,
  setCookingMethod,
  editCookingMethod,
  setEditCookingMethod,
  editMode,
}) => {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const changeEditState = () => {
    setEditCookingMethod(!editCookingMethod);
  };

  const handleCookingMethodChange = (event) => {
    setCookingMethod(event.target.value);
  };

  const onMouseEnterHandler = () => {
    setShowEditIcon(true);
  };

  const onMouseLeaveHandler = () => {
    setShowEditIcon(false);
  };

  if (!editMode) {
    return (
      <section className="section-ingredients">
        <div className="row">
          <h3 className="fs-5 recipe-heading w-50">METHOD</h3>
        </div>

        <div>
          <p className="cooking-method">{cookingMethod}</p>
        </div>
      </section>
    );
  }

  if (editCookingMethod) {
    return (
      <section className="section-ingredients">
        <div className="method-title-container">
          <h3 className="fs-5 recipe-heading w-50">METHOD</h3>
          <button
            type="button"
            className="add-btn w-25"
            onClick={changeEditState}
          >
            <FaCheck size={20} />
          </button>
        </div>
        <div>
          <textarea
            name="method"
            className="textarea"
            rows="15"
            cols="55"
            placeholder="Your cooking method"
            value={cookingMethod}
            onChange={handleCookingMethodChange}
          />
        </div>
      </section>
    );
  } else {
    return (
      <section
        className="section-ingredients"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <div className="method-title-container">
          <h3 className="fs-5 recipe-heading w-50">METHOD</h3>
          {showEditIcon && (
            <button
              type="button"
              className="add-btn w-25"
              onClick={changeEditState}
            >
              <RiEdit2Fill size={20} />
            </button>
          )}
        </div>

        <div>
          <p className="cooking-method">{cookingMethod}</p>
        </div>
      </section>
    );
  }
};

export default CookingMethod;
