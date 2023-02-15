import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router";
import FirstPage from "../../components/Authentification/FirstPage";
import SignIn from "../../components/Authentification/SignIn";
import SignUp from "../../components/Authentification/SignUp";
import Modal from "../../components/Cards/Modal";
import Profile from "../../components/Profile/Profile";
import LoginLayout from "../../layout/LoginLayout";
import Films from "../../pages/Films/Films";
import Home from "../../pages/Home/Home";
import AddToPlaylist from "../../pages/Likes/AddToPlaylist";
import Likes from "../../pages/Likes/Likes";
import { Login } from "../../pages/Login/Login";
import TvShow from "../../pages/TvShow/TvShow";
import UserContext from "../Context/UserContextProvider";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const {
    isAuth,
    isLoggedIn,
    setIsAuth,
    setIsLoggedIn,
    setUserID,
    setUserInfos,
    setIsLoading,
  } = useContext(UserContext);

  const location = useLocation();
  const auth = async (token) => {
    await axios
      .get("http://localhost:5000/user/current", {
        headers: {
          "Authorization ": `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setUserID(res?.data?.id);
          setUserInfos({
            username: res?.data.username,
            email: res?.data?.email,
            password: res?.data?.password,
          });
          setIsAuth(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const UsersRoute = (children, redirect) => {
    return isAuth && isLoggedIn ? children : <Navigate to={redirect} replace />;
  };

  let loginPagePath = "/";

  useEffect(() => {
    setIsLoading(true);
    if (window.localStorage.accesToken) {
      console.log(window.localStorage.accesToken);
      setIsLoggedIn(true);
      auth(window.localStorage.accesToken);
      setIsLoading(false);
    } else {
      console.log("No token Avaiable");
      setIsLoading(false);
    }
  }, []);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path={"/"}
          element={
            isAuth && isLoggedIn ? <Navigate to="/Home" /> : <LoginLayout />
          }
        >
          <Route path={""} element={<FirstPage />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
        </Route>
        <Route
          path={"*"}
          element={
            isAuth && isLoggedIn ? <Home /> : <Navigate to="/" replace={true} />
          }
        />
        <Route
          path={"/Home"}
          element={
            isAuth && isLoggedIn ? <Home /> : <Navigate to="/" replace={true} />
          }
        />
        <Route
          path="/Profile"
          element={UsersRoute(<Profile />, loginPagePath)}
        />
        <Route path="/Likes" element={UsersRoute(<Likes />, loginPagePath)} />
        <Route path="Films" element={UsersRoute(<Films />, loginPagePath)} />
        <Route path="/TvShow" element={UsersRoute(<TvShow />, loginPagePath)} />
        <Route path={`/:id/:modalid`} element={<Modal />} />
        <Route path={"/:id/:id/add_to_playlist"} element={<AddToPlaylist />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
