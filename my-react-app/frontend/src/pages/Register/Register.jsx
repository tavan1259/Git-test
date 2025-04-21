import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

import ReCAPTCHA from "react-google-recaptcha";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const [captchaToken, setCaptchaToken] = useState(null);
  const register = async (e) => {
    e.preventDefault(); // ⛔ ป้องกัน form reload หน้า
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
      <form onSubmit= {register}>
      <input 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        onKeyDown={(e) => {
          if (e.key === "Enter"){
            e.preventDefault();
            document.getElementById("passwordField").focus();
          }
        }}
        placeholder="ชื่อผู้ใช้" 
      />
      <input 
        id="passwordField"
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="รหัสผ่าน" 
      />
      <button type="submit">สมัครสมาชิก</button>
      
      <p>{message}</p>
      </form>
      <p>
        มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
      </p>
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // ทดสอบ local
        onChange={(token) => setCaptchaToken(token)}
      />
    </div>
  );
};

export default Register;
