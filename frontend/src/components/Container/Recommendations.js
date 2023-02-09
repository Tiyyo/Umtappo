import React from "react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import RecommendCard from "../Cards/RecommendCard";

const Recommendations = (props) => {
  const { content, config } = props;

  const shuffle = (arr) => {
    let currentIndex = arr.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    return arr;
  };

  return (
    <div className="recommendation--list">
      <h2>You should look at it </h2>
      <div className="recommendation--swiper">
        {shuffle(content)
          .slice(0, 12)
          .map((el) => {
            return <RecommendCard key={el.id} content={el} config={config} />;
          })}
      </div>
    </div>
  );
};

export default Recommendations;
