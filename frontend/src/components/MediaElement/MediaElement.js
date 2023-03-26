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

const MediaElement = () => {
  //--- Destructuring
  const location = useLocation();
  const { content } = location.state;
  const { languages } = useContext(AppContext);
  const { media_type: type, id } = content;

  const [formatedType, setFormatedType] = useState("");

  const formatType = () => {
    if (content.media_type === "tvshow") {
      return setFormatedType("tv");
    } else if (content.media_type === "movie") {
      return setFormatedType("movie");
    }
  };

  const params = { id: content.id, type: formatedType, languages };
  const {
    data,
    isLoading: isLoadingMain,
    isSuccess : isSuccessMain,
  } = useGetInfosModalQuery({ params });
  const { currentData: videos, isLoading: isLoadingVideo, isSucces : isSuccesVideo } = useGetVideosQuery({
    params,
  });
  const { currentData: credits, isLoading: isLoadingCredits, isSuccess : isSuccessCredits } =
    useGetCreditsQuery({
      params,
    });

  const { currentData: similars, isLoading: isLoadingSimilars, isSuccess : isSuccessSimilars } =
    useGetSimilarsQuery({
      params,
    });

  useEffect(() => {
    formatType();
  }, [content.media_type]);

  return (
    <>
      <div className="media-element">
        {isLoadingVideo & !isSuccessLoading ? (
          <LoaderUI overlay={"true"} fixed={"true"} />
        ) : (
          <Video content={content} videos={videos} loading={isLoadingVideo} />
        )}
        <CallToAction content={data} />
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

        {isLoadingSimilars && !isSuccessLoading ? (
          <LoaderUI overlay={"true"} fixed={"true"} size={"0.5rem"} />
        ) : (
          <SimilarContent similars={similars} />
        )}
      </div>
    </>
  );
};

export default MediaElement;
