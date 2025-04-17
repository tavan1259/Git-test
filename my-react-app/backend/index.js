import dotenv from "dotenv";
import express from "express";
import cors from "cors"; // ✅ เพิ่ม cors
import oracledb from "oracledb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getConnection } from "./db.js";

dotenv.config();

const app = express();
app.use(cors()); // ✅ เปิดให้ frontend เข้าถึง API
app.use(express.json());

// POST /login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT PASSWORD FROM USERS WHERE USERNAME = :username`,
      [username],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    await conn.close();

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "ชื่อผู้ใช้ไม่ถูกต้อง" });
    }

    const hashedPassword = result.rows[0].PASSWORD;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "เข้าสู่ระบบสำเร็จ", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
  }
});

// POST /register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO USERS (USERNAME, PASSWORD) VALUES (:username, :password)`,
      [username, hashedPassword],
      { autoCommit: true }
    );
    await conn.close();

    res.json({ message: "สมัครสมาชิกสำเร็จ" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
});

// เริ่มเซิร์ฟเวอร์
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
