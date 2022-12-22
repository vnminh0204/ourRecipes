import React from "react";
import { useState } from "react";
import "./macroCal.css";
import { IoIosInformationCircleOutline } from "react-icons/io";
import * as func from "./helperFunctions";
import MyInput from "../../common/myInput";
import MyRadioGroup from "../../common/myRadioGroup";

const MacroCal = ({ caloGoal }) => {
  const [age, setAge] = useState();
  const [gender, setGender] = useState("Male");
  const getResult = () => {};

  const genderSelections = ["Male", "Female"];

  const handleSubmit = () => {
    getResult();
  };

  return (
    <div className="calulator-container">
      <form className="ingredient-search-form" onSubmit={handleSubmit}>
        <h3 className="fs-3">Your macro calculator</h3>
        <div className="calculator-form-control">
          <MyInput
            label="Age"
            type="text"
            placeholder="Age"
            value={age}
            required={true}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MyInput
            label="Height(cm)"
            type="text"
            placeholder="Height"
            value={age}
            required={true}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MyInput
            label="Weight(kq)"
            type="text"
            placeholder="Weight"
            value={age}
            required={true}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MyRadioGroup
            label={"Gender:"}
            name={"gender"}
            type={"radio"}
            // handleFunc={this.props.handleChange}
            options={genderSelections}
            selectedOptions={gender}
          />
          {/* <select className="select-btn" onChange={onOptionChangeHandler}>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
          <button type="submit" className="submit-btn format-right-btn">
            Search
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default MacroCal;
