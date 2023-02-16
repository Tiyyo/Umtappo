import React, { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserContext from "../../utils/Context/UserContextProvider";

const Profile = () => {
  const { userInfos } = useContext(UserContext);
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
    <div>
      <div className="username">
        <div className="username-icon">
          <AccountCircleIcon />
        </div>
        <input type="text" value={userInfos.username} />
        <button type="button" onClick={toggleUsernameLock}>
          <EditIcon />
        </button>
        <button type="button">
          <DoneIcon />
        </button>
      </div>
      <div className="email">
        <div className="email-icon">
          <EmailIcon />
        </div>
        <input type="email" readOnly value={userInfos.email} />
        <button type="button" onClick={toggleEmailLock}>
          <EditIcon />
        </button>
        <button type="button">
          <DoneIcon />
        </button>
      </div>
      <div className="password">
        <div className="password">
          <LockIcon />
        </div>
        <input type="password" readOnly value={"NotaPassword"} />
        <button type="button" onClick={togglePasswordLock}>
          <EditIcon />
        </button>
        <button type="button">
          <DoneIcon />
        </button>
      </div>
    </div>
  );
};

export default Profile;
