# Use a Node.js base image for frontend
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your frontend code to the container
COPY . .

# Build the frontend for production
RUN npm run build

# Install a lightweight web server to serve static files (you can use nginx)
RUN npm install -g serve

# Expose port 3000 (or your frontend port)
EXPOSE 3000

# Serve the build folder
CMD ["serve", "-s", "dist"]
