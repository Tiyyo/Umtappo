import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ListContext from "../../utils/Context/ListsContextProvider";

const NameListsModal = (props) => {
  const { isOpen, getCloseState, content, getLists } = props;
  const { lists, setLists } = useContext(ListContext);

  const createList = (nameList, content) => {
    let list = {
      name: nameList,
      content,
    };
    return list;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = e.target[0].value;
    const list = createList(inputValue, content);
    setLists((prevLists) => [...prevLists, list]);
    console.log(lists);
    getLists(lists);
    e.target[0].value = "";
  };
  return (
    <div
      className="name-modal"
      style={isOpen ? { opacity: 1 } : { opacity: 0 }}
    >
      <div
        className="close-icon"
        onClick={() => {
          getCloseState(false);
        }}
      >
        <CloseIcon />
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" />
      </form>
    </div>
  );
};

export default NameListsModal;
