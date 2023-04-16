import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  useGetAllPromotedMoviesQuery,
  useGetAllPromotedTvshowQuery,
} from "../../../features/content/tmdbAPI";
import AppContext from "../../../utils/Context/AppContextProvider";

const usePromoted = () => {
  const { languages } = useContext(AppContext);
  const [array, setArray] = useState([]);
  let numMaxOfContentToDisplay = 12;
  let numMaxCardsForContainer = 4;

  //   const params = { languages: languages, page: [1, 2, 3, 4, 5, 6] };

  //   const { data: essai } = useGetAllPromotedMoviesQuery(params);

  //   const { data: shows } = useGetAllPromotedTvshowQuery(params);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 105);
  };

  const generateUniqueIndex = (arr) => {
    const randomNumber = generateRandomNumber(105);
    if (!arr.includes(randomNumber) || arr.length === 0) {
      pushToArray(arr, randomNumber);
    } else {
      generateUniqueIndex(arr);
    }
  };

  const pushToArray = (arr, number) => {
    arr.push(number);
  };

  function splitMainArray(arr, parts) {
    let result = [];
    const copy = [...arr];
    for (let i = parts; i > 0; i--) {
      result.push(copy.splice(0, Math.ceil(copy.length / i)));
    }
    return result;
  }

  const generateArraysIndexMovies = (
    arr,
    numMaxOfContentToDisplay,
    numMaxCardsForContainer
  ) => {
    while (arr.length < numMaxOfContentToDisplay) {
      generateUniqueIndex(arr);
    }
    const splitValues = splitMainArray(arr, numMaxCardsForContainer);
    return splitValues;
  };

  const memoized = useCallback(
    generateArraysIndexMovies(
      array,
      numMaxOfContentToDisplay,
      numMaxCardsForContainer
    ),
    [languages]
  );

  console.log(memoized);

  return generateArraysIndexMovies(
    array,
    numMaxOfContentToDisplay,
    numMaxCardsForContainer
  );
};

export default usePromoted;
