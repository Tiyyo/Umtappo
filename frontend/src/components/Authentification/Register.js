import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");
  const userSchema = yup.object().shape({
    username: yup.string().required("Please this filed is required"),
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
      .required("You need to retype your password to confirm"),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { isSubmitting, errors } = formState;

  const submitUser = async (data) => {
    console.log(
      data.username,
      data.email,
      data.password,
      data.confirmedPassword
    );
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
          navigate("/login");
        }
      })
      .catch((err) => {
        setBackendError(err?.response?.data);
      });
  };

  return (
    <div className="register-page">
      <div className="register-main">
        <div className="header">
          <h3>Sign Up for Free !</h3>
          <p>You'll get some special features designed just for you !</p>
        </div>
        <form className="register-form" onSubmit={handleSubmit(submitUser)}>
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
          </div>
          <div className="inputWrapper password">
            <input
              type="password"
              name="password"
              className="password"
              {...register("password")}
            />
            <div className="error-container errorPassword">
              {errors?.password?.message}
            </div>
          </div>
          <div className="inputWrapper confirmed-password">
            <input
              type="password"
              className="confirmed-password"
              name="confirmedPassword"
              {...register("confirmedPassword")}
            />
            <div className="error-container errorPassword">
              {errors?.confirmedPassword?.message}
            </div>
          </div>
          <input
            type="submit"
            className="submit_btn"
            value="JOIN NOW"
            disabled={isSubmitting}
          />
          <div className="error backend-error">
            {backendError ? backendError : ""}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
