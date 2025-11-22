import React from "react";
import { Routes, Route } from "react-router-dom";
import EmailVerify from "./pages/EmailVerify";
import Login from "./pages/login";
import Home from "./pages/home";
import ResetPass from "./pages/ResetPass";
import { ToastContainer} from 'react-toastify';


const App = () => {
  return (
    <div>
      <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>}/>

      <Route path="/login" element={<Login/>}/>
      <Route path="/email-verify" element={<EmailVerify/>}/>
      
      <Route path="/reset-password" element={<ResetPass/>}/>
  
    </Routes>
    </div>
  );
};

export default App;
