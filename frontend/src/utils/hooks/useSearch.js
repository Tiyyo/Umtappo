import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContextProvider";

const useSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const { languages } = useContext(AppContext);

  useEffect(() => {
    setContent([]);
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      let cancel;
      setLoading(true);
      setError(false);
      await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/multi?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}&query=${query}&page=${pageNumber}&include_adult=false`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setContent((prevContent) => {
            return [...prevContent, ...res.data.results];
          });
          setHasMore(() => {
            if (res.data.results.length === 20) {
              return true;
            } else return false;
          });
          setLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
          setError(true);
        })
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [query, pageNumber, languages]);
  return { content, loading, error, hasMore };
};

export default useSearch;
