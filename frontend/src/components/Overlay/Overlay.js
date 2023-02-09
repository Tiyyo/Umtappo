import React from "react";

const Overlay = ({ children, close }) => {
  return (
    <div className="overlay" onClick={close}>
      {children}
    </div>
  );
};

export default Overlay;
