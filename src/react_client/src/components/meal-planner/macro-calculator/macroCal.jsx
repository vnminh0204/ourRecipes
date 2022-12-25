import React from "react";
import { useState } from "react";
import "./macroCal.css";
import { IoIosInformationCircleOutline } from "react-icons/io";
import * as func from "./helperFunctions";
import MyInput from "../../common/myInput";
import MyRadioGroup from "../../common/myRadioGroup";
import MySelect from "../../common/mySelect";
import { CSSTransition } from "react-transition-group";
import "./card.css";
import "./flip-transition.css";

const MacroCal = ({ caloGoal }) => {
  const [showFront, setShowFront] = useState(true);
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [gender, setGender] = useState("Male");
  const [activityLevel, setActivityLevel] = useState("Sedentary");

  const [calories, setCalories] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [goal, setGoal] = useState("Maintain");

  const goalSelections = ["Maintain", "Lose", "Gain"];
  const genderSelections = ["Male", "Female"];
  const activityLevelOptions = [
    {
      value: "sedentary",
      option: "Sedentary",
    },
    {
      value: "lightActivity",
      option: "Light activity",
    },
    {
      value: "moderateActivity",
      option: "Moderate activity",
    },
    {
      value: "veryActive",
      option: "Very Active",
    },
  ];

  const getResult = () => {
    console.log("HERE");
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const activityLevelScale = func.getActivityLevel(activityLevel);
    const REE = func.getREE(weightNum, heightNum, parseInt(age), gender);
    const TDEE = func.getTDEE(REE, activityLevelScale);
    const newCalories = func.getGoal(goal, TDEE);
    setCalories(newCalories);

    const newFat = func.getFat(newCalories);
    setFat(newFat);
    console.log("Fat", newFat);
    const fatCalories = func.fatCalories(newFat);

    const weightLbs = func.getKilos(weightNum);
    const newProtein = func.getProtein(weightLbs);
    setProtein(newProtein);
    const proteinCalories = func.proteinCalories(newProtein);

    const carbCalories = func.calorieBalance(
      proteinCalories,
      fatCalories,
      newCalories
    );

    const newCarbs = func.getTotalCarbs(carbCalories);
    setCarbs(newCarbs);
  };

  const handleSubmit = () => {
    getResult();
    return false;
  };

  const handleAgeChange = (value) => {
    setAge(value);
  };

  const handleHeightChange = (value) => {
    setHeight(value);
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleActivityChange = (value) => {
    setActivityLevel(value);
  };

  const handleGoal = (value) => {
    setGoal(value);
  };

  return (
    <div className="cal-container">
      <div className="flippable-card-container">
        <CSSTransition in={showFront} timeout={300} classNames="flip">
          <div
            className="card"
            onClick={() => {
              setShowFront((v) => !v);
            }}
          >
            <div className="card-back">Back</div>
            <div className="card-front calulator-container">
              <h3 className="fs-3">Your macro calculator</h3>
              <div className="calculator-form-control">
                <MyInput
                  label="Age"
                  type="text"
                  placeholder="Age"
                  value={age}
                  required={true}
                  handleFunc={(e) => handleAgeChange(e.target.value)}
                />
                <MyInput
                  label="Height(cm)"
                  type="text"
                  placeholder="Height"
                  value={height}
                  required={true}
                  handleFunc={(e) => handleHeightChange(e.target.value)}
                />
                <MyInput
                  label="Weight(kq)"
                  type="text"
                  placeholder="Weight"
                  value={weight}
                  required={true}
                  handleFunc={(e) => handleWeightChange(e.target.value)}
                />
                <MyRadioGroup
                  label={"Gender:"}
                  name={"gender"}
                  type={"radio"}
                  handleFunc={(e) => handleGenderChange(e.target.value)}
                  options={genderSelections}
                  selectedOptions={gender}
                />
                <MySelect
                  label="Activity Level"
                  name={"activityLevel"}
                  handleFunc={(e) => handleActivityChange(e.target.value)}
                  options={activityLevelOptions}
                />
                <MyRadioGroup
                  label={"Goal:"}
                  name={"goal"}
                  type={"radio"}
                  handleFunc={(e) => handleGoal(e.target.value)}
                  options={goalSelections}
                  selectedOptions={goal}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="submit-btn"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default MacroCal;
