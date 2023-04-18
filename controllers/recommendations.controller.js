const Users = require("../models/user.models");
const Rates = require("../models/rates.models");
const asyncHandler = require("express-async-handler");
const { default: mongoose, isValidObjectId } = require("mongoose");
const axios = require("axios");

module.exports.getUserRecommendations = asyncHandler(async (req, res) => {
  const user_id = req.params.userId;
  if (!user_id || user_id === null) {
    res.status(400).send("user_id is missing");
    throw new Error('"user_id is missing or null');
  }

  if (!isValidObjectId(user_id)) {
    res.status(400).send("Please provide a correct Object Id");
  }

  let genreList;
  let lists;
  let rates;
  let movieLiked;
  let tvshowLiked;
  let mergedRawData;
  let mergedFixedGenreIds;
  let allGenreWithScore;

  const genreUrls = [
    "https://api.themoviedb.org/3/genre/tv/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US",
    "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US",
  ];
  await axios.all(genreUrls.map((url) => axios.get(url))).then((resp) => {
    genreList = [resp[0].data.genres, resp[1].data.genres].flat();
  });

  const user = await Users.findById(user_id);
  if (!user) {
    res.status(400).send("User not found");
  }

  const userLists = await Users.findById(user_id)
    .populate("lists", ["name", "content"])
    .populate("rates", ["id", "media_type", "rate"])
    .exec()
    .then((docs) => {
      lists = docs.lists;
      rates = docs.rates;
      movieLiked = docs.movie_liked;
      tvshowLiked = docs.tvshow_liked;
    });

  const getListData = () => {
    if (lists.length > 0) {
      const globalList = lists
        .map((el) => el.content)
        .flat()
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
      return globalList;
    }
  };

  const getLikesData = (type) => {
    if (type.length > 0) {
      let data = type
        .map((el) => {
          let arr = Object.values(el);
          return arr.map((m) => {
            return {
              id: m.id,
              genres: m.genre_ids || m.genres,
              media_type: m.media_type,
              vote_average: m.vote_average,
              status: "liked",
            };
          });
        })
        .flat();
      return data;
    }
  };

  const listDataFormated = getListData();
  const movieLikedDataFormated = getLikesData(movieLiked);
  const tvshowLikedDataFormated = getLikesData(tvshowLiked);

  // -- Compare data from user list and liked list to find duplicate before merge data

  const isMediaAreDuplicate = () => {
    const liked = [...movieLikedDataFormated, ...tvshowLikedDataFormated];
    if (liked && listDataFormated) {
      liked.forEach((elLike, indexLike) => {
        listDataFormated.forEach((elList) => {
          if (
            elLike.id === elList.id &&
            elLike.media_type === elList.media_type
          ) {
            elList.status = "liked";
            liked.splice(indexLike, 1);
          }
        });
      });
      mergedRawData = [...listDataFormated, ...liked];
    } else {
      return null;
    }
  };

  // -- make sure all media.genre is an array of value and not object
  const handleGenreIds = () => {
    if (!mergedRawData) {
      return;
    }
    let data = mergedRawData.map((d) => {
      let mapIds = [];
      d.genres.forEach((g) => {
        if (g.id) {
          mapIds.push(g.id);
        } else {
          mapIds = g;
        }
      });
      return { ...d, genres: mapIds };
    });
    mergedFixedGenreIds = data;
  };

  //-- add user rates to the data
  const addUserRateToData = () => {
    if (rates && mergedFixedGenreIds) {
      mergedFixedGenreIds.forEach((el) => {
        rates.forEach((r) => {
          if (el.id === r.id && el.media_type === r.media_type) {
            el.rate = r.rate;
          }
        });
      });
    }
  };

  //-- calculate a value for each genre
  const addValues = () => {
    if (mergedFixedGenreIds) {
      let values = mergedFixedGenreIds
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
          const score = +(
            (1 + value[2] * 3.35 + value[1] * 1.95) *
            value[3]
          ).toFixed(4);
          if (value[0].length > 1) {
            let newObj = value[0].map((v) => {
              return { id: v, score, media_type: value[4] };
            });
            return newObj;
          } else {
            return { id: value[0], score, media_type: value[4] };
          }
        })
        .flat();
      allGenreWithScore = values;
    }
  };

  //-- make
  const sumScore = () => {
    if (genreList) {
      genreList = genreList.map((g) => {
        return { ...g, score: [], occurency: 0 };
      });
    }
    for (let i = 0; i < allGenreWithScore.length; i++) {
      for (let j = 0; j < genreList.length; j++) {
        if (allGenreWithScore[i].id === genreList[j].id) {
          genreList[j].score.push(allGenreWithScore[i].score);
          genreList[j].media_type = allGenreWithScore[i].media_type;
          genreList[j].occurency++;
        }
      }
    }

    let userPreferedGenre = genreList.map((g) => {
      if (g.score.length > 0) {
        let sumScore = g.score.reduce((a, b) => a + b);
        return { ...g, score: +((sumScore / g.occurency) * 1.07).toFixed(3) };
      } else return g;
    });
    res.status(200).json(userPreferedGenre);
  };

  isMediaAreDuplicate();
  handleGenreIds();
  addUserRateToData();
  addValues();
  sumScore();
});

module.exports.getRandomRecommendations = asyncHandler(async (req, res) => {
  const genreUrls = [
    "https://api.themoviedb.org/3/genre/tv/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US",
    "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US",
  ];

  let genreList;

  await axios.all(genreUrls.map((url) => axios.get(url))).then((resp) => {
    resp[0].data.genres.map((g) => (g.media_type = "tv"));
    resp[1].data.genres.map((g) => (g.media_type = "movie"));
    genreList = [resp[0].data.genres, resp[1].data.genres].flat();
  });

  const shuffle = (arr) => {
    let currentIndex = arr.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    return arr;
  };

  shuffle(genreList);
  res.status(200).json(genreList);
});
