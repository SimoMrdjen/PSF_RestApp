import React, { useState, useContext } from "react";
import LoginForm from "./components/LoginForm";
import MainForma from "./MainForma";

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
