import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* เพิ่มหน้าอื่นๆ ได้เช่น <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
