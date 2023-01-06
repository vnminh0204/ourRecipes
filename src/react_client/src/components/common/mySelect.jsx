import React from "react";
import "./common.css";
const MySelect = ({ name, label, handleFunc, selectedOption, options }) => {
  return (
    <div className="form-row">
      <label className="form-label">{label}</label>
      <select
        className="my-form-select"
        name={name}
        value={selectedOption}
        onChange={handleFunc}
      >
        {options.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default MySelect;
