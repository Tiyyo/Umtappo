import axios from "axios";
import React, { useEffect } from "react";

const useDetailsTwo = (type, id) => {
  let filmVideoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US`;

  let filmSimilarUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&page=1`;

  let filmCreditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let filmsUrl = [filmVideoUrl, filmCreditsUrl, filmSimilarUrl];

  let tvVideoUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let tvCreditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let tvSimilarUrl = `
  https://api.themoviedb.org/3/tv/${id}/similar?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&page=1`;

  let tvShowUrls = [tvVideoUrl, tvCreditsUrl, tvSimilarUrl];

  const fetchData = async (querys) => {
    axios
      .all(querys.map((url) => axios.get(url)))
      .then(axios.spread((video, credit, similar) => {}));
  };
  useEffect(() => {
    if (type === "Movie") {
      fetchData(filmsUrl);
    }
    if (type === "TvShow") {
      fetchData(tvShowUrls);
    }
  }, []);
  return "DATA";
};

export default useDetailsTwo;
