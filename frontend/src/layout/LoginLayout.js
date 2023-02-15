import { Outlet } from "react-router-dom";
import logo from "../assets/images/logo.png";
import bg_1 from "../assets/images/bg_1.png";
import bg_2 from "../assets/images/bg_2.png";
import bg_3 from "../assets/images/bg_3.png";
import bg_4 from "../assets/images/bg_4.png";
import bg_5 from "../assets/images/bg_5.png";
import bg_6 from "../assets/images/bg_6.png";
import bg_7 from "../assets/images/bg_7.png";
import bg_8 from "../assets/images/bg_8.png";
import bg_9 from "../assets/images/bg_9.png";
import bg_10 from "../assets/images/bg_10.png";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import UserContext from "../utils/Context/UserContextProvider";
import LoaderUI from "../components/Loader/LoaderUI";

const LoginLayout = () => {
  const [currentBackground, setCurrentBackground] = useState(bg_10);
  const { authIsLoading } = useContext(UserContext);

  const variants = {
    intro: {
      opacity: [null, 0.8, 1, 1, 1, 1, 1, 1],
      y: [null, "-50%", "-7%", "-7%", "7%", "-7%", "0%", "0%"],
      top: [null, "50%", "7%", "7%", "7%", "7%", "7%", "7%"],
      transition: {
        duration: 3,
        times: [0, 0.6, 0.82, 0.87, 0.92, 0.94, 0.96, 1],
      },
    },
    static: {
      opacity: [0, 1],
      y: [0, 0],
      top: ["7%", "7%"],
      transition: {
        duration: 0.5,
        times: [0, 1],
      },
    },
  };

  let images = [
    bg_1,
    bg_2,
    bg_3,
    bg_4,
    bg_5,
    bg_5,
    bg_6,
    bg_7,
    bg_8,
    bg_9,
    bg_10,
  ];

  return authIsLoading ? (
    <LoaderUI />
  ) : (
    <div className="login-page">
      <img
        className="bg_image"
        src={currentBackground}
        alt="movie background image"
      />
      <Outlet />
      <div className="logo">
        <h1>MovAPP</h1>
      </div>
    </div>
  );
};

export default LoginLayout;
