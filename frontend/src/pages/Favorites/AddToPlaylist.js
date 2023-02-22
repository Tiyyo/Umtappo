import React, { useState, useContext } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NameListsModal from "../../components/Favorites/NameListsModal";
import ListContext, {
  ListContextProvider,
} from "../../utils/Context/ListsContextProvider";

const AddToPlaylist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { content } = location.state;
  const [myLists, setMyLists] = useState("");

  const getCloseState = (state) => {
    setIsOpen(state);
  };

  const getLists = (state) => {
    setMyLists(state);
    console.log(myLists);
  };

  return (
    <ListContextProvider>
      <div className="add-to-playlist">
        <Outlet />
        <header>
          <div className="return-btn" onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon sx={{ color: "#fb8c00" }} />
          </div>
          <h4 className="title">Add to a list </h4>
          <div className="avatar"></div>
        </header>
        <button
          className="new-playlist"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Create a new list
        </button>

        <div className="playlists">
          {myLists ? (
            myLists.map((list) => {
              return (
                <div className="playlist">
                  <h4 className="name">{list.name}</h4>
                  <button className="add">
                    <AddIcon />
                  </button>
                  <button className="delete">
                    <CloseIcon />
                  </button>
                </div>
              );
            })
          ) : (
            <h4>You have never created any list yet</h4>
          )}
        </div>
        <NameListsModal
          isOpen={isOpen}
          getCloseState={getCloseState}
          content={content}
          getLists={getLists}
        />
      </div>
    </ListContextProvider>
  );
};

export default AddToPlaylist;
