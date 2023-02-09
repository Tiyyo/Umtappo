import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Likes from "./pages/Likes/Likes";
import "./app.scss";
import Films from "./pages/Films/Films";
import TvShow from "./pages/TvShow/TvShow";
import Modal from "./components/Cards/Modal";
import { Login } from "./pages/Login/Login";
import AddToPlaylist from "./pages/Likes/AddToPlaylist";
import Register from "./components/Authentification/Register";
import SignIn from "./components/Authentification/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path={"*"} element={<Home />} />
        <Route path={"/Home"} element={<Home />}></Route>
        <Route path="/Likes" element={<Likes />}></Route>
        <Route path="/Films" element={<Films />}></Route>
        <Route path="/TvShow" element={<TvShow />}></Route>
        <Route path={`/:id/:modalid`} element={<Modal />} />
        <Route path={"/:id/:id/add_to_playlist"} element={<AddToPlaylist />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
