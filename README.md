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
2. Create a `.env` file inside the `backend` directory with the following content:
   ```env
   MONGO_URI=mongodb://mongo:27017/mystuffdb
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
