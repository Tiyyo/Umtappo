import React from "react";
import { CircularProgress } from "@mui/material";
import Overlay from "../Overlay/Overlay";

const LoaderUI = ({ size, position, overlay }) => {
  const getPosition = () => {
    if (position === "fixed") return "fixed";
    else if (position === "absolute") {
      return "absolute";
    } else {
      return;
    }
  };

  return (
    <div className="loading" data-position={getPosition(position)}>
      <Overlay active={overlay}>
        <CircularProgress size={size} sx={{ color: "#fb8c00" }} />
      </Overlay>
    </div>
  );
};

export default LoaderUI;
