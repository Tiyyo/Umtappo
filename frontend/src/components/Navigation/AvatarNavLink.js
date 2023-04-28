import React from "react";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/images/default_avatar.png";
import { useSelector } from "react-redux";

const AvatarNavLink = () => {
  const pictures = useSelector((state) => state.user.user.pictures);

  const userProfileImage = pictures?.crop;

  return (
    <NavLink to="/Account" className="nav-avatar">
      <div className="nav-avatar__wrapper">
        <img
          src={userProfileImage ? userProfileImage : defaultAvatar}
          alt="Link to profile "
        />
      </div>
    </NavLink>
  );
};
export default AvatarNavLink;
