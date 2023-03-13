import React from "react";
import MenuLink from "./MenuLink";

const Menu = () => {
  return (
    <ul className="menu">
      <MenuLink path="Profile" icon={"PersonIcon"} />
      <MenuLink path="Preference" icon={"SettingsIcon"} />
      <MenuLink path="Lists" icon={"BookmarksIcon"} />
    </ul>
  );
};

export default Menu;
