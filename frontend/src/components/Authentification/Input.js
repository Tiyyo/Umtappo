import React from "react";
import DoneIcon from "@mui/icons-material/Done";

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
      <div className="inputError"> {errorMessage}</div>

      {/*
      //-- a voir
      <div className="valid-icon" style={{ opacity: 1 }}>
        <DoneIcon color="primary" />
      </div>  
      */}
    </div>
  );
};

export default Input;
