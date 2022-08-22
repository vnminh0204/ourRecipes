import React from "react";
import Recipes from "./components/recipes";
import Customer from "./components/customer";
import MealPlanner from "./components/planner";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import { Route, Routes} from "react-router-dom";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/navBar";
import RecipeForm from "./components/recipeForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<LoginForm toast={toast} />} />
          <Route path="/register" element={<RegisterForm toast={toast} />} />
          {/* <Route path="/recipes/:id" element={<MovieForm />} /> */}
          <Route path="/recipes/:id" element={<RecipeForm toast={toast}/>} />
          <Route path="/recipes" element={<Recipes toast={toast}/>} />
          <Route path="/customer" element={<Customer toast={toast}/>} />
          <Route path="/planner" element={<MealPlanner toast={toast}/>} />
          <Route path="/" element={<Recipes toast={toast}/>} />
          <Route path="*" element={<NotFound toast={toast}/>} />
        </Routes>
      </main>

    </React.Fragment>
  );
};

export default App;
