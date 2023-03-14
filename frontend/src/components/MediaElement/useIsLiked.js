import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdsTvshowsLiked } from "../../features/tvshow liked/slice/like.slice";
import { getIdsMoviesLiked } from "../../features/movie liked/Slice/likes.slice";

const useIsLiked = (type, user_id, contentId) => {
  const dispatch = useDispatch();
  const [isAlreadyLiked, setAlreadyLiked] = useState(null);

  const movieLiked = useSelector((state) => state.movieLiked);
  const tvshowLiked = useSelector((state) => state.tvshowLiked);

  const isLiked = useCallback((contentId, content) => {
    let exist = content?.ids.map((el) => el.id).some((id) => id === contentId);
    return exist;
  }, []);

  useEffect(() => {
    if (type.toLowerCase() === "tvshow") {
      dispatch(getIdsTvshowsLiked(user_id)).then(() => {
        return setAlreadyLiked(isLiked(contentId, tvshowLiked));
      });
    } else if (type.toLowerCase() === "movie") {
      dispatch(getIdsMoviesLiked(user_id)).then(() => {
        return setAlreadyLiked(isLiked(contentId, movieLiked));
      });
    }
  }, [type, contentId, user_id, movieLiked, tvshowLiked]);

  return isAlreadyLiked;
};

export default useIsLiked;
