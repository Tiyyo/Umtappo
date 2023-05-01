import React from "react";
import InfiniteHorizontalCarousel from "../InfiniteCarousel/InfiniteCarousel";
import { useContext } from "react";
import AppContext from "../../../utils/Context/AppContextProvider";
import UserContext from "../../../utils/Context/UserContextProvider";
import useIsEnough from "./useIsEnough";

const Genre = ({ dataToDisplay, numberContainerToDisplay }) => {
  const { recommendations } = useContext(AppContext);
  const { scores, randomReco, isAuth } = useContext(UserContext);

  const isEnough = useIsEnough();

  let both = "Both";

  // create a function getUniqueValuesArray in the future
  const uniqueScores = [
    ...new Map(
      scores?.map((el) => {
        return [el.id, el];
      })
    ).values(),
  ];

  const uniqueRandomReco = [
    ...new Map(
      randomReco?.map((el) => {
        return [el.id, el];
      })
    ).values(),
  ];

  if (!scores && !randomReco) {
    return <div className="favorite-genre"></div>;
  } else if (recommendations && scores && isEnough && isAuth) {
    return (
      <div className="favorite-genre">
        {uniqueScores
          .filter((f) =>
            dataToDisplay === both ? f : f.media_type === dataToDisplay
          )
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
  } else {
    return (
      <div className="favorite-genre">
        {uniqueRandomReco
          .filter((f) =>
            dataToDisplay === both ? f : f.media_type === dataToDisplay
          )
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
