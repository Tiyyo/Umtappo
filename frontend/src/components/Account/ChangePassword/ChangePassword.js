import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import UserContext from "../../../utils/Context/UserContextProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { passwordSchema } from "./useChangePassword";
import { submitPasswords } from "./useChangePassword";

const ChangePassword = ({ isOpen, getCloseState }) => {
  const { userID } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
    resolvers: yupResolver(passwordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const submitPasswords = async (data) => {
    let body = {
      password: data.password,
      newPassword: data.newPassword,
      user_id: userID,
    };
    await axios
      .patch("http://localhost:5000/user/password", body)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data);
          getCloseState(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
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
      <div className="change-password">
        <form
          onSubmit={handleSubmit(submitPasswords)}
          className="change-password__form"
        >
          <input
            type="password"
            name="password"
            className="change-password__form-input"
            {...register("password")}
          />
          <div
            style={{ height: "20px" }}
            className="change-password__form-error"
          >
            {errors?.password}
          </div>
          <input
            type="password"
            name="newPassowrd"
            className="change-password__form-input"
            {...register("newPassword")}
          />
          <div className="change-password__form-error">
            {errors?.newPassword}
          </div>
          <button type="submit" disabled={isSubmitting}>
            Confirmer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
