import React from "react";
import { CircularProgress } from "@mui/material";

const LoaderUI = () => {
  return (
    <div className="loading">
      <CircularProgress sx={{ color: "#fb8c00" }} />
    </div>
  );
};

export default LoaderUI;
