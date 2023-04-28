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
  useGetUpcomingMovieQuery,
} from "../../features/content/tmdbAPI";
import { Outlet } from "react-router";
import PromotedMediaContext from "../../utils/Context/PromotedMediaProvider";

const Films = () => {
  const { languages, setNavIsIntersect } = useContext(AppContext);
  const { uniqueArraysIndexMovie } = useContext(PromotedMediaContext);

  const [mainIsLoading, setMainIsLoading] = useState(true);

  const { data: lastReleaseMovies, isLoading: isloadingLastReleaseMovie } =
    useGetLastReleaseMovieQuery(languages);
  const { data: upcomingMovies, isLoading: isLoadingUpcomingMovie } =
    useGetUpcomingMovieQuery(languages);
  const { data: popularMovies, isLoading: isLoadingPopularMovies } =
    useGetPopularMovieQuery(languages);

  useEffect(() => {
    let arr = [
      isLoadingPopularMovies,
      isloadingLastReleaseMovie,
      isLoadingUpcomingMovie,
    ];
    setMainIsLoading(arr.some((l) => l));
  }, [
    isLoadingPopularMovies,
    isLoadingUpcomingMovie,
    isloadingLastReleaseMovie,
  ]);

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
  }, []);

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
          <Promoted indexes={uniqueArraysIndexMovie[1]} mediaType={"movie"} />
          <HorizontalCarousel content={popularMovies} title="Popular" />
          <Genre dataToDisplay="movie" numberContainerToDisplay={5} />
          <Promoted indexes={uniqueArraysIndexMovie[2]} mediaType={"movie"} />
        </div>
      )}
    </div>
  );
};

export default Films;
