import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../../utils/Context/AppContextProvider";
import SimilarContent from "./SimilarContent";
import Casts from "./Casts";
import Synopsis from "./Synopsis";
import Attributes from "./Attributes";
import CallToAction from "./CallToAction";
import Video from "./Video";
import {
  useGetInfosModalQuery,
  useGetVideosQuery,
  useGetCreditsQuery,
  useGetSimilarsQuery,
} from "../../features/content/tmdbAPI";
import LoaderUI from "../Loader/LoaderUI";
import { useDispatch } from "react-redux";
import UserContext from "../../utils/Context/UserContextProvider";
import { getIdsMoviesLiked } from "../../features/movie liked/Slice/likes.slice";
import { getIdsTvshowsLiked } from "../../features/tvshow liked/slice/like.slice";
import { getRating } from "../../features/rating/slice/rating.slice";

const MediaElement = () => {
  //--- Destructuring
  const location = useLocation();
  const dispatch = useDispatch();
  const { content } = location.state;

  const { media_type, id } = content;

  const { languages } = useContext(AppContext);
  const { userID } = useContext(UserContext);

  const params = { id, media_type, languages };

  const {
    data,
    isLoading: isLoadingMain,
    isSuccess: isSuccessMain,
  } = useGetInfosModalQuery({ params });

  const {
    currentData: videos,
    isLoading: isLoadingVideo,
    isSucces: isSuccessVideo,
  } = useGetVideosQuery({ params });

  const {
    currentData: credits,
    isLoading: isLoadingCredits,
    isSuccess: isSuccessCredits,
  } = useGetCreditsQuery({ params });

  const {
    currentData: similars,
    isLoading: isLoadingSimilars,
    isSuccess: isSuccessSimilars,
  } = useGetSimilarsQuery({ params });

  useEffect(() => {
    dispatch(getIdsMoviesLiked(userID));
    dispatch(getIdsTvshowsLiked(userID));
    dispatch(getRating(userID));
  }, []);

  return (
    <>
      <div className="media-element">
        {console.log("fire")}
        {isLoadingVideo & !isSuccessVideo ? (
          <LoaderUI overlay={"true"} fixed={"true"} />
        ) : (
          <Video content={content} videos={videos} loading={isLoadingVideo} />
        )}
        <CallToAction content={data} media_type={media_type} id={id} />
        <div className="media-element__title">
          {content.title || content.name}
        </div>
        {isLoadingMain && !isSuccessMain ? (
          <LoaderUI overlay={"true"} fixed={"true"} />
        ) : (
          <>
            <Synopsis content={data} />
            <Attributes content={data} type={content.media_type} />
          </>
        )}
        {isLoadingCredits && !isSuccessCredits ? (
          <LoaderUI overlay={"true"} fixed={"true"} size={"0.7rem"} />
        ) : (
          <Casts credits={credits} />
        )}
        {isLoadingSimilars && !isSuccessSimilars ? (
          <LoaderUI overlay={"true"} fixed={"true"} size={"0.5rem"} />
        ) : (
          <SimilarContent similars={similars} />
        )}
      </div>
    </>
  );
};

export default MediaElement;
