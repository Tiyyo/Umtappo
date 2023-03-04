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
} from "../../features/movie liked/Slice/LikeMovie";
import {
  likeTvshow,
  dislikeTvshow,
} from "../../features/tvshow liked/slice/LikeTvshow";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CallToAction = (props) => {
  const { content } = props;
  const { iconTheme } = useContext(AppContext);

  const [isLiked, setIsLiked] = useState(false);

  const {
    user: { id: user_id },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let movieType = "movie";
  let tvshowType = "tvshow";

  const addToFavorite = () => {
    setIsLiked(!isLiked);
  };

  const addToLikes = async (type) => {
    const data = { user_id: user_id, content_id: content.id, media_type: type };
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
    const data = { user_id: user_id, content_id: content.id, media_type: type };
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

  return (
    <div className="card__call-to-action">
      <ThemeProvider theme={iconTheme}>
        <div
          className="card__call-to-action__favorite"
          onClick={() => {
            addToFavorite();
          }}
        >
          {isLiked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </div>
        <div className="card__call-to-action__add-to">
          <Link to="add_to_playlist" state={{ content }}>
            <AddIcon />
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
