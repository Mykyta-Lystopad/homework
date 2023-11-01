FROM node:12

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install and update project dependencies
RUN npm install && npm audit fix

COPY . .

EXPOSE 4200

CMD ["npm", "start"]
