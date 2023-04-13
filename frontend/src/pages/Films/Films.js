import React, { useState, useEffect, useRef, useContext } from "react";
import TrendsBanner from "../../components/Container/Trends/TrendsBanner";
import HorizontalCarousel from "../../components/Container/HorizontalCarousel/HorizontalCarousel";
import Genre from "../../components/Container/Genre/Genre";
import Promoted from "../../components/Container/Promoted/Promoted";
import LoaderUI from "../../components/Loader/LoaderUI";
import AppContext from "../../utils/Context/AppContextProvider";
import {
  useGetLastReleaseMovieQuery,
  useGetPopularMovieQuery,
  useGetPromotedMovieQuery,
  useGetUpcomingMovieQuery,
} from "../../features/content/tmdbAPI";
import { Outlet } from "react-router";

const Films = () => {
  const promotedElementPageNumber = useRef();
  const { languages, setNavIsIntersect } = useContext(AppContext);

  const [mainIsLoading, setMainIsLoading] = useState(true);

  const { data: promotedMovies, isLoading: isLoadingPromotedMovie } =
    useGetPromotedMovieQuery(languages, promotedElementPageNumber);
  const { data: lastReleaseMovies, isLoading: isloadingLastReleaseMovie } =
    useGetLastReleaseMovieQuery(languages);
  const { data: upcomingMovies, isLoading: isLoadingUpcomingMovie } =
    useGetUpcomingMovieQuery(languages);
  const { data: popularMovies, isLoading: isLoadingPopularMovies } =
    useGetPopularMovieQuery(languages);

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

  const mainDiv = useRef();

  useEffect(() => {
    if (mainDiv.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            setNavIsIntersect(true);
          } else if (entry.isIntersecting) {
            setNavIsIntersect(false);
          }
        },
        { rootMargin: "5px" }
      );
      observer.observe(mainDiv.current);
    }
  }, [mainDiv.current]);

  return (
    <div className="app">
      <Outlet />
      {mainIsLoading ? (
        <LoaderUI position={"fixed"} />
      ) : (
        <div className="main">
          <div ref={mainDiv}></div>
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
          <Genre dataToDisplay="movie" numberContainerToDisplay={5} />
          <Promoted content={promotedMovies} />
        </div>
      )}
    </div>
  );
};

export default Films;
