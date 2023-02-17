import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [genreListMovie, setGenreListMovie] = useState([]);
  const [genreListTv, setGenreListTv] = useState([]);
  const [languages, setLanguages] = useState("en-US");

  const value = {
    config,
    genreListMovie,
    genreListTv,
    languages,
    setLanguages,
  };

  useEffect(() => {
    const fetchConfig = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/configuration?api_key=3e2abd7e10753ed410ed7439f7e1f93f"
        )
        .then((res) => setConfig(res.data.images));
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    const fetchGenreListMovie = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US"
        )
        .then((res) => setGenreListMovie(res.data.genres));
    };
    fetchGenreListMovie();
  }, []);

  useEffect(() => {
    const fetchGenreListTv = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/genre/tv/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US"
        )
        .then((res) => setGenreListTv(res.data.genres));
    };
    fetchGenreListTv();
  }, []);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
