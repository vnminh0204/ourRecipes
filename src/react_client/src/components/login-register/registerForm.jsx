import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";

const RegisterForm = ({ toast }) => {
  const buttons = [
    {
      buttonType: "Input",
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Username",
    },
    {
      buttonType: "Input",
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Your Password",
    },
    {
      buttonType: "Input",
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your Name",
    },
    {
      buttonType: "Submit",
      label: "Register",
    },
  ];
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const navigate = useNavigate();

  const initialData = { username: "", password: "", name: "" };
  const [data, setData] = useState(initialData);

  const doSubmit = async () => {
    const status = await register(data.username, data.password, data.name);
    if (status.length === 0) {
      toast.success("Register successfully!");
      navigate("/login", { replace: true });
    } else {
      toast.error(status);
    }

    console.log("Submitted");
  };

  return (
    <div>
      <h1>Register</h1>
      <Form
        doSubmit={doSubmit}
        buttons={buttons}
        schema={schema}
        data={data}
        setData={setData}
      />
    </div>
  );
};

export default RegisterForm;
