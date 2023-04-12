import React, { createContext, useEffect, useState } from "react";
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
  };

  useEffect(() => {
    const fetchGenreRecommend = async () => {
      await axios
        .get("http://localhost:5000/recommendations/genre/" + userID)
        .then((res) => {
          console.log(res);
          setScore(res.data);
        });
    };
    fetchGenreRecommend();
    console.log("how many fire ?");
  }, [userID]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
