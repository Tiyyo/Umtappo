import React from "react";

const Button = ({ children }) => {
  return (
    <div className="pulse-button">
      <button type="button">
        {children}
        <div className="span"></div>
        <div className="span"></div>
      </button>
    </div>
  );
};

export default Button;
