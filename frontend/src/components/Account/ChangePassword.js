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

  const passwordSchema = yup
    .object()
    .shape({
      oldPassword: yup.string().required(),
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
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const submitNewPassword = async (data) => {
    console.log(data);
    let body = {
      user_id: userID,
      newPassword: data?.newPassword,
      password: data?.oldPassword,
    };

    console.log("working ?");

    await axios
      .patch("http://localhost:5000/user/password" + body)
      .then((res) => console.log(res));
    //
  };

  const submit = (d) => {
    console.log(d);
    console.log("working submit");
  };

  // resolver: async (data, context, options) => {
  //   // you can debug your validation schema here
  //   console.log('formData', data)
  //   console.log('validation result', await anyResolver(schema)(data, context, options))
  //   return anyResolver(schema)(data, context, options)
  // },

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
          //
        }}
      >
        <div className="old-password">
          <input
            type="password"
            className="confirm-modal__input__current--password"
            name="oldPassword"
            autoComplete="false"
            {...register("oldPassword")}
          />
        </div>
        <div className="old-password__error">{errors.oldPassword}</div>
        <div className="new-password">
          <input
            type="password"
            className="confirm-modal__input__new-password"
            name="newPassword"
            autoComplete="false"
            {...register("newPassword")}
          />
          <div className="new-password__error">{errors.newPassword}</div>
        </div>
        <button
          className="confirm-modal__btn"
          type="submit"
          onSubmit={handleSubmit(submitNewPassword)}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
