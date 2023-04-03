import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

const Input = ({
  type,
  name,
  placeholder,
  errorMessage,
  register,
  defaultValue,
  disabled,
}) => {
  return (
    <div className="inputWrapper">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input"
        defaultValue={defaultValue ? defaultValue : ""}
        disabled={disabled ? true : false}
        {...register(name)}
      />
      <div className="inputError">
        {errorMessage ? <ErrorIcon /> : ""}
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default Input;
