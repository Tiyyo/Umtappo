import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

const RateMe = ({ isOpen, close }) => {
  const [rate, setRate] = useState(10);
  return (
    <div
      className="rate-me"
      style={isOpen ? { bottom: "0" } : { top: "100vh" }}
    >
      <div
        className="close-icon"
        onClick={() => {
          close(false);
        }}
      >
        <CloseIcon />
      </div>
      <div className="rate-me__picking">
        <div className="star-container">
          <div className="star">
            {rate >= 1 ? (
              <StarOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            )}
          </div>
          <div className="star">
            {rate >= 2 ? (
              <StarOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            )}
          </div>
          <div className="star">
            {rate >= 3 ? (
              <StarOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            )}
          </div>
          <div className="star">
            {rate >= 4 ? (
              <StarOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            )}
          </div>
          <div className="star">
            {rate >= 5 ? (
              <StarOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            )}
          </div>
          <div className="star">
            {rate >= 6 ? (
              <StarOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            )}
          </div>
          <div className="star">
            {rate >= 7 ? (
              <StarOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            )}
          </div>
          <div className="star">
            {rate >= 8 ? (
              <StarOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            )}
          </div>
          <div className="star">
            {rate >= 9 ? (
              <StarOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            )}
          </div>
          <div className="star">
            {rate >= 10 ? (
              <StarOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: "rgb(214, 214, 32)" }} />
            )}
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RateMe;
