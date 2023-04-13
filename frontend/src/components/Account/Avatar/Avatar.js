import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import defaultAvatar from "../../../assets/images/default_avatar.png";
import { useSelector } from "react-redux";

const Avatar = ({ getStateModal }) => {
  const profileImage = useSelector((state) => {
    return state.user.user.pictures?.crop;
  });

  return (
    <div className="avatar-wrapper">
      <div className="avatar">
        <img
          src={profileImage ? profileImage : defaultAvatar}
          alt="user profile picture"
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
