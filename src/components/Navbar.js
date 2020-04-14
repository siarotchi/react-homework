import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => (
  <nav className={"navbar navbar-dark navbar-expand-lg bg-primary"}>
    <div className={"navbar-brand"}>React App</div>

    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/class" exact>
          ToDo Class
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/func">
          ToDo Fc
        </NavLink>
      </li>
    </ul>
  </nav>
);
