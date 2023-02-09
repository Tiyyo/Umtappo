import React, { useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { createTheme, ThemeProvider } from "@mui/material";

import { NavLink } from "react-router-dom";
import Hamburger from "../hamburger/Hamburger";

const Navigation = (props) => {
  const getNavState = props.getNavState;
  const parentNavState = props.parentNavState;

  const [openMenu, setOpenMenu] = useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        light: "#ffbd45",
        main: "#fb8c00",
        dark: "#c25e00",
        contrastText: "#000000",
      },
      secondary: {
        light: "#484848",
        main: "#121212",
        dark: "#000000",
        contrastText: "#ffffff",
      },
    },
    typography: {
      fontSize: 14,
    },
  });

  const pullOpenState = (state) => {
    state ? setOpenMenu(true) : setOpenMenu(false);
  };

  useEffect(() => {
    setOpenMenu(parentNavState);
  }, [parentNavState]);

  useEffect(() => {
    getNavState(openMenu);
  }, [openMenu]);

  return (
    <div className="nav">
      <Hamburger
        getOpenState={pullOpenState}
        parentNavState={openMenu}
      ></Hamburger>
      <ul
        className="nav__links"
        style={openMenu ? { left: "-0.5rem" } : { left: "-20vw" }}
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
          <NavLink to="/lists">
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
