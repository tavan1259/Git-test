FROM ghcr.io/oracle/docker-images/instantclient:21.9

RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
