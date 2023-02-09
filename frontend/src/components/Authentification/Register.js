import { CleaningServices } from "@mui/icons-material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Register = () => {
  const [errorUsername, setErrorUsername] = useState(null);
  const [errorEmail, setErrorMail] = useState(null);

  const sendUserInfos = (e) => {
    e.preventDefault();
    console.log(e);
  };

  useEffect(() => {
    setErrorMail("This email is already used ");
    setErrorUsername("Username already taken");
  });

  return (
    <div className="register-page">
      <div className="register-main">
        <div className="header">
          <h3>Sign In for Free !</h3>
          <p>You'll get some special features designed for you !</p>
        </div>
        <form className="register-form">
          <div className="inputWrapper username">
            <input
              type="text"
              className="inputUsername"
              placeholder="Username"
              required
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
            />
            <div className="error-container errorEmail">
              {errorEmail ? errorEmail : ""}
            </div>
          </div>
          <div className="inputWrapper password">
            <input type="password" className="password" required />
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
