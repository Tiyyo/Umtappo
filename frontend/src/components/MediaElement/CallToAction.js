import React, { useContext, useEffect, useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import {
  likeMovie,
  dislikeMovie,
} from "../../features/movie liked/Slice/likes.slice";
import {
  likeTvshow,
  dislikeTvshow,
} from "../../features/tvshow liked/slice/like.slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import useIsLiked from "./useIsLiked";
import UserContext from "../../utils/Context/UserContextProvider";
import Button from "../Button/Button";

const CallToAction = ({ media_type, id, content }) => {
  const { userID } = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();

  const isAlreadyLiked = useIsLiked(media_type, id); // too loog

  useEffect(() => {
    if (isAlreadyLiked) {
      setIsLiked(true);
    }
  }, [isAlreadyLiked]);

  let movieType = "movie";

  function handleClick() {
    if (isLiked) {
      removeFromLikes(media_type);
      setIsLiked(false);
    } else {
      addToLikes(media_type);
      setIsLiked(true);
    }
  }

  const addToLikes = async (media_type) => {
    const data = {
      user_id: userID,
      content_id: id,
      media_type,
      genres: content.genres,
      vote_average: content.vote_average,
    };
    const result = await axios
      .post(`https://umtappo.onrender.com/like/${media_type}`, data)
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
      .patch(`https://umtappo.onrender.com/${media_type}`, data)
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

  return (
    <div className="modal-content__wrapper__media-element__call-to-action">
      <div
        className="modal-content__wrapper__media-element__call-to-action__favorite"
        onClick={handleClick}
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
    </div>
  );
};

export default CallToAction;
