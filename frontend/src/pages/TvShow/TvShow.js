import React, { useState, useEffect, useContext } from "react";

import TrendsBanner from "../../components/Container/Trends/TrendsBanner";
import HorizontalCarousel from "../../components/Container/HorizontalCarousel/HorizontalCarousel";
import Promoted from "../../components/Container/Promoted/Promoted";
import Genre from "../../components/Container/Genre/Genre";
import useFetch from "../../utils/hooks/useFetch";
import AppContext from "../../utils/Context/AppContextProvider";
import LoaderUI from "../../components/Loader/LoaderUI";
import Footer from "../../components/Footer/Footer";

import {
  useGetLastReleaseTvshowQuery,
  useGetPromotedTvshowQuery,
  useGetTrendsTvshowQuery,
  useGetTvshowOnAirQuery,
} from "../../features/content/tmdbAPI";

const TvShow = () => {
  let promotedElementPageNumber = 1;
  const { languages } = useContext(AppContext);

  const [mainIsLoading, setMainIsLoading] = useState(true);

  const { data: promotedTvShows, isLoading: isLoadingPromotedTvshow } =
    useGetPromotedTvshowQuery(languages, promotedElementPageNumber);
  const { data: lastReleaseTvShow, isLoading: isLoadingLastReleaseTvshow } =
    useGetLastReleaseTvshowQuery(languages);
  const { data: tvShowOnAir, isLoading: isLoadingTvshowOnAir } =
    useGetTvshowOnAirQuery(languages);
  const { data: trendingTvShows, isLoading: isLoadingTrendTvshow } =
    useGetTrendsTvshowQuery(languages);

  useEffect(() => {
    let arr = [
      isLoadingPromotedTvshow,
      isLoadingLastReleaseTvshow,
      isLoadingTvshowOnAir,
      isLoadingTrendTvshow,
    ];
    setMainIsLoading(arr.some((l) => l));
  }, [
    isLoadingPromotedTvshow,
    isLoadingLastReleaseTvshow,
    isLoadingTvshowOnAir,
    isLoadingTrendTvshow,
  ]);

  return (
    <>
      <div className="app">
        {mainIsLoading ? (
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
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default TvShow;
