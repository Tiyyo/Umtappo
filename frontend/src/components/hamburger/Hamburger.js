import React, { useEffect, useState } from "react";
import "./hamburgers.css";

const Hamburger = (props) => {
  const parentNavState = props.parentNavState;
  const [btnState, setBtnState] = useState(false);
  const hamburgerBtn = document.querySelector(".hamburger");

  const handlebtnState = () => {
    if (btnState === false) {
      hamburgerBtn.classList.add("is-active");
      props.getOpenState(true);
    } else {
      hamburgerBtn.classList.remove("is-active");
      props.getOpenState(false);
    }
  };

  useEffect(() => {
    setBtnState(parentNavState);
    if (parentNavState === false && hamburgerBtn) {
      hamburgerBtn.classList.remove("is-active");
    }
  }, [parentNavState]);

  return (
    <button
      onClick={(e) => {
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
