import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import UserContext from "../../utils/Context/UserContextProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const ChangePassword = (props) => {
  const { isOpen, getCloseState } = props;

  const { userID } = useContext(UserContext);

  const passwordSchema = yup.object().shape({
    oldPassword: yup.string(),
    newPassword: yup
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(24, "Passsword can't exceded 24 characters")
      .required("You need to type a password")
      .matches(/\w*[a-z]\w*/, "Must contain one lowercase")
      .matches(/\w*[A-Z]\w*/, "Must contain one uppercase")
      .matches(/\d/, "Must contain one number")
      .matches(
        /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/,
        "Must containe one special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { error, isSubmitting },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const submitNewPassword = async (data) => {
    let body = {
      user_id: userID,
      newPassword: data?.newPassword,
      password: data?.oldPassword,
    };

    console.log("working ?");

    axios
      .patch("http://localhost:5000/user/password" + body)
      .then((res) => console.log(res));
    //
  };

  return (
    <div
      className="confirm-modal"
      style={isOpen ? { top: "10%" } : { top: "-100vh" }}
    >
      <div className="confirm-modal__header">
        <h2>You need to enter your password to confirm</h2>
        <div
          className="close-icon"
          onClick={() => {
            getCloseState(false);
          }}
        >
          <CloseIcon />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
          return handleSubmit(submitNewPassword);
        }}
      >
        <div className="old-password">
          <input
            type="password"
            className="confirm-modal__input__current--password"
            name="oldPassword"
            {..."oldPasswword"}
          />
        </div>
        <div className="old-password__error"></div>
        <div className="new-password">
          <input
            type="password"
            className="confirm-modal__input__new-password"
            name="newPassword"
            {...register("newPassword")}
          />
        </div>
        <div className="new-password__error"></div>
        <button className="confirm-modal__btn" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
