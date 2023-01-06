import React from "react";
import "./common.css";
const MyRadioGroup = ({
  name,
  label,
  type,
  handleFunc,
  options,
  selectedOptions,
}) => {
  return (
    <div className="form-row">
      <label className="form-label">{label}</label>
      <div className="form-row inline">
        {options.map((opt) => {
          return (
            <label key={opt} className="label--radio">
              <input
                className="redio"
                name={name}
                onChange={handleFunc}
                value={opt}
                checked={selectedOptions.indexOf(opt) > -1}
                type={type}
              />
              {opt}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default MyRadioGroup;
