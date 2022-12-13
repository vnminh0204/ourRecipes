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
                {nutrition && (
                  <div className="meal-nutrition-info">
                    <div>Calories</div>
                    <div className="nutrition-info">
                      {nutrition.kcal.amount}
                    </div>
                    <div>Carbs</div>
                    <div className="nutrition-info">
                      {nutrition.carbs.amount} g
                    </div>
                    <div>Fat</div>
                    <div className="nutrition-info">
                      {nutrition.fat.amount} g
                    </div>
                    <div>Protein</div>
                    <div className="nutrition-info">
                      {nutrition.protein.amount} g
                    </div>
                    <div>Fiber</div>
                    <div className="nutrition-info">
                      {nutrition.fibre.amount} g
                    </div>
                    <div>Saturates</div>
                    <div className="nutrition-info">
                      {nutrition.saturates.amount} g
                    </div>
                    <div>Sodium</div>
                    <div className="nutrition-info">
                      {nutrition.sodium.amount} mg
                    </div>
                    <div>Sugars</div>
                    <div className="nutrition-info">
                      {nutrition.sugars.amount} g
                    </div>
                  </div>
                )}
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
