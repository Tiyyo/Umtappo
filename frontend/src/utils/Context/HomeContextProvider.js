import React, { createContext, useState } from "react";

export const HomeContext = createContext(null);

export const HomeContextProvider = ({ children }) => {
  const [imageHeaderHeight, setImageHeaderHeight] = useState(500);

  const value = { imageHeaderHeight, setImageHeaderHeight };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeContext;
