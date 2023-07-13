import React, { useState, useContext} from 'react';
import * as XLSX from 'xlsx'
import logo from './APV.png';
import { saveObrazac5} from "./client";
import { Breadcrumb, Layout, Menu, theme , Image} from 'antd';
import Data from './components/Data';
import ObrazacIOButton from './components/ObrazacIOButton';
import LoginForm from './LoginForm';
import Login from './Login';
import AuthContext from "./context/AuthProvider";
import RequiredAuth from './components/RequiredAuth';
import App1 from "./App1";
import { Routes, Route } from 'react-router-dom';




const App2 = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [access_token, setAccessToken] = useState();

    const handleLogin = (isLoggedIn) => {
        setLoggedIn(isLoggedIn);
    };


    return (
        <div>
            {loggedIn ? (
                <App1
                access_token={access_token}
                //setAccessToken = {setAccessToken}
                />
            ) : (
                <LoginForm onLogin={handleLogin}
                           access_token = {access_token}
                           setAccessToken = {setAccessToken}
                />
            )}
        </div>
    );
};
export default App2;