import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const SearchBar = (props) => {
  const { getInputValue, getOpenState } = props;

  const [searchActive, setSearchActive] = useState(false);
  const [searchedMovie, setSearchedMovie] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleBackSpace = () => {
    const searchInput = document.querySelector(".search__input");
    return (searchInput.value = "" && searchInput.focus());
  };

  const theme = createTheme({
    palette: {
      primary: {
        light: "#ffbd45",
        main: "#fb8c00",
        dark: "#c25e00",
        contrastText: "#000000",
      },
      secondary: {
        light: "#484848",
        main: "#121212",
        dark: "#000000",
        contrastText: "#ffffff",
      },
    },
  });

  useEffect(() => {
    const fetchDataMovies = async () => {
      const results = inputValue
        ? await axios
            .get(
              `https://api.themoviedb.org/3/search/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&query=${encodeURI(
                inputValue
              )}&page=1&include_adult=false&region=FR`
            )
            .then((res) => setSearchedMovie(res.data.results))
        : "";
    };
    fetchDataMovies();
  }, [inputValue]);

  return (
    <ThemeProvider theme={theme}>
      <div className="search__container">
        <button className="search">
          <div
            className={searchActive ? "search__icon isactive" : "search__icon"}
            onClick={() => {
              setSearchActive(true);
              getOpenState(true);
            }}
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
              getOpenState(false);
            }}
          >
            <CloseIcon color="primary" />
          </div>
          <div
            className={
              searchActive ? "search__backspace isactive" : "search__backspace"
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
            placeholder={searchActive ? "Search" : ""}
            onChange={(e) => getInputValue(e.target.value)}
            autoFocus
          />
        </button>
        <div
          className={
            inputValue.length >= 1 && searchActive
              ? "result isactive"
              : "result"
          }
        >
          {searchedMovie.slice(0, 5).map((movie) => {
            return (
              <ul>
                <li key={movie.id}>{movie.title}</li>
              </ul>
            );
          })}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SearchBar;
