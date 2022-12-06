import React from "react";
import MealsSearch from "./meal-search/search/mealsSearch";
import { IoIosInformationCircleOutline } from "react-icons/io";
import "./mealPlanner.css";

const MealPlanner = ({ toast, user }) => {
  return (
    <React.Fragment>
      <div className="planner-container">
        <h1>MealPlanner</h1>
        <div className="meal-plan-continer">
          <div className="day-plan-container">
            <div className="day-header">
              <div className="day-title">Your Meal Plan</div>
            </div>
            <div className="meal-list-container">
              <div className="meal-container">
                <div className="meal-header">
                  <div className="meal-info">
                    <div className="meal-type">Breakfasts</div>
                    <div className="meal-calo">423 Calories</div>
                  </div>
                  <div className="meal-icons">
                    <div className="meal-icon">
                      <IoIosInformationCircleOutline size={25} />
                    </div>
                  </div>
                </div>
                <div className="meal-content">
                  <ul className="meal-foods">
                    <li className="food ">
                      <div className="food-name">Overnight Oats</div>
                      <div className="food-unit">1 serving</div>
                    </li>
                    <li className="food ">
                      <div className="food-name">Overnight Oats</div>
                      <div className="food-unit">1 serving</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <MealsSearch toast={toast}></MealsSearch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MealPlanner;
