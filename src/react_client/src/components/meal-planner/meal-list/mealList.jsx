import React from "react";
import { useState } from "react";
import "./mealList.css";
import { IoIosInformationCircleOutline } from "react-icons/io";

const MealList = ({ mealType, nutrition, meals }) => {
  return (
    <div className="meal-list-container">
      {meals && meals.length !== 0 && (
        <div className="meal-container">
          <div className="meal-header">
            <div className="meal-info">
              <div className="meal-type">{mealType}</div>
              {nutrition && (
                <div className="meal-calo">
                  {nutrition.kcal.amount} Calories
                </div>
              )}
            </div>
            <div className="meal-icons">
              <div className="meal-icon">
                <IoIosInformationCircleOutline size={25} />
              </div>
            </div>
          </div>
          <div className="meal-content">
            <ul className="meal-foods">
              {meals.map((meal) => (
                <li key={meal.id} className="food ">
                  <div className="food-name">{meal.title}</div>
                  <div className="food-unit">{meal.quantity} serving</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealList;
