import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../Authentification/Input";
import ChangePassword from "../ChangePassword/ChangePassword";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import UserContext from "../../../utils/Context/UserContextProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

export const userSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must contain at least 3 characters")
    .required("Please this filed is required"),
  email: yup
    .string()
    .email("This is not an email !")
    .required("An email is required"),
});

const ProfileTwo = () => {
  const { userInfos, userID } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState({
    username: userInfos.username,
    email: userInfos.email,
    password: "NotAPassword",
  });

  const [usernameLock, setusernameLock] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(userSchema) });

  const submitUsername = async (value) => {
    console.log(value);
    let data = { user_id: userID, newUsername: value.username };

    await axios
      .patch("http://localhost:5000/user/username", data)
      .then((res) => {
        if (res.status === 200) {
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
  };

  const submitEmail = async (value) => {
    console.log(value);

    let data = { user_id: userID, newEmail: value.email };

    await axios
      .patch("http://localhost:5000/user/email", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Email has been succesfull updated");
          setDefaultValue((state) => {
            return (state.email = data.newEmail);
          });
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
    usernameLock ? setusernameLock(false) : setusernameLock(false);
  };

  return (
    <div className="profile">
      <ChangePassword isOpen={isOpen} getCloseState={getCloseState} />
      <div data-blur={isOpen ? "is-active" : ""} className="blur"></div>
      <form
        action="post"
        className="aera"
        onSubmit={handleSubmit(submitUsername)}
      >
        <div className="username-icon">
          <AccountCircleIcon />
        </div>
        <Input
          name="username"
          defaultValue={defaultValue.username}
          disabled={usernameLock}
          errorMessage={errors.username?.message}
          register={register}
        />
        <button type="button" onClick={toggleEditUsername}>
          <EditIcon />
        </button>
        <button type="submit">
          <DoneIcon />
        </button>
      </form>
      <form action="post" className="aera" onSubmit={handleSubmit(submitEmail)}>
        <div className="email-icon">
          <EmailIcon />
        </div>
        <Input
          name="email"
          defaultValue={defaultValue.email}
          errorMessage={errors.email?.message}
          register={register}
        />
        <button type="button">
          <EditIcon />
        </button>
        <button type="submit">
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

export default ProfileTwo;
