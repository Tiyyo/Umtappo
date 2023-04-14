import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../Authentification/Input";
import ChangePassword from "../ChangePassword/ChangePassword";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  editEmail,
  editUsername,
  getUserData,
} from "../../../features/user/slice/user.slice";

export const usernameSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must contain at least 3 characters")
    .required("Please this filed is required"),
});
export const emailShcema = yup.object().shape({
  email: yup
    .string()
    .email("This is not an email !")
    .required("An email is required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const {
    id: userID,
    email: userEmail,
    username: username,
  } = useSelector((state) => state.user.user);

  const [isOpen, setIsOpen] = useState(false);
  const [usernameIsLock, setUsernameIsLock] = useState(true);
  const [emailIsLock, setEmailIsLock] = useState(true);

  const {
    register: registerUsername,
    handleSubmit: handleSubmitUsername,
    formState: { errors: errorUsername, isSubmitting: isSubmittingUsername },
  } = useForm({ resolver: yupResolver(usernameSchema) });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorEmail, isSubmitting: isSubmittingEmail },
  } = useForm({
    resolver: yupResolver(emailShcema),
  });

  const submitUsername = async (value) => {
    let data = { user_id: userID, newUsername: value.username };

    await axios
      .patch("https://umtappo.onrender.com/user/username", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(editUsername(value.username));
          // setDefaultValue((state) => {
          //   return (state.username = data.newUsername);
          // });
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
  };

  const submitEmail = async (value) => {
    let data = { user_id: userID, newEmail: value.email };

    await axios
      .patch("https://umtappo.onrender.com/user/email", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Email has been succesfull updated");
          dispatch(editEmail(value.email));
          // setDefaultValue((state) => {
          //   return (state.email = data.newEmail);
          // });
        }
      })
      .catch((err) => console.log(err));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const getCloseState = (state) => {
    setIsOpen(state);
  };

  const toggleEditUsername = () => {
    usernameIsLock ? setUsernameIsLock(false) : setUsernameIsLock(true);
  };

  const toggleEditEmail = () => {
    emailIsLock ? setEmailIsLock(false) : setEmailIsLock(true);
  };

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <div className="profile">
      <ChangePassword isOpen={isOpen} getCloseState={getCloseState} />
      <div data-blur={isOpen ? "is-active" : ""} className="blur"></div>

      <form
        action="post"
        className="aera"
        onSubmit={handleSubmitUsername(submitUsername)}
      >
        <div className="username-icon">
          <AccountCircleIcon />
        </div>
        <Input
          name="username"
          defaultValue={username}
          disabled={usernameIsLock}
          errorMessage={errorUsername.username?.message}
          register={registerUsername}
        />
        <button type="button" onClick={toggleEditUsername}>
          <EditIcon />
        </button>
        <button type="submit">
          <DoneIcon />
        </button>
      </form>

      <form
        action="post"
        className="aera"
        onSubmit={handleSubmitEmail(submitEmail)}
      >
        <div className="email-icon">
          <EmailIcon />
        </div>
        <Input
          name="email"
          disabled={emailIsLock}
          defaultValue={userEmail}
          errorMessage={errorEmail.email?.message}
          register={registerEmail}
        />
        <button type="button" onClick={toggleEditEmail}>
          <EditIcon />
        </button>
        <button type="submit">
          <DoneIcon />
        </button>
      </form>

      <form className="aera password">
        <div className="password">
          <LockIcon />
        </div>
        <Input
          type="password"
          disabled={true}
          defaultValue={"NotaPassword"}
          register={registerUsername}
          name="password"
        />
        <button type="button" onClick={() => openModal()}>
          <EditIcon />
        </button>
        <button type="button">
          <DoneIcon />
        </button>
      </form>
    </div>
  );
};

export default Profile;
