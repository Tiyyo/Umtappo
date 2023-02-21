import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NameListsModal from "../../components/Favorites/NameListsModal";

const AddToPlaylist = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const getCloseState = (state) => {
    setIsOpen(state);
    console.log(isOpen);
  };

  const createList = () => {
    let list = {
      name: "New List",
      content: {},
    };
  };
  return (
    <div className="add-to-playlist">
      <NameListsModal isOpen={isOpen} getCloseState={getCloseState} />
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
        onClick={(e) => {
          openModal();
          createList();
        }}
      >
        Create a new list
      </button>

      <div className="playlists">
        <div className="playlist">
          <h4 className="name">Ma liste de Film a voir</h4>
          <button className="add">
            <AddIcon />
          </button>
          <button className="delete">
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylist;
