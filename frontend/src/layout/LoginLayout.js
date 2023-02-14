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
import { useEffect, useState } from "react";

const LoginLayout = () => {
  const [currentBackground, setCurrentBackground] = useState(bg_2);

  useEffect(() => {
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
    let randomNumber = Math.floor(Math.random() * 10);
    setCurrentBackground(images[randomNumber]);
  }, []);

  useEffect(() => {
    console.log("layout fire once");
  });
  return (
    <div className="login-page">
      <img className="bg_image" src={currentBackground} alt="" />
      <Outlet />
      <div className="logo">
        <img src={logo} alt="logo brand name " />
      </div>
    </div>
  );
};

export default LoginLayout;
