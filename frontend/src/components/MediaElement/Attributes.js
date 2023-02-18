import React, { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import { StarOutline } from "@mui/icons-material";

const Attributes = (props) => {
  const { content } = props;
  const { genre_ids, type } = content;

  const { genreListMovie, genreListTv } = useContext(AppContext);
  let movie = "Movie";
  let tvShow = "TvShow";
  const displayGenre = (arrGenres, type) => {
    let movieGenreNames = [];
    if (type === movie) {
      arrGenres.forEach((genre) => {
        genreListMovie.forEach((el) => {
          if (el.id === genre) {
            movieGenreNames.push(el.name);
          }
        });
      });
    }
    if (type === tvShow) {
      arrGenres.forEach((genre) => {
        genreListTv.forEach((el) => {
          if (el.id === genre) {
            movieGenreNames.push(el.name);
          }
        });
      });
    }
    return movieGenreNames.map((genreName, index) => {
      return (
        <span key={index} className="genre">
          {genreName}
        </span>
      );
    });
  };
  const displayReleaseYear = () => {
    if (content.first_air_date) {
      return content.first_air_date.substring(0, 4);
    }
    if (content.release_date) {
      return content.release_date.substring(0, 4);
    }
  };
  return (
    <div className="card__infos">
      <div className="card__infos__type">{content.type}</div>
      <div className="card__infos__release-year">{displayReleaseYear()}</div>
      <div className="card__infos__genres">{displayGenre(genre_ids, type)}</div>
      <div className="card__infos__rating">
        <StarOutline sx={{ color: "yellow" }} />
        {Math.round(content.vote_average * 10) / 10} / 10{" "}
      </div>
    </div>
  );
};

export default Attributes;
