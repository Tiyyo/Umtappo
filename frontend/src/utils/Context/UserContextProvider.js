import { createContext } from "react";

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  const value = {};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
