import { Link, Outlet } from "react-router-dom";

export const Login = () => {
  return (
    <div className="login-page">
      <div className="login-registration">
        <Link to="register">
          <button className="sign-in">Sign In</button>
        </Link>
        <Link to="signin">
          <button className="sign-up">Sign Up</button>
        </Link>
      </div>
    
      <Link to="/home">
        <div className="guest-session">
          <div className="inner-circle">
            <p>Guest Session </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
