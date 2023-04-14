import React from "react";
import InfiniteHorizontalCarousel from "../InfiniteCarousel/InfiniteCarousel";
import { useContext } from "react";
import AppContext from "../../../utils/Context/AppContextProvider";
import UserContext from "../../../utils/Context/UserContextProvider";
import useIsEnough from "./useIsEnough";

const Genre = ({ dataToDisplay, numberContainerToDisplay }) => {
  const { recommendations } = useContext(AppContext);
  const { scores, randomReco } = useContext(UserContext);

  const isEnough = useIsEnough();

  let movie = "movie";
  let tvshow = "tv";

  if (!scores && !randomReco) {
    return <div className="favorite-genre"></div>;
  } else if (recommendations && scores && isEnough) {
    return (
      <div className="favorite-genre">
        {scores
          .filter((f) => {
            if (dataToDisplay === movie) {
              return f.media_type === movie;
            } else if (dataToDisplay === tvshow) {
              return f.media_type === tvshow;
            } else return f;
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, numberContainerToDisplay)
          .map((genre, index) => (
            <InfiniteHorizontalCarousel
              key={genre.id + index.toString()}
              genre={genre}
            />
          ))}
      </div>
    );
  } else if (randomReco) {
    return (
      <div className="favorite-genre">
        {randomReco
          .filter((f) => {
            if (dataToDisplay === movie) {
              return f.media_type === movie;
            } else if (dataToDisplay === tvshow) {
              return f.media_type === tvshow;
            } else return f;
          })
          .slice(0, numberContainerToDisplay)
          .map((genre, index) => (
            <InfiniteHorizontalCarousel
              key={genre.id + index.toString()}
              genre={genre}
            />
          ))}
      </div>
    );
  }
};
export default Genre;
