import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { UserContextProvider } from "../../utils/Context/UserContextProvider";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmiting, errors },
  } = useForm();

  const user = async (data) => {
    console.log(data.email, data.password);
    await axios
      .post("http://localhost:5000/user/login", {
        email: data?.email,
        password: data?.password,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <UserContextProvider>
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
    </UserContextProvider>
  );
}

export default SignIn;
