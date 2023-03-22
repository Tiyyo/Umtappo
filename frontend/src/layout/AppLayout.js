import React, { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/SearchBar/SearchBar";
import { Outlet, useLocation } from "react-router-dom";
import BackIcon from "../components/Navigation/BackIcon";
import { ThemeProvider } from "@mui/material";
import AppContext from "../utils/Context/AppContextProvider";
import Button from "../components/Button/Button";

const AppLayout = () => {
  const [inputSearchValue, setInputSearchValue] = useState("");
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
          <Navigation />
          <SearchBar getInputValue={getInputValue} />
          <Button>{shouldHide ? "" : <BackIcon color="primary" />}</Button>
        </div>
        <Outlet context={inputSearchValue} />
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;
