import * as yup from "yup";

export const passwordSchema = yup.object().shape({
  password: yup.string().required(),
  newPassowrd: yup
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
