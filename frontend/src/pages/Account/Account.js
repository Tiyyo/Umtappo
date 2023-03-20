import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../utils/Context/UserContextProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeProvider } from "@mui/material";
import AppContext from "../../utils/Context/AppContextProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, getUserData } from "../../features/user/slice/user.slice";

const Account = () => {
  const { setUserID, setUserInfos, setIsAuth, setIsLoggedIn } =
    useContext(UserContext);

  const { iconTheme } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  let locations = location.pathname
    .replace("/", " ")
    .replace("/", " ")
    .split(" ");
  let numberOfLocations = locations.length;

  const logOut = () => {
    window.localStorage.clear();
    if (window.localStorage.accesToken) {
      console.log(localStorage.accesToken);
    }
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

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  const goBack = () => {
    return navigate(-1);
  };

  return (
    <div className="account">
      <nav className="title">
        <ThemeProvider theme={iconTheme}>
          <button type="button" className="back-icon" onClick={goBack}>
            <ArrowBackIcon color="primary" size="extraLarge" />
          </button>
        </ThemeProvider>
        <h2 className="page-name">{locations[numberOfLocations - 1]}</h2>
      </nav>
      <div className="banner">
        <div className="avatar-wrapper">
          <div className="avatar">
            <img
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              alt="random avatar profile"
            />
          </div>
          <span>Change your picture profile</span>
        </div>
        <h2 className="welcome">
          Hello <span>{username}</span>
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
