# MyStuff - Containerized MERN Stack with TypeScript

### Overview

This project is a fully containerized MERN (MongoDB, Express, React, Node.js) application built with TypeScript. The app allows users to log in and manage their items. Docker and Docker Compose have been used to containerize the application, ensuring easy setup and portability.

### Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose

### Project Structure

The project consists of two main parts: the backend and frontend. The backend is a Node.js Express server with TypeScript, and the frontend is built with React and TypeScript. Both parts are containerized, and the MongoDB database runs in a separate container. The project structure is as follows:

- **backend**: Contains all server-side code and the Dockerfile for creating the backend container.
- **frontend**: Contains all client-side code and the Dockerfile for creating the frontend container.
- **docker-compose.yml**: Orchestrates the containers for the backend, frontend, and MongoDB.

### How to Run the Application

To run the application:

1. Clone the repository and navigate to the project directory.
2. Run the command `docker-compose up` to build and start the containers.
   - This will start the backend, frontend, and MongoDB.
3. The frontend will be available at [http://localhost:3000](http://localhost:3000).
4. The backend API will run at [http://localhost:5000](http://localhost:5000).
5. MongoDB will be accessible internally at `localhost:27017`.

To stop the application, use the `docker-compose down` command. This will stop and remove the running containers, but the data in MongoDB will persist since a Docker volume is being used.

### Environment Variables

The backend requires environment variables, which should be placed in a `.env` file within the `backend` folder. Example variables include:

```env
MONGO_URL=mongodb://mongo:27017/mystuffdb
NODE_ENV=production
PORT=5000
JWT_SECRET=your_jwt_secret_key

