import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../utils/Context/UserContextProvider";
import AppContext from "../../../utils/Context/AppContextProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../../features/user/slice/user.slice";
import SocialAuth from "../SocialAuth";
import Header from "../Header";
import InputSubmit from "../InputSubmit";
import Input from "../Input";
import InputPassword from "../InputPassword";

function SignIn() {
  let accessToken;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const { setIsLoggedIn, setUserID, setUserInfos, setIsAuth } =
    useContext(UserContext);
  const { iconTheme } = useContext(AppContext);

  const dispatch = useDispatch();

  const [errors, setErrors] = useState("");

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
          setErrors(err.response.data);
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
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: 0,
            theme: "dark",
            icon: false,
            // transition: Flip,
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

  let titleHeader = "Welcome Back !";
  let textHeader =
    " You can search for your favorite Movie or Show, Watch trailers and Create lists of your favorites and share them to an audience !";

  return (
    <ThemeProvider theme={iconTheme}>
      <motion.div
        className="signin"
        initial={{ width: 0 }}
        animate={{ width: "100%", transition: { duration: 0.3 } }}
        exit={{ x: -window.innerWidth, transition: { duration: 0.5 } }}
      >
        <button type="button" className="back-icon" onClick={goBack}>
          <ArrowBackIcon color="primary" size="extraLarge" />
        </button>
        <Header title={titleHeader} text={textHeader} />
        <SocialAuth />
        <form className="signin-form" onSubmit={handleSubmit(user)}>
          <Input
            type={"email"}
            name={"email"}
            register={register}
            placeholder="Enter your email"
          />
          <InputPassword
            name={"password"}
            placeholder={"Enter your password"}
            register={register}
            icon={true}
          />
          <InputSubmit
            value={"SIGN IN"}
            isSubmitting={isSubmitting}
            errorMessage={errors}
          />
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
