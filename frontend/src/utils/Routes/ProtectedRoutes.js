import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoaderUI from "../../components/Loader/LoaderUI";
import UserContext from "../Context/UserContextProvider";

const ProtectedRoutes = () => {
  const { isAuth } = useContext(UserContext);

  if (isAuth === null) return <LoaderUI />;

  return isAuth ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoutes;
