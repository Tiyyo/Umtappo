import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuLink from "./MenuLink";

const Menu = () => {
  return (
    <ul className="menu">
      <MenuLink path="Profile" />
      <MenuLink path="Preference" />
      <MenuLink path="Lists" />
    </ul>
  );
};

export default Menu;
