import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import defaultAvatar from "../../../assets/images/default_avatar.png";
import { useSelector } from "react-redux";

const Avatar = ({ getStateModal }) => {
  const pictures = useSelector((state) => {
    return state.user.user.pictures;
  });

  console.log(pictures);

  // const { crop: profileImage } = useSelector(
  //   (state) => state.user.user.pictures
  // );

  const { crop: profileImage } = pictures;

  return (
    <div className="avatar-wrapper">
      <div className="avatar">
        <img src={profileImage ? profileImage : defaultAvatar} alt="avatar" />
      </div>
      <div className="edit" onClick={() => getStateModal(true)}>
        <ModeEditIcon fontSize="10px" />
        <span>Edit</span>
      </div>
    </div>
  );
};

export default Avatar;
