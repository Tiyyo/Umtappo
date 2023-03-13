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
    </motion.div>
  );
}

export default HomePage;
