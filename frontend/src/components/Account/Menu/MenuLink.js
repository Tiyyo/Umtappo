import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AppContext from "../../../utils/Context/AppContextProvider";
import { ThemeProvider } from "@mui/material";

const MenuLink = ({ path, icon }) => {
  const { iconTheme } = useContext(AppContext);

  const displayIcon = (icon) => {
    if (icon === "PersonIcon") return <PersonIcon />;
    if (icon === "SettingsIcon") return <SettingsIcon />;
    if (icon === "BookmarksIcon") return <BookmarksIcon />;
  };

  return (
    <ThemeProvider theme={iconTheme}>
      <li className="link">
        {displayIcon(icon)}
        <span>{path}</span>
        <Link to={path}>
          <button type="button">
            <ArrowForwardIcon />
          </button>
        </Link>
      </li>
    </ThemeProvider>
  );
};

export default MenuLink;
