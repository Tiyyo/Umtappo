import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import { Link, Outlet } from "react-router-dom";
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
import Button from "../Button/Button";

const CallToAction = ({ media_type, id, content }) => {
  const { iconTheme } = useContext(AppContext);
  const { userID } = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();

  const isAlreadyLiked = useIsLiked(media_type, id);

  useEffect(() => {
    if (isAlreadyLiked) {
      setIsLiked(true);
    }
  }, [isAlreadyLiked]);

  let movieType = "movie";
  let tvshowType = "tv";

  const addToFavorite = () => {
    setIsLiked(!isLiked);
  };

  const addToLikes = async (media_type) => {
    const data = { user_id: userID, content_id: id, media_type };
    const result = await axios
      .post(`http://localhost:5000/like/${media_type}`, data)
      .then((res) => {
        if (res.status === 200) {
          media_type === movieType
            ? dispatch(likeMovie({ id, media_type }))
            : dispatch(likeTvshow({ id, media_type }));
        } else {
          console.log(res.response.data);
        }
      })
      .catch((err) => console.log(err));
    return result;
  };

  const removeFromLikes = async (media_type) => {
    const data = { user_id: userID, content_id: id, media_type };
    const result = await axios
      .patch(`http://localhost:5000/like/${media_type}`, data)
      .then((res) => {
        if (res.status === 200) {
          media_type === movieType
            ? dispatch(dislikeMovie({ id: content.id, media_type }))
            : dispatch(dislikeTvshow({ id: content.id, media_type }));
        } else {
          console.log(res.response.data);
        }
      })
      .catch((err) => console.log(err));
    return result;
  };

  useEffect(() => {
    if (isLiked) {
      media_type === movieType ? addToLikes(movieType) : addToLikes(tvshowType);
    } else {
      media_type === tvshowType
        ? removeFromLikes(movieType)
        : removeFromLikes(tvshowType);
    }
  }, [isLiked]);

  return (
    <div className="modal-content__wrapper__media-element__call-to-action">
      <Outlet />
      <ThemeProvider theme={iconTheme}>
        <div
          className="modal-content__wrapper__media-element__call-to-action__favorite"
          onClick={() => {
            addToFavorite();
          }}
        >
          <Button>{isLiked ? <BookmarkIcon /> : <BookmarkBorderIcon />}</Button>
        </div>
        <div className="modal-content__wrapper__media-element__call-to-action__add-to">
          <Link to="add_to_playlist" state={{ content }}>
            <Button>
              <AddIcon />
            </Button>
          </Link>
        </div>
        <div className="modal-content__wrapper__media-element__call-to-action__share">
          <Link to={"modal"}>
            <Button>
              <ShareIcon />
            </Button>
          </Link>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default CallToAction;
