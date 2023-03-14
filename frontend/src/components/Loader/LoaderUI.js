import React from "react";
import { CircularProgress } from "@mui/material";
import Overlay from "../Overlay/Overlay";

const LoaderUI = ({ size, fixed }) => {
  return (
    <div className="loading" data-position={fixed ? "fixed" : ""}>
      <Overlay>
        <CircularProgress size={size} sx={{ color: "#fb8c00" }} />
      </Overlay>
    </div>
  );
};

export default LoaderUI;
