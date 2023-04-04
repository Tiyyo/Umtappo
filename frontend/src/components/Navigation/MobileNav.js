import React from "react";
import { NavLink } from "react-router-dom";

const MobileNav = ({ isOpen }) => {
  return (
    <nav
      className="nav-mobile"
      style={isOpen ? { left: "0" } : { left: "-100vw" }}
    >
      <NavLink to="/home">
        {({ isActive, isPending }) => (
          <li className={isActive ? "active" : ""}>Home</li>
        )}
      </NavLink>
      <NavLink to="/films">
        {({ isActive, isPending }) => (
          <li className={isActive ? "active" : ""}>Movies</li>
        )}
      </NavLink>
      <NavLink to="/tvshow">
        {({ isActive, isPending }) => (
          <li className={isActive ? "active" : ""}>TvShows</li>
        )}
      </NavLink>
    </nav>
  );
};

export default MobileNav;
