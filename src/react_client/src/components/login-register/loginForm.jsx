import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";



const LoginForm = ({ toast }) => {
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
      placeholder: "Password",
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

  const navigate = useNavigate();

  const initialData = { username: "", password: "" };
  const [data, setData] = useState(initialData);
  const doSubmit = async () => {
    const status = await login(data.username, data.password);
    if (status.length === 0) {
      toast.success("Login successfully!");
    } else {
      toast.error(status);
    }
    navigate("/recipes", { replace: true });
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
