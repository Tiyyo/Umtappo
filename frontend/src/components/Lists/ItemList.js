import React, { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { displayInfos } from "../../features/watchlists/Slice/resume.header";
import { deleteContent } from "../../features/watchlists/Slice/lists.slice";
import {
  dislikeMovie,
  deleteMovieFromFetch,
} from "../../features/movie liked/Slice/likes.slice";
import {
  dislikeTvshow,
  deleteTvshowFromFetch,
} from "../../features/tvshow liked/slice/like.slice";
import axios from "axios";

const ItemList = (props) => {
  const { content, listID, typeList } = props;

  const { config, iconTheme } = useContext(AppContext);

  const dispatch = useDispatch();

  const userID = useSelector((state) => state.user.user.id);

  const imagePath = (int, content) => {
    return config.base_url + config.logo_sizes[int] + content.poster_path;
  };

  const sendInfosStore = (data) => {
    dispatch(displayInfos(data));
  };

  const removeContent = async (contentId) => {
    await axios.patch("http://localhost:5000/list", {
      list_id: listID,
      content_id: contentId,
    });
    dispatch(deleteContent({ listID, contentId }));
  };

  const dislikeContent = async (content) => {
    let type;
    console.log(listID);
    listID === "1" ? (type = "movie") : (type = "tvshow");

    let data = { user_id: userID, content_id: content.id, media_type: type };

    await axios
      .patch(`http://localhost:5000/like/${type}/`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    if (type === "movie") {
      console.log("movie");
      dispatch(dislikeMovie({ id: content.id, media_type: type }));
      dispatch(deleteMovieFromFetch(content));
    } else if (type === "tvshow") {
      dispatch(dislikeTvshow({ id: content.id, media_type: type }));
      dispatch(deleteTvshowFromFetch(content));
    }
  };

  return (
    <ThemeProvider theme={iconTheme}>
      <div
        className="item-list"
        onMouseOver={() => sendInfosStore(content)}
        onTouchStart={() => sendInfosStore(content)}
      >
        <div className="item-list__image">
          <img src={imagePath(0, content)} alt="logo of media" />
        </div>
        <div className="item-list__infos">
          <div className="item-list__infos--title">
            {content.title || content.name}
          </div>
          <div className="attributes">
            <span className="item-list__infos--type">
              {content.type.toLowerCase() === "movie" ? (
                <div>
                  <TheatersOutlinedIcon />
                  <span>{content.type}</span>
                </div>
              ) : (
                <div>
                  <TvOutlinedIcon />
                  <span>{content.type}</span>
                </div>
              )}
            </span>
            <span>.</span>
            <span className="item-list__infos--year">
              {content.first_air_date?.substring(0, 4) ||
                content.release_date?.substring(0, 4)}
            </span>
          </div>
        </div>
        <div
          className="item-list__delete"
          onClick={() => {
            typeList === "like"
              ? dislikeContent(content)
              : removeContent(content.id);
          }}
        >
          <DeleteIcon />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ItemList;
