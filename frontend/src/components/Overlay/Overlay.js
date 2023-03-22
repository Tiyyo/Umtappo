import React from "react";

const Overlay = ({ children, active }) => {
  return (
    <div className="overlay" data-active={active}>
      {children}
    </div>
  );
};

export default Overlay;
