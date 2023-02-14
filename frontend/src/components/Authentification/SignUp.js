import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const showPassword = () => {
    setIsVisible(true);
  };

  const hidePassword = () => {
    setIsVisible(false);
  };

  const userSchema = yup.object().shape({
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

  const theme = createTheme({
    palette: {
      primary: {
        light: "#ffbd45",
        main: "#fb8c00",
        dark: "#c25e00",
        contrastText: "#000000",
      },
      secondary: {
        light: "#484848",
        main: "#121212",
        dark: "#000000",
        contrastText: "#ffffff",
      },
    },
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { isSubmitting, errors } = formState;

  const submitUser = async (data) => {
    await axios
      .post("http://localhost:5000/user/register", {
        username: data?.username,
        email: data?.email,
        password: data?.password,
      })
      .then((res) => {
        console.log(res.status, res.data);
        if (res.status === 200) {
          alert("You are now registered");
          toast.success("You are now registered", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            theme: "dark",
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        setBackendError(err?.response?.data);
        toast.error(err?.response?.data, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: 0,
          theme: "dark",
        });
      });
  };

  const goBack = () => {
    return navigate("/*");
  };

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%", transition: { duration: 0.3 } }}
        exit={{ x: -window.innerWidth, transition: { duration: 0.5 } }}
        className="signup"
      >
        <button type="button" className="back-icon" onClick={goBack}>
          <ArrowBackIcon color="primary" size="extraLarge" />
        </button>
        <div className="message-to-users">
          <h2 className="message-to-users__title">Sign Up for Free !</h2>
          <p className="message-to-users__text">
            You'll get some special features designed just for you !
          </p>
        </div>
        <div className="social-signup">
          <button type="button" className="gmail_btn">
            <FacebookIcon color="primary" />
            <span>Google</span>
          </button>
          <button type="button" className="facebook_btn">
            <GoogleIcon color="primary" />
            <span>Facebook</span>
          </button>
        </div>

        <form className="signup-form" onSubmit={handleSubmit(submitUser)}>
          <div className="inputWrapper username">
            <input
              type="text"
              name="username"
              className="inputUsername"
              placeholder="Username"
              {...register("username")}
            />

            <div className="error-container errorUsername">
              {errors?.username?.message}
            </div>
          </div>
          <div className="inputWrapper email">
            <input
              type="email"
              name="email"
              className="email"
              placeholder="john.doe@gmail.com"
              {...register("email")}
            />
            <div className="error-container errorEmail">
              {errors?.email?.message}
            </div>
            <div className="valid-icon" style={{ opacity: 0 }}>
              <DoneIcon color="primary" />
            </div>
          </div>
          <div className="inputWrapper password">
            <input
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Choose a Password"
              className="password"
              {...register("password")}
            />
            <button
              type="button"
              role="show password"
              className="visibility-icons"
            >
              <span
                onClick={() => {
                  hidePassword();
                }}
                style={
                  isVisible
                    ? { opacity: 1, zIndex: 1 }
                    : { opacity: 0, zIndex: 0 }
                }
              >
                <VisibilityIcon color="primary" />
              </span>
              <span
                onClick={() => {
                  showPassword();
                }}
                style={
                  isVisible
                    ? { opacity: 0, zIndex: 0 }
                    : { opacity: 1, zIndex: 1 }
                }
              >
                <VisibilityOffIcon color="primary" />
              </span>
            </button>
            <div className="error-container errorPassword">
              {errors?.password?.message}
            </div>
          </div>
          <div className="inputWrapper confirmed-password">
            <input
              type="password"
              className="confirmed-password"
              name="confirmedPassword"
              placeholder="Confirm your Password"
              {...register("confirmedPassword")}
            />
            <div className="error-container errorPassword">
              {errors?.confirmedPassword?.message}
            </div>
          </div>
          <div className="checkboxs">
            <div className="terms-and-privacy">
              <label for="TermsAndPrivacy">
                I agree with <e>Terms of Service & Privacy Policy</e>
              </label>
              <input type="checkbox" name="Terms" id="TermsAndPrivacy" />
            </div>
            <div className="newsletter-subscription">
              <label for="Newsletter">Subcribe to our Newsletter</label>
              <input type="checkbox" name="Terms" id="Newsletter" />
            </div>
          </div>
          <input
            type="submit"
            className="submit_btn"
            value="JOIN NOW"
            disabled={isSubmitting}
          />
          <div className="error backend-error">
            {backendError ? (
              <>
                <ReportIcon />
                <span>{backendError}</span>
              </>
            ) : (
              ""
            )}
            {/* {backendError ?  <span></span>backendError : ""} */}
          </div>
        </form>
        <p className="link-to-signin">
          Have an account ?{" "}
          <Link to="/SignIn">
            <span>Log in</span>
          </Link>
        </p>
      </motion.div>
    </ThemeProvider>
  );
};

export default SignUp;
