import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import "react-image-crop/src/ReactCrop.scss";
import AnimatedRoutes from "./utils/Routes/AnimatedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <ToastContainer transition={Flip} />
    </BrowserRouter>
  );
};

export default App;
