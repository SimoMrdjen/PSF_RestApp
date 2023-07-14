import React, { useState, useContext } from "react";
import * as XLSX from "xlsx";
import logo from "./APV.png";
import { saveObrazac5 } from "./client";
import { Breadcrumb, Layout, Menu, theme, Image } from "antd";
import Kvartal from "./components/Kvartal";
import ObrazacIO from "./components/ObrazacIO";
import LoginForm from "./LoginForm";
import AuthContext from "./context/AuthProvider";
import RequiredAuth from "./components/RequiredAuth";
import MainForma from "./MainForma";
import { Routes, Route } from "react-router-dom";

const MainApp = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [access_token, setAccessToken] = useState();

  const handleLogin = (isLoggedIn) => {
    setLoggedIn(isLoggedIn);
  };

  return (
    <div>
      {loggedIn ? (
        <MainForma
          access_token={access_token}
          //setAccessToken = {setAccessToken}
        />
      ) : (
        <LoginForm
          onLogin={handleLogin}
          access_token={access_token}
          setAccessToken={setAccessToken}
        />
      )}
    </div>
  );
};
export default MainApp;
