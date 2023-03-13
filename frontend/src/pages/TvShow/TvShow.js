import React, { useState, useEffect, useContext } from "react";

import TrendsBanner from "../../components/Container/Trends/TrendsBanner";
import HorizontalCarousel from "../../components/Container/HorizontalCarousel/HorizontalCarousel";
import Promoted from "../../components/Container/Promoted/Promoted";
import Genre from "../../components/Container/Genre/Genre";
import useFetch from "../../utils/hooks/useFetch";
import AppContext from "../../utils/Context/AppContextProvider";
import LoaderUI from "../../components/Loader/LoaderUI";

const TvShow = () => {
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);
  let promotedElementPageNumber = 1;
  const { languages } = useContext(AppContext);

  const trendingTvShowUrl =
    "https://api.themoviedb.org/3/trending/tv/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f";

  const lastReleaseTvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=popularity.desc&air_date.lte=${date}&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  // const recommendationsTvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=vote_average.desc&page=1&vote_average.gte=6&vote_count.gte=100&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const tvShowOnAirUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&page=1`;

  const promotedShowsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&sort_by=vote_average.desc&page=${promotedElementPageNumber}&vote_average.gte=6&vote_count.gte=100&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const [loading, setLoading] = useState(false);

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
  }, [loadTrends, loadLastTvShows, loadTvShowOnAir, loadPromotedShow]);

  return (
    <div className="app">
      {!loading ? (
        <div className="loading">
          <LoaderUI />
        </div>
      ) : (
        <div className="main">
          <TrendsBanner content={tvShowOnAir} title="On TV Today" />
          <HorizontalCarousel
            content={lastReleaseTvShow}
            title="What has been out lately"
          />
          <HorizontalCarousel
            content={trendingTvShows}
            title={"What is Trending now"}
          />
          <Promoted content={promotedTvShows} />
          <Genre dataToDisplay="TvShow" />
          <Promoted content={promotedTvShows} />
        </div>
      )}
    </div>
  );
};

export default TvShow;
