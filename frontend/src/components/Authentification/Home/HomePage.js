import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <motion.div
      className="home-page"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: -window.innerWidth, transition: { duration: 0.5 } }}
    >
      <Link to="SignUp">
        <button type="button" className="home-page__btn--signup">
          Sign Up
        </button>
      </Link>
      <Link to="SignIn">
        <button type="button" className="home-page__btn--signin">
          Sign In
        </button>
      </Link>
      <Link to="/Home">
        <p className="home-page__link-to-home">
          Click here to acces without account
        </p>
        <div className="home-page__demo-credentials">
          <p>
            You can have a quick view of what you can do by using this as
            credentials
          </p>
          <p>email : example@example.com</p>
          <p>password : @Example1234</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default HomePage;
