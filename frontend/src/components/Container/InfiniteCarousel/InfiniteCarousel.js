import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import MovieCard from "../../Cards/Poster/PosterCard";
import { motion } from "framer-motion";
import LoaderUI from "../../Loader/LoaderUI";
import AppContext from "../../../utils/Context/AppContextProvider";
import { useGetGenreQuery } from "../../../features/content/tmdbAPI";
import NavCarousel from "../NavCarousel";

const InfiniteCarousel = ({ genre }) => {
  let movie = "Movie";
  let tvShow = "TvShow";

  const [pageNumber, setPageNumber] = useState(1);
  const [scrollXValue, setScrollXValue] = useState(0);

  const { id, name, media_type } = genre;

  const { languages } = useContext(AppContext);

  const params = { media_type, id, languages, page: pageNumber };

  const { data, isLoading } = useGetGenreQuery({ params });

  const [width, setWidth] = useState(0);

  const carousel = useRef();
  const innerCarousel = useRef();
  const windowWidth = useRef([window.innerWidth]);

  const displayType = (media_type) => {
    if (media_type === "tv") {
      return tvShow;
    } else if (media_type === "movie") {
      return movie;
    }
  };

  const getScrollXPosition = (state) => {
    setScrollXValue(state);
  };

  useEffect(() => {
    if (carousel?.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  });

  return (
    <div className="infinite-carousel">
      <h2>
        {displayType(media_type)} | {name}
      </h2>
      {isLoading ? (
        ""
      ) : (
        <motion.div
          className="infinite-carousel__outer"
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
            dragConstraints={{ right: 0, left: -width }}
            className="infinite-carousel__outer__inner"
            ref={innerCarousel}
            animate={{ x: scrollXValue }}
            transition={{ ease: "easeInOut", duration: 1.5 }}
          >
            {data.map((el) => {
              return <MovieCard className="item" key={el.id} content={el} />;
            })}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default InfiniteCarousel;
