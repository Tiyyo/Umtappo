import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../../utils/Context/AppContextProvider";
import SimilarContent from "../../components/MediaElement/SimilarContent";
import Casts from "../../components/MediaElement/Casts";
import Synopsis from "../../components/MediaElement/Synopsis";
import Attributes from "../../components/MediaElement/Attributes";
import CallToAction from "../../components/MediaElement/CallToAction";
import Video from "../../components/MediaElement/Video";
import Header from "../../components/MediaElement/Header";

const MediaElement = () => {
  //--- Destructuring
  const location = useLocation();
  const { content } = location.state;
  const { languages } = useContext(AppContext);
  const { id, type } = content;

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
  const [credits, setCredits] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  //--Function

  const getDetails = async (querys) => {
    axios
      .all(querys.map((url) => axios.get(url)))
      .then(
        axios.spread((video, credit, similar) => {
          setVideos(video.data);
          setCredits(credit.data);
          setSimilars(similar.data.results);
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (type === "Movie") {
      getDetails(filmsUrl);
    }
    if (type === "TvShow") {
      getDetails(tvShowUrls);
    }
  }, [type, filmsUrl, tvShowUrls]);

  return (
    <>
      <div className="media-element" style={{ display: "flex" }}>
        <main className="card">
          <Header />
          <Video content={content} videos={videos} loading={loading} />
          <CallToAction content={content} />
          <div className="card__title">{content.title || content.name}</div>
          <Attributes content={content} />
          <Synopsis content={content} />
          <Casts credits={credits} loading={loading} />
          <SimilarContent similars={similars} loading={loading} />
        </main>
      </div>
    </>
  );
};

export default MediaElement;
