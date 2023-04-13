import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import PosterCard from "../../Cards/Poster/PosterCard";
import LoaderUI from "../../Loader/LoaderUI";
import NavCarousel from "../NavCarousel";

const HorizontalCarousel = ({ content, title }) => {
  const [width, setWidth] = useState(0);
  const [scrollXValue, setScrollXValue] = useState(0);

  const carousel = useRef();

  const innerCarousel = useRef();

  const getScrollXPosition = (state) => {
    setScrollXValue(state);
  };

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
          <NavCarousel
            innerCarousel={innerCarousel.current}
            width={width}
            scrollValue={scrollXValue}
            getScrollPosition={getScrollXPosition}
          />
          <motion.div
            drag="x"
            whileTap={{ cursor: "grabbing" }}
            dragConstraints={{ right: 0, left: -width }}
            className="horizontal-carousel__outer__inner"
            ref={innerCarousel}
            animate={{ x: scrollXValue }}
            transition={{ ease: "easeInOut", duration: 1.2 }}
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
