import React from "react";
import { Link } from "react-router-dom";

const Lists = () => {
  let numberLikedMovies = 15;
  let numberLikedTvshow = 48;
  let numberOfLists = 7;

  return (
    <div className="lists">
      <div className="lists__infos">
        <div className="movies-liked">
          <span>{numberLikedMovies}</span> Movie Liked
        </div>
        <div className="tvshows-liked">
          <span>{numberLikedTvshow}</span> Tv Show Liked
        </div>
        <div className="lists-created">
          You have <span>{numberOfLists}</span> Lists
        </div>
      </div>
      <div className="lists__container">
        <Link>
          <div className="list">List 1</div>
        </Link>
        <Link>
          <div className="list">List 2</div>
        </Link>
        <Link>
          <div className="list">List 3</div>
        </Link>
        <Link>
          <div className="list">List 4</div>
        </Link>
      </div>
    </div>
  );
};

export default Lists;
