import React, { useState } from "react";
import { RiEdit2Fill, RiCheckboxCircleFill } from "react-icons/ri";
import "./cookingMethod.css"

const CookingMethod = ({
  cookingMethod,
  setCookingMethod,
  editCookingMethod,
  setEditCookingMethod,
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

  if (editCookingMethod) {
    return (
      <section className="section-ingredients">
        <h3 className="fs-5 recipe-heading">METHOD</h3>
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
        <div className="row">
          <button type="button" className="add-btn" onClick={changeEditState}>
            <RiCheckboxCircleFill size={25} />
          </button>
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
        <div className="row">
          <h3 className="fs-5 recipe-heading w-50">METHOD</h3>
          {showEditIcon && (
            <button type="button" className="add-btn w-25" onClick={changeEditState}>
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
