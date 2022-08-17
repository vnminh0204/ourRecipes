import React from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import { useState } from "react";

const Form = ({ doSubmit, buttons, schema, data, setData }) => {

  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const newErrors = {};
    for (let item of error.details) newErrors[item.path[0]] = item.message;
    return newErrors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const newSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, newSchema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors || {});
    if (Object.keys(errors).length !== 0) return;
    doSubmit();
  };

  const renderSubmitButton = (label) => {
    return (
      <button key={label} disabled={validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  const renderButton = (button) => {
    if (button.buttonType === "Input") {
      const { buttonType, name, label, ...settings } = button;
      return renderInput(name, label, settings);
    } else if (button.buttonType === "Submit") {
      return renderSubmitButton(button.label);
    } else if (button.buttonType === "Select") {
      const { buttonType, name, label, options, ...settings } = button;
      return renderSelect(name, label, options, settings);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);

    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
    setErrors(newErrors);
  };

  const renderSelect = (name, label, options, settings) => {
    return (
      <Select
        key={name}
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
        {...settings}
      />
    );
  };

  const renderInput = (name, label, settings) => {
    return (
      <Input
        key={name}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        error={errors[name]}
        {...settings}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {buttons.map((button) => renderButton(button))}
    </form>
  );
};

export default Form;
