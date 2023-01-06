import React from "react";
import { useState } from "react";
import "./macroCal.css";
import * as func from "./helperFunctions";
import MyInput from "../../common/myInput";
import MyRadioGroup from "../../common/myRadioGroup";
import MySelect from "../../common/mySelect";
import { CSSTransition } from "react-transition-group";
import "./card.css";
import "./flip-transition.css";

const MacroCal = ({ toast, setMacro }) => {
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
  const [fiber, setFiber] = useState(0);
  const [sodium, setSodium] = useState(2300);
  const [sugars, setSugars] = useState(0);
  const [saturates, setSaturates] = useState(0);
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
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const activityLevelScale = func.getActivityLevel(activityLevel);
    const REE = func.getREE(weightNum, heightNum, parseInt(age), gender);
    const TDEE = func.getTDEE(REE, activityLevelScale);
    const newCalories = func.getGoal(goal, TDEE);
    setCalories(newCalories);

    const newFat = func.getFat(newCalories);
    setFat(newFat);
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

    const newSugars = func.getSugars(newCalories);
    setSugars(newSugars);

    const newFiber = func.getFiber(newCalories);
    setFiber(newFiber);

    const newSaturates = func.getSaturates(newCalories);
    setSaturates(newSaturates);

    const newMacro = {
      kcal: newCalories,
      sodium: sodium,
      sugars: newSugars,
      carbs: newCarbs,
      protein: newProtein,
      fat: newFat,
      saturates: newSaturates,
      fibre: newFiber,
    };
    setMacro(newMacro);
  };

  const handleSubmit = () => {
    if (!age || !height | !weight) {
      toast.error("Please fill all the fields in  macro calculator");
      return;
    }
    getResult();
    setShowFront((v) => !v);
    return false;
  };

  const handleBack = () => {
    setShowFront((v) => !v);
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
          <div className="card">
            <div className="card-back">
              <div className="result">
                <div className="result-heading">
                  <h3 className="result-heading-h">Macronutrients per day</h3>
                </div>
                <div className="macronutrients">
                  <div className="nutri-block">
                    <span className="nutri-info">kcal</span> {calories}
                  </div>
                  <div className="nutri-block">
                    <span className="nutri-info">carbs</span> {carbs}g
                  </div>
                  <div className="nutri-block">
                    <span className="nutri-info">fat</span> {fat}g
                  </div>
                  <div className="nutri-block">
                    <span className="nutri-info">protein</span> {protein}g
                  </div>

                  <div className="nutri-block">
                    <span className="nutri-info">fiber</span> {fiber}g
                  </div>
                  <div className="nutri-block">
                    <span className="nutri-info">saturates</span> {saturates}g
                  </div>
                  <div className="nutri-block">
                    <span className="nutri-info">sodium</span> {sodium}mg
                  </div>
                  <div className="nutri-block">
                    <span className="nutri-info">sugars</span> {sugars}g
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleBack}
                  className="submit-btn"
                >
                  Back
                </button>
              </div>
            </div>
            <div className="card-front calulator-container">
              <h3 className="calulator-heading fs-3">Your macro calculator</h3>
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
                <div>
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
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default MacroCal;
