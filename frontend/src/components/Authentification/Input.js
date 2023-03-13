import React from "react";
import DoneIcon from "@mui/icons-material/Done";

const Input = ({ type, name, placeholder, errorMessage, register }) => {
  return (
    <div className="inputWrapper">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input"
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
