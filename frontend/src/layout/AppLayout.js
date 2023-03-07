import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/SearchBar/SearchBar";
import { Outlet, useLocation } from "react-router-dom";
import BackIcon from "../components/Navigation/BackIcon";

const AppLayout = () => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [shouldHide, setShouldHide] = useState(false);
  const { pathname } = useLocation();

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
    <div className="app__container">
      <div className="header">
        <Navigation />
        <SearchBar getInputValue={getInputValue} />
        {shouldHide ? "" : <BackIcon />}
      </div>
      <Outlet context={inputSearchValue} />
    </div>
  );
};

export default AppLayout;
