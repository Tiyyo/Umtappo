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

  return (
    <ThemeProvider theme={iconTheme}>
      <div className="profile">
        <div className="aera username">
          <div className="username-icon">
            <AccountCircleIcon color="white" />
          </div>
          <input type="text" value={userInfos.username} />
          <button type="button" onClick={toggleUsernameLock}>
            <EditIcon />
          </button>
          <button type="button">
            <DoneIcon />
          </button>
        </div>
        <div className="aera email">
          <div className="email-icon">
            <EmailIcon color="white" />
          </div>
          <input type="email" readOnly value={userInfos.email} />
          <button type="button" onClick={toggleUsernameLock}>
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
          <input type="password" readOnly value={"NotaPassword"} />
          <button type="button" onClick={toggleUsernameLock}>
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
