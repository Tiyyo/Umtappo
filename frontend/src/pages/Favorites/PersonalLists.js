import React from "react";
import { Outlet } from "react-router-dom";

const Favorites = () => {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

export default Favorites;
