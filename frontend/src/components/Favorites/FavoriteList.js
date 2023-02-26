import React from "react";
import { useLocation } from "react-router";

const FavoriteList = (props) => {
  const location = useLocation();
  console.log(location);
  return <div>here goes content</div>;
};

export default FavoriteList;
