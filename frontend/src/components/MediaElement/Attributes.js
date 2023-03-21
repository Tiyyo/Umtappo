import React from "react";
import { StarOutline } from "@mui/icons-material";

const Attributes = ({ content, type }) => {
  const displayReleaseYear = () => {
    if (content.first_air_date) {
      return content.first_air_date.substring(0, 4);
    }
    if (content.release_date) {
      return content.release_date.substring(0, 4);
    }
  };
  return (
    <div className="media-element__infos">
      <div className="media-element__infos__type">
        {type === "movie" ? type : "TvShow"}
      </div>
      <div className="media-element__infos__release-year">
        {displayReleaseYear()}
      </div>
      <div className="media-element__infos__genres">
        {content.genres.map((g, index) => {
          return (
            <span key={index} className="genre">
              {g.name}
            </span>
          );
        })}
      </div>
      <div className="media-element__infos__rating">
        <StarOutline sx={{ color: "yellow" }} />
        {Math.round(content.vote_average * 10) / 10} / 10{" "}
      </div>
    </div>
  );
};

export default Attributes;
