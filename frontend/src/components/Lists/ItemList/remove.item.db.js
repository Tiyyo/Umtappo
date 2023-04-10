import axios from "axios";

export const pullIdFromDatabase = async (type, data) => {
  await axios
    .patch(`http://localhost:5000/like/${type}/`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
