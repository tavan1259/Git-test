# 1. ใช้ Node.js 18 บน Debian Bullseye เป็นฐาน
FROM node:18-bullseye

# 2. ติดตั้ง libaio1 (Oracle ต้องใช้) และ wget, unzip (ไว้โหลดและแตกไฟล์ zip)
RUN apt-get update && apt-get install -y libaio1 wget unzip

# 3. ดาวน์โหลด Oracle Instant Client 21.9 แบบ BasicLite
RUN mkdir -p /opt/oracle && \
    cd /opt/oracle && \
    wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linux.x64-21.9.0.0.0dbru.zip && \
    unzip instantclient-basiclite-linux.x64-21.9.0.0.0dbru.zip && \
    rm instantclient-basiclite-linux.x64-21.9.0.0.0dbru.zip && \
    ln -s /opt/oracle/instantclient_* /opt/oracle/instantclient && \
    echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig

# 4. ตั้งโฟลเดอร์ทำงาน
WORKDIR /app

# 5. ก๊อปไฟล์ package.json และ package-lock.json มาก่อน
COPY package*.json ./

# 6. ติดตั้ง npm packages
RUN npm install

# 7. ก๊อปไฟล์ทั้งหมดเข้า container
COPY . .

# 8. รัน Backend
CMD ["npm", "start"]
