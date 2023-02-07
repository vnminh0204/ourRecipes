import React, {useState} from "react";
import "./cookingMethod.css";

const CookingMethod = ({
                           cookingMethod,
                           setCookingMethod,
                           editMode,
                       }) => {

    const handleCookingMethodChange = (event) => {
        setCookingMethod(event.target.value);
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
    } else {
        return (
            <section className="section-ingredients">
                <div className="method-title-container">
                    <h3 className="fs-5 recipe-heading w-50">METHOD</h3>
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
    }
};

export default CookingMethod;
