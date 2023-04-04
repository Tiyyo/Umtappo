import React from "react";
import {
  getLists,
  deleteList,
} from "../../features/watchlists/Slice/lists.slice";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { toast } from "react-toastify";

const Watchlist = ({ list, content }) => {
  const dispatch = useDispatch();

  const removeList = (_id) => {
    let objectID = { _id };
    axios.delete("http://localhost:5000/list/" + _id);
    dispatch(deleteList(objectID));
  };

  const addContent = (_id, content) => {
    let contentId = content.id;

    let data = { listId: _id, content: content, content_id: contentId };

    axios
      .put("http://localhost:5000/list", data)
      .then((res) => {
        if (res.status === 200) {
          toast.info("Successfully added", {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            // transition: Flip,
          });
          dispatch(addContent(data));
          dispatch(getLists());
        }
        if (res.status === 422) {
          toast.info("Already added to this list");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="playlist" key={list._id}>
      <h4 className="name">{list.name}</h4>
      <button
        type="button"
        className="add"
        onClick={() => {
          addContent(list._id, content);
        }}
      >
        <AddIcon />
      </button>
      <button
        type="button"
        className="delete"
        onClick={() => {
          removeList(list._id);
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Watchlist;
