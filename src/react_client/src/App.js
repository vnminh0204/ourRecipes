import React, { useEffect, useState } from "react";
import Recipes from "./components/recipes";
import Customer from "./components/customer";
import MealPlanner from "./components/planner";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/navBar";
import RecipeForm from "./components/recipeForm";
import jwt_decode from "jwt-decode";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwt_decode(jwt);
      setUser(user);
    } catch (err) {
      
    }
  }, []);
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Routes>
          <Route
            path="/login"
            element={<LoginForm user={user} toast={toast} />}
          />
          <Route
            path="/register"
            element={<RegisterForm user={user} toast={toast} />}
          />
          {/* <Route path="/recipes/:id" element={<MovieForm />} /> */}
          <Route
            path="/recipes/:id"
            element={<RecipeForm user={user} toast={toast} />}
          />
          <Route
            path="/recipes"
            element={<Recipes user={user} toast={toast} />}
          />
          <Route
            path="/customer"
            element={<Customer user={user} toast={toast} />}
          />
          <Route
            path="/planner"
            element={<MealPlanner user={user} toast={toast} />}
          />
          <Route path="/" element={<Recipes user={user} toast={toast} />} />
          <Route path="*" element={<NotFound user={user} toast={toast} />} />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
