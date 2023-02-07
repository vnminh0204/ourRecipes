import React from "react";
import {IoReloadSharp} from "react-icons/io5";
import {SlNote} from "react-icons/sl";
import "./plannerNav.scss"

const PlannerNav = ({
                        toast,
                        suggestMealNutriPlan,
                        onNumMealsChangeHandler,
                        resetMealPlan,
                    }) => {
    const options = [3, 4];
    return (<div className="day-plan-nav">
        <div className="day-plan-nav-select">
            <h3 className="day-plan-nav-title">Num meals:</h3>
            <select className="day-plan-nav-btn" onChange={onNumMealsChangeHandler}>
                {options.map((option, index) => {
                    return <option key={index}>{option}</option>;
                })}
            </select>
        </div>

        <button className="day-plan-nav-btn" onClick={() => resetMealPlan()}>
            <IoReloadSharp className="day-plan-nav-icon" size={22}></IoReloadSharp>
            <span className="day-plan-nav-text">
                        Reset
                    </span>
        </button>
        <button className="day-plan-nav-btn" onClick={() => suggestMealNutriPlan()}>
            <SlNote className="day-plan-nav-icon" size={22}></SlNote>
            <span className="day-plan-nav-text">Suggest</span>
        </button>
    </div>);
}

export default PlannerNav;