import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AppContext from "../../../utils/Context/AppContextProvider";
import { ThemeProvider } from "@mui/material";
import Button from "../../Button/Button";

const MenuLink = ({ path, icon }) => {
  const { iconTheme } = useContext(AppContext);

  const displayIcon = (icon) => {
    if (icon === "PersonIcon") return <PersonIcon />;
    if (icon === "SettingsIcon") return <SettingsIcon />;
    if (icon === "BookmarksIcon") return <BookmarksIcon />;
  };

  return (
    <ThemeProvider theme={iconTheme}>
      <Link to={path}>
        <li className="link">
          {displayIcon(icon)}
          <span>{path}</span>
          <Button>
            <ArrowForwardIcon />
          </Button>
        </li>
      </Link>
    </ThemeProvider>
  );
};

export default MenuLink;
