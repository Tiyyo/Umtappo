import React, { useState, useContext, useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NameListsModal from "../../components/Favorites/NameListsModal";
import ListContext, {
  ListContextProvider,
} from "../../utils/Context/ListsContextProvider";
import UserContext from "../../utils/Context/UserContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

const AddToPlaylist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { content } = location.state;
  const [myLists, setMyLists] = useState("");
  const { userID } = useContext(UserContext);

  const getCloseState = (state) => {
    setIsOpen(state);
  };

  const getLists = (state) => {
    setMyLists(state);
    console.log(myLists);
  };

  const obtainListName = (e) => {
    let name = e.target.dataset.listId;
    return name;
  };

  const addContent = async (_id, content) => {
    axios
      .put("http://localhost:5000/list", { listId: _id, content: content })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully added");
        }
        if (res.status === 422) {
          toast.info("Already added to this list");
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteList = async (_id) => {
    console.log(_id);
    await axios
      .delete("http://localhost:5000/list/" + _id)
      .then((res) => console.log(res));
  };

  useEffect(() => {
    const fetchUserLists = async () => {
      const result = await axios
        .post("http://localhost:5000/list/get", {
          user_id: userID,
        })
        .then((res) => setMyLists(res.data));
    };
    fetchUserLists();
  }, [userID]);

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
                <div className="playlist" key={list._id}>
                  <h4 className="name">{list.name}</h4>
                  <button
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
                    data-list-id={list._id}
                    className="delete"
                    onClick={(e) => {
                      const listID = obtainListName(e);
                      console.log(listID);
                      deleteList(listID);
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
