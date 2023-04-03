import React, { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/SearchBar/SearchBar";
import { Outlet, useLocation } from "react-router-dom";
import BackIcon from "../components/Navigation/BackIcon";
import { ThemeProvider } from "@mui/material";
import AppContext from "../utils/Context/AppContextProvider";
import Button from "../components/Button/Button";
import Hamburger from "../components/hamburger/Hamburger";
import Footer from "../components/Footer/Footer";

const AppLayout = () => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
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
          <Hamburger getHamburgerState={getHamburgerState}></Hamburger>
          <Navigation isOpen={openMenu} />
          <SearchBar getInputValue={getInputValue} />
          <Button>{shouldHide ? "" : <BackIcon color="primary" />}</Button>
        </div>
        <Outlet context={inputSearchValue} />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default AppLayout;
