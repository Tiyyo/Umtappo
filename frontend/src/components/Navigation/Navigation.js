import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav">
      <ul className="nav__links">
        <NavLink to="/home">
          {({ isActive }) => <li className={isActive ? "active" : ""}>Home</li>}
        </NavLink>
        <NavLink to="/films">
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>Movies</li>
          )}
        </NavLink>
        <NavLink to="/tvshow">
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>TvShows</li>
          )}
        </NavLink>
        <NavLink to="/Favorites">
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>Favorites</li>
          )}
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
