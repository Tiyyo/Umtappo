import React from "react";

const DynamicRating = (props) => {
  const { rate: score } = props;
  //- determine the ration for progress bar animation
  let y = 360 * (1 - score / 10);

  return (
    <div className="movie-card__header__rating progress-card">
      <div
        className="progress-circle"
        style={{
          background: `conic-gradient(rgba(91, 86, 86, 0.435) ${y}deg , rgba(98,245,12,1) 0deg, rgb(255 242 10) 180deg, rgb(215 106 26) 300deg,rgb(251 10 10) 360deg )`,
        }}
      >
        <p className="progress-text">{Math.trunc(score * 10 )}%</p>
      </div>
    </div>
  );
};

export default DynamicRating;
