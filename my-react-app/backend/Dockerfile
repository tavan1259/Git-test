# 1. ใช้ Base Image ที่มี Oracle Instant Client ติดตั้งให้แล้ว
FROM gvenzl/oracle-client:21-slim

# 2. ติดตั้ง Node.js 18 (เพราะ Base Image มีแค่ OS + Oracle Client เท่านั้น)
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# 3. ตั้งโฟลเดอร์ทำงานเป็น /app
WORKDIR /app

# 4. ก๊อปไฟล์ package.json และ package-lock.json มาก่อน
COPY package*.json ./

# 5. ติดตั้ง npm dependencies (เช่น express, oracledb, jwt, bcrypt ฯลฯ)
RUN npm install

# 6. ก๊อปไฟล์โปรเจกต์ทั้งหมดเข้ามาใน container
COPY . .

# 7. เริ่มรัน backend (เหมือน npm start)
CMD ["npm", "start"]
