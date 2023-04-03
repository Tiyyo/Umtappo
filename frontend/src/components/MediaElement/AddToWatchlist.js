import React, { useState, useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AddNameNewList from "./AddNameNewList";
import UserContext from "../../utils/Context/UserContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../features/watchlists/Slice/lists.slice";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

import { ThemeProvider } from "@mui/material";
import AppContext from "../../utils/Context/AppContextProvider";
import Watchlist from "./Watchlist";
import Blur from "../Overlay/Blur";
import Button from "../Button/Button";
import CloseIcon from "@mui/icons-material/Close";

const AddToPlaylist = () => {
  const {
    state: { content },
  } = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const { userID } = useContext(UserContext);
  const { iconTheme } = useContext(AppContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lists: myLists } = useSelector((state) => state.lists);

  const getCloseState = (state) => {
    setIsOpen(state);
  };

  const addContent = (_id, content) => {
    let contentId = content.id;

    let data = { listId: _id, content: content, content_id: contentId };

    axios
      .put("http://localhost:5000/list", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully added", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
          dispatch(addContent(data));
          dispatch(getLists());
        } else {
          toast.error("Already in that list", {});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(getLists(userID));
  }, [userID]);

  return (
    <div className="modal-content__wrapper">
      <Blur></Blur>
      <div className="add-to-watchlists">
        <div className="modal-content__wrapper__media-element__close-modal">
          <Button>
            <CloseIcon onClick={() => navigate(-1)} />
          </Button>
        </div>
        <Outlet />
        <header>
          <h4 className="title"> Watchlists </h4>
        </header>

        <div className="watchlist">
          <button
            className="watchlist__new-btn"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <LibraryAddIcon />
            Add New
          </button>
          <AddNameNewList
            isOpen={isOpen}
            content={content}
            getCloseState={getCloseState}
          />
          <div
            data-blur={isOpen ? "is-active" : ""}
            className="naming-blur"
          ></div>
          {myLists.length !== 0 ? (
            myLists.map((list) => {
              return <Watchlist key={list._id} list={list} content={content} />;
            })
          ) : (
            <h4>You have never created any list yet</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylist;
