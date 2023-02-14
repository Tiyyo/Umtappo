import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import bg_1 from "../../assets/images/bg_1.png";
import bg_2 from "../../assets/images/bg_2.png";
import bg_3 from "../../assets/images/bg_3.png";
import bg_4 from "../../assets/images/bg_4.png";
import bg_5 from "../../assets/images/bg_5.png";
import bg_6 from "../../assets/images/bg_6.png";
import bg_7 from "../../assets/images/bg_7.png";
import bg_8 from "../../assets/images/bg_8.png";
import bg_9 from "../../assets/images/bg_9.png";
import bg_10 from "../../assets/images/bg_10.png";
import { useEffect, useState } from "react";

export const Login = () => {
  const [currentBackground, setCurrentBackground] = useState(bg_2);

  // const changeBackground = () => {
  //   setInterval(() => {
  //     setCurrentBackground(bg_2);
  //   }, 500);
  //   console.log(currentBackground);

  //   return currentBackground;
  // };
  // changeBackground();
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

  return (
    <div className="login-page">
      <img className="bg_image" src={currentBackground} alt="" />
      <div className="content">
        <div className="signin_btn">Sign In</div>
        <p>Already a Member ?</p>
        <div className="signup-btn">Sign Up</div>
      </div>

      {/* <div className="login-registration">
        <Link to="/SignUp">
          <button className="sign-in">Sign In</button>
        </Link>
        <Link to="/SignIn">
          <button className="sign-up">Sign Up</button>
        </Link>
      </div> */}
      <div className="logo">
        <img src={logo} alt="logo brand name " />
      </div>
    </div>
  );
};
