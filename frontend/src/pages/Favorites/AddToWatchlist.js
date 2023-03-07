import React, { useState, useContext, useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NameListsModal from "../../components/Lists/NameListsModal";
import ListContext, {
  ListContextProvider,
} from "../../utils/Context/ListsContextProvider";
import UserContext from "../../utils/Context/UserContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getLists, deleteList } from "../../features/watchlists/Slice/lists";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { removeList } from "../../features/watchlists/function/watchlists.function";
import { ThemeProvider } from "@mui/material";
import AppContext from "../../utils/Context/AppContextProvider";

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

  const obtainListName = (e) => {
    let name = e.target.dataset.listId;
    return name;
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

  const removeList = (_id) => {
    let objectID = { _id };
    axios.delete("http://localhost:5000/list/" + _id);
    dispatch(deleteList(objectID));
  };

  useEffect(() => {
    dispatch(getLists(userID));
  }, [userID]);

  console.log(myLists);

  return (
    <ListContextProvider>
      <ThemeProvider theme={iconTheme}>
        <div className="add-to-playlist">
          <Outlet />
          <header>
            <h4 className="title"> Watchlists </h4>
          </header>

          <div className="playlists">
            <button
              className="new-playlist"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <LibraryAddIcon />
              Add New
            </button>
            <NameListsModal
              isOpen={isOpen}
              getCloseState={getCloseState}
              content={content}
            />
            <div data-blur={isOpen ? "is-active" : ""} className="blur"></div>
            {myLists ? (
              myLists.map((list) => {
                return (
                  <div className="playlist" key={list._id}>
                    <h4 className="name">{list.name}</h4>
                    <button
                      type="button"
                      className="add"
                      data-list-id={list._id}
                      onClick={(e) => {
                        const listID = obtainListName(e);
                        addContent(listID, content);
                      }}
                    >
                      <AddIcon />
                    </button>
                    <button
                      type="button"
                      data-list-id={list._id}
                      className="delete"
                      onClick={(e) => {
                        const listID = obtainListName(e);
                        removeList(listID);
                      }}
                    >
                      <CloseIcon data-list-id={list._id} />
                    </button>
                  </div>
                );
              })
            ) : (
              <h4>You have never created any list yet</h4>
            )}
          </div>
        </div>
      </ThemeProvider>
    </ListContextProvider>
  );
};

export default AddToPlaylist;
