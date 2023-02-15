import React, { createContext, useState } from "react";

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userInfos, setUserInfos] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authIsLoading, setIsLoading] = useState(true);

  const value = {
    userID,
    setUserID,
    userInfos,
    setUserInfos,
    isAuth,
    setIsAuth,
    isLoggedIn,
    setIsLoggedIn,
    authIsLoading,
    setIsLoading,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
