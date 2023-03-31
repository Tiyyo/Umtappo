import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFetchMovie,
  getIdsMoviesLiked,
} from "../../../features/movie liked/Slice/likes.slice";
import { getRating } from "../../../features/rating/slice/rating.slice";
import {
  getFetchTvshow,
  getIdsTvshowsLiked,
} from "../../../features/tvshow liked/slice/like.slice";
import { getLists } from "../../../features/watchlists/Slice/lists.slice";
import AppContext from "../../../utils/Context/AppContextProvider";
import UserContext from "../../../utils/Context/UserContextProvider";

const useRecommendations = () => {
  const dispatch = useDispatch();

  const { userID } = useContext(UserContext);
  const { languages } = useContext(AppContext);

  const { lists, movieLiked, rating, tvshowLiked } = useSelector(
    (state) => state
  );

  const [dataFromList, setDataFromList] = useState(null);
  const [dataFromMovieLiked, setDataFromMovieLiked] = useState(null);
  const [dataFromTvshowLiked, setDataFromTvshowLiked] = useState(null);
  const [globalData, setGlobalData] = useState(null);

  const getListData = () => {
    if (lists.lists.length > 0) {
      let dataFromList = lists.lists
        .map((el) => el.content)
        .reduce((prev, curr) => {
          return [...prev, ...curr];
        }, [])
        .map((el) => {
          if (el.type === "Movie") {
            return { ...el, media_type: "movie" };
          } else if (el.type === "TvShow") {
            return { ...el, media_type: "tv" };
          } else {
            return el;
          }
        })
        .map((el) => {
          if (el.genres) {
            let ids = el.genres.map((g) => g.id);
            return { ...el, genres: ids };
          } else return el;
        })
        .map((el) => {
          return {
            id: el.id,
            genres: el.genre_ids || el.genres,
            media_type: el.media_type,
            vote_average: el.vote_average,
            status: "watch",
          };
        });
      setDataFromList(dataFromList);
    }
  };

  const getLikesData = (type) => {
    if (type.fetchMedia.length > 0) {
      let data = type.fetchMedia
        .map((el) => {
          if (el.genres) {
            let ids = el.genres.map((g) => g.id);
            return { ...el, genres: ids };
          } else return el;
        })
        .map((el) => {
          return {
            id: el.id,
            genres: el.genre_ids || el.genres,
            media_type: el.media_type,
            vote_average: el.vote_average,
            status: "liked",
          };
        });
      return data;
    }
  };

  useEffect(() => {
    getListData();
    setDataFromMovieLiked(getLikesData(movieLiked));
    setDataFromTvshowLiked(getLikesData(tvshowLiked));
  }, [lists, tvshowLiked, movieLiked]);

  //   dataFromList.length > 0 &&
  //   dataFromMovieLiked &&
  //   dataFromMovieLiked.length > 0 &&
  //   dataFromTvshowLiked &&
  //   dataFromTvshowLiked.length > 0

  useEffect(() => {
    if (dataFromList && dataFromMovieLiked && dataFromTvshowLiked) {
      let likesData = [...dataFromMovieLiked, ...dataFromTvshowLiked];
      let globalDataArr = dataFromList;

      const compdata = () => {
        for (let i = 0; i < likesData.length; i++) {
          for (let j = 0; j < globalDataArr.length; j++) {
            if (
              likesData[i].id === globalDataArr[j].id &&
              likesData[i].media_type === globalDataArr[j].media_type
            ) {
              globalDataArr[j].status = likesData[i].status;
              likesData.splice(i, 1);
            }
          }
        }
      };
      compdata();

      let data = [...globalDataArr, ...likesData];
      setGlobalData(data);
    }
  }, [dataFromList, dataFromMovieLiked, dataFromTvshowLiked]);

  function addUserRate() {
    let globalDataCpy = globalData;

    for (let i = 0; i < rating.rates.length; i++) {
      for (let j = 0; j < globalDataCpy.length; j++) {
        if (
          rating.rates[i].id === globalDataCpy[j].id &&
          rating.rates[i].media_type === globalDataCpy[j].media_type
        ) {
          globalDataCpy[j].userRate = rating.rates[i].rate;
        }
      }
    }

    setGlobalData(globalDataCpy);
  }

  useEffect(() => {
    if (globalData && rating.rates.length > 0) {
      console.log("fire");
      addUserRate();
    }
  }, [globalData, rating]);

  useLayoutEffect(() => {
    dispatch(getLists(userID));
    dispatch(getIdsMoviesLiked(userID)).then(() =>
      dispatch(getFetchMovie(languages))
    );
    dispatch(getIdsTvshowsLiked(userID)).then(() =>
      dispatch(getFetchTvshow(languages))
    );
    dispatch(getRating(userID));
  }, []);

  return { globalData };
};

export default useRecommendations;
