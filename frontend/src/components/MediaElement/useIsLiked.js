import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdsTvshowsLiked } from "../../features/tvshow liked/slice/like.slice";
import { getIdsMoviesLiked } from "../../features/movie liked/Slice/likes.slice";

const useIsLiked = (type, user_id, id) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(null);

  const movieLiked = useSelector((state) => state.movie_liked);
  const tvshowLiked = useSelector((state) => state.tvshow_liked);

  const isLiked = (id) => {
    if (type.toLowerCase() === "tvshow") {
      console.log(likes, movieLiked);
    }
  };

  useEffect(() => {
    dispatch(getIdsMoviesLiked(user_id));
    dispatch(getIdsTvshowsLiked(user_id));
    setLikes({ movie: movieLiked, tvshow: tvshowLiked });
    isLiked();
  }, [user_id]);

  return {};
};

export default useIsLiked;
