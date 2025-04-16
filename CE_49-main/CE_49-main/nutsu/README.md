docker build --progress=plain --no-cache -t car-frontend .

docker run -d -p 3003:5173 car-frontend
