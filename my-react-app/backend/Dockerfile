FROM node:18-bullseye

# ⬇️ ก๊อปไฟล์ zip เข้า container ก่อน
COPY instantclient-basic-linux.x64-23.7.0.25.01.zip /

# 🧱 ติดตั้ง lib และ unzip Oracle zip
RUN apt-get update && apt-get install -y \
    libaio1 unzip && \
    mkdir -p /opt/oracle && \
    unzip /instantclient-basic-linux.x64-23.7.0.25.01.zip -d /opt/oracle && \
    ln -s /opt/oracle/instantclient_* /opt/oracle/instantclient && \
    echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
