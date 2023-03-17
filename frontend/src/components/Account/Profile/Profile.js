import React, { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserContext from "../../../utils/Context/UserContextProvider";
import AppContext from "../../../utils/Context/AppContextProvider";
import ChangePassword from "../ChangePassword/ChangePassword";
import axios from "axios";
import { toast } from "react-toastify";
import { isValidEmail } from "../Account.utils";
import Input from "../../Authentification/Input";
import { useForm } from "react-hook-form";
import { userSchema } from "../../Authentification/SignUp/SignUp";
import { yupResolver } from "@hookform/resolvers/yup";

const Profile = () => {
  const { userInfos, userID } = useContext(UserContext);
  const { iconTheme } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(userSchema),
    defaultValue: {
      username: userInfos.username,
      email: userInfos.email,
      password: "NotAPassword",
    },
  });

  const [inputsLock, setInputsLock] = useState({
    username: true,
    email: true,
    password: true,
  });

  const [inputsValue, setInputsValue] = useState({ username: "", email: "" });

  const [inputsError, setInputsError] = useState({ username: "", email: "" });

  const [defaultValue, setDefaultValue] = useState({
    username: userInfos.username,
    email: userInfos.email,
    password: "NotAPassword",
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleUsernameLock = () => {
    // if (inputsLock.username) {
    //   setInputsLock((state) => (state.inputsLock.username = false));
    // } else if (!inputsLock.username) {
    //   setInputsLock((state) => (state.inputsLock.username = true));
    // }
  };

  const toggleEmailLock = () => {
    return inputsLock.email === true
      ? setInputsLock((state) => (state.email = false))
      : setInputsLock((state) => (state.email = true));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const getCloseState = (state) => {
    setIsOpen(state);
  };

  const submitUsername = (value) => {
    let data = { user_id: userID, newUsername: value.username };

    if (value.username > 3) {
      axios
        .patch("http://localhost:5000/user/username", data)
        .then((res) => {
          if (res.status === 200) {
            setInputsError("");
            setDefaultValue((state) => {
              return (state.username = data.newUsername);
            });
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
      setInputsError(
        (state) =>
          (state.username = "Username must be contain at least 3 characters")
      );
    }
  };

  //   const handleUsername = (e) => {
  //     e.preventDefault();
  //     let data = { user_id: userID, newUsername: inputsValue.username };

  //     if (inputsValue.username.length > 3) {
  //       axios
  //         .patch("http://localhost:5000/user/username", data)
  //         .then((res) => {
  //           if (res.status === 200) {
  //             setInputsError("");
  //             setDefaultValue((state) => {
  //               return (state.username = data.newUsername);
  //             });
  //             setInputsValue((state) => (state.username = ""));
  //             toast.success("Username succesfully updated", {
  //               position: "top-right",
  //               autoClose: 1000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: "light",
  //             });
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       setInputsError(
  //         (state) =>
  //           (state.username = "Username must be contain at least 3 characters")
  //       );
  //     }
  //   };

  const handleEmail = (e) => {
    e.preventDefault();
    let data = { user_id: userID, newEmail: inputsValue.email };
    if (isValidEmail(inputsValue.email)) {
      axios
        .patch("http://localhost:5000/user/email", data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Email has been succesfull updated");
            setDefaultValue((state) => {
              return (state.email = data.newEmail);
            });
            setInputsValue((state) => (state.email = ""));
            setInputsError((state) => (state.email = ""));
          }
        })
        .catch((err) => console.log(err));
    } else {
      setInputsError((state) => (state.email = "This is not a valid Email"));
    }
  };

  return (
    <div className="profile">
      <ChangePassword isOpen={isOpen} getCloseState={getCloseState} />
      <div data-blur={isOpen ? "is-active" : ""} className="blur"></div>
      <form
        className="aera username"
        onSubmit={() => {
          console.log("working");
          return handleSubmit(submitUsername);
        }}
      >
        <div className="username-icon">
          <AccountCircleIcon />
        </div>

        <Input
          type={"text"}
          name={"username"}
          // disabled={inputsLock.username}
          defaultValue={defaultValue.username}
          errorMessage={inputsError.username}
          register={register}
        />
        <button type="button" onClick={toggleUsernameLock}>
          <EditIcon />
        </button>
        <button type="submit">
          <DoneIcon />
        </button>
      </form>

      <form className="aera email" onClick={handleEmail}>
        <div className="email-icon">
          <EmailIcon />
        </div>
        <Input
          type="email"
          // disabled={inputsLock.email}
          defaultValue={userInfos.email}
          name="email"
          errorMessage={inputsError.email}
          register={register}
        />
        <button type="button" onClick={toggleEmailLock}>
          <EditIcon />
        </button>
        <button type="button" disabled={inputsLock.email}>
          <DoneIcon />
        </button>
      </form>

      <div className="aera password">
        <div className="password">
          <LockIcon />
        </div>
        <Input
          type="password"
          // disabled={inputsLock.password}
          defaultValue={"NotaPassword"}
          register={register}
          name="password"
        />
        <button type="button" onClick={() => openModal()}>
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
