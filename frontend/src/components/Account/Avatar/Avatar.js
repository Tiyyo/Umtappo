import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import defaultAvatar from "../../../assets/images/default_avatar.png";
import { useSelector } from "react-redux";

const Avatar = ({ getStateModal }) => {
  const { crop: userProfileImage } = useSelector(
    (state) => state.user.user.pictures
  );

  return (
    <div className="avatar-wrapper">
      <div className="avatar">
        <img
          src={userProfileImage ? userProfileImage : defaultAvatar}
          alt="user profile picture or default avatar"
        />
      </div>
      <div className="edit" onClick={() => getStateModal(true)}>
        <ModeEditIcon fontSize="10px" />
        <span>Edit</span>
      </div>
    </div>
  );
};

export default Avatar;
