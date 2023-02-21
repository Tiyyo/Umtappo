import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/SearchBar/SearchBar";
import { Outlet, useLocation, Link } from "react-router-dom";
import AccountIcon from "../components/Navigation/AccountIcon";

const AppLayout = () => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [shouldHide, setShouldHide] = useState(false);
  const { pathname } = useLocation();

  const hideAccountIcon = () => {
    if (pathname.includes("Account") || pathname.includes("add_to_playlist")) {
      setShouldHide(true);
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
        {shouldHide ? "" : <AccountIcon />}
      </div>
      <Outlet context={inputSearchValue} />
    </div>
  );
};

export default AppLayout;
