import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function FirstPage() {
  useEffect(() => {
    console.log("first page fire once");
  });
  return (
    <motion.div
      className="content"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: -window.innerWidth, transition: { duration: 0.5 } }}
    >
      <Link to="SignUp">
        <button type="button" className="signup_btn">
          Sign Up
        </button>
      </Link>
      <Link to="SignIn">
        <button type="button" className="signin_btn">
          Sign In
        </button>
      </Link>
    </motion.div>
  );
}

export default FirstPage;
