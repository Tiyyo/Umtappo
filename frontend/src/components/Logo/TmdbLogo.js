import React from "react";
import Tmdb_logo from "../../assets/images/TMDB_logo.svg";

const TmdbLogo = () => {
  return (
    <div className="tmdb_logo">
      <img src={Tmdb_logo} alt="The Movie DataBase" />
    </div>
  );
};

export default TmdbLogo;
