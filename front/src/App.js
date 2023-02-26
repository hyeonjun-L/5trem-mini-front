import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./component/login/Login";
import SignUp from "./component/signUp/SignUp";
import MainPage from "./component/mainPage/MainPage";
import YearChange from "./component/yearChange/YearChange";
import FindInfo from "./component/find_Info/FindMain";
import Intro from "./component/intro/Intro";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/yearChange" element={<YearChange />} />
      <Route path="/find-id" element={<FindInfo />} />
      <Route path="/find-password" element={<FindInfo />} />
      <Route path="/" element={<Intro />} />
    </Routes>
  );
}

export default App;
