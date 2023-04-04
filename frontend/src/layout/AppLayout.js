import React, { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/SearchBar/SearchBar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import BackIcon from "../components/Navigation/BackIcon";
import { ThemeProvider } from "@mui/material";
import AppContext from "../utils/Context/AppContextProvider";
import Button from "../components/Button/Button";
import Hamburger from "../components/hamburger/Hamburger";
import Footer from "../components/Footer/Footer";

import AvatarNavLink from "../components/Navigation/AvatarNavLink";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MobileNav from "../components/Navigation/MobileNav";

const AppLayout = () => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  const { pathname } = useLocation();
  const { iconTheme, navIsIntersect } = useContext(AppContext);

  const hideAccountIcon = () => {
    switch (pathname) {
      case "/home":
        setShouldHide(true);
        break;
      case "/films":
        setShouldHide(true);
        break;
      case "/tvshow":
        setShouldHide(true);
        break;
      default:
        setShouldHide(false);
        break;
    }
  };

  const getInputValue = (value) => {
    setInputSearchValue(value);
  };

  const getSearchState = (state) => {
    setSearchIsActive(state);
  };

  const getHamburgerState = (state) => {
    state ? setOpenMenu(true) : setOpenMenu(false);
  };

  useEffect(() => {
    hideAccountIcon();
  }, [pathname]);

  return (
    <ThemeProvider theme={iconTheme}>
      <div className="app__container">
        <div
          className="header"
          data-background={navIsIntersect ? "hard" : "clear"}
        >
          <div
            className="nav-logo"
            style={searchIsActive ? { display: "none" } : { display: "flex" }}
          >
            <h1 className="nav-logo__font">
              Umt<span>a</span>ppo
            </h1>
          </div>
          <Hamburger getHamburgerState={getHamburgerState}></Hamburger>
          <Navigation />
          <SearchBar
            getInputValue={getInputValue}
            getSearchState={getSearchState}
          />
          <AvatarNavLink />
          <NavLink to="/Account" className="favorites-link_mobile">
            <BookmarkBorderIcon />
          </NavLink>
          <MobileNav isOpen={openMenu} />
          <Button>{shouldHide ? "" : <BackIcon color="primary" />}</Button>
        </div>
        <Outlet context={inputSearchValue} />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default AppLayout;
