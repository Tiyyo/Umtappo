import React, { useEffect, useState, useContext } from "react";
import TrendsBanner from "../../components/Container/Trends/TrendsBanner";
import HorizontalCarousel from "../../components/Container/HorizontalCarousel/HorizontalCarousel";
import Genre from "../../components/Container/Genre/Genre";
import LoaderUI from "../../components/Loader/LoaderUI";
import HeaderHome from "../../components/Container/HeaderHome/HeaderHome";
import Promoted from "../../components/Container/Promoted/Promoted";
import Spacer from "../../components/Container/HeaderHome/Spacer";
import useFetch from "../../utils/hooks/useFetch";
import { HomeContextProvider } from "../../utils/Context/HomeContextProvider";
import AppContext from "../../utils/Context/AppContextProvider";
import { useOutletContext } from "react-router";
import Footer from "../../components/Footer/Footer";

const Home = React.forwardRef((props, ref) => {
  const data = useOutletContext();

  let currentDate = new Date();
  const date = currentDate.setMonth(-1);
  const { languages } = useContext(AppContext);

  const [promotedElementPageNumber, setPromotedElementPageNumber] = useState(1);
  const [promotedShowElementPageNumber, setPromotedShowElementPageNumber] =
    useState(1);

  useEffect(() => {
    setPromotedElementPageNumber(Math.ceil(Math.random() * +1));
    setPromotedShowElementPageNumber(1);
  }, []);

  const trendingAllUrl =
    "https://api.themoviedb.org/3/trending/all/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f";

  const lastReleaseMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=release_date.desc&include_adult=false&include_video=true&page=1&release_date.lte=${date}&watch_region=FR&with_watch_monetization_types=flatrate`;

  const lastReleaseTvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=popularity.asc&air_date.lte=${date}&page=1&timezone=Europe%2FParis&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const promotedMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${promotedElementPageNumber}&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate`;

  const promotedShowsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=vote_average.desc&page=${promotedShowElementPageNumber}&vote_average.gte=6&vote_count.gte=50&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const playingNowMovieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&page=1&region=US`;

  const topRatedShowUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}S&page=1`;

  const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}S&page=1&region=FR`;

  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}S&page=1&region=FR`;

  const popularTvShowsUrl = `https://api.themoviedb.org/3/tv/popular?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}S&page=1`;

  const [loading, setLoading] = useState(false);
  // const ref = useRef();

  const token = {
    headers: {
      Authorizarion:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTJhYmQ3ZTEwNzUzZWQ0MTBlZDc0MzlmN2UxZjkzZiIsInN1YiI6IjYzYWNhZjI2YmU0YjM2MDA4YTZjNzFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMRrpkyDtkLPeFuYLeahtwVp_wU8c9Xo4ynqvH-KJhk",
      ContentType: "application/json;charset=utf-8",
    },
  };

  const { content: trendingAll, loading: loadTrends } =
    useFetch(trendingAllUrl);

  const { content: lastReleaseMovies, loading: loadLastMovies } =
    useFetch(lastReleaseMoviesUrl);

  const { content: lastReleaseTvShow, loading: loadLastTvShows } =
    useFetch(lastReleaseTvShowUrl);

  const lastReleaseAll = [...lastReleaseMovies, ...lastReleaseTvShow];

  const { content: promotedMovies, loading: loadPromotedMovie } =
    useFetch(promotedMoviesUrl);

  const { content: promotedTvShows, loading: loadPromotedShow } =
    useFetch(promotedShowsUrl);

  const promotedElements = [...promotedTvShows, ...promotedMovies];

  const { content: topRatedMovies, loading: loadTopRatedMovie } =
    useFetch(topRatedMoviesUrl);

  const { content: topRatedShow, loading: loadTopRatedShow } =
    useFetch(topRatedShowUrl);

  const topRated = [...topRatedMovies, ...topRatedShow];

  const { content: popularMovies, loading: loadPopularMovie } =
    useFetch(popularMoviesUrl);

  const { content: popularTvShow, loading: loadPopularTvShow } =
    useFetch(popularTvShowsUrl);

  const popularElements = [...popularTvShow, ...popularMovies];

  const {
    content: playingNowMovie,
    error: playingNowMovieError,
    loading: loadPlayingNowMovie,
  } = useFetch(playingNowMovieUrl);

  let loadsArray = [
    loadTrends,
    loadLastMovies,
    loadLastTvShows,
    loadPromotedMovie,
    loadPromotedShow,
    loadPlayingNowMovie,
    loadTopRatedMovie,
    loadTopRatedShow,
    loadPopularTvShow,
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
  }, loadsArray);

  const { mainRef } = useOutletContext();

  return (
    <HomeContextProvider>
      <HeaderHome content={playingNowMovie} />
      <Spacer />
      <div className="app">
        {loading ? (
          <div className="main" ref={mainRef}>
            <div>
              <HorizontalCarousel
                content={lastReleaseAll}
                title="What has been out lately "
              />
              <TrendsBanner
                content={trendingAll}
                title={"What is Trending now"}
              />
              <HorizontalCarousel
                content={popularElements}
                title="You should look at it "
              />
              <HorizontalCarousel
                content={topRated}
                title="What users like the most"
              />
              <Promoted content={promotedElements} />
              <Genre dataToDisplay="Both" />
              <Promoted content={promotedElements} />
              <Footer />
            </div>
          </div>
        ) : (
          <LoaderUI />
        )}
      </div>
    </HomeContextProvider>
  );
});

export default Home;
