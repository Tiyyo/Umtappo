import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const [error, setError] = useState(null);
  const [errorUsername, setErrorUsername] = useState(null);
  const [errorEmail, setErrorMail] = useState(null);
  const [isValidate, setIsValidate] = useState(false);

  const sendUserInfos = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/user/register", {
        username: username?.toString(),
        email: email?.toString(),
        password: password?.toString(),
      })
      .then((res) => {
        if (res.status === 201) {
          alert("You are now registerd !");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
        setIsValidate(false);
      });
    if (isValidate) {
      navigate("/login");
    } else {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setErrorMail("This email is already used ");
  //   setErrorUsername("Username already taken");
  // });

  return (
    <div className="register-page">
      <div className="register-main">
        <div className="header">
          <h3>Sign Up for Free !</h3>
          <p>You'll get some special features designed just for you !</p>
        </div>
        <form className="register-form">
          <div className="inputWrapper username">
            <input
              type="text"
              className="inputUsername"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="error-container errorUsername">
              {errorUsername ? errorUsername : ""}
            </div>
          </div>
          {/* <div className="inputWrapper firstName">
          <input type="text" className="firstName" placeholder="Jonh" required />
          <div className="error-container errorFirstName"></div>
        </div>
        <div className="inputWrapper lastName">
          <input type="text" className="lastName" placeholder="Doe" required />
          <div className="error-container errorLastName"></div>
        </div> */}
          <div className="inputWrapper email">
            <input
              type="email"
              className="email"
              placeholder="john.doe@gmail.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="error-container errorEmail">
              {errorEmail ? errorEmail : ""}
            </div>
          </div>
          <div className="inputWrapper password">
            <input
              type="password"
              className="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error-container errorPassword"></div>
          </div>
          <div className="inputWrapper confirmed-password">
            <input
              type="password"
              className="confirmed-password"
              required
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
            <div className="error-container errorPassword"></div>
          </div>

          <button type="submit" onClick={(e) => sendUserInfos(e)}>
            Valid your Inscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
