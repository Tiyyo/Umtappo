import React, { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/SearchBar/SearchBar";
import { Outlet, useLocation } from "react-router-dom";
import BackIcon from "../components/Navigation/BackIcon";

const AppLayout = () => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [shouldHide, setShouldHide] = useState(false);
  const { pathname } = useLocation();
  // const main = document.querySelector(".main");

  // const options = {};

  // const observer = new IntersectionObserver(([entry]) => {
  //   console.log(entry);
  // }, options);

  const mainRef = useRef();
  useEffect(() => {
    // observer.observe(main);
  }, []);

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

  const mainContainer = useRef();
  console.log(mainRef);

  return (
    <div className="app__container">
      <div className="header">
        <Navigation />
        <SearchBar getInputValue={getInputValue} />
        {shouldHide ? "" : <BackIcon />}
      </div>
      <Outlet context={(inputSearchValue, mainRef)} />
      <footer className="footer">TMDB Logo goes here</footer>
    </div>
  );
};

export default AppLayout;
