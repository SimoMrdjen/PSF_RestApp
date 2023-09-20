import React, { useState, useContext, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import MainForma from "./MainForma";
import DownloadExcelButton from "./components/DownloadObrazaca";
import AdminMainForma from "./components/AdminMainForma";

const MainApp = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [access_token, setAccessToken] = useState();
  const [role, setRole] = useState();

  // const onLoggin = (isLoggedIn) => {
  //   setLoggedIn(isLoggedIn);
  // };
  useEffect(() => {
    console.log("This is token from MainApp", access_token);
    setLoggedIn(localStorage.getItem("token"));
  }, []);

  return (
    <div>
      {loggedIn
      ? (
          role === 'ADMIN' ? (
              <AdminMainForma
                  access_token={access_token}
                  role={role}
              />
          ) : (
              <MainForma
                  access_token={access_token}
                  //setAccessToken={setAccessToken}
                  role={role}
                  loggedIn = {loggedIn}
                  setLoggedIn = {setLoggedIn}
              />
          )
      ) : (
          <LoginForm
              setLoggedIn={setLoggedIn}
              access_token={access_token}
              setAccessToken={setAccessToken}
              role={role}
              setRole={setRole}
              loggedIn={loggedIn}
          />
      )}
    </div>
  );
};
export default MainApp;
