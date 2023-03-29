import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import RateMe from "./RateMe";

const Rates = ({ votes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRated, setIsRated] = useState(false);

  const getCloseState = (state) => {
    setIsOpen(false);
  };

  return (
    <div className="media-element__infos__rating">
      <RateMe isOpen={isOpen} close={getCloseState} />
      <div data-blur={isOpen ? "is-active" : ""} className="blur"></div>
      <div className="media-element__infos__rating--users">
        <StarIcon sx={{ color: "rgb(214, 214, 32)" }} />
        {Math.round(votes * 10) / 10} / <span>10</span>{" "}
      </div>
      <div className="media-element__infos__rating--myrate">
        {isRated ? (
          "My Rate"
        ) : (
          <Button onClick={() => setIsOpen(true)}>Rate Me</Button>
        )}
      </div>
    </div>
  );
};

export default Rates;
