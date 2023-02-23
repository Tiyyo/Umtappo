import React, { useContext, useId, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ListContext from "../../utils/Context/ListsContextProvider";

const NameListsModal = (props) => {
  const { isOpen, getCloseState, content, getLists } = props;
  const { lists, setLists } = useContext(ListContext);
  const id = useId();

  const a = "a";
  const b = "b";
  const c = "c";

  const contentOne = { a };
  const contentTwo = { b };
  const contentThree = { c };

  const listOne = {
    name: "liste 1",
    content: [contentOne, contentTwo, contentThree],
  };
  const listTwo = {
    name: "liste 1",
    content: [contentOne, contentTwo, contentThree],
  };

  const listThree = {
    name: "liste 1",
    content: [contentOne, contentTwo, contentThree],
  };

  const Model = {
    username: "username",
    lists: [listOne, listOne, listThree],
  };

  const createList = (nameList, content, id) => {
    let list = {
      id,
      name: nameList,
      content,
    };
    return list;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = e.target[0].value;
    const list = createList(inputValue, content, id);
    setLists((prevLists) => [...prevLists, list]);
    getLists(lists);
    e.target[0].value = "";
  };

  useEffect(() => {
    console.log(Model);
  });

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
