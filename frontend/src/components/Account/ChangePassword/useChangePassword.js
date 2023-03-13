import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";

// export const passwordSchema = yup.object().shape({
//   password: yup.string().required(),
//   newPassowrd: yup
//     .string()
//     .min(8, "Password must contain at least 8 characters")
//     .max(24, "Passsword can't exceded 24 characters")
//     .required("You need to type a password")
//     .matches(/\w*[a-z]\w*/, "Must contain one lowercase")
//     .matches(/\w*[A-Z]\w*/, "Must contain one uppercase")
//     .matches(/\d/, "Must contain one number")
//     .matches(
//       /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/,
//       "Must containe one special character"
//     ),
// });

// export const submitPasswords = async (data, userID) => {
//   let body = {
//     password: data.password,
//     newPassword: data.newPassword,
//     user_id: userID,
//   };
//   await axios
//     .patch("http://localhost:5000/user/password", body)
//     .then((res) => {
//       if (res.status === 200) {
//         toast.success(res.data);
//         getCloseState(false);
//       }
//     })
//     .catch((err) => {
//       toast.error(err.response.data);
//     });
// };

const useChangePassword = () => {
  return {};
};

export default useChangePassword;
