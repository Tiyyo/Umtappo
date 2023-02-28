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
import { removeList } from "../../features/watchlists/function/watchlists.function";

const AddToPlaylist = () => {
  const navigate = useNavigate();

  const {
    state: { content },
  } = useLocation();
  // const { content } = location.state;

  const [isOpen, setIsOpen] = useState(false);

  const { userID } = useContext(UserContext);

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
    const fetchUserLists = async () => {
      const result = await axios
        .get("http://localhost:5000/list/" + userID)
        .then((res) => dispatch(getLists(res.data)));
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
        <NameListsModal
          isOpen={isOpen}
          getCloseState={getCloseState}
          content={content}
        />
      </div>
    </ListContextProvider>
  );
};

export default AddToPlaylist;
