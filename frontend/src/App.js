import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import AnimatedRoutes from "./utils/Routes/AnimatedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
