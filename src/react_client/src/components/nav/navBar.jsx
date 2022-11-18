import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiUser, FiChevronDown } from "react-icons/fi";
import logo from "./logo.png";

const NavBar = ({ user, setUser }) => {
  const [show, setShow] = useState(false);

  // const logOut = () => {
  //   setUser({});
  //   localStorage.removeItem("token");
  //   window.location = "/";
  // };

  const logOut = () => {
    setUser({});
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <nav>
      <div className="my-navbar">
        <Link className="navbar-brand my-brand" to="/">
          <img src={logo} width="120" height="60" alt="OurRecipes" />
        </Link>
        <ul className="my-menu">
          <li>
            <NavLink className="my-nav-item nav-item" to="/recipes">
              RECIPES
            </NavLink>
          </li>
          <li>
            <NavLink className="my-nav-item nav-item" to="/planner">
              PLANNER
            </NavLink>
          </li>
          {Object.keys(user).length === 0 && (
            <React.Fragment>
              <li>
                <NavLink className="my-nav-item nav-item" to="/login">
                  LOGIN
                </NavLink>
              </li>
              <li>
                <NavLink className="my-nav-item nav-item" to="/register">
                  REGISTER
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {Object.keys(user).length !== 0 && (
            <li className="my-user">
              <NavLink className="my-nav-item nav-item my-user" to="#">
                <FiUser size={22} />
                {user.name}
                <FiChevronDown size={22} />
              </NavLink>
              <ul className="my-dropdown">
                <li>
                  <NavLink className="my-dropdown-item nav-item" to="/register">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="my-dropdown-item nav-item"
                    to="/"
                    onClick={logOut}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
