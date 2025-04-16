docker build --progress=plain -t car-backend .

docker run -d -p 3002:3001 car-backend
