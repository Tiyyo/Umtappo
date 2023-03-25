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
import Footer from "../../components/Footer/Footer";
import {
  useGetAllTrendsQuery,
  useGetLastReleaseMovieQuery,
  useGetLastReleaseTvshowQuery,
  useGetPlayingNowMovieQuery,
  useGetPopularMovieQuery,
  useGetPopularTvshowQuery,
  useGetPromotedMovieQuery,
  useGetPromotedTvshowQuery,
  useGetTopRatedMovieQuery,
  useGetTopRatedTvshowQuery,
} from "../../features/content/tmdbAPI";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  const { languages, setNavIsIntersect } = useContext(AppContext);

  const [promotedElementPageNumber, setPromotedElementPageNumber] = useState(1);
  const [promotedShowElementPageNumber, setPromotedShowElementPageNumber] =
    useState(1);
  const [mainIsLoading, setMainIsLoading] = useState(true);

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

  const { data: promotedMovies, isLoading: isLoadingPromotedMovie } =
    useGetPromotedMovieQuery(languages, promotedElementPageNumber);

  const { data: promotedTvShows, isLoading: isLoadingPromotedTvshow } =
    useGetPromotedTvshowQuery(languages, promotedElementPageNumber);

  const { data: lastReleaseMovies, isLoading: isloadingLastReleaseMovie } =
    useGetLastReleaseMovieQuery(languages);

  const { data: lastReleaseTvShow, isLoading: isLoadingLastReleaseTvshow } =
    useGetLastReleaseTvshowQuery(languages);

  useEffect(() => {
    setPromotedElementPageNumber(Math.ceil(Math.random() * +1));
    setPromotedShowElementPageNumber(1);
  }, []);

  useEffect(() => {
    let arr = [
      isLoadingPopularMovies,
      isLoadingPopularTvshow,
      isLoadingTopRatedMovie,
      isLoadingTopRatedTvshow,
      isLoadingAllTrends,
      isLoadingPromotedMovie,
      isLoadingPromotedTvshow,
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
    isLoadingPromotedMovie,
    isLoadingPromotedTvshow,
    isloadingLastReleaseMovie,
    isLoadingLastReleaseTvshow,
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
      return () => observer.disconnect(mainDiv.current);
    }
  }, [mainDiv.current]);

  return (
    <HomeContextProvider>
      <Outlet />
      {isSuccesPlayingNowMovie ? (
        <HeaderHome content={playingNowMovie} />
      ) : (
        <LoaderUI fixed={true} overlay="true" />
      )}
      <Spacer />
      <div className="app">
        <div className="main">
          <div ref={mainDiv}></div>
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
              <Promoted content={[...promotedMovies, ...promotedTvShows]} />
              <Genre dataToDisplay="Both" />
              <Promoted content={[...promotedMovies, ...promotedTvShows]} />
              <Link to={"modal"}>
                <button type="button">Link to outlet</button>
              </Link>

              <Footer />
            </>
          )}
        </div>
      </div>
    </HomeContextProvider>
  );
};

export default Home;
