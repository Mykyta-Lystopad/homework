# Dockerfile for the main application
FROM node:12

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install and update project dependencies
RUN npm install && npm audit fix

COPY . .

EXPOSE 4200

CMD ["npm", "start"]

# Dockerfile for the container with linting error

# FROM ubuntu:latest
# RUN apt-get update
# RUN apt-get install -y curl
# RUN apt-get update && apt-get install -y curl
# RUN echo "hello world" | grep "world" | wc -l
# CMD ["echo", "Hello, world!"]