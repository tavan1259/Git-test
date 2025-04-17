import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {

return (
    <div className="home-container">
        <h1>ยินดีต้อนรับสู่หน้าแรก</h1>
        <p>นี่คือเนื้อหาหลักของแอปพลิเคชันของคุณ</p>
        <p>
        กลับสู่หน้าแรก <Link to="/login">ออก</Link>
        </p>
    </div>
    );
    };
export default Home;