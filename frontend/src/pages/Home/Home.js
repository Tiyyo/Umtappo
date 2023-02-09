import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Loader from "../../components/Loader/Loader";
import LoaderUI from "../../components/Loader/LoaderUI";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import Trendings from "../../components/Container/Trendings";
import DisplaySearchResult from "../../utils/DisplaySearchResult";
import Recommendations from "../../components/Container/Recommendations";
import ProfileBtn from "../../components/Navigation/ProfileBtn";
import HonrizontalCarousel from "../../components/Container/HonrizontalCarousel";
import useFetch from "../../utils/useFetch";
import useSearch from "../../utils/useSearch";
import HeaderHome from "../../components/Container/HeaderHome";
import Spacer from "../../components/Container/Spacer";
import Promoted from "../../components/Container/Promoted";
import { CircularProgress } from "@mui/material";
import FavoriteGenre from "../../components/Container/FavoriteGenre";
import HomeContext, {
  HomeContextProvider,
} from "../../utils/Context/HomeContextProvider";
import { useContext } from "react";
import { useCallback } from "react";

const Home = () => {
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);

  const [promotedElementPageNumber, setPromotedElementPageNumber] = useState(1);
  const [promotedShowElementPageNumber, setPromotedShowElementPageNumber] =
    useState(1);

  useEffect(() => {
    setPromotedElementPageNumber(Math.ceil(Math.random() * +1));
    setPromotedShowElementPageNumber(1);
  }, []);

  const trendingAllUrl =
    "https://api.themoviedb.org/3/trending/all/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f";

  const lastReleaseMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=true&page=1&release_date.lte=${date}&watch_region=FR&with_watch_monetization_types=flatrate`;

  const lastReleaseTvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=popularity.asc&air_date.lte=${date}&page=1&timezone=Europe%2FParis&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const promotedMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${promotedElementPageNumber}&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate`;

  const promotedShowsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=vote_average.desc&page=${promotedShowElementPageNumber}&vote_average.gte=6&vote_count.gte=50&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const playingNowMovieUrl =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1&region=US";

  const topRatedShowUrl =
    "https://api.themoviedb.org/3/tv/top_rated?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1";

  const topRatedMoviesUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1&region=FR";

  const popularMoviesUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1&region=FR";

  const popularTvShowsUrl =
    "https://api.themoviedb.org/3/tv/popular?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1";

  const [searchIsActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [navIsOpen, setNavOpen] = useState(false);

  const ref = useRef();

  const handleScroll = useCallback(() => {
    console.log("i'm scrolling");
  }, []);

  useEffect(() => {
    const mainDiv = ref.current;
    console.log(mainDiv);
    mainDiv.addEventListener("scroll", () => {
      handleScroll();
    });
  }, [handleScroll]);

  const token = {
    headers: {
      Authorizarion:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTJhYmQ3ZTEwNzUzZWQ0MTBlZDc0MzlmN2UxZjkzZiIsInN1YiI6IjYzYWNhZjI2YmU0YjM2MDA4YTZjNzFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMRrpkyDtkLPeFuYLeahtwVp_wU8c9Xo4ynqvH-KJhk",
      ContentType: "application/json;charset=utf-8",
    },
  };

  const pullInputValue = (inputValue) => {
    setInputSearchValue(inputValue);
    if (inputValue.length >= 1) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  const pullSearchOpenState = (state) => {
    if (state === true) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  const pullPageNumber = (something) => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const pullNavState = (something) => {
    setNavOpen(something);
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

  const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&query=${inputSearchValue}&page=${pageNumber}&include_adult=false`;

  const search = useSearch(inputSearchValue, pageNumber);

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

  useEffect(() => {
    setPageNumber(1);
  }, [inputSearchValue]);

  return (
    <HomeContextProvider>
      <div
        className="app"
        ref={ref}
        onClick={() => {
          if (navIsOpen) {
            setNavOpen(false);
          }
        }}
      >
        <div className="header">
          <Navigation getNavState={pullNavState} parentNavState={navIsOpen} />
          <SearchBar
            getInputValue={pullInputValue}
            getOpenState={pullSearchOpenState}
          />
          <ProfileBtn />
        </div>
        {searchIsActive === true ? (
          <DisplaySearchResult search={search} getPageNumber={pullPageNumber} />
        ) : loading ? (
          <div className="main">
            <HeaderHome content={playingNowMovie} />
            <Spacer />
            <div>
              <HonrizontalCarousel
                content={lastReleaseAll}
                title="What has been out lately "
              />
              <Trendings content={trendingAll} title={"What is Trending now"} />
              <HonrizontalCarousel
                content={popularElements}
                title="You should look at it "
              />
              <HonrizontalCarousel
                content={topRated}
                title="What users like the most"
              />
              <Promoted content={promotedElements} />
              <FavoriteGenre dataToDisplay="Both" />
              <Promoted content={promotedElements} />
            </div>
          </div>
        ) : (
          <LoaderUI />
        )}
      </div>
    </HomeContextProvider>
  );
};

export default Home;
