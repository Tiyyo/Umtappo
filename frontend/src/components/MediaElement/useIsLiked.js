import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdsTvshowsLiked } from "../../features/tvshow liked/slice/like.slice";
import { getIdsMoviesLiked } from "../../features/movie liked/Slice/likes.slice";
import axios from "axios";

const useIsLiked = (type, user_id, contentId) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(null);
  const [isAlreadyLiked, setAlreadyLiked] = useState(null);

  const movieLiked = useSelector((state) => state.movieLiked);
  const tvshowLiked = useSelector((state) => state.tvshowLiked);

  const isLiked = useCallback(
    (type, contentId) => {
      if (type.toLowerCase() === "tvshow") {
        let exist = tvshowLiked.ids
          .map((el) => el.id)
          .some((id) => id === contentId);
        return exist;
      } else if (type.toLowerCase() === "movie") {
        let exist = movieLiked.ids
          .map((el) => el.id)
          .some((id) => id === contentId);
        return exist;
      }
    },
    [likes]
  );
  useEffect(() => {
    // const getIds = async () => {
    //   const result = await axios
    //     .get(`http://localhost:5000/like/${type.toLowerCase()}/` + user_id)
    //     .then((res) => {
    //       let arr = [];
    //       arr.push(res.data);
    //       console.log(arr.map((el) => console.log(el)));
    //     });
    // };
    dispatch(getIdsTvshowsLiked(user_id)).then(() => {
      const res = isLiked(type, contentId);
      if (res) {
        alert("true");
        return setAlreadyLiked(true);
      } else {
        alert("false");
        return setAlreadyLiked(false);
      }
    });
  }, [type, contentId, user_id]);

  return { isAlreadyLiked };
};

export default useIsLiked;
