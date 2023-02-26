import React, { useContext, useState, useEffect } from "react";
import FavoriteList from "./FavoriteList";
import LoaderUI from "../Loader/LoaderUI";
import axios from "axios";
import UserContext from "../../utils/Context/UserContextProvider";
import AppContext from "../../utils/Context/AppContextProvider";
import { Link } from "react-router-dom";

const FavoriteResume = () => {
  const [loading, setLoading] = useState(true);
  const [myLists, setMyLists] = useState("");
  const { config } = useContext(AppContext);

  const { userID } = useContext(UserContext);

  const pathLogoImage = (content) => {
    return config.base_url + config.logo_sizes[1] + content.poster_path;
  };

  useEffect(() => {
    const fetchUserLists = async () => {
      const result = await axios
        .post("http://localhost:5000/list/get", {
          user_id: userID,
        })
        .then((res) => setMyLists(res.data))
        .finally(() => setLoading(false));
    };
    fetchUserLists();
  }, [userID]);

  return (
    <div className="app">
      {loading ? (
        <LoaderUI />
      ) : (
        <div className="main">
          <h2>My Lists</h2>
          {myLists.map((list) => {
            return (
              <div key={list._id}>
                <Link to={list.name} state={{ list }}>
                  <img src={pathLogoImage(list.content[0])}></img>
                </Link>
                <h5>{list.name}</h5>
              </div>
            );
          })}

          {/* <FavoriteList />
          <FavoriteList /> */}
        </div>
      )}
    </div>
  );
};

export default FavoriteResume;
