import axios from "axios";

export const pullIdFromDatabase = async (type, data) => {
  await axios
    .patch(`https://umtappo-api.onrender.com/like/${type}/`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
