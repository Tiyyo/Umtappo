import React, { useEffect, useRef, useState } from "react";
import InfiniteHorizontalCarousel from "../InfiniteCarousel/InfiniteCarousel";
import { useContext } from "react";
import AppContext from "../../../utils/Context/AppContextProvider";
import useRecommendations from "./useRecommendations";

const Genre = (props) => {
  const { dataToDisplay } = props;

  const {
    genreListTv: genreTvList,
    genreListMovie: genreMovieList,
    recommendations,
  } = useContext(AppContext);

  let numberContainerToDisplay = 3;
  let movie = "movie";
  let tvshow = "tv";
  let both = "Both";

  const randomValues = useRef([]);
  const favoriteGenre = useRef([]);

  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const { scores } = useRecommendations();

  const addType = (list, mediaType) => {
    list.map((el) => (el.media_type = mediaType));
    return list;
  };

  const flatData = () => {
    let movieGenres = addType(genreMovieList, movie);
    let tvshowGenres = addType(genreTvList, tvshow);
    let flatGenres = [...movieGenres, ...tvshowGenres];
    return flatGenres;
  };

  const choseRandomValues = (numberContainerToDisplay, referenceGenre) => {
    let indexes = [];
    while (indexes.length < numberContainerToDisplay) {
      let randomNumber = Math.floor(Math.random() * referenceGenre.length);
      if (indexes.includes(randomNumber)) {
        continue;
      } else {
        indexes.push(randomNumber);
      }
    }
    randomValues.current = indexes;
  };

  const matchIndexes = (referenceGenre) => {
    let genreToDisplay = [];
    randomValues.current.forEach((value) => {
      genreToDisplay.push(referenceGenre[value]);
    });
    favoriteGenre.current = genreToDisplay;
    return setFavoriteGenres(genreToDisplay);
  };

  useEffect(() => {
    if (dataToDisplay === both) {
      let flatGenres = flatData();
      choseRandomValues(numberContainerToDisplay, flatGenres);
      matchIndexes(flatGenres);
    } else if (dataToDisplay === movie) {
      let movieGenres = addType(genreMovieList, movie);
      choseRandomValues(numberContainerToDisplay, movieGenres);
      matchIndexes(movieGenres);
    } else if (dataToDisplay === tvshow) {
      let tvshowGenres = addType(genreTvList, tvshow);
      choseRandomValues(numberContainerToDisplay, tvshowGenres);
      matchIndexes(tvshowGenres);
    }
  }, []);

  return (
    <div className="favorite-genre">
      {recommendations && scores && favoriteGenres
        ? scores
            .filter((f) => {
              if (dataToDisplay === movie) {
                return f.media_type === movie;
              } else if (dataToDisplay === tvshow) {
                return f.media_type === tvshow;
              } else return f;
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, numberContainerToDisplay)
            .map((genre, index) => (
              <InfiniteHorizontalCarousel
                key={genre.id + index.toString()}
                genre={genre}
              />
            ))
        : favoriteGenres.map((genre, index) => (
            <InfiniteHorizontalCarousel
              key={genre.id + index.toString()}
              genre={genre}
            />
          ))}
    </div>
  );
};
export default Genre;
