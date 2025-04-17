import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/Register";
import Home from "./pages/main/home/home"; // นำเข้า Home component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} /> {/* เพิ่ม Home component ที่นี่ */}
        
        {/* เพิ่มหน้าอื่นๆ ได้เช่น <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
