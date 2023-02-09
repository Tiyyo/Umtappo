import React, { useEffect, useState, useRef } from "react";
import InfiniteHorizontalCarousel from "./InfiniteHorizontalCarousel";
import { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";

const FavoriteGenre = (props) => {
  const { dataToDisplay } = props;

  const { genreListTv: genreTvList, genreListMovie: genreMovieList } =
    useContext(AppContext);
  let flatGenreLists = [...genreMovieList, ...genreTvList];
  let numberValues = 3;
  let movie = "Movie";
  let tvShow = "TvShow";
  let both = "Both";

  const randomValues = useRef([]);
  const favoriteGenre = useRef([]);

  const choseRandomValues = (numberValues, referenceGenre) => {
    let indexes = [];
    while (indexes.length < numberValues) {
      let randomNumber = Math.floor(Math.random() * referenceGenre.length);
      if (indexes.includes(randomNumber)) {
        return;
      } else {
        indexes.push(randomNumber);
      }
    }
    randomValues.current = indexes;
  };

  // for (let i = 0; i < indexes; i++) {
  //   let randomNumber = Math.floor(Math.random() * referenceGenre.length);
  //   if (indexes.includes(randomNumber)) {
  //     return;
  //   } else {
  //     indexes.push(randomNumber);
  //   }
  // }
  // randomValues.current = indexes;

  const matchIndexes = (referenceGenre) => {
    let genre = [];
    randomValues.current.forEach((value) => {
      genre.push(referenceGenre[value]);
    });
    favoriteGenre.current = genre;
  };

  const addTypeBoth = () => {
    favoriteGenre.current.forEach((genre) => {
      for (let i = 0; i < genreMovieList.length; i++) {
        if (genre.id === genreMovieList[i].id) {
          genre.type = movie;
        }
        for (let i = 0; i < genreTvList.length; i++) {
          if (genre.id === genreTvList[i].id) {
            genre.type = tvShow;
          }
        }
      }
    });
  };

  const addMovieType = () => {
    favoriteGenre.current.forEach((genre) => {
      genre.type = movie;
    });
  };

  const addTvShowType = () => {
    favoriteGenre.current.forEach((genre) => (genre.type = tvShow));
  };

  useEffect(
    () => {
      if (dataToDisplay === both) {
        choseRandomValues(numberValues, flatGenreLists);
        matchIndexes(flatGenreLists);
        addTypeBoth();
      }
      if (dataToDisplay === movie) {
        choseRandomValues(numberValues, genreMovieList);
        matchIndexes(genreMovieList);
        addMovieType();
      }
      if (dataToDisplay === tvShow) {
        choseRandomValues(numberValues, genreTvList);
        matchIndexes(genreTvList);
        addTvShowType();
      }
    },
    [
      // tvShow,
      // movie,
      // both,
      // genreTvList,
      // genreMovieList,
      // numberValues,
      // flatGenreLists,
    ]
  );

  return (
    <div className="favorite-genre">
      {favoriteGenre.current.map((genre) => (
        <InfiniteHorizontalCarousel key={genre.id} genre={genre} />
      ))}
    </div>
  );
};
export default FavoriteGenre;
