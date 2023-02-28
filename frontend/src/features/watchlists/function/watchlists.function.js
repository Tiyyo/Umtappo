import axios from "axios";
import { deleteList } from "../Slice/lists";

export const getLists = () => {};

export const createList = () => {};

export const addContent = () => {};

export const removeContent = () => {};

export const removeList = (id, dispatch) => {
  let objectId = { id };
  axios.delete("http://localhost:5000/list/" + id);
  //   dispatch(deleteList(objectId));
};
