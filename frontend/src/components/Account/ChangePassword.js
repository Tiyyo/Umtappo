import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const ChangePassword = (props) => {
  const { isOpen, getCloseState } = props;

  const handleSomething = () => {
    //
  };

  return (
    <div
      className="confirm-modal"
      style={isOpen ? { top: "10%" } : { top: "-100vh" }}
    >
      <div className="confirm-modal__header">
        <h2>You need to enter your password to confirm</h2>
        <div
          className="close-icon"
          onClick={() => {
            getCloseState(false);
          }}
        >
          <CloseIcon />
        </div>
      </div>
      <input
        type="password"
        className="confirm-modal__input__current--password"
      />
      <input type="password" className="confirm-modal__input__new-password" />
      <button
        className="confirm-modal__btn"
        type="submit"
        onClick={handleSomething}
      >
        Confirm
      </button>
    </div>
  );
};

export default ChangePassword;
