import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"; // นำเข้า CSS สำหรับการจัดรูปแบบ

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("✅ เข้าสู่ระบบสำเร็จ");
        navigate("/home"); // ไปหน้าหลักหลัง login
      } else {
        setMessage("❌ " + data.message);
      }
    } catch {
      setMessage("⚠️ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  return (
    <div className ="login-container">
      <h2>เข้าสู่ระบบ</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ชื่อผู้ใช้" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="รหัสผ่าน" />
      <button onClick={login}>เข้าสู่ระบบ</button>
      <p>{message}</p>
      <p>
        ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
      </p>
    </div>
  );
};

export default Login;
