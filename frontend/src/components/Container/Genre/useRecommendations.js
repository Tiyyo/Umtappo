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
  const { languages, genreListTv, genreListMovie } = useContext(AppContext);

  const { lists, movieLiked, rating, tvshowLiked } = useSelector(
    (state) => state
  );

  const [dataFromList, setDataFromList] = useState(null);
  const [dataFromMovieLiked, setDataFromMovieLiked] = useState(null);
  const [dataFromTvshowLiked, setDataFromTvshowLiked] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [values, setValues] = useState(null);
  const [scores, setScores] = useState(null);

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
      addUserRate();
    }
  }, [globalData, rating]);

  useEffect(() => {
    if (globalData) {
      let values = globalData
        .map((data) => {
          if (data.status === "liked") {
            return [
              data.genres,
              data.vote_average,
              data.userRate || 5,
              2,
              data.media_type,
            ];
          } else {
            return [
              data.genres,
              data.vote_average,
              data.userRate || 5,
              1.5,
              data.media_type,
            ];
          }
        })
        .map((value) => {
          let newObj = value[0].map((v) => {
            let score = +(
              (1 + value[2] * 3.35 + value[1] * 1.95) *
              value[3]
            ).toFixed(4);
            return { id: v, score };
          });
          return newObj;
        })
        .flat();
      setValues(values);
    }
  }, [globalData]);

  useEffect(() => {
    let genreValues = [...genreListTv, ...genreListMovie];
    if (values) {
      genreValues = genreValues.map((g) => {
        return { ...g, score: [], occurency: 0 };
      });

      for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < genreValues.length; j++) {
          if (values[i].id === genreValues[j].id) {
            genreValues[j].score.push(values[i].score);
            genreValues[j].occurency++;
          }
        }
      }

      genreValues.map((g) => {
        if (g.score.length > 0) {
          let sumScore = g.score.reduce((a, b) => a + b);
          return (g.score = +(sumScore / g.occurency).toFixed(3));
        } else return g;
      });
      return setScores(genreValues);
    }
  }, [genreListTv, genreListMovie, values]);

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

  return { scores };
};

export default useRecommendations;
