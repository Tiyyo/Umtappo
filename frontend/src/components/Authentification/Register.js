import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Register = () => {
  // const navigate = useNavigate();

  // const [username, setUsername] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [confirmedPassword, setConfirmedPassword] = useState(null);
  // const [error, setError] = useState(null);
  // const [errorUsername, setErrorUsername] = useState(null);
  // const [errorEmail, setErrorMail] = useState(null);
  // const [isValidate, setIsValidate] = useState(false);

  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  // const sendUserInfos = async (e) => {
  //   e.preventDefault();
  //   await axios
  //     .post("http://localhost:5000/user/register", {
  //       username: username?.toString(),
  //       email: email?.toString(),
  //       password: password?.toString(),
  //     })
  //     .then((res) => {
  //       if (res.status === 201) {
  //         alert("You are now registerd !");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //       setError(err.response.data);
  //       setIsValidate(false);
  //     });
  //   if (isValidate) {
  //     navigate("/login");
  //   } else {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="register-page">
      <div className="register-main">
        <div className="header">
          <h3>Sign Up for Free !</h3>
          <p>You'll get some special features designed just for you !</p>
        </div>
        <form className="register-form" onSubmit={() => handleSubmit(onSubmit)}>
          <div className="inputWrapper username">
            <input
              type="text"
              name="username"
              className="inputUsername"
              placeholder="Username"
              required
              {...register("username")}
            />
            <div className="error-container errorUsername"></div>
          </div>
          <div className="inputWrapper email">
            <input
              type="email"
              name="email"
              className="email"
              placeholder="john.doe@gmail.com"
              required
              {...register("email")}
            />
            <div className="error-container errorEmail"></div>
          </div>
          <div className="inputWrapper password">
            <input
              type="password"
              name="password"
              className="password"
              required
              {...register("password")}
            />
            <div className="error-container errorPassword"></div>
          </div>
          <div className="inputWrapper confirmed-password">
            <input type="password" className="confirmed-password" required />
            <div className="error-container errorPassword"></div>
          </div>

          <button type="submit" disabled={isSubmitting}>
            Valid your Inscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
