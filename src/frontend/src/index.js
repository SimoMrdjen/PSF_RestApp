import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import App1 from "./App1";
import {AuthProvider} from './context/AuthProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App2 from "./App2";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App2/>
        //<BrowserRouter>
        // <AuthProvider>
        // <Routes>
        // <Route path="/*" element={<App/>}/>
        // </Routes>
        // </AuthProvider>
        // </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
