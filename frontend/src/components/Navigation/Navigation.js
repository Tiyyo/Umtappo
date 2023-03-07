import React, { useContext, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { ThemeProvider } from "@mui/material";
import { NavLink } from "react-router-dom";
import Hamburger from "../hamburger/Hamburger";
import AppContext from "../../utils/Context/AppContextProvider";

const Navigation = (props) => {
  const [openMenu, setOpenMenu] = useState(false);

  const { iconTheme } = useContext(AppContext);

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
        <ThemeProvider theme={iconTheme}>
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
          <NavLink to="/Favorites">
            <li>
              <FavoriteBorderOutlinedIcon color="primary" />
            </li>
          </NavLink>
          <NavLink to="/Account">
            <li>
              <PersonPinIcon
                color="primary"
                size="large"
                sx={{ backgroundColor: "transparent", fontSize: "1.8rem" }}
              />
            </li>
          </NavLink>
        </ThemeProvider>
      </ul>
    </div>
  );
};

export default Navigation;
