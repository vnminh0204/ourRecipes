import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { useState } from "react";

const LoginForm = () => {
  const buttons = [
    {
      buttonType: "Input",
      name: "username",
      label: "Username",
      type: "text",
      placeholder:"Username"
    },
    {
      buttonType: "Input",
      name: "password",
      label: "Password",
      type: "password",
      placeholder:"Password"
    },
    {
      buttonType: "Submit",
      label: "Login",
    },
  ];
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  const initialData = { username: "", password: "" };
  const [data, setData] = useState(initialData);
  const doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };


  return (
    <div>
      <h1>Login</h1>
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

export default LoginForm;
