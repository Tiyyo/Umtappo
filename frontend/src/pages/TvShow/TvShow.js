import React, { useState, useEffect, useContext, useRef } from "react";
import TrendsBanner from "../../components/Container/Trends/TrendsBanner";
import HorizontalCarousel from "../../components/Container/HorizontalCarousel/HorizontalCarousel";
import Promoted from "../../components/Container/Promoted/Promoted";
import Genre from "../../components/Container/Genre/Genre";
import AppContext from "../../utils/Context/AppContextProvider";
import LoaderUI from "../../components/Loader/LoaderUI";
import {
  useGetLastReleaseTvshowQuery,
  useGetTrendsTvshowQuery,
  useGetTvshowOnAirQuery,
} from "../../features/content/tmdbAPI";
import { Outlet } from "react-router";
import PromotedMediaContext from "../../utils/Context/PromotedMediaProvider";

const TvShow = () => {
  const { languages, setNavIsIntersect } = useContext(AppContext);
  const { uniqueArraysIndexTvshow } = useContext(PromotedMediaContext);

  const [mainIsLoading, setMainIsLoading] = useState(true);

  const { data: lastReleaseTvShow, isLoading: isLoadingLastReleaseTvshow } =
    useGetLastReleaseTvshowQuery(languages);
  const { data: tvShowOnAir, isLoading: isLoadingTvshowOnAir } =
    useGetTvshowOnAirQuery(languages);
  const { data: trendingTvShows, isLoading: isLoadingTrendTvshow } =
    useGetTrendsTvshowQuery(languages);

  useEffect(() => {
    let arr = [
      isLoadingLastReleaseTvshow,
      isLoadingTvshowOnAir,
      isLoadingTrendTvshow,
    ];
    setMainIsLoading(arr.some((l) => l));
  }, [isLoadingLastReleaseTvshow, isLoadingTvshowOnAir, isLoadingTrendTvshow]);

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
    <>
      <div className="app">
        <Outlet />
        {mainIsLoading ? (
          <div className="loading">
            <LoaderUI position={"fixed"} />
          </div>
        ) : (
          <div className="main">
            <div ref={mainDiv}></div>
            <TrendsBanner content={tvShowOnAir} title="On TV Today" />
            <HorizontalCarousel
              content={lastReleaseTvShow}
              title="What has been out lately"
            />
            <HorizontalCarousel
              content={trendingTvShows}
              title={"What is Trending now"}
            />
            <Promoted indexes={uniqueArraysIndexTvshow[1]} mediaType={"tv"} />
            <Genre dataToDisplay="tv" numberContainerToDisplay={5} />
            <Promoted indexes={uniqueArraysIndexTvshow[2]} mediaType={"tv"} />
          </div>
        )}
      </div>
    </>
  );
};

export default TvShow;
