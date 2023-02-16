import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MenuLink = (props) => {
  const { path } = props;
  console.log(path);
  return (
    <li className="link">
      <span>{path}</span>
      <Link to={path}>
        <button type="button">
          <ArrowForwardIcon />
        </button>
      </Link>
    </li>
  );
};

export default MenuLink;
