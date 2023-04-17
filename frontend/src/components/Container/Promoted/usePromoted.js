import { useEffect, useState } from "react";

const usePromoted = (
  numMaxOfContentToDisplay,
  numMaxCardsForContainer,
  max
) => {
  const [array, setArray] = useState([]);
  const [splitArray, setSplitArray] = useState([]);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * max);
  };

  const generateUniqueIndex = (arr) => {
    const randomNumber = generateRandomNumber();
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

  useEffect(() => {
    if (max) {
      const splits = generateArraysIndexMovies(
        array,
        numMaxOfContentToDisplay,
        numMaxCardsForContainer
      );
      setSplitArray(splits);
    }
  }, [max]);

  return splitArray;
};

export default usePromoted;
