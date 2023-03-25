import React, { useEffect, useRef, useState } from "react";
import InfiniteHorizontalCarousel from "../InfiniteCarousel/InfiniteCarousel";
import { useContext } from "react";
import AppContext from "../../../utils/Context/AppContextProvider";

const Genre = (props) => {
  const { dataToDisplay } = props;

  const { genreListTv: genreTvList, genreListMovie: genreMovieList } =
    useContext(AppContext);
  let flatGenreLists = [...genreMovieList, ...genreTvList];
  let numberContainerToDisplay = 3;
  let movie = "Movie";
  let tvshow = "TvShow";
  let both = "Both";

  const randomValues = useRef([]);
  const favoriteGenre = useRef([]);

  const [favoriteGenres, setFavoriteGenres] = useState([]);

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

  const addTypeBoth = () => {
    favoriteGenre.current.forEach((genre) => {
      for (let i = 0; i < genreMovieList.length; i++) {
        if (genre.id === genreMovieList[i].id) {
          genre.type = movie;
        }
        for (let i = 0; i < genreTvList.length; i++) {
          if (genre.id === genreTvList[i].id) {
            genre.type = tvshow;
          }
        }
      }
    });
  };

  // const addMovieType = () => {
  //   favoriteGenre.current.forEach((genre) => {
  //     genre.type = movie;
  //   });
  // };

  // const addTvShowType = () => {
  //   favoriteGenre.current.forEach((genre) => (genre.type = tvShow));
  // };

  useEffect(() => {
    console.log("working");
    if (dataToDisplay === both) {
      console.log("both");
      let flatGenres = flatData();
      console.log(flatGenres);
      choseRandomValues(numberContainerToDisplay, flatGenres);
      matchIndexes(flatGenres);
      // addTypeBoth();
    } else if (dataToDisplay === movie) {
      console.log("movie");

      choseRandomValues(numberContainerToDisplay, genreMovieList);
      matchIndexes(genreMovieList);
    } else if (dataToDisplay === tvshow) {
      choseRandomValues(numberContainerToDisplay, genreTvList);
      matchIndexes(genreTvList);
    }
  }, []);

  return (
    <div className="favorite-genre">
      {console.log(favoriteGenre.current)}
      {favoriteGenre.current.map((genre) => (
        <InfiniteHorizontalCarousel key={genre.id} genre={genre} />
      ))}
    </div>
  );
};
export default Genre;
