import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";

const InputPassword = ({ name, placeholder, register, icon, errorMessage }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showPassword = () => {
    setIsVisible(true);
  };

  const hidePassword = () => {
    setIsVisible(false);
  };

  return (
    <div className="inputWrapper">
      <input
        type={isVisible ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        className="input"
        autoComplete="off"
        {...register(name)}
      />
      <button
        type="button"
        className="visibility-icons"
        style={icon ? { opacity: "1" } : { opacity: "0" }}
      >
        <span
          onClick={() => {
            hidePassword();
          }}
          style={
            isVisible ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: 0 }
          }
        >
          <VisibilityIcon color="primary" />
        </span>
        <span
          onClick={() => {
            showPassword();
          }}
          style={
            isVisible ? { opacity: 0, zIndex: 0 } : { opacity: 1, zIndex: 1 }
          }
        >
          <VisibilityOffIcon color="primary" />
        </span>
      </button>
      <div className="inputError">
        {errorMessage ? <ErrorIcon /> : ""}
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default InputPassword;
