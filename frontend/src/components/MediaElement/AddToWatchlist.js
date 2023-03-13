import React, { useState, useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AddNameNewList from "./AddNameNewList";
import UserContext from "../../utils/Context/UserContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getLists,
  deleteList,
} from "../../features/watchlists/Slice/lists.slice";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { removeList } from "../../features/watchlists/function/watchlists.function";
import { ThemeProvider } from "@mui/material";
import AppContext from "../../utils/Context/AppContextProvider";
import Watchlist from "./Watchlist";

const AddToPlaylist = () => {
  const {
    state: { content },
  } = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const { userID } = useContext(UserContext);
  const { iconTheme } = useContext(AppContext);

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
          toast.success("Successfully added");
          dispatch(addContent(data));
          dispatch(getLists());
        }
        if (res.status === 422) {
          toast.info("Already added to this list");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(getLists(userID));
  }, [userID]);

  return (
    <ThemeProvider theme={iconTheme}>
      <div className="add-to-watchlists">
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
          <div data-blur={isOpen ? "is-active" : ""} className="blur"></div>
          {myLists ? (
            myLists.map((list) => {
              return <Watchlist key={list._id} list={list} content={content} />;
            })
          ) : (
            <h4>You have never created any list yet</h4>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AddToPlaylist;
