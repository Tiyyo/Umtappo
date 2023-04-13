import React, { useState } from "react";

const useRandomGenre = () => {
  let numberContainerToDisplay = 3;
  let movie = "movie";
  let tvshow = "tv";
  let both = "Both";
  const [genre, setGenre] = useState(null);
  const randomValues = useRef([]);
  const favoriteGenre = useRef([]);

  return <div></div>;
};

export default useRandomGenre;
