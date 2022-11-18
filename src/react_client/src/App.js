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
import jwt_decode from "jwt-decode";

const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwt_decode(jwt);
      setUser(user);
    } catch (error) {}
  }, []);
  console.log(user);
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} setUser={setUser} />
      <main className="my-container">
        <Routes>
          <Route
            path="/login"
            element={<LoginForm toast={toast} user={user} />}
          />
          <Route
            path="/register"
            element={<RegisterForm toast={toast} user={user} />}
          />
          {/* <Route path="/recipes/:id" element={<MovieForm />} /> */}
          <Route
            path="/recipes/:id"
            element={<RecipeForm toast={toast} user={user} />}
          />
          <Route
            path="/recipes"
            element={<Recipes toast={toast} user={user} />}
          />
          <Route
            path="/customer"
            element={<Customer toast={toast} user={user} />}
          />
          <Route
            path="/planner"
            element={<MealPlanner toast={toast} user={user} />}
          />
          <Route path="/" element={<Recipes toast={toast} />} user={user} />
          <Route path="*" element={<NotFound toast={toast} />} user={user} />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
