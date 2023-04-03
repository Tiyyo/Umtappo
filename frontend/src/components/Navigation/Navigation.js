import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { NavLink } from "react-router-dom";

const Navigation = ({ isOpen }) => {
  return (
    <div className="nav">
      <ul
        className="nav__links"
        style={isOpen ? { right: "0rem" } : { right: "-100vw" }}
      >
        <NavLink to="/home">
          <li>
            <HomeOutlinedIcon color="primary" size="extra-large" />
            <p>Home</p>
          </li>
        </NavLink>
        <NavLink to="/films">
          <li>
            <TheatersOutlinedIcon color="primary" />
            <p>Movies</p>
          </li>
        </NavLink>
        <NavLink to="/tvshow">
          <li>
            <TvOutlinedIcon color="primary" />
            <p>TvShows</p>
          </li>
        </NavLink>
        <NavLink to="/Favorites">
          <li>
            <FavoriteBorderOutlinedIcon color="primary" />
            <p>Favorites</p>
          </li>
        </NavLink>
        <NavLink to="/Account">
          <li>
            <PersonPinIcon color="primary" />
            <p>Account</p>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
