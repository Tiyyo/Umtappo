import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../utils/Context/UserContextProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AppContext from "../../utils/Context/AppContextProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, getUserData } from "../../features/user/slice/user.slice";
import Avatar from "../../components/Account/Avatar/Avatar";
import ModalEditPhoto from "../../components/Account/Avatar/ModalEditPhoto";

const Account = () => {
  const { setUserID, setUserInfos, setIsAuth, setIsLoggedIn } =
    useContext(UserContext);

  const { iconTheme } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  let locations = location.pathname
    .replace("/", " ")
    .replace("/", " ")
    .split(" ");
  let numberOfLocations = locations.length;

  const logOut = () => {
    window.localStorage.clear();
    window.localStorage.removeItem("accesToken");
    setUserID("");
    setUserInfos("");
    setIsAuth(false);
    setIsLoggedIn(false);
    dispatch(clearUser());
    navigate("/Login");

    return alert("You are now logOut !");
  };

  const { username } = useSelector((state) => state.user.user);

  const getStateModal = (state) => {
    setIsOpen(state);
  };

  const goBack = () => {
    return navigate(-1);
  };

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <div className="account">
      <ModalEditPhoto isOpen={isOpen} getStateModal={getStateModal} />
      <nav className="title">
        <button type="button" className="back-icon" onClick={goBack}>
          <ArrowBackIcon color="primary" size="extraLarge" />
        </button>
        <h2 className="page-name">{locations[numberOfLocations - 1]}</h2>
      </nav>
      <div className="banner">
        <Avatar getStateModal={getStateModal} />
        <h2 className="welcome">
          Welcome back ! <span>{username}</span>
        </h2>
      </div>
      <Outlet />
      <div className="logout" onClick={() => logOut()}>
        Sign Out
        <LogoutIcon />
      </div>
    </div>
  );
};

export default Account;
