import React, { useState } from "react";
import FavoriteList from "../../components/Favorites/FavoriteList";
import LoaderUI from "../../components/Loader/LoaderUI";
import Navigation from "../../components/Navigation/Navigation";
import ProfileBtn from "../../components/Navigation/ProfileBtn";

const Likes = () => {
  const [loading, setLoading] = useState(false);
  const [navIsOpen, setNavOpen] = useState(false);

  const pullNavState = (something) => {
    setNavOpen(something);
  };

  return (
    <div
      className="app"
      onClick={() => {
        if (navIsOpen) {
          setNavOpen(false);
        }
      }}
    >
      <div className="header">
        <Navigation getNavState={pullNavState} parentNavState={navIsOpen} />
        <ProfileBtn />
      </div>
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

export default Likes;
