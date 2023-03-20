import React, { useState } from "react";

const Button = ({ children }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  const handleAnimationStart = () => {
    setIsAnimated(true);
    setTimeout(() => {
      setIsAnimated(false);
    }, 1000);
  };

  return (
    <>
      <div className="pulse-button" onClick={handleAnimationStart}>
        <button type="button" data-animation={isAnimated ? "true" : "false"}>
          {children}
        </button>
        <div
          className="pulse pulse--first"
          data-animation={isAnimated ? "true" : "false"}
        ></div>
        <div
          className="pulse pulse--second"
          data-animation={isAnimated ? "true" : "false"}
        ></div>
      </div>
    </>
  );
};

export default Button;
