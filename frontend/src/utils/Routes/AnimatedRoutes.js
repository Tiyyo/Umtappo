import axios from "axios";

import React, { useContext, useEffect } from "react";

import { Route, Routes, useLocation, Navigate } from "react-router";

import HomePage from "../../components/Authentification/Home/HomePage";
import SignIn from "../../components/Authentification/SignIn/SignIn";
import SignUp from "../../components/Authentification/SignUp/SignUp";
import Account from "../../pages/Account/Account";
import LoginLayout from "../../layout/LoginLayout";
import Films from "../../pages/Films/Films";
import Home from "../../pages/Home/Home";
import AddToWatchlist from "../../components/MediaElement/AddToWatchlist";
import FavoritesResume from "../../components/Lists/FavoritesResume";
import TvShow from "../../pages/TvShow/TvShow";
import Menu from "../../components/Account/Menu/Menu";
import Preference from "../../components/Account/Preference/Preference";
import AppLayout from "../../layout/AppLayout";
import AccountWatchlist from "../../components/Account/Watchlists/AccountWatchlist";
import MediaElement from "../../components/MediaElement/MediaElement";
import SearchResult from "../../components/SearchResult/SearchResult";
import Watchlist from "../../components/Lists/Watchlist";
import Favorites from "../../pages/Favorites/Favorites";
import Filter from "../../components/Lists/Filter";

import { AnimatePresence } from "framer-motion";

import ProtectedRoutes from "./ProtectedRoutes";
import UserContext from "../Context/UserContextProvider";

import { getCurrentUser } from "../../features/user/slice/user.slice";
import { useDispatch } from "react-redux";
import { reset } from "../../features/watchlists/Slice/resume.header";
import Profile from "../../components/Account/Profile/Profile";
import ModalOutlet from "../../components/MediaElement/ModalOutlet";

const AnimatedRoutes = () => {
  const { setIsAuth, setIsLoggedIn, setUserID, setUserInfos } =
    useContext(UserContext);

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
        {/* <Route element={<ProtectedRoutes />}> */}
        <Route path={"/"} element={<AppLayout />}>
          <Route path={""} element={<Navigate to="/Home" />} />
          <Route exact path={"Home"} element={<Home />}>
            <Route path={"modal"} element={<ModalOutlet />} />
          </Route>
          <Route exact path="Favorites" element={<Favorites />}>
            <Route path={""} element={<FavoritesResume />} />
            <Route path={":listName"} element={<Watchlist />} />
          </Route>
          <Route exact path="Films" element={<Films />} />
          <Route eaxct path="TvShow" element={<TvShow />} />
          <Route exact path="Search" element={<SearchResult />} />
          <Route path={`:id/:modalid`} element={<MediaElement />}></Route>
          <Route
            path={":id/:id/add_to_playlist"}
            element={<AddToWatchlist />}
          />
          <Route path="Account" element={<Account />}>
            <Route path={""} element={<Menu />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Preference" element={<Preference />} />
            <Route path="Lists" element={<AccountWatchlist />} />
          </Route>
        </Route>
        {/* </Route> */}
        <Route path={"/Login"} element={<LoginLayout />}>
          <Route path={""} element={<HomePage />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
        </Route>
        <Route path={"/Filter"} element={<Filter />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
