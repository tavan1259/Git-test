import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ เข้าสู่ระบบสำเร็จ");
        localStorage.setItem("token", data.token); // เก็บ token ไว้ใช้งานภายหลัง
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("⚠️ เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>เข้าสู่ระบบ</h2>
      <input
        type="text"
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleLogin}>เข้าสู่ระบบ</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
