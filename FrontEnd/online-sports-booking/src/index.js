import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Admin/Dashboard';
import Booking from './Components/Booking';


const root = ReactDOM.createRoot(document.getElementById('root'));

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/addSlot" element={<Booking/>} />
      </Routes>
    </Router>
  );
}

root.render(
  <>
    <Routing />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
