import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiUser, FiChevronDown } from "react-icons/fi";
import logo from "./logo.png";

const NavBar = ({ user }) => {
  const [show, setShow] = useState(false);
  console.log(user);
  return (
    <nav className="mynavbar">
      <Link className="navbar-brand my-brand" to="/">
        <img src={logo} width="113" height="60" alt="OurRecipes" />
      </Link>
      <ul className="menu">
        <li className="nav-li">
          <NavLink className="nav-item nav-link" to="/recipes">
            Recipes
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="nav-item nav-link" to="/planner">
            Planner
          </NavLink>
        </li>
        {Object.keys(user).length === 0 && (
          <React.Fragment>
            <li className="nav-li">
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-li nav-li">
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {Object.keys(user).length !== 0 && (
          <li className="services nav-li" onClick={() => setShow(!show)}>
            <FiUser size={20} />
            <NavLink className="nav-item nav-link nav-username" to="#">
              {user.name}
            </NavLink>
            <FiChevronDown size={25} />
            {show ? (
              <ul className="mydropdown">
                <li className="mydropdown-li">
                  <NavLink className="nav-item nav-link my-dropdown-item" to="#">
                    Profile
                  </NavLink>
                </li>
                <li className="mydropdown-li">
                  <NavLink className="nav-item nav-link my-dropdown-item" to="#">
                    Logout
                  </NavLink>
                </li>
              </ul>
            ) : (
              <div></div>
            )}
          </li>
        )}
        <React.Fragment></React.Fragment>
      </ul>
    </nav>
  );
};

export default NavBar;
