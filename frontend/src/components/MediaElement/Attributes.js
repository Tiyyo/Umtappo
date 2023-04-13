import React from "react";
import Rates from "./Rates";
import { displayReleaseYear } from "../../utils/function/display.realease.year";

const Attributes = ({ content, type }) => {
  return (
    <div className="modal-content__wrapper__media-element__infos">
      <div className="modal-content__wrapper__media-element__infos__type">
        {type === "movie" ? type : "TvShow"}
      </div>
      <div className="modal-content__wrapper__media-element__infos__release-year">
        {displayReleaseYear(content)}
      </div>
      <div className="modal-content__wrapper__media-element__infos__genres">
        {content.genres.map((g, index) => {
          return (
            <span key={index} className="genre">
              {g.name}
            </span>
          );
        })}
      </div>
      <Rates
        votes={content.vote_average}
        title={content.name || content.title}
        media_type={content.media_type}
        id={content.id}
      />
    </div>
  );
};

export default Attributes;
