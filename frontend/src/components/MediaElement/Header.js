import React from "react";
import { useNavigate } from "react-router";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ProfileBtn from "../Navigation/AccountIcon";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="card__header">
      <button className="card__header__return-btn" onClick={() => navigate(-1)}>
        <KeyboardBackspaceIcon sx={{ color: "#fb8c00" }} />
      </button>
      <div className="card__header__avatar">
        <ProfileBtn />
      </div>
    </div>
  );
};

export default Header;
