import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav">
      <ul className="nav__links">
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
        <NavLink to="/Favorites">
          {({ isActive, isPending }) => (
            <li className={isActive ? "active" : ""}>Favorites</li>
          )}
        </NavLink>
        {/* <NavLink to="/Account">
          <li>
            <PersonPinIcon color="primary" />
            <p>Account</p>
          </li>
        </NavLink> */}
      </ul>
    </div>
  );
};

export default Navigation;
