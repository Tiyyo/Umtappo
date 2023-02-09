import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import MovieCard from "../Cards/MovieCard";
import { motion } from "framer-motion";

const InfiniteHorizontalCarousel = (props) => {
  const { genre } = props;
  const { id, name, type } = genre;

  let movie = "Movie";
  let tvShow = "TvShow";

  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(0);

  const carousel = useRef();

  useEffect(() => {
    if (type === movie) {
      const fetchData = async () => {
        const result = await axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&region=FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&vote_count.lte=150&with_genres=${id}&watch_region=FR&with_watch_monetization_types=flatrate`
          )
          .then((res) => {
            res.data.results.forEach((el) => (el.type = movie));
            setData(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => setloading(false));
      };
      fetchData();
    }
    if (type === tvShow) {
      const fetchData = async () => {
        const result = await axios
          .get(
            `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=popularity.desc&page=${pageNumber}&timezone=Europe%2FAmerica&with_genres=${id}&include_null_first_air_dates=false&watch_region=FR&with_watch_monetization_types=flatrate&with_status=0`
          )
          .then((res) => {
            res.data.results.forEach((el) => (el.type = tvShow));
            setData(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => setloading(false));
      };
      fetchData();
    }
  }, [pageNumber]);

  useEffect(() => {
    if (carousel?.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  });

  return (
    <div className="genre-list">
      <h2>
        {type} | {name}
      </h2>
      {loading ? (
        <Loader />
      ) : (
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
            {data.results.map((el) => {
              return <MovieCard className="item" key={el.id} content={el} />;
            })}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default InfiniteHorizontalCarousel;
