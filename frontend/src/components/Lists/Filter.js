import React, { useState } from "react";
import Button from "../Button/Button";
import "./animationbtn.scss";
import GridViewIcon from "@mui/icons-material/GridView";

const Filter = () => {
  return (
    <div className="essai">
      <Button>
        <GridViewIcon sx={{ color: "white" }} />
      </Button>
    </div>
  );
};

export default Filter;
