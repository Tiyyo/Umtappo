import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import UserContext from "../../utils/Context/UserContextProvider";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  createList,
  getLists,
} from "../../features/watchlists/Slice/lists.slice";

const AddNameNewList = ({ isOpen, getCloseState, content }) => {
  // const { isOpen, getCloseState, content } = props;
  const { userID } = useContext(UserContext);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = e.target[0].value;

    let data = {
      name: inputValue,
      content: content,
      user_id: userID,
    };

    axios
      .post("http://localhost:5000/list", data)
      .then((res) => {
        dispatch(createList(data));
        dispatch(getLists());
      })
      .catch((err) => console.log(err))
      .finally(() => {
        e.target[0].value = "";
        getCloseState(false);
      });
  };

  return (
    <div
      className="name-newlist"
      style={isOpen ? { top: "50%" } : { top: "-100vh" }}
    >
      <div className="name-newlist__header">
        <h2>Name your watchlist</h2>
        <div
          className="close-icon"
          onClick={() => {
            getCloseState(false);
          }}
        >
          <CloseIcon />
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" />
      </form>
    </div>
  );
};

export default AddNameNewList;
