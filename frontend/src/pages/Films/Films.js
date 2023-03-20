import React, { useState, useEffect, useRef, useContext } from "react";
import TrendsBanner from "../../components/Container/Trends/TrendsBanner";
import HorizontalCarousel from "../../components/Container/HorizontalCarousel/HorizontalCarousel";
import Genre from "../../components/Container/Genre/Genre";
import Promoted from "../../components/Container/Promoted/Promoted";
import LoaderUI from "../../components/Loader/LoaderUI";

import useFetch from "../../utils/hooks/useFetch";
import AppContext from "../../utils/Context/AppContextProvider";
import Footer from "../../components/Footer/Footer";

const Films = () => {
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);
  const promotedElementPageNumber = useRef();
  const { languages } = useContext(AppContext);

  const upcomingMovieUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&page=1&region=FR`;

  const lastReleaseMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&region=FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=${date}&watch_region=FR&with_watch_monetization_types=flatrate`;

  const recommendationsMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate`;

  const promotedMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${promotedElementPageNumber.current}&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate`;

  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&page=1&region=FR`;

  const [loading, setLoading] = useState(false);

  const { content: upcomingMovies, loading: loadTrends } =
    useFetch(upcomingMovieUrl);

  const { content: lastReleaseMovies, loading: loadLastMovies } =
    useFetch(lastReleaseMoviesUrl);

  const { content: recommendationsMovie, loading: loadRecommendMovies } =
    useFetch(recommendationsMoviesUrl);

  const { content: promotedMovies, loading: loadPromotedMovie } =
    useFetch(promotedMoviesUrl);

  const { content: popularMovies, loading: loadPopularMovie } =
    useFetch(popularMoviesUrl);

  let loadsArray = [
    loadTrends,
    loadLastMovies,
    loadRecommendMovies,
    loadPromotedMovie,
    loadPopularMovie,
  ];

  useEffect(() => {
    const updatelLoading = () => {
      const isTrue = (el) => {
        return el === true;
      };
      return setLoading(loadsArray.every(isTrue));
    };
    updatelLoading();
  }, [loadsArray]);

  useEffect(() => {
    promotedElementPageNumber.current = Math.floor(Math.random() * 6);
  }, []);

  return (
    <div className="app">
      {!loading ? (
        <div className="loader--container">
          <LoaderUI />
        </div>
      ) : (
        <div className="main">
          <TrendsBanner
            content={upcomingMovies}
            title={"What is coming soon next"}
          />
          <HorizontalCarousel
            content={lastReleaseMovies}
            title="What has been out lately"
          />
          <Promoted content={promotedMovies} />
          <HorizontalCarousel content={popularMovies} title="Popular" />
          <Genre dataToDisplay="Movie" />
          <Promoted content={promotedMovies} />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Films;
