import React from "react";
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/SearchBar/SearchBar";
import ProfileBtn from "../components/Navigation/ProfileBtn";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();

  //   <DisplaySearchResult search={search} getPageNumber={pullPageNumber} />

  return (
    <div className="app__container">
      <div className="header">
        <Navigation
        // getNavState={pullNavState} parentNavState={navIsOpen}
        />
        <SearchBar
        //   getInputValue={pullInputValue}
        //   getOpenState={pullSearchOpenState}
        />
        <ProfileBtn />
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
