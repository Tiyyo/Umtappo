import React from "react";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";

const MediaType = ({ content }) => {
  return (
    <>
      {content.media_type === "movie" ? (
        <div>
          <TheatersOutlinedIcon />
          <span>{content.media_type}</span>
        </div>
      ) : (
        <div>
          <TvOutlinedIcon />
          <span>{content.media_type}Show</span>
        </div>
      )}
    </>
  );
};

export default MediaType;
