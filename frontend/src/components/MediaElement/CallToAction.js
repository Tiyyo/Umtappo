import React from "react";
import { theme } from "../../theme/IconTheme";
import { ThemeProvider } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const CallToAction = (props) => {
  const { content } = props;
  const addToFavorite = () => {
    return;
  };

  return (
    <div className="card__call-to-action">
      <ThemeProvider theme={theme}>
        <div
          className="card__call-to-action__favorite"
          onClick={() => {
            addToFavorite();
          }}
        >
          <BookmarkBorderIcon />
        </div>
        <div className="card__call-to-action__add-to">
          <Link to="add_to_playlist" state={{ content }}>
            <AddIcon sx={{ color: "white" }} />
          </Link>
        </div>
        <div className="card__call-to-action__share">
          <ShareIcon />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default CallToAction;
