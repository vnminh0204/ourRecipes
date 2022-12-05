import React from "react";
import MealsSearch from "./meal-search/search/mealsSearch";
import "./mealPlanner.css";

const MealPlanner = ({ toast, user }) => {
  return (
    <React.Fragment>
      <h1>MealPlanner</h1>
      <div className="meal-container"></div>
      <MealsSearch toast={toast}></MealsSearch>
    </React.Fragment>
  );
};

export default MealPlanner;
