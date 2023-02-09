import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const shuffle = (arr) => {
  //   let currentIndex = arr.length,
  //     randomIndex;
  //   while (currentIndex !== 0) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;
  //     [arr[currentIndex], arr[randomIndex]] = [
  //       arr[randomIndex],
  //       arr[currentIndex],
  //     ];
  //   }
  //   return arr;
  // };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(url)
        .then((res) => {
          setContent(res.data.results);
          // shuffle(content);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => setLoading(true));
    };
    fetchData();
  }, [url]);

  content.forEach((el) => {
    if (!url.includes("tv")) {
      el.type = "Movie";
    }
    if (url.includes("tv")) {
      el.type = "TvShow";
    }
  });

  return { content, error, loading };
};

export default useFetch;
