import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("🎉 สมัครสำเร็จ! ไปหน้าเข้าสู่ระบบ...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch {
      setMessage("⚠️ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  return (
    <div className="register-container" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>สมัครสมาชิก</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ชื่อผู้ใช้" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="รหัสผ่าน" />
      <button onClick={register}>สมัครสมาชิก</button>
      <p>{message}</p>
      <p>
        มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
      </p>
    </div>
  );
};

export default Register;
