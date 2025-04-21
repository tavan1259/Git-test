import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // นำเข้า CSS สำหรับหน้า Login

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault(); // ⛔ ป้องกัน form reload หน้า

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch {
      setMessage("⚠️ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  return (
    <div className="login-container" tyle={{ maxWidth: "400px", margin: "auto" }}>
      <h2>เข้าสู่ระบบ</h2>

      <form onSubmit={login}> {/* ✅ ครอบ input/button ด้วย form */}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // ⛔ ป้องกัน form reload หน้า
              document.getElementById("passwordField").focus(); // ⛔ ข้ามไปที่ input ถัดไป
            }
          }}
          placeholder="ชื่อผู้ใช้"
        />
        <input
          id="passwordField" // ⛔ ตั้ง id เพื่อให้ focus ได้
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="รหัสผ่าน"
        />
        <button type="submit">เข้าสู่ระบบ</button> {/* ✅ ต้องใช้ type="submit" */}
      </form>

      <p>{message}</p>
      <p>
        ยังไม่มีบัญชี? <a href="/register">สมัครสมาชิก</a> {/* ✅ ใช้ <a> แทน <Link> */}
      </p>
    </div>
  );
};

export default Login;
