import React, { useState, useEffect, useRef, useContext } from "react";
import TrendsBanner from "../../components/Container/Trends/TrendsBanner";
import HorizontalCarousel from "../../components/Container/HorizontalCarousel/HorizontalCarousel";
import Genre from "../../components/Container/Genre/Genre";
import Promoted from "../../components/Container/Promoted/Promoted";
import LoaderUI from "../../components/Loader/LoaderUI";

import useFetch from "../../utils/hooks/useFetch";
import AppContext from "../../utils/Context/AppContextProvider";
import Footer from "../../components/Footer/Footer";
import {
  useGetLastReleaseMovieQuery,
  useGetPopularMovieQuery,
  useGetPromotedMovieQuery,
  useGetUpcomingMovieQuery,
} from "../../features/content/tmdbAPI";

const Films = () => {
  const promotedElementPageNumber = useRef();
  const { languages } = useContext(AppContext);

  const [mainIsLoading, setMainIsLoading] = useState(true);

  const recommendationsMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate`;

  // const { content: upcomingMovies, loading: loadTrends } =
  //   useFetch(upcomingMovieUrl);

  // const { content: lastReleaseMovies, loading: loadLastMovies } =
  //   useFetch(lastReleaseMoviesUrl);

  // const { content: recommendationsMovie, loading: loadRecommendMovies } =
  //   useFetch(recommendationsMoviesUrl);

  // const { content: promotedMovies, loading: loadPromotedMovie } =
  //   useFetch(promotedMoviesUrl);

  // const { content: popularMovies, loading: loadPopularMovie } =
  //   useFetch(popularMoviesUrl);

  const { data: promotedMovies, isLoading: isLoadingPromotedMovie } =
    useGetPromotedMovieQuery(languages, promotedElementPageNumber);
  const { data: lastReleaseMovies, isLoading: isloadingLastReleaseMovie } =
    useGetLastReleaseMovieQuery(languages);
  const { data: upcomingMovies, isLoading: isLoadingUpcomingMovie } =
    useGetUpcomingMovieQuery(languages);
  const {
    data: popularMovies,
    isLoading: isLoadingPopularMovies,
    isFetching,
    isError,
    error,
    isSuccess: isSuccessPopularMovie,
  } = useGetPopularMovieQuery(languages);

  useEffect(() => {
    let arr = [
      isLoadingPopularMovies,
      isLoadingPromotedMovie,
      isloadingLastReleaseMovie,
      isLoadingUpcomingMovie,
    ];
    setMainIsLoading(arr.some((l) => l));
  }, [
    isLoadingPopularMovies,
    isLoadingUpcomingMovie,
    isLoadingPromotedMovie,
    isloadingLastReleaseMovie,
  ]);

  useEffect(() => {
    promotedElementPageNumber.current = Math.floor(Math.random() * 6);
  }, []);

  return (
    <div className="app">
      {mainIsLoading ? (
        <LoaderUI fixed={true} />
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
