# 📦 ขั้นตอนที่ 1: ใช้ Node.js ในการ build Vite project
FROM node:18 AS builder

# 📁 สร้างโฟลเดอร์ทำงาน
WORKDIR /app

# 📄 ก๊อปไฟล์แพ็กเกจเข้ามาและติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# 📂 ก๊อป source code ทั้งหมดเข้ามา
COPY . .

# ⚙️ สั่ง build frontend → จะได้โฟลเดอร์ dist/
RUN npm run build

# ----------------------------------------------------------------

# 🌐 ขั้นตอนที่ 2: ใช้ nginx serve frontend แบบ production
FROM nginx:stable-alpine

# 🧹 ลบ default config ที่ nginx ให้มา
RUN rm -rf /usr/share/nginx/html/*

# 📂 คัดลอกไฟล์ build มาไว้ที่ nginx serve
COPY --from=builder /app/dist /usr/share/nginx/html

# ⚙️ คัดลอกไฟล์ config nginx (หากคุณมีแบบ custom)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 🌍 เปิดพอร์ต 80
EXPOSE 80

# ▶️ คำสั่งเริ่ม nginx
CMD ["nginx", "-g", "daemon off;"]
