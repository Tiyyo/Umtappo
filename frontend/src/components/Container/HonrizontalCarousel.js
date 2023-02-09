import React, { useEffect, useState, useRef } from "react";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import MovieCard from "../Cards/MovieCard";

const HonrizontalCarousel = (props) => {
  const { content, title } = props;
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    if (carousel?.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <div className="horizontal--single-x-card">
      <h2>{title}</h2>
      {content.length > 1 ? (
        <motion.div
          className="outer-cards-container"
          ref={carousel}
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="cards-container"
          >
            {content
              .filter((el) => el.poster_path)
              .slice(0, 35)
              .map((el) => {
                return <MovieCard className="item" key={el.id} content={el} />;
              })}
          </motion.div>
        </motion.div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default HonrizontalCarousel;
