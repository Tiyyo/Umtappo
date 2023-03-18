import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import AppContext from "../../utils/Context/AppContextProvider";
import {
  likeMovie,
  dislikeMovie,
} from "../../features/movie liked/Slice/likes.slice";
import {
  likeTvshow,
  dislikeTvshow,
} from "../../features/tvshow liked/slice/like.slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useIsLiked from "./useIsLiked";
import UserContext from "../../utils/Context/UserContextProvider";

const CallToAction = ({ content }) => {
  const { iconTheme } = useContext(AppContext);
  const { userID } = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  const isAlreadyLiked = useIsLiked(content.type, userID, content.id);

  useEffect(() => {
    if (isAlreadyLiked) {
      setIsLiked(true);
    }
  }, [isAlreadyLiked]);

  let movieType = "movie";
  let tvshowType = "tvshow";

  const addToFavorite = () => {
    setIsLiked(!isLiked);
  };

  const addToLikes = async (type) => {
    const data = { user_id: userID, content_id: content.id, media_type: type };
    const res = await axios
      .post(`http://localhost:5000/like/${type}`, data)
      .then((res) => {
        if (res.status === 200) {
          type === movieType
            ? dispatch(likeMovie({ id: content.id, media_type: type }))
            : dispatch(likeTvshow({ id: content.id, media_type: tvshowType }));
        } else {
          console.log(res.response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const removeFromLikes = async (type) => {
    const data = { user_id: userID, content_id: content.id, media_type: type };
    const res = await axios
      .patch(`http://localhost:5000/like/${type}`, data)
      .then((res) => {
        if (res.status === 200) {
          type === movieType
            ? dispatch(dislikeMovie({ id: content.id, media_type: type }))
            : dispatch(
                dislikeTvshow({ id: content.id, media_type: tvshowType })
              );
        } else {
          console.log(res.response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isLiked) {
      content.type.toLowerCase() === movieType
        ? addToLikes(movieType)
        : addToLikes(tvshowType);
    } else {
      content.type.toLowerCase() === tvshowType
        ? removeFromLikes(movieType)
        : removeFromLikes(tvshowType);
    }
  }, [isLiked]);

  // useEffect(() => {
  //   setIsLiked(data);
  // }, [data]);

  return (
    <div className="media-element__call-to-action">
      <ThemeProvider theme={iconTheme}>
        <div
          className="media-element__call-to-action__favorite"
          onClick={() => {
            addToFavorite();
          }}
        >
          {isLiked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </div>
        <div className="media-element__call-to-action__add-to">
          <Link to="add_to_playlist" state={{ content }}>
            <AddIcon />
          </Link>
        </div>
        <div className="media-element__call-to-action__share">
          <ShareIcon />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default CallToAction;
