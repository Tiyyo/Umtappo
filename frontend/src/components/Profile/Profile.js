import React, { useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../utils/Context/UserContextProvider";

const Profile = () => {
  const {
    userID,
    setUserID,
    userInfos,
    setUserInfos,
    isAuth,
    setIsAuth,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const logOut = () => {
    window.localStorage.clear();
    if (window.localStorage.accessToken) {
      console.log(localStorage.accessToken);
    }
    window.localStorage.removeItem("accessToken");
    setUserID("");
    setUserInfos("");
    setIsAuth(false);
    setIsLoggedIn(false);
    navigate("/");

    return alert("You are now logOut !");
  };
  return (
    <div className="profile-page">
      <div className="logout" onClick={() => logOut()}>
        Sign Out
      </div>
    </div>
  );
};

export default Profile;
