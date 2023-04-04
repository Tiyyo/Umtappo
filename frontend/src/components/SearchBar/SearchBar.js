import React, { useEffect, useContext } from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { ThemeProvider } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppContext from "../../utils/Context/AppContextProvider";

const SearchBar = ({ getInputValue, getSearchState }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [searchActive, setSearchActive] = useState(false);

  const { iconTheme, lastSearchValue, setLastSearchValue } =
    useContext(AppContext);

  const handleBackSpace = () => {
    const searchInput = document.querySelector(".search__input");
    return (searchInput.value = "" && searchInput.focus());
  };

  useEffect(() => {
    if (pathname.toLowerCase().includes("search")) {
      setSearchActive(true);
      getSearchState(true);
    } else {
      setSearchActive(false);
      getSearchState(false);
    }
  }, [pathname]);

  useEffect(() => {
    getInputValue(lastSearchValue);
  }, [lastSearchValue]);

  return (
    <ThemeProvider theme={iconTheme}>
      <div className="search__container">
        <Link to="/Search">
          <button className="search">
            <div
              className={
                searchActive ? "search__icon isactive" : "search__icon"
              }
            >
              <SearchIcon color="primary" />
            </div>
            <div
              className={
                searchActive ? "search__close isactive" : "search__close"
              }
              onClick={() => {
                setSearchActive(false);
                handleBackSpace();
                setLastSearchValue("");
                navigate(-1);
              }}
            >
              <CloseIcon color="primary" />
            </div>
            <div
              className={
                searchActive
                  ? "search__backspace isactive"
                  : "search__backspace"
              }
              onClick={() => {
                handleBackSpace();
              }}
            >
              <BackspaceIcon color="primary" />
            </div>
            <input
              type="text"
              className={
                searchActive ? "search__input isactive" : "search__input"
              }
              defaultValue={lastSearchValue}
              placeholder={searchActive ? "Search" : ""}
              onChange={(e) => getInputValue(e.target.value)}
              autoFocus
              style={searchActive ? { opacity: "1" } : { opacity: "0" }}
            />
          </button>
        </Link>
      </div>
    </ThemeProvider>
  );
};

export default SearchBar;
