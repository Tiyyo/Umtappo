import React, { useContext, useState } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { displayGenre } from "../MediaElement/display.genre";

const ItemList = ({ content, listID, typeList }) => {
  const like = "like";
  const watchlist = "whatchlist";

  const { genreListMovie, genreListTv, config } = useContext(AppContext);

  const dispatch = useDispatch();

  const userID = useSelector((state) => state.user.user.id);

  const [openList, setOpenList] = useState(false);

  const imagePath = (int, content) => {
    return config.base_url + config.logo_sizes[int] + content?.poster_path;
  };

  const removeContent = async (contentId) => {
    await axios.patch("http://localhost:5000/list", {
      list_id: listID,
      content_id: contentId,
    });
    dispatch(deleteContent({ listID, contentId }));
  };

  const pullIdFromDatabase = async (type, data) => {
    await axios
      .patch(`http://localhost:5000/like/${type}/`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const dislikeContent = async (content) => {
    let type;
    listID === "1" ? (type = "movie") : (type = "tvshow");
    let data = { user_id: userID, content_id: content.id, media_type: type };

    if (type === "movie") {
      pullIdFromDatabase(type, data);
      dispatch(dislikeMovie({ id: content.id, media_type: type }));
      dispatch(deleteMovieFromFetch(content));
    } else if (type === "tvshow") {
      pullIdFromDatabase(type, data);
      dispatch(dislikeTvshow({ id: content.id, media_type: type }));
      dispatch(deleteTvshowFromFetch(content));
    }
  };

  const displayLikedMediaGenre = (typeList) => {
    if (typeList === like) {
      const genreName = content.genres.map((g) => g.name);
      return genreName.map((name, index) => {
        return (
          <span key={index} className="genre">
            {name}
          </span>
        );
      });
    } else if (typeList === watchlist) {
      return displayGenre(
        content.genre_ids,
        content.type,
        genreListMovie,
        genreListTv
      );
    }
  };

  const handleClick = () => {
    setOpenList(!openList);
  };

  return (
    <div className="item-container">
      <div
        className="item-list"
        onClick={handleClick}
        data-position={openList ? "open" : "close"}
      >
        <div
          className="item-list__wrapper"
          data-position={openList ? "open" : "close"}
        >
          <div
            className="item-list__wrapper__image"
            data-position={openList ? "open" : "close"}
            style={
              openList
                ? {
                    backgroundImage: `url('${
                      config.base_url +
                      config.poster_sizes[3] +
                      content?.poster_path
                    }')`,
                  }
                : { backgroundColor: "red" }
            }
          >
            <img
              src={imagePath(3, content)}
              alt="logo of media"
              data-position={openList ? "open" : "close"}
            />
          </div>

          <div
            className="item-list__wrapper__infos"
            data-position={openList ? "open" : "close"}
          >
            <div
              className="item-list__wrapper__infos--title"
              data-position={openList ? "open" : "close"}
            >
              {content.title || content.name}
            </div>
            <div
              className="item-list__wrapper__overview"
              data-position={openList ? "open" : "close"}
            >
              {content.overview}
            </div>
            <div
              className="item-list__wrapper__genres"
              data-position={openList ? "open" : "close"}
            >
              {displayLikedMediaGenre(typeList)}
            </div>
            <div
              className="item-list__wrapper__infos__attributes"
              data-position={openList ? "open" : "close"}
            >
              <span
                className="item-list__wrapper__infos__attributes__type"
                data-position={openList ? "open" : "close"}
              >
                {content.media_type.toLowerCase() === "movie" ? (
                  <div>
                    <TheatersOutlinedIcon />
                    <span>{content.media_type}</span>
                  </div>
                ) : (
                  <div>
                    <TvOutlinedIcon />
                    <span>{content.media_type}</span>
                  </div>
                )}
              </span>
              <span>.</span>
              <span
                className="item-list__wrapper__infos__attributes__year"
                data-position={openList ? "open" : "close"}
              >
                {content.first_air_date?.substring(0, 4) ||
                  content.release_date?.substring(0, 4)}
              </span>
            </div>
          </div>
          <div
            className="item-list__wrapper__delete"
            data-position={openList ? "open" : "close"}
            onClick={() => {
              typeList === "like"
                ? dislikeContent(content)
                : removeContent(content.id);
            }}
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div
        className="openlist"
        data-position={openList ? "open" : "close"}
        onClick={handleClick}
      >
        <div
          className="item-list__wrapper"
          data-position={openList ? "open" : "close"}
        >
          <div
            className="item-list__wrapper__image"
            data-position={openList ? "open" : "close"}
            style={
              openList
                ? {
                    backgroundImage: `url('${
                      config.base_url +
                      config.poster_sizes[3] +
                      content?.poster_path
                    }')`,
                  }
                : { backgroundColor: "red" }
            }
          >
            <img
              src={imagePath(3, content)}
              alt="logo of media"
              data-position={openList ? "open" : "close"}
            />
          </div>

          <div
            className="item-list__wrapper__infos"
            data-position={openList ? "open" : "close"}
          >
            <div
              className="item-list__wrapper__infos--title"
              data-position={openList ? "open" : "close"}
            >
              {content.title || content.name}
            </div>
            <div
              className="item-list__wrapper__overview"
              data-position={openList ? "open" : "close"}
            >
              {content.overview}
            </div>
            <div
              className="item-list__wrapper__genres"
              data-position={openList ? "open" : "close"}
            >
              {displayLikedMediaGenre(typeList)}
            </div>
            <div
              className="item-list__wrapper__infos__attributes"
              data-position={openList ? "open" : "close"}
            >
              <span
                className="item-list__wrapper__infos__attributes__type"
                data-position={openList ? "open" : "close"}
              >
                {content.media_type.toLowerCase() === "movie" ? (
                  <div>
                    <TheatersOutlinedIcon />
                    <span>{content.media_type}</span>
                  </div>
                ) : (
                  <div>
                    <TvOutlinedIcon />
                    <span>{content.media_type}</span>
                  </div>
                )}
              </span>
              <span>.</span>
              <span
                className="item-list__wrapper__infos__attributes__year"
                data-position={openList ? "open" : "close"}
              >
                {content.first_air_date?.substring(0, 4) ||
                  content.release_date?.substring(0, 4)}
              </span>
            </div>
          </div>
          <div
            className="item-list__wrapper__delete"
            data-position={openList ? "open" : "close"}
            onClick={() => {
              typeList === "like"
                ? dislikeContent(content)
                : removeContent(content.id);
            }}
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
