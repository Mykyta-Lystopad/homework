FROM node:12

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

RUN npm audit fix

COPY . .

EXPOSE 4200

CMD ["npm", "start"]
