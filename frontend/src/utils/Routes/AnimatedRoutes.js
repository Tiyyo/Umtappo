import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router";
import FirstPage from "../../components/Authentification/FirstPage";
import SignIn from "../../components/Authentification/SignIn";
import SignUp from "../../components/Authentification/SignUp";
import Account from "../../components/Account/Account";
import LoginLayout from "../../layout/LoginLayout";
import Films from "../../pages/Films/Films";
import Home from "../../pages/Home/Home";
import AddToPlaylist from "../../pages/Favorites/AddToWatchlist";
import Likes from "../../components/Lists/listsResume";
import TvShow from "../../pages/TvShow/TvShow";
import UserContext from "../Context/UserContextProvider";
import { AnimatePresence } from "framer-motion";
import Menu from "../../components/Account/Menu";
import Profile from "../../components/Account/Profile";
import Lists from "../../components/Account/Lists";
import Preference from "../../components/Account/Preference";
import AppLayout from "../../layout/AppLayout";
import MediaElement from "../../pages/Content/MediaElement";
import SearchResult from "../../pages/SearchResult/SearchResult";
import ProtectedRoutes from "./ProtectedRoutes";
import FavoriteList from "../../pages/Favorites/Watchlist";
import FavoriteResume from "../../components/Lists/listsResume";
import Favorites from "../../pages/Favorites/PersonalLists";
import { getCurrentUser } from "../../features/user/slice/user";
import { useDispatch } from "react-redux";
import Filter from "../../components/Lists/Filter";
import { reset } from "../../features/watchlists/Slice/resume.header";

const AnimatedRoutes = () => {
  const {
    isAuth,
    isLoggedIn,
    setIsAuth,
    setIsLoggedIn,
    setUserID,
    setUserInfos,
  } = useContext(UserContext);

  const location = useLocation();

  const dispatch = useDispatch();

  const auth = async (token) => {
    await axios
      .get("http://localhost:5000/user/current", {
        headers: {
          "Authorization ": `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUserID(res?.data?.id);
          setUserInfos({
            username: res?.data.username,
            email: res?.data?.email,
            password: res?.data?.password,
          });
          setIsAuth(true);
          dispatch(getCurrentUser(res.data.id));
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuth(false);
      });
  };

  useEffect(() => {
    dispatch(reset());
  }, [location]);

  useEffect(() => {
    if (window.localStorage.accesToken) {
      setIsLoggedIn(true);
      auth(window.localStorage.accesToken);
    } else {
      console.log("No token Avaiable");
      setIsLoggedIn(false);
      setIsAuth(false);
    }
  }, []);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<ProtectedRoutes />}>
          <Route path={"/"} element={<AppLayout />}>
            <Route path={""} element={<Navigate to="/Home" />} />
            <Route exact path={"Home"} element={<Home />} />
            <Route exact path="Favorites" element={<Favorites />}>
              <Route path={""} element={<FavoriteResume />} />
              <Route path={":listName"} element={<FavoriteList />} />
            </Route>
            <Route exact path="Films" element={<Films />} />
            <Route eaxct path="TvShow" element={<TvShow />} />
            <Route exact path="Search" element={<SearchResult />} />
            <Route path={`:id/:modalid`} element={<MediaElement />} />
            <Route
              path={":id/:id/add_to_playlist"}
              element={<AddToPlaylist />}
            />
            <Route path="Account" element={<Account />}>
              <Route path={""} element={<Menu />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="Preference" element={<Preference />} />
              <Route path="Lists" element={<Lists />} />
            </Route>
          </Route>
        </Route>
        <Route path={"/Login"} element={<LoginLayout />}>
          <Route path={""} element={<FirstPage />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
        </Route>
        <Route path={"/Filter"} element={<Filter />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
