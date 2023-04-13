import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import axios from "axios";

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userInfos, setUserInfos] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isAuth, setIsAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [scores, setScore] = useState(null);
  const [randomReco, setRandomReco] = useState(null);

  const value = {
    userID,
    setUserID,
    userInfos,
    setUserInfos,
    isAuth,
    setIsAuth,
    isLoggedIn,
    setIsLoggedIn,
    scores,
    randomReco,
  };

  useEffect(() => {
    const fetchGenreRecommend = async () => {
      await axios
        .get("https://umtappo.onrender.com/recommendations/genre/" + userID)
        .then((res) => {
          setScore(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchGenreRecommend();
  }, [userID]);

  useLayoutEffect(() => {
    const fetchGenreRandom = async () => {
      await axios
        .get("https://umtappo.onrender.com/recommendations/genre/random")
        .then((res) => {
          setRandomReco(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchGenreRandom();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
