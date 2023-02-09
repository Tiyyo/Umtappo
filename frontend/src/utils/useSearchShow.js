import axios from "axios";
import { useEffect, useState } from "react";

const useSearchShow = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(false);

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
        url: `https://api.themoviedb.org/3/search/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&page=${pageNumber}&query=${query}&include_adult=false`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setContent((prevContent) => {
            console.log(res.data);
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
  }, [query, pageNumber]);
  return { content, loading, error, hasMore };
};

export default useSearchShow;
