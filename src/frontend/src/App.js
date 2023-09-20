import React, { useState, useContext } from "react";
import { Breadcrumb, Layout, Menu, theme, Image } from "antd";
import LoginForm from "./components/LoginForm";

import { Routes, Route } from "react-router-dom";
import MainApp from "./MainApp";

function App() {
    return (
        <Routes>
            {/* Display LoginForm component when the route is /login */}
            <Route path="/login" element={<LoginForm />} />

            {/* Display MainApp component for all other routes */}
            <Route path="/*" element={<MainApp />} />
        </Routes>
    );
}

export default App;

