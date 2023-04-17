import React, { useEffect, useState, useContext } from "react";
import PromotedCard from "../../Cards/Promoted/PromotedCard";
import useWindowsSize from "../../../utils/hooks/useWindowSize";
import {
  useGetAllPromotedMoviesQuery,
  useGetAllPromotedTvshowQuery,
} from "../../../features/content/tmdbAPI";
import AppContext from "../../../utils/Context/AppContextProvider";

const Promoted = ({ indexes, mediaType }) => {
  const [content, setContent] = useState(null);
  const [numberElementDisplayed, setNumberElementDisplayed] = useState(1);

  const { languages } = useContext(AppContext);

  const params = { languages, page: [1, 2, 3, 4, 5, 6] };

  const { data: promotedMovies } = useGetAllPromotedMoviesQuery(params);
  const { data: promotedTvshows } = useGetAllPromotedTvshowQuery(params);

  const { width: windowWidth } = useWindowsSize();

  useEffect(() => {
    if (windowWidth < 340) {
      return setNumberElementDisplayed(0);
    } else if (windowWidth < 340 * 2) {
      return setNumberElementDisplayed(1);
    } else if (windowWidth < 340 * 3) {
      return setNumberElementDisplayed(2);
    } else if (windowWidth < 340 * 4) {
      return setNumberElementDisplayed(3);
    } else {
      return setNumberElementDisplayed(4);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (mediaType === "movie") {
      let extractContent = indexes.map((i) => promotedMovies[i]);
      setContent(extractContent);
    } else if (mediaType === "tv") {
      let extractContent = indexes.map((i) => promotedTvshows[i]);
      setContent(extractContent);
    }
  }, [promotedMovies, promotedTvshows, numberElementDisplayed]);

  return (
    <div className="promoted">
      {content &&
        content.slice(0, numberElementDisplayed).map((el) => {
          return (
            <PromotedCard key={el.id + el.title || el.name} content={el} />
          );
        })}
    </div>
  );
};

export default Promoted;
