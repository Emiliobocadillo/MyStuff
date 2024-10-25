# MyStuff - Containerized MERN Stack Application


### Overview

This project is a fully containerized MERN (MongoDB, Express, React, Node.js) application. It allows users to sign up, log in, and manage their items. Docker and Docker Compose have been used to containerize the application, ensuring easy setup and portability.


### Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose


### How to Run the Application

To run the application:

1. Clone the repository and navigate to the project directory.
2. Ensure Docker Desktop is running.
3. Run the command `docker-compose up` to build and start the containers.
   - This will start the backend, frontend, and MongoDB.
4. The frontend will be available at [http://localhost:3000](http://localhost:3000).
5. The backend API will run at [http://localhost:5000](http://localhost:5000).
6. MongoDB will be accessible internally at `localhost:27017`.

To stop the application, use the `docker-compose down` command. This will stop and remove the running containers, but the data in MongoDB will persist since a Docker volume is being used.


### Project Structure

The project consists of two main parts: the backend and frontend. The backend is a Node.js Express server, and the frontend is built with React. Both parts are containerized, and the MongoDB database also runs in a separate container. The project structure is as follows:

- **backend**: Contains all server-side code and the Dockerfile for creating the backend container.
- **frontend**: Contains all client-side code and the Dockerfile for creating the frontend container.
- **docker-compose.yml**: Orchestrates the containers for the backend, frontend, and MongoDB.


### Environment Variables

The backend environment variables are stored in the `.env.docker` file and automatically used by Docker when building the backend service. This file includes the following variables:

```env
MONGO_URI=mongodb://mongo:27017/mystuffdb
NODE_ENV=production
PORT=5000
JWT_SECRET=your_jwt_secret_key

```


### Containerization Process

The application is containerized using **Docker**. Here's a breakdown of the containerization process and how each service is defined in the `docker-compose.yml` file:

- **Backend**:
  - The backend service is built from the Dockerfile located in the `backend` directory and it looks like this:

```
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

```
  - It runs the Node.js Express server, and exposes it on port `5000`.
  - Environment variables specific to the backend are stored in the `.env.docker` file, which is automatically loaded by Docker Compose.
  - The backend depends on MongoDB, meaning MongoDB must start before the backend can run.

- **Frontend**:
  - The frontend service is built from the Dockerfile in the `frontend` directory.
  - The frontend is a React application and is served on port `3000`.
  - The frontend depends on the backend, ensuring the backend starts before the frontend.

- **MongoDB**:
  - MongoDB runs as a service using the official MongoDB image (`mongo:5.0`).
  - It is exposed on port `27017` and uses a Docker volume (`mongo-data`) to persist data between container restarts, meaning that even if the MongoDB container is stopped, the data will not be lost.


### Docker Compose Configuration (`docker-compose.yml`)

The `docker-compose.yml` file orchestrates the setup and startup of all the services. Here's the configuration used:

```yaml
version: "3"

services:
    # Backend service
    backend:
        build: ./backend
        ports:
            - "5000:5000" # Exposing the backend on port 5000
        env_file:
            - ./backend/.env.docker # Pointing to the new .env.docker file for Docker use
        depends_on:
            - mongo # Ensures MongoDB starts before the backend

    # Frontend service
    frontend:
        build: ./frontend
        ports:
            - "3000:3000" # Exposing the frontend on port 3000
        depends_on:
            - backend # Ensures the backend starts before the frontend

    # MongoDB service
    mongo:
        image: mongo:5.0
        ports:
            - "27017:27017" # Exposing MongoDB on its default port
        volumes:
            - mongo-data:/data/db # Persisting MongoDB data

# Defining a persistent volume for MongoDB
volumes:
    mongo-data:
