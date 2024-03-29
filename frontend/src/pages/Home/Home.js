import React, { useEffect, useState, useContext, useRef } from "react";
import TrendsBanner from "../../components/Container/Trends/TrendsBanner";
import HorizontalCarousel from "../../components/Container/HorizontalCarousel/HorizontalCarousel";
import Genre from "../../components/Container/Genre/Genre";
import LoaderUI from "../../components/Loader/LoaderUI";
import HeaderHome from "../../components/Container/HeaderHome/HeaderHome";
import Promoted from "../../components/Container/Promoted/Promoted";
import Spacer from "../../components/Container/HeaderHome/Spacer";
import { HomeContextProvider } from "../../utils/Context/HomeContextProvider";
import AppContext from "../../utils/Context/AppContextProvider";
import {
  useGetAllPromotedMoviesQuery,
  useGetAllTrendsQuery,
  useGetLastReleaseMovieQuery,
  useGetLastReleaseTvshowQuery,
  useGetPlayingNowMovieQuery,
  useGetPopularMovieQuery,
  useGetPopularTvshowQuery,
  useGetTopRatedMovieQuery,
  useGetTopRatedTvshowQuery,
} from "../../features/content/tmdbAPI";
import { Outlet } from "react-router-dom";
import { getUserData } from "../../features/user/slice/user.slice";
import UserContext from "../../utils/Context/UserContextProvider";
import { useDispatch } from "react-redux";
import PromotedMediaContext from "../../utils/Context/PromotedMediaProvider";

const Home = () => {
  const { languages, setNavIsIntersect } = useContext(AppContext);
  const { uniqueArraysIndexMovie, uniqueArraysIndexTvshow } =
    useContext(PromotedMediaContext);
  const { userID, isAuth } = useContext(UserContext);
  const [mainIsLoading, setMainIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { currentData: playingNowMovie, isSuccess: isSuccesPlayingNowMovie } =
    useGetPlayingNowMovieQuery(languages);

  const { data: popularMovies, isLoading: isLoadingPopularMovies } =
    useGetPopularMovieQuery(languages);

  const { data: popularTvShow, isLoading: isLoadingPopularTvshow } =
    useGetPopularTvshowQuery(languages);

  const { data: topRatedMovies, isLoading: isLoadingTopRatedMovie } =
    useGetTopRatedMovieQuery(languages);

  const { data: topRatedShow, isLoading: isLoadingTopRatedTvshow } =
    useGetTopRatedTvshowQuery(languages);

  const { data: trendingAll, isLoading: isLoadingAllTrends } =
    useGetAllTrendsQuery(languages);

  const { data: lastReleaseMovies, isLoading: isloadingLastReleaseMovie } =
    useGetLastReleaseMovieQuery(languages);

  const { data: lastReleaseTvShow, isLoading: isLoadingLastReleaseTvshow } =
    useGetLastReleaseTvshowQuery(languages);

  useEffect(() => {
    let arr = [
      isLoadingPopularMovies,
      isLoadingPopularTvshow,
      isLoadingTopRatedMovie,
      isLoadingTopRatedTvshow,
      isLoadingAllTrends,
      isloadingLastReleaseMovie,
      isLoadingLastReleaseTvshow,
    ];
    setMainIsLoading(arr.some((l) => l));
  }, [
    isLoadingPopularMovies,
    isLoadingPopularTvshow,
    isLoadingTopRatedMovie,
    isLoadingTopRatedTvshow,
    isLoadingAllTrends,
    isloadingLastReleaseMovie,
    isLoadingLastReleaseTvshow,
  ]);

  const headerHome = useRef();

  useEffect(() => {
    if (headerHome.current) {
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
      observer.observe(headerHome.current);
      return () => observer.disconnect(headerHome.current);
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserData(userID));
    }
  }, [userID, isAuth]);

  return (
    <HomeContextProvider>
      <Outlet />
      {isSuccesPlayingNowMovie ? (
        <HeaderHome content={playingNowMovie} ref={headerHome} />
      ) : (
        <LoaderUI position={"fixed"} overlay="true" />
      )}
      <Spacer />
      <div className="app">
        <div className="main">
          {mainIsLoading ? (
            <LoaderUI fixed={true} overlay="true" />
          ) : (
            <>
              <HorizontalCarousel
                content={[...lastReleaseMovies, ...lastReleaseTvShow]}
                title="What has been out lately"
              />
              <TrendsBanner
                content={trendingAll}
                title={"What is Trending now"}
              />
              <HorizontalCarousel
                content={[...popularMovies, ...popularTvShow]}
                title="You should look at it "
              />
              <HorizontalCarousel
                content={[...topRatedMovies, ...topRatedShow]}
                title="What users like the most"
              />
              <Promoted
                indexes={uniqueArraysIndexMovie[0]}
                mediaType={"movie"}
              />
              <Genre dataToDisplay="Both" numberContainerToDisplay={3} />
              <Promoted indexes={uniqueArraysIndexTvshow[0]} mediaType={"tv"} />
            </>
          )}
        </div>
      </div>
    </HomeContextProvider>
  );
};

export default Home;
