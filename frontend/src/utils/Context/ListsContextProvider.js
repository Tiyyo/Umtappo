import React, { createContext, useState } from "react";

export const ListContext = createContext(null);
export const ListContextProvider = ({ children }) => {
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListContext;
