import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./logo.png";

const NavBar = () => {
  const [show, setShow] = useState(false);
  return (
    <nav className="my-navbar">
      <Link className="navbar-brand my-brand" to="/">
        <img src={logo} width="70" height="50" alt="OurRecipes" />
      </Link>
      <ul className="nav-links">
        <div className="my-menu">
          <li>
            <NavLink className="nav-item nav-link" to="/recipes">
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item nav-link" to="/planner">
              Planner
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </li>
          <li className="my-services">
            <a href="/">Services</a>
            <ul className="my-dropdown">
              <li>
                <a href="/">Dropdown 1 </a>
              </li>
              <li>
                <a href="/">Dropdown 2</a>
              </li>
              <li>
                <a href="/">Dropdown 2</a>
              </li>
              <li>
                <a href="/">Dropdown 3</a>
              </li>
              <li>
                <a href="/">Dropdown 4</a>
              </li>
            </ul>
          </li>
        </div>
      </ul>
    </nav>
    // <nav className="navbar navbar-expand-lg my-navbar">

    //   <div className="navbar-nav">

    //     <NavLink className="nav-item nav-link" to="/customer">
    //       Customer
    //     </NavLink>

    //   </div>
    //   <button
    //     className="btn btn-primary"
    //     type="button"
    //     data-bs-toggle="collapse"
    //     data-bs-target="#collapseExample"
    //     aria-expanded="false"
    //     aria-controls="collapseExample"
    //     onClick = {() => setShow(!show)}
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className= {show? "collapse show" : "collapse" } id="collapseExample">
    //     <div className="card card-body">
    //       Some placeholder content for the collapse component. This panel is
    //       hidden by default but revealed when the user activates the relevant
    //       trigger.
    //     </div>
    //   </div>
    // </nav>
  );
};

export default NavBar;
