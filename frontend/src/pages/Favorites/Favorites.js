import React, { useState } from "react";
import FavoriteList from "../../components/Favorites/FavoriteList";
import LoaderUI from "../../components/Loader/LoaderUI";

const Favorites = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="app">
      {loading ? (
        <LoaderUI />
      ) : (
        <div className="main">
          <FavoriteList />
          <FavoriteList />
        </div>
      )}
    </div>
  );
};

export default Favorites;
