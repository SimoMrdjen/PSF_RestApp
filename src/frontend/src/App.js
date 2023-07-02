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




function App() {
    const { setAuth } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<LoginForm />} />
                {/*<Route path="register" element={<Register />} />*/}
                {/*<Route path="linkpage" element={<LinkPage />} />*/}
                {/*<Route path="unauthorized" element={<Unauthorized />} />*/}

                {/* we want to protect these routes */}
                <Route element={<RequiredAuth/> /*allowedRoles={[ROLES.Admin]} */}>
                    <Route path="/" element={<App1 />} />
                </Route>

            {/*<Route element={<RequiredAuth/> /*allowedRoles={[ROLES.Admin]} *!/>*/}
            {/*        <Route path="editor" element=/!*<Editor />*!/ />*/}
            {/*    </Route>*/}


            {/*    <Route element={<RequiredAuth/> /*allowedRoles={[ROLES.Admin]} *!/>*/}
            {/*        <Route path="admin" element=/!*<Admin />*!/ />*/}
            {/*    </Route>*/}

            {/*    <Route element={<RequiredAuth/> /*allowedRoles={[ROLES.Admin]} *!/>*/}
            {/*        <Route path="lounge" element=/!*<Lounge />*!/ />*/}
            {/*    </Route>*/}

            {/*    /!* catch all *!/*/}
            {/*    <Route path="*" element=/!*<Missing />*!/ />*/}
            </Route>
        </Routes>
    );
}

export default App;