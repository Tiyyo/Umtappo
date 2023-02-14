import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Likes from "./pages/Likes/Likes";
import "./app.scss";
import Films from "./pages/Films/Films";
import TvShow from "./pages/TvShow/TvShow";
import Modal from "./components/Cards/Modal";
import { Login } from "./pages/Login/Login";
import AddToPlaylist from "./pages/Likes/AddToPlaylist";
import SignUp from "./components/Authentification/SignUp";
import SignIn from "./components/Authentification/SignIn";
import UserContext from "./utils/Context/UserContextProvider";
import axios from "axios";
import Profile from "./components/Profile/Profile";

const App = () => {
  const {
    isAuth,
    isLoggedIn,
    setIsAuth,
    setIsLoggedIn,
    setUserID,
    setUserInfos,
  } = useContext(UserContext);

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

  useEffect(() => {
    if (window.localStorage.accesToken) {
      console.log(window.localStorage.accesToken);
      setIsLoggedIn(true);
      auth(window.localStorage.accesToken);
    } else {
      console.log("No token Avaiable");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={isAuth && isLoggedIn ? <Home /> : <Login />}
        ></Route>
        <Route path={"/"} element={<Login />}>
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
        </Route>
        <Route path={"*"} element={<Home />} />
        <Route
          path={"/Home"}
          element={isAuth && isLoggedIn ? <Home /> : <Login />}
        />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Likes" element={<Likes />}></Route>
        <Route path="/Films" element={<Films />}></Route>
        <Route path="/TvShow" element={<TvShow />}></Route>
        <Route path={`/:id/:modalid`} element={<Modal />} />
        <Route path={"/:id/:id/add_to_playlist"} element={<AddToPlaylist />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
