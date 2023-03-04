import React, { useContext, useEffect, useState } from "react";
import LoaderUI from "../Loader/LoaderUI";
import axios from "axios";
import AppContext from "../../utils/Context/AppContextProvider";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const FavoriteResume = () => {
  const { config, languages } = useContext(AppContext);
  const dispatch = useDispatch();

  const { lists: myLists, loading: loadingListState } = useSelector(
    (state) => state.lists
  );
  const { likes: movies_liked, loading: loadingMoviesState } = useSelector(
    (state) => state.movieLiked
  );

  const [endpoints, setEndpoints] = useState(null);
  const [moviesDisplayed, setMoviesDisplayed] = useState([]);

  const pathLogoImage = (content) => {
    return config.base_url + config.logo_sizes[0] + content?.poster_path;
  };

  let tv = "tv";
  let movie = "movie";

  const queries = (arr, media) => {
    const query = arr?.map((m) => {
      let id;
      m.map((el) => (id = el.id));
      return `https://api.themoviedb.org/3/${media}/${id}?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}`;
    });
    return setEndpoints(query);
  };

  const getData = async (endpoints, media_type) => {
    const result = await axios.all(
      endpoints.map(async (q) => {
        return axios.get(q).then((res) => {
          res.data.type = media_type;
          setMoviesDisplayed((prevState) => [...prevState, res.data]);
        });
      })
    );
  };

  useEffect(() => {
    queries(movies_liked, movie);
  }, [movies_liked, languages]);

  useEffect(() => {
    getData(endpoints, "movie");
  }, [endpoints]);

  return (
    <div className="app">
      {loadingListState === "pending" ? (
        <LoaderUI />
      ) : (
        <div className="main">
          <h2>My Lists</h2>
          {myLists &&
            myLists.map((list) => {
              return (
                <div key={list._id}>
                  <Link to={list.name} state={{ list }}>
                    <img src={pathLogoImage(list.content[0])}></img>
                  </Link>
                  <h5>{list.name}</h5>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default FavoriteResume;
