import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import RateMe from "./RateMe";
import useRating from "./useRating";

const Rates = ({ votes, title, media_type, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isRated, rate: prevRate } = useRating(id, media_type);

  const getCloseState = (state) => {
    setIsOpen(state);
  };

  return (
    <div className="modal-content__wrapper__media-element__infos__rating">
      <RateMe
        isOpen={isOpen}
        close={getCloseState}
        title={title}
        media_type={media_type}
        id={id}
      />
      <div data-blur={isOpen ? "is-active" : ""} className="rating-blur"></div>
      <div className="media-element__infos__rating--users">
        <StarIcon sx={{ color: "rgb(214, 214, 32)" }} />
        {Math.round(votes * 10) / 10} / <span>10</span>{" "}
      </div>
      <div className="modal-content__wrapper__media-element__infos__rating--myrate">
        {isRated ? (
          <div
            className="modal-content__wrapper__media-element__infos__rating--users"
            onClick={() => setIsOpen(true)}
          >
            <StarIcon sx={{ color: "rgb(52, 126, 210)" }} />
            {prevRate},0 / <span>10</span>{" "}
          </div>
        ) : (
          <Button
            sx={{ color: "#fb8c00", letterSpacing: "2px" }}
            onClick={() => setIsOpen(true)}
          >
            Rate Me
          </Button>
        )}
      </div>
    </div>
  );
};

export default Rates;
