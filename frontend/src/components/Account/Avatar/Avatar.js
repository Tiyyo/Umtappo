import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const Avatar = ({ getStateModal }) => {
  const openModalPhoto = () => {
    console.log("hello");
  };

  return (
    <div className="avatar-wrapper">
      <div className="avatar">
        <img
          src="https://xsgames.co/randomusers/avatar.php?g=male"
          alt="random avatar profile"
        />
      </div>
      <div className="edit" onClick={() => getStateModal(true)}>
        <ModeEditIcon color="primary" fontSize="10px" />
        <span>Edit</span>
      </div>
    </div>
  );
};

export default Avatar;
