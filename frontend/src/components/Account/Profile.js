import React, { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserContext from "../../utils/Context/UserContextProvider";
import { ThemeProvider } from "@mui/material";
import AppContext from "../../utils/Context/AppContextProvider";
import ModalConfirmInfos from "./ChangePassword";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfos, isAuth, userID } = useContext(UserContext);
  const { iconTheme } = useContext(AppContext);

  const [usernameIsLocked, setUsernameLocker] = useState(true);
  const [emailIsLocked, setEmailLocker] = useState(true);
  const [passwordIsLocked, setPasswordLocker] = useState(true);

  const [usernameInputValue, setUsernameValue] = useState("");
  const [emailInputValue, setEmailValue] = useState("");

  const [errUsername, setErrUsername] = useState("");
  const [errEmail, setErrEmail] = useState("");

  const [defaultValue, setDefaultValue] = useState({
    username: userInfos.username,
    email: userInfos.email,
    password: "NotAPassword",
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleUsernameLock = () => {
    return usernameIsLocked
      ? setUsernameLocker(false)
      : setUsernameLocker(true);
  };
  const toggleEmailLock = () => {
    return emailIsLocked ? setEmailLocker(false) : setEmailLocker(true);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const getCloseState = (state) => {
    setIsOpen(state);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleUsername = (e) => {
    e.preventDefault();
    let data = { user_id: userID, newUsername: usernameInputValue };

    if (usernameInputValue.length > 3) {
      axios
        .patch("http://localhost:5000/user/username", data)
        .then((res) => {
          if (res.status === 200) {
            setErrUsername("");
            setDefaultValue((state) => {
              return (state.username = data.newUsername);
            });
            setUsernameValue("");
            toast.success("Username succesfully updated", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      setErrUsername("Username must be contain at least 3 characters");
    }
  };

  const handleEmail = (e) => {
    e.preventDefault();
    let data = { user_id: userID, newEmail: emailInputValue };
    if (isValidEmail(emailInputValue)) {
      axios
        .patch("http://localhost:5000/user/email", data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Email has been succesfull updated");
            setDefaultValue((state) => {
              return (state.email = data.newEmail);
            });
            setEmailValue("");
            setErrEmail("");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setErrEmail("This is not a valid Email");
    }
  };
  const handlePassword = (e) => {
    e.preventDefault();
  };

  let add = "essai@gmail.co";

  return (
    <ThemeProvider theme={iconTheme}>
      <div className="profile">
        <ModalConfirmInfos isOpen={isOpen} getCloseState={getCloseState} />
        <div data-blur={isOpen ? "is-active" : ""} className="blur"></div>
        <form
          method="POST"
          className="aera username"
          onSubmit={(e) => handleUsername(e)}
        >
          <div className="username-icon">
            <AccountCircleIcon />
          </div>
          <div>
            <input
              type="text"
              disabled={usernameIsLocked}
              defaultValue={defaultValue.username}
              onChange={(e) => setUsernameValue(e.target.value)}
              name="username"
            />
            <div className="username-error">{errUsername}</div>
          </div>
          <button type="button" onClick={toggleUsernameLock}>
            <EditIcon />
          </button>
          <button type="submit" disabled={usernameIsLocked}>
            <DoneIcon />
          </button>
        </form>

        <form className="aera email" onClick={handleEmail}>
          <div className="email-icon">
            <EmailIcon />
          </div>
          <div>
            <input
              type="email"
              disabled={emailIsLocked}
              defaultValue={userInfos.email}
              name="email"
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <div className="error-email">{errEmail}</div>
          </div>
          <button type="button" onClick={toggleEmailLock}>
            <EditIcon />
          </button>
          <button type="button" disabled={emailIsLocked}>
            <DoneIcon />
          </button>
        </form>

        <div className="aera password">
          <div className="password">
            <LockIcon />
          </div>
          <input
            type="password"
            disabled={passwordIsLocked}
            defaultValue={"NotaPassword"}
            autoComplete="false"
          />
          <button type="button" onClick={() => openModal()}>
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
