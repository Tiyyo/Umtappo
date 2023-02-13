import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/Context/UserContextProvider";

function SignIn() {
  let accessToken;
  const {
    register,
    handleSubmit,
    formState: { isSubmiting, errors },
  } = useForm();

  const navigate = useNavigate();

  const { setIsLoggedIn, setUserID, setUserInfos, setIsAuth } =
    useContext(UserContext);

  const user = async (data) => {
    console.log(data.email, data.password);
    await axios
      .post("http://localhost:5000/user/login", {
        email: data?.email,
        password: data?.password,
      })
      .then((res) => {
        if (res.status === 200) {
          accessToken = res.data.accessToken;
          window.localStorage.setItem("accesToken", accessToken);
          window.localStorage.setItem("isLoggedIn", true);
          setIsLoggedIn(true);
          auth(accessToken);
        }
      })
      .catch((err) => {
        if (err) {
          alert(err.response.data);
          setIsAuth(false);
        }
      });
  };

  const auth = async (token) => {
    await axios
      .get("http://localhost:5000/user/current", {
        headers: {
          "Authorization ": `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setUserID(res?.data?.id);
          setUserInfos({
            username: res?.data.username,
            email: res?.data?.email,
            password: res?.data?.password,
          });
          setIsAuth(true);
          alert("Login Succesfully");
          navigate("/home");
        } else {
          setIsAuth(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-page">
      <form className="signup-form" onSubmit={handleSubmit(user)}>
        <input
          type="email"
          className="email"
          name="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        <input
          type="password"
          className="password"
          name="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default SignIn;
