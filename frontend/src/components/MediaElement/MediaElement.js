import axios from "axios";
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
  useGetModalMediaQuery,
  useGetVideosQuery,
  useGetCreditsQuery,
} from "../../features/content/tmdbAPI";
import LoaderUI from "../Loader/LoaderUI";

const MediaElement = () => {
  //--- Destructuring
  const location = useLocation();
  const { content } = location.state;

  console.log(content);

  const { languages } = useContext(AppContext);
  const { media_type: type, id } = content;

  // -- Const and var
  let filmVideoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}`;

  let filmSimilarUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&page=1`;

  let filmCreditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}`;

  let filmsUrl = [filmVideoUrl, filmCreditsUrl, filmSimilarUrl];

  let tvVideoUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}`;

  let tvCreditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}`;

  let tvSimilarUrl = `
  https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&page=1`;

  let tvShowUrls = [tvVideoUrl, tvCreditsUrl, tvSimilarUrl];

  //--Others Hook

  //--- State Hook
  // const [credits, setCredits] = useState([]);
  const [similars, setSimilars] = useState([]);
  // const [videos, setVideos] = useState([]);
  const [formatedType, setFormatedType] = useState("");

  const [moreContent, setMoreContent] = useState({
    credits: "",
    similar: "",
    videos: "",
  });
  const [loading, setLoading] = useState(true);

  //--Function

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
    isSuccess,
  } = useGetInfosModalQuery({ params });
  const { data: videos, isLoading: isLoadingVideo } = useGetVideosQuery({
    params,
  });
  const { data: credits, isLoading: isLoadingCredits } = useGetCreditsQuery({
    params,
  });

  const getDetails = async (querys) => {
    axios
      .all(querys.map((url) => axios.get(url)))
      .then(
        axios.spread((video, credit, similar) => {
          // setVideos(video.data);
          // setCredits(credit.data);
          setSimilars(similar.data.results);
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    formatType();
  }, [content.media_type]);

  useEffect(() => {
    if (type === "movie") {
      getDetails(filmsUrl);
    }
    if (type === "tvshow") {
      getDetails(tvShowUrls);
    }
  }, [type, filmsUrl, tvShowUrls]);

  return (
    <>
      <div className="media-element">
        {isLoadingVideo ? (
          <LoaderUI />
        ) : (
          <Video content={content} videos={videos} loading={isLoadingVideo} />
        )}
        {/* <CallToAction content={content} /> */}
        <div className="media-element__title">
          {content.title || content.name}
        </div>
        {isLoadingMain ? (
          <LoaderUI />
        ) : (
          <>
            <Synopsis content={data} />
            <Attributes content={data} type={content.media_type} />
          </>
        )}
        {isLoadingCredits ? (
          <LoaderUI size={"0.7rem"} />
        ) : (
          <Casts credits={credits} loading={loading} />
        )}

        <SimilarContent similars={similars} loading={loading} />
      </div>
    </>
  );
};

export default MediaElement;
