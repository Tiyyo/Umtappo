import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import UserContext from "../../../utils/Context/UserContextProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { passwordSchema } from "./useChangePassword";
import InputPassword from "../../Authentification/InputPassword";
import InputSubmit from "../../Authentification/InputSubmit";

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
      className="change-password"
      style={
        isOpen
          ? { top: "10%", display: "flex" }
          : { top: "-100vh", display: "none" }
      }
    >
      <div className="change-password__header">
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
        onSubmit={handleSubmit(submitPasswords)}
        className="change-password__form"
      >
        <InputPassword
          icon={true}
          name="password"
          errrorMessage={errors?.password}
          register={register}
        />
        <InputPassword
          icon={true}
          name="newPassword"
          errorMessage={errors?.newPassword}
          register={register}
        />
        <InputSubmit value={"confirm"} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default ChangePassword;
