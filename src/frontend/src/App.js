import React, {useState, useContext} from "react";
import {Breadcrumb, Layout, Menu, theme, Image} from "antd";
import LoginForm from "./components/LoginForm";
import AuthContext from "./context/AuthProvider";
import RequiredAuth from "./components/RequiredAuth";
import MainForma from "./MainForma";
import {Routes, Route} from "react-router-dom";

function App() {
    const {setAuth} = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* public routes */}
                <Route path="/login" component={<LoginForm/>}/>

                {/* we want to protect these routes */}
                <Route component={<RequiredAuth/> /*allowedRoles={[ROLES.Admin]} */}>
                    <Route path="/" component={<MainForma/>}/>
                </Route>

                {/*    /!* catch all *!/*/}
                {/*    <Route path="*" element=/!*<Missing />*!/ />*/}
            </Route>
        </Routes>
    );
}

export default App;
