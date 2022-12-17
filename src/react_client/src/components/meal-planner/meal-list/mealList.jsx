import React from "react";
import { useState } from "react";
import "./mealList.css";
import { IoIosInformationCircleOutline } from "react-icons/io";

const MealList = ({ mealType, nutrition, meals }) => {
  return (
    <React.Fragment>
      {meals && meals.length !== 0 && (
        <div className="meal-list-container">
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
                      <div className="nutrition-info-title">KCAL</div>
                      <div className="nutrition-info-value">
                        {nutrition.kcal.amount}
                      </div>
                      <div className="nutrition-info-title">CARBS</div>
                      <div className="nutrition-info-value">
                        {nutrition.carbs.amount} g
                      </div>
                      <div className="nutrition-info-title">FAT</div>
                      <div className="nutrition-info-value">
                        {nutrition.fat.amount} g
                      </div>
                      <div className="nutrition-info-title">PROTEIN</div>
                      <div className="nutrition-info-value">
                        {nutrition.protein.amount} g
                      </div>
                      <div className="nutrition-info-title">FIBER</div>
                      <div className="nutrition-info-value">
                        {nutrition.fibre.amount} g
                      </div>
                      <div className="nutrition-info-title">SATURATES</div>
                      <div className="nutrition-info-value">
                        {nutrition.saturates.amount} g
                      </div>
                      <div className="nutrition-info-title">SODIUM</div>
                      <div className="nutrition-info-value">
                        {nutrition.sodium.amount} mg
                      </div>
                      <div className="nutrition-info-title">SUGARS</div>
                      <div className="nutrition-info-value">
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
        </div>
      )}
    </React.Fragment>
  );
};

export default MealList;
