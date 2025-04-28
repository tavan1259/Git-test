FROM node:18-bullseye

RUN apt-get update && apt-get install -y libaio1 wget unzip

RUN mkdir -p /opt/oracle && \
    cd /opt/oracle && \
    wget https://github.com/tavan1259/Git-test/releases/download/v1.0.0/instantclient-basic-linux.x64-23.7.0.25.01.zip && \
    unzip instantclient-basic-linux.x64-23.7.0.25.01.zip && \
    rm instantclient-basic-linux.x64-23.7.0.25.01.zip && \
    ln -s /opt/oracle/instantclient_* /opt/oracle/instantclient && \
    echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
