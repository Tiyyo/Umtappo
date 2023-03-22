import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { lightIconTheme } from "../../theme/IconTheme";
import { darkIconTheme } from "../../theme/IconTheme";
export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [genreListMovie, setGenreListMovie] = useState([]);
  const [genreListTv, setGenreListTv] = useState([]);
  const [languages, setLanguages] = useState("");
  const [preferedTheme, setTheme] = useState("");
  const [iconTheme, setIconTheme] = useState(darkIconTheme);
  const [navIsIntersect, setNavIsIntersect] = useState(false);

  const body = document.querySelector("body");

  const value = {
    config,
    genreListMovie,
    genreListTv,
    languages,
    setLanguages,
    setTheme,
    preferedTheme,
    iconTheme,
    navIsIntersect,
    setNavIsIntersect,
  };

  useEffect(() => {
    if (preferedTheme === "dark") {
      setIconTheme(darkIconTheme);
      body.dataset.theme = "dark";
      window.localStorage.preferedTheme = "dark";
    } else if (preferedTheme === "light") {
      setIconTheme(lightIconTheme);
      body.dataset.theme = "light";
      window.localStorage.preferedTheme = "light";
    }
  }, [preferedTheme, body.dataset]);

  useEffect(() => {
    if (window.localStorage.preferedTheme) {
      setTheme(window.localStorage.preferedTheme);
    } else return;
  }, []);

  useEffect(() => {
    if (window.localStorage.language) {
      setLanguages(window.localStorage.language);
    } else {
      setLanguages("en-US");
    }
  }, []);

  useEffect(() => {
    const fetchConfig = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/configuration?api_key=3e2abd7e10753ed410ed7439f7e1f93f"
        )
        .then((res) => setConfig(res.data.images))
        .catch((err) => console.log(err));
      return result;
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    const fetchGenreListMovie = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US"
        )
        .then((res) => setGenreListMovie(res.data.genres))
        .catch((err) => console.log(err));
      return result;
    };
    fetchGenreListMovie();
  }, []);

  useEffect(() => {
    const fetchGenreListTv = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/genre/tv/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US"
        )
        .then((res) => setGenreListTv(res.data.genres))
        .catch((err) => console.log(err));
      return result;
    };
    fetchGenreListTv();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
