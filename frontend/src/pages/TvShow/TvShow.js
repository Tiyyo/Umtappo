import React, { useState, useEffect } from "react";
import Trendings from "../../components/Container/Trendings";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import HorizontalCarousel from "../../components/Container/HonrizontalCarousel";
import useFetch from "../../utils/useFetch";
import DisplaySearchResult from "../../utils/DisplaySearchResult";
import axios from "axios";
import ProfileBtn from "../../components/Navigation/ProfileBtn";
import useSearchShow from "../../utils/useSearchShow";
import Promoted from "../../components/Container/Promoted";
import FavoriteGenre from "../../components/Container/FavoriteGenre";
import { CircularProgress } from "@mui/material";

const TvShow2 = () => {
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);
  let promotedElementPageNumber = 1;

  const trendingTvShowUrl =
    "https://api.themoviedb.org/3/trending/tv/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f";

  const lastReleaseTvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=popularity.desc&air_date.lte=${date}&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const recommendationsTvShowUrl =
    "https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=vote_average.desc&page=1&vote_average.gte=6&vote_count.gte=100&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0";

  const tvShowOnAirUrl =
    "https://api.themoviedb.org/3/tv/on_the_air?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1";

  const promotedShowsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=vote_average.desc&page=${promotedElementPageNumber}&vote_average.gte=6&vote_count.gte=100&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const [searchIsActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState([]);
  const [genreListMovie, setGenreListMovie] = useState([]);
  const [genreListTv, setGenreListTv] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [navIsOpen, setNavOpen] = useState(false);

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

  const { content: trendingTvShows, loading: loadTrends } =
    useFetch(trendingTvShowUrl);

  const { content: lastReleaseTvShow, loading: loadLastTvShows } =
    useFetch(lastReleaseTvShowUrl);

  const { content: tvShowOnAir, loading: loadTvShowOnAir } =
    useFetch(tvShowOnAirUrl);

  const { content: promotedTvShows, loading: loadPromotedShow } =
    useFetch(promotedShowsUrl);

  let loadsArray = [
    loadTrends,
    loadLastTvShows,
    loadTvShowOnAir,
    loadPromotedShow,
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
    setPageNumber(1);
  }, [inputSearchValue]);

  const search = useSearchShow(inputSearchValue, pageNumber);
  return (
    <div
      className="app"
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
      {searchIsActive ? (
        <DisplaySearchResult search={search} getPageNumber={pullPageNumber} />
      ) : !loading ? (
        <div className="loading">
          <CircularProgress sx={{ color: "#fb8c00" }} />
        </div>
      ) : (
        <div className="main">
          <Trendings content={tvShowOnAir} title="On TV Today" />
          <HorizontalCarousel
            content={lastReleaseTvShow}
            title="What has been out lately"
          />
          <HorizontalCarousel
            content={trendingTvShows}
            title={"What is Trending now"}
          />
          <Promoted content={promotedTvShows} />
          <FavoriteGenre dataToDisplay="TvShow" />
          <Promoted content={promotedTvShows} />
        </div>
      )}
    </div>
  );
};

export default TvShow2;
