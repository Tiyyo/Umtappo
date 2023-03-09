import React, { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserContext from "../../utils/Context/UserContextProvider";
import { theme } from "../../theme/IconTheme";
import { ThemeProvider } from "@mui/material";
import AppContext from "../../utils/Context/AppContextProvider";

const Profile = () => {
  const { userInfos } = useContext(UserContext);
  const { iconTheme } = useContext(AppContext);
  const [usernameIsLocked, setUsernameLocker] = useState(true);
  const [emailIsLocked, setEmailLocker] = useState(true);
  const [passwordIsLocked, setPasswordLocker] = useState(true);
  const [defaultValue, setDefaultValue] = useState({
    username: userInfos.username,
    email: userInfos.email,
    password: "NotAPassword",
  });

  const toggleUsernameLock = () => {
    return usernameIsLocked
      ? setUsernameLocker(false)
      : setUsernameLocker(true);
  };
  const toggleEmailLock = () => {
    return emailIsLocked ? setEmailLocker(false) : setEmailLocker(true);
  };
  const togglePasswordLock = () => {
    return passwordIsLocked
      ? setPasswordLocker(false)
      : setPasswordLocker(true);
  };

  const handleUsername = (e) => {
    e.preventDefault();
    // openModal();
  };
  const handleEmail = (e) => {
    e.preventDefault();
  };
  const handlePassword = (e) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={iconTheme}>
      <div className="profile">
        <form
          method="POST"
          className="aera username"
          onSubmit={(e) => handleUsername(e)}
        >
          <div className="username-icon">
            <AccountCircleIcon color="white" />
          </div>
          <input
            type="text"
            disabled={usernameIsLocked}
            defaultValue={defaultValue.username}
          />
          <button type="button" onClick={toggleUsernameLock}>
            <EditIcon />
          </button>
          <button type="submit">
            <DoneIcon />
          </button>
        </form>
        <div className="aera email">
          <div className="email-icon">
            <EmailIcon color="white" />
          </div>
          <input
            type="email"
            disabled={emailIsLocked}
            defaultValue={userInfos.email}
          />
          <button type="button" onClick={toggleEmailLock}>
            <EditIcon />
          </button>
          <button type="button">
            <DoneIcon />
          </button>
        </div>
        <div className="aera password">
          <div className="password">
            <LockIcon color="white" />
          </div>
          <input
            type="password"
            disabled={passwordIsLocked}
            defaultValue={"NotaPassword"}
          />
          <button type="button" onClick={togglePasswordLock}>
            <EditIcon />
          </button>
          <button type="button">
            <DoneIcon />
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Profile;
