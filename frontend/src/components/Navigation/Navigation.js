import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme/IconTheme";
import { NavLink } from "react-router-dom";
import Hamburger from "../hamburger/Hamburger";

const Navigation = (props) => {
  const [openMenu, setOpenMenu] = useState(false);

  const getHamburgerState = (state) => {
    state ? setOpenMenu(true) : setOpenMenu(false);
  };

  return (
    <div className="nav">
      <Hamburger getHamburgerState={getHamburgerState}></Hamburger>
      <ul
        className="nav__links"
        style={openMenu ? { right: "-0.5rem" } : { right: "-20vw" }}
      >
        <ThemeProvider theme={theme}>
          <NavLink to="/home">
            <li>
              <HomeOutlinedIcon color="primary" size="extra-large" />
            </li>
          </NavLink>
          <NavLink to="/films">
            <li>
              <TheatersOutlinedIcon color="primary" />
            </li>
          </NavLink>
          <NavLink to="/tvshow">
            <li>
              <TvOutlinedIcon color="primary" />
            </li>
          </NavLink>
          <NavLink to="/Favorite">
            <li>
              <FavoriteBorderOutlinedIcon color="primary" />
            </li>
          </NavLink>
        </ThemeProvider>
      </ul>
    </div>
  );
};

export default Navigation;
