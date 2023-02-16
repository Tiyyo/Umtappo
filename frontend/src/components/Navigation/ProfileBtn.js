import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileBtn = () => {
  return (
    <div className="avatar">
      <Link to="/Account">
        <Avatar sx={{ color: "orange", backgroundColor: "transparent" }} />
      </Link>
    </div>
  );
};

export default ProfileBtn;
