import { createContext, useEffect, useContext, useState } from "react";
import {
  useGetAllPromotedMoviesQuery,
  useGetAllPromotedTvshowQuery,
} from "../../features/content/tmdbAPI";
import AppContext from "./AppContextProvider";
import usePromoted from "../../components/Container/Promoted/usePromoted";

export const PromotedMediaContext = createContext(null);

export const PromotedMediaContextProvider = ({ children }) => {
  const { languages } = useContext(AppContext);

  const params = {
    languages,
    page: [1, 2, 3, 4, 5, 6],
  };

  let numMaxOfContentToDisplay = 12;
  let numMaxCardsForContainer = 3;

  const { data: promotedMovies } = useGetAllPromotedMoviesQuery(params);

  const { data: promotedTvshows } = useGetAllPromotedTvshowQuery(params);

  const numberMovies = promotedMovies?.length;
  const numberTvshow = promotedTvshows?.length;

  const uniqueArrayMovie = usePromoted(
    numMaxOfContentToDisplay,
    numMaxCardsForContainer,
    numberMovies
  );

  const uniqueArrayTvshow = usePromoted(
    numMaxOfContentToDisplay,
    numMaxCardsForContainer,
    numberTvshow
  );

  const [uniqueArraysIndexMovie, setUniqueArraysIndexMovie] = useState(null);
  const [uniqueArraysIndexTvshow, setUniqueArraysIndexTvshow] = useState(null);

  const value = { uniqueArraysIndexMovie, uniqueArraysIndexTvshow };

  useEffect(() => {
    setUniqueArraysIndexMovie(uniqueArrayMovie);
  }, [uniqueArrayMovie]);

  useEffect(() => {
    setUniqueArraysIndexTvshow(uniqueArrayTvshow);
  }, [uniqueArrayTvshow]);

  return (
    <PromotedMediaContext.Provider value={value}>
      {children}
    </PromotedMediaContext.Provider>
  );
};

export default PromotedMediaContext;
