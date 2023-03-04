import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppContext from "../Context/AppContextProvider";
import axios from "axios";

const useMediaId = () => {
  const movies = useSelector((s) => s.movieLiked.likes);
  const tvshow = useSelector((s) => s.tvshowLiked.likes);

  const [moviesLinks, setMoviesLinks] = useState(null);
  const [tvshowLinks, setTvshowLinks] = useState(null);
  const [loading, setLoading] = useState("idle");
  const [fetchMovies, setFetchMovies] = useState([]);
  const [fetchTvshow, setFetchTvshow] = useState([]);
  const { languages } = useContext(AppContext);

  let mediaMovie = "movie";
  let mediaTv = "tv";

  const queries = (arr, media) => {
    console.log(arr, media);
    const query = arr?.map((m) => {
      let id;
      m.map((el) => (id = el.id));
      return `https://api.themoviedb.org/3/${media}/${id}?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}`;
    });
    if (media === "movie") {
      setMoviesLinks(query);
    } else if (media === "tv") {
      setTvshowLinks(query);
    }
  };

  const manageDuplicate = (state, data) => {
    console.log(state);
    if (state.length > 1 || state == undefined) {
      let ids = state.map((m) => m.id);
      return ids.includes(data.id) ? [...state] : [...state, data];
    } else {
      return [...state, data];
    }
  };

  const getData = async (endpoints, media_type) => {
    const result = await axios.all(
      endpoints.map(async (q) => {
        return axios
          .get(q)
          .then((res) => {
            res.data.type = media_type;
            if (media_type === "movie") {
              setFetchMovies((prevState) => {
                if (prevState.length > 1) {
                  let ids = prevState.map((m) => m.id);
                  return ids.includes(res.data.id)
                    ? [...prevState]
                    : [...prevState, res.data];
                } else {
                  return [...prevState, res.data];
                }
              });
            }
            if (media_type === "tv") {
              console.log(media_type);
              setFetchTvshow((prevState) => {
                if (prevState.length > 1) {
                  let ids = prevState.map((m) => m.id);
                  return ids.includes(res.data.id)
                    ? [...prevState]
                    : [...prevState, res.data];
                } else {
                  console.log(prevState);
                  return [...prevState, res.data];
                }
              });
            }
          })
          .catch((err) => setLoading("failed"))
          .finally(() => setLoading("idle"));
      })
    );
  };

  useEffect(() => {
    setLoading("pending");
    queries(movies, mediaMovie);
    queries(tvshow, mediaTv);
    console.log(tvshowLinks);
  }, [movies, tvshow]);

  useEffect(() => {
    getData(moviesLinks, mediaMovie);
    getData(tvshowLinks, mediaTv);
  }, [languages, moviesLinks, tvshowLinks]);

  return { fetchMovies, fetchTvshow, loading };
};

export default useMediaId;
