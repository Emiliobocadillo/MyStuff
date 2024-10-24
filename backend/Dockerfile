# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your backend code to the container
COPY . .

# Expose port 5000 for your backend (or whichever port you're using)
EXPOSE 5000

# Start the server
CMD ["npm", "run", "start"]
