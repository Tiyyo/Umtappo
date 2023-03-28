import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useIsLiked = (media_type, id) => {
  const [isAlreadyLiked, setAlreadyLiked] = useState(null);

  const movieLikedIds = useSelector((state) => state.movieLiked.ids);
  const tvshowLikedIds = useSelector((state) => state).tvshowLiked.ids;

  const likes = {
    ...movieLikedIds,
    ...tvshowLikedIds,
  };

  useEffect(() => {
    if (Object.keys(likes).length > 0) {
      Object.values(likes).forEach((like) => {
        if (like.id === id && like.media_type === media_type) {
          return setAlreadyLiked(true);
        }
      });
    } else return setAlreadyLiked(false);
  }, [likes]);

  return isAlreadyLiked;
};

export default useIsLiked;
