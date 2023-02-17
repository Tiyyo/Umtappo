import React, { createContext, useState } from "react";

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

  const value = {
    userID,
    setUserID,
    userInfos,
    setUserInfos,
    isAuth,
    setIsAuth,
    isLoggedIn,
    setIsLoggedIn,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
