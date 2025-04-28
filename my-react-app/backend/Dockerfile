# 1. เริ่มจากเอา Node.js 18 บน Debian Bullseye มาเป็น base image
FROM node:18-bullseye

# 2. ติดตั้ง dependency ที่จำเป็นสำหรับ Oracle Instant Client
RUN apt-get update && apt-get install -y libaio1 wget unzip

# 3. ดาวน์โหลด Oracle Instant Client เวอร์ชัน 23.7 แบบ Basiclite
RUN mkdir -p /opt/oracle && \
    cd /opt/oracle && \
    wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linux.x64-23.7.0.0.0dbru.zip && \
    unzip instantclient-basiclite-linux.x64-23.7.0.0.0dbru.zip && \
    rm instantclient-basiclite-linux.x64-23.7.0.0.0dbru.zip && \
    ln -s /opt/oracle/instantclient_* /opt/oracle/instantclient && \
    echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig

# 4. ตั้งโฟลเดอร์ทำงานใน container เป็น /app
WORKDIR /app

# 5. คัดลอกไฟล์ package.json และ package-lock.json เข้าไปก่อน
COPY package*.json ./

# 6. ติดตั้ง npm packages ที่ backend ใช้
RUN npm install

# 7. คัดลอกไฟล์ source code ทั้งหมด (index.js, db.js ฯลฯ) เข้า container
COPY . .

# 8. รันคำสั่งเริ่ม server (เหมือน npm start ในเครื่องคุณ)
CMD ["npm", "start"]
