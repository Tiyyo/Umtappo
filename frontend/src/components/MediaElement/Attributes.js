import React from "react";
import { StarOutline } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import Rates from "./Rates";

const Attributes = ({ content, type }) => {
  console.log(content);
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
      <Rates votes={content.vote_average} />
    </div>
  );
};

export default Attributes;
