import * as yup from "yup";

export const userSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must contain at least 3 characters")
    .required("Please this filed is required"),
  email: yup
    .string()
    .email("This is not an email !")
    .required("An email is required"),
  password: yup
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
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("You need to coinfirm your password"),
});
