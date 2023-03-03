import React, { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import { StarOutline } from "@mui/icons-material";
import { displayGenre } from "./display.genre";

const Attributes = (props) => {
  const { content } = props;
  const { genre_ids, type } = content;

  const { genreListMovie, genreListTv } = useContext(AppContext);

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
      <div className="card__infos__genres">
        {displayGenre(genre_ids, type, genreListMovie, genreListTv)}
      </div>
      <div className="card__infos__rating">
        <StarOutline sx={{ color: "yellow" }} />
        {Math.round(content.vote_average * 10) / 10} / 10{" "}
      </div>
    </div>
  );
};

export default Attributes;
