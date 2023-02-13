import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export const Login = () => {
  return (
    <div className="login-page">
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
