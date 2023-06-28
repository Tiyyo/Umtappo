import React from "react";

const Blur = ({ children, onClick : close }) => {

  const handleClick = (e) => {
    if(e.target.classList.contains('blur')){
      close(false)
    }

  };
  return (
    <div onClick={handleClick} className="blur">
      {children}
    </div>
  );
};

export default Blur;
