import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/Context/UserContextProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function SignIn() {
  let accessToken;
  const {
    register,
    handleSubmit,
    formState: { isSubmiting, errors },
  } = useForm();

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

  const navigate = useNavigate();

  const { setIsLoggedIn, setUserID, setUserInfos, setIsAuth } =
    useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);

  const showPassword = () => {
    setIsVisible(true);
  };

  const hidePassword = () => {
    setIsVisible(false);
  };

  const user = async (data) => {
    await axios
      .post("http://localhost:5000/user/login", {
        email: data?.email,
        password: data?.password,
      })
      .then((res) => {
        if (res.status === 200) {
          accessToken = res.data.accessToken;
          window.localStorage.setItem("accesToken", accessToken);
          setIsLoggedIn(true);
          auth(accessToken);
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(err.response.data, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: 0,
            theme: "dark",
          });

          setIsAuth(false);
        }
      });
  };

  const auth = async (token) => {
    await axios
      .get("http://localhost:5000/user/current", {
        headers: {
          "Authorization ": `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUserID(res?.data?.id);
          setUserInfos({
            username: res?.data.username,
            email: res?.data?.email,
            password: res?.data?.password,
          });
          setIsAuth(true);
          toast.success("Login Succesfully", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            theme: "dark",
          });
          navigate("/home");
        } else {
          setIsAuth(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const goBack = () => {
    return navigate("/Login");
  };

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        className="signin"
        initial={{ width: 0 }}
        animate={{ width: "100%", transition: { duration: 0.3 } }}
        exit={{ x: -window.innerWidth, transition: { duration: 0.5 } }}
      >
        <button type="button" className="back-icon" onClick={goBack}>
          <ArrowBackIcon color="primary" size="extraLarge" />
        </button>
        <div className="message-to-users">
          <h2 className="message-to-users__title">Welcome Back</h2>
          <p className="message-to-users__text">
            You can search for your favorite Movie or Show, Watch trailers and
            Create lists of your favorites and share them to an audience !
          </p>
        </div>
        <div className="social-signin">
          <button type="button" className="gmail_btn">
            <FacebookIcon color="primary" />
            <span>Google</span>
          </button>
          <button type="button" className="facebook_btn">
            <GoogleIcon color="primary" />
            <span>Facebook</span>
          </button>
        </div>

        <form className="signin-form" onSubmit={handleSubmit(user)}>
          <div className="input-email">
            <input
              type="email"
              className="email"
              name="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            <div className="valid-icon" style={{ opacity: 0 }}>
              <DoneIcon color="primary" />
            </div>
          </div>
          <div className="input-password">
            <input
              type={isVisible ? "text" : "password"}
              className="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
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
          </div>
          <input type="submit" className="login_btn" value=" Sign In" />
          <Link style={{ textDecoration: "none", cursor: "pointer" }}>
            <p className="password-recuperation-link">Forgot your password ?</p>
          </Link>
        </form>
        <p className="link-to-signup">
          Don't have an account ?{" "}
          <Link
            style={{ textDecoration: "none", cursor: "pointer" }}
            to="Login/SignUp"
          >
            <span>Join Us</span>
          </Link>
        </p>
      </motion.div>
    </ThemeProvider>
  );
}

export default SignIn;
