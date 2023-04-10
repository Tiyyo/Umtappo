import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import Blur from "../Overlay/Blur";
import Button from "../Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  closeModal,
  openModal,
} from "../../features/modal display content/modal.display.content";

const MediaElement = () => {
  //--- Destructuring
  const location = useLocation();
  const dispatch = useDispatch();
  const { content } = location.state;

  const { media_type, id } = content;

  const { languages } = useContext(AppContext);
  const { userID } = useContext(UserContext);

  const params = { id, media_type, languages };

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const { data, isLoading: isLoadingMain } = useGetInfosModalQuery({ params });

  const { currentData: videos, isLoading: isLoadingVideo } = useGetVideosQuery({
    params,
  });

  const { currentData: credits, isLoading: isLoadingCredits } =
    useGetCreditsQuery({ params });

  const { currentData: similars, isLoading: isLoadingSimilars } =
    useGetSimilarsQuery({ params });

  const handleClose = () => {
    dispatch(closeModal(false));
    navigate(-1);
  };

  useEffect(() => {
    let arr = [isLoadingMain, isLoadingCredits, isLoadingSimilars];
    setLoading(arr.some((l) => l));
  }, [isLoadingMain, isLoadingCredits, isLoadingSimilars]);

  useEffect(() => {
    dispatch(getIdsMoviesLiked(userID));
    dispatch(getIdsTvshowsLiked(userID));
    dispatch(getRating(userID));
  }, [userID]);

  useLayoutEffect(() => {
    dispatch(openModal(true));
  }, []);

  return (
    <div className="modal-content__wrapper">
      <Blur>
        <div className="modal-content__wrapper__media-element media-element">
          {loading ? (
            <LoaderUI overlay={"false"} position={"fixed"} />
          ) : (
            <>
              <div className="modal-content__wrapper__media-element__close-modal">
                <Button>
                  <CloseIcon onClick={handleClose} />
                </Button>
              </div>
              <Video
                content={content}
                videos={videos}
                loading={isLoadingVideo}
              />
              <CallToAction content={data} media_type={media_type} id={id} />
              <div className="media-element__title">
                {content.title || content.name}
              </div>
              <Synopsis content={data} />
              <Attributes content={data} type={content.media_type} />
              <Casts credits={credits} />
              <SimilarContent similars={similars} />
            </>
          )}
        </div>
      </Blur>
    </div>
  );
};

export default MediaElement;
