import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { ThemeProvider } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AppContext from "../../../utils/Context/AppContextProvider";
import Input from "../Input";
import InputPassword from "../InputPassword";
import InputSubmit from "../InputSubmit";
import SocialAuth from "../SocialAuth";
import Header from "../Header";
import { userSchema } from "./user.schema";

const SignUp = () => {
  const navigate = useNavigate();

  const [backendError, setBackendError] = useState("");

  const { iconTheme } = useContext(AppContext);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { isSubmitting, errors } = formState;

  const submitUser = async (data) => {
    await axios
      .post("https://umtappo.onrender.com/user/register", {
        username: data?.username,
        email: data?.email,
        password: data?.password,
      })
      .then((res) => {
        if (res.status === 200) {
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
          navigate("/Login/SignIn");
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
    return navigate("/Login");
  };

  return (
    <ThemeProvider theme={iconTheme}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%", transition: { duration: 0.3 } }}
        exit={{ x: -window.innerWidth, transition: { duration: 0.5 } }}
        className="signup"
      >
        <button type="button" className="back-icon" onClick={goBack}>
          <ArrowBackIcon color="primary" size="extraLarge" />
        </button>
        <Header
          title={"Sign Up for Free !"}
          text={" You'll get some special features designed just for you !"}
        />
        <SocialAuth />
        <form className="signup-form" onSubmit={handleSubmit(submitUser)}>
          <Input
            type={"text"}
            name={"username"}
            placeholder={"Username"}
            errorMessage={errors?.username?.message}
            register={register}
          />
          <Input
            type={"email"}
            name={"email"}
            placeholder={"john.doe@gmail.com"}
            errorMessage={errors?.email?.message}
            register={register}
          />
          <InputPassword
            name={"password"}
            placeholder={"Chose a password"}
            register={register}
            errorMessage={errors?.password?.message}
            icon={true}
          />
          <InputPassword
            name={"confirmedPassword"}
            placeholder={"Confirm your Password"}
            register={register}
            errorMessage={errors?.confirmedPassword?.message}
            icon={false}
          />
          <div className="checkboxs">
            <div className="terms-and-privacy">
              <label htmlFor="TermsAndPrivacy">
                I agree with Terms of Service & Privacy Policy
              </label>
              <input type="checkbox" name="Terms" id="TermsAndPrivacy" />
            </div>
            <div className="newsletter-subscription">
              <label htmlFor="Newsletter">Subcribe to our Newsletter</label>
              <input type="checkbox" name="Terms" id="Newsletter" />
            </div>
          </div>
          <InputSubmit
            value={"JOIN NOW"}
            isSubmitting={isSubmitting}
            errorMessage={backendError}
          />
        </form>
        <p className="link-to-signin">
          Have an account ?{" "}
          <Link
            style={{ textDecoration: "none", cursor: "pointer" }}
            to="/Login/SignIn"
          >
            <span>Log in</span>
          </Link>
        </p>
      </motion.div>
    </ThemeProvider>
  );
};

export default SignUp;
