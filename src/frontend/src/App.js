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





function App() {
    const { setAuth } = useContext(AuthContext);

    return(
    <main className="App">
        <LoginForm/>
    </main>
    );
}

export default App;