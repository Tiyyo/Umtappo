import React, { useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/SearchBar/SearchBar";
import ProfileBtn from "../components/Navigation/AccountIcon";
import { Outlet, useLocation, Link } from "react-router-dom";

const AppLayout = () => {
  const [inputSearchValue, setInputSearchValue] = useState("");

  const getInputValue = (value) => {
    setInputSearchValue(value);
  };

  return (
    <div className="app__container">
      <div className="header">
        <Navigation />
        <SearchBar getInputValue={getInputValue} />
        <ProfileBtn />
      </div>
      <Outlet context={inputSearchValue} />
    </div>
  );
};

export default AppLayout;
