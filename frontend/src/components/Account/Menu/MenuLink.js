import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "../../Button/Button";
import { displayIcon } from "./display.icon";

const MenuLink = ({ path, icon }) => {
  return (
    <Link to={path}>
      <li className="link">
        {displayIcon(icon)}
        <span>{path}</span>
        <Button>
          <ArrowForwardIcon />
        </Button>
      </li>
    </Link>
  );
};

export default MenuLink;
