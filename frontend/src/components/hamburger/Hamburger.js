import React, { useEffect, useState } from "react";
import "./hamburgers.css";

const Hamburger = (props) => {
  const { getHamburgerState } = props;
  const [btnState, setBtnState] = useState(false);
  const hamburgerBtn = document.querySelector(".hamburger");

  const handlebtnState = () => {
    if (btnState === false) {
      hamburgerBtn.classList.add("is-active");
    } else {
      hamburgerBtn.classList.remove("is-active");
    }
  };

  useEffect(() => {
    btnState ? getHamburgerState(true) : getHamburgerState(false);
  }, [btnState]);

  return (
    <button
      onClick={() => {
        btnState ? setBtnState(false) : setBtnState(true);
        handlebtnState();
      }}
      className="hamburger hamburger--spring"
      type="button"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
};

export default Hamburger;
