import React, { useContext } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { pullIdFromDatabase } from "./remove.item.db";
import {
  dislikeMovie,
  deleteMovieFromFetch,
} from "../../../features/movie liked/Slice/likes.slice";
import {
  dislikeTvshow,
  deleteTvshowFromFetch,
} from "../../../features/tvshow liked/slice/like.slice";
import { deleteContent } from "../../../features/watchlists/Slice/lists.slice";
import { useDispatch } from "react-redux";
import UserContext from "../../../utils/Context/UserContextProvider";

const DeleteItem = ({ content, openList, typeList, listID }) => {
  const dispatch = useDispatch();
  const { userID } = useContext(UserContext);

  const dislikeContent = async (content) => {
    let type;
    listID === "1" ? (type = "movie") : (type = "tv");
    let data = { user_id: userID, content_id: content.id, media_type: type };

    if (type === "movie") {
      pullIdFromDatabase(type, data);
      dispatch(dislikeMovie({ id: content.id, media_type: type }));
      dispatch(deleteMovieFromFetch(content));
    } else if (type === "tv") {
      pullIdFromDatabase(type, data);
      dispatch(dislikeTvshow({ id: content.id, media_type: type }));
      dispatch(deleteTvshowFromFetch(content));
    }
  };

  const removeContent = async (contentId) => {
    await axios.patch("https://umtappo.onrender.com/list", {
      list_id: listID,
      content_id: contentId,
    });
    dispatch(deleteContent({ listID, contentId }));
  };

  return (
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
  );
};

export default DeleteItem;
