import React from "react";
import "./common.css";
const MyInput = ({
  name,
  label,
  type,
  handleFunc,
  placeholder,
  required,
  value,
}) => {
  return (
    <div className="form-row">
      <label className="form-label">{label}</label>
      <input
        className="form-input"
        name={name}
        type={type}
        value={value}
        onChange={handleFunc}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default MyInput;
