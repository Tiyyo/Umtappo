import { CloseFullscreen } from "@mui/icons-material";
import React, { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import { displayGenre } from "../MediaElement/display.genre";

const HeaderResume = ({ content }) => {
  // const { content } = props;
  const { genreListMovie, genreListTv } = useContext(AppContext);

  return (
    <div className="header-resume">
      <div className="title">{content.title || content.name}</div>
      <div className="overview">{content.overview}</div>
      <div style={{ display: "flex", padding: "4% 2%", alignItems: "center" }}>
        <div className="year">
          {content.first_air_date?.substring(0, 4) ||
            content.release_date?.substring(0, 4)}
        </div>
        <div className="type">{content.type}</div>
      </div>
      <div className="genres">
        {displayGenre(
          content.genre_ids,
          content.type,
          genreListMovie,
          genreListTv
        )}
      </div>
      <div className="rates">{Math.round(content.vote_average * 10) / 10}</div>
    </div>
  );
};

export default HeaderResume;
