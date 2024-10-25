# MyStuff - Containerized MERN Stack Application

### Overview

This project is a fully containerized MERN (MongoDB, Express, React, Node.js) application. It allows users to sign up, log in, and manage their items. Docker and Docker Compose have been used to containerize the application, ensuring easy setup and portability.

### Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose

### Project Structure

The project consists of two main parts: the backend and frontend. The backend is a Node.js Express server, and the frontend is built with React. Both parts are containerized, and the MongoDB database also runs in a separate container. The project structure is as follows:

- **backend**: Contains all server-side code and the Dockerfile for creating the backend container.
- **frontend**: Contains all client-side code and the Dockerfile for creating the frontend container.
- **docker-compose.yml**: Orchestrates the containers for the backend, frontend, and MongoDB.

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

### Environment Variables

The backend environment variables are stored in the `.env.docker` file and automatically used by Docker when building the backend service. This file includes variables such as:

```env
MONGO_URI=mongodb://mongo:27017/mystuffdb
NODE_ENV=production
PORT=5000
JWT_SECRET=your_jwt_secret_key


To stop the application, use the docker-compose down command. This will stop and remove the running containers, but the data in MongoDB will persist since a Docker volume is being used.
