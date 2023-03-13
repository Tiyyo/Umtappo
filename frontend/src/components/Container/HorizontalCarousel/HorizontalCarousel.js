import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import PosterCard from "../../Cards/Poster/PosterCard";
import LoaderUI from "../../Loader/LoaderUI";

const HorizontalCarousel = ({ content, title }) => {
  // const { content, title } = props;
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    if (carousel?.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <div className="horizontal-carousel">
      <h2>{title}</h2>
      {content ? (
        <motion.div
          className="horizontal-carousel__outer"
          ref={carousel}
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="horizontal-carousel__outer__inner"
          >
            {content
              .filter((el) => el.poster_path)
              .slice(0, 35)
              .map((el) => {
                return <PosterCard className="item" key={el.id} content={el} />;
              })}
          </motion.div>
        </motion.div>
      ) : (
        <LoaderUI />
      )}
    </div>
  );
};

export default HorizontalCarousel;
