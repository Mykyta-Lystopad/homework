# Stage 1: Build the Angular app

FRO node:16 as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the Angular app using NGINX
FROM nginx:1.21

# Remove default NGINX website
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Angular app from the first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port on which NGINX will run
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
