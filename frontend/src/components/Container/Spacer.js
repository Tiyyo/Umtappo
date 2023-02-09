import React from "react";
import { useContext } from "react";
import HomeContext from "../../utils/Context/HomeContextProvider";

const Spacer = () => {
  const { imageHeaderHeight } = useContext(HomeContext);

  return (
    <div
      className="spacer"
      style={{ height: `${imageHeaderHeight - 100}px` }}
    ></div>
  );
};

export default Spacer;
