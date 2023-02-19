import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

const MenuLink = (props) => {
  const { path, icon } = props;

  const displayIcon = (icon) => {
    console.log(props);
    if (icon === "PersonIcon") return <PersonIcon />;
    if (icon === "SettingsIcon") return <SettingsIcon />;
    if (icon === "BookmarksIcon") return <BookmarksIcon />;
  };

  return (
    <li className="link">
      {displayIcon(icon)}
      <span>{path}</span>
      <Link to={path}>
        <button type="button">
          <ArrowForwardIcon sx={{ color: "white" }} />
        </button>
      </Link>
    </li>
  );
};

export default MenuLink;
