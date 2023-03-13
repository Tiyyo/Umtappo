import React from "react";

const Header = ({ title, text }) => {
  return (
    <div className="message-to-users">
      <h2 className="message-to-users__title">{title}</h2>
      <p className="message-to-users__text">{text}</p>
    </div>
  );
};

export default Header;
