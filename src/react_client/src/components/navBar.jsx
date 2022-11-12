import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiUser, FiChevronDown } from "react-icons/fi";
import logo from "./logo.png";

const NavBar = ({ user }) => {
  const [show, setShow] = useState(false);
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
                  <NavLink className="my-dropdown-item nav-item" to="/register">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
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
