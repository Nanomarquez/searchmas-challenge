# API Project

This project is an API built with Node.js, Express, TypeScript, and PostgreSQL, packaged with Docker.

## Requirements

- Docker
- Docker Compose
- Node.js
- PostgreSQL
- Git
- TypeScript

## Installation and Setup

Follow these steps to get the project up and running:

1. Clone the repository to your local machine. `git clone https://github.com/Nanomarquez/searchmas-challenge.git`
2. Open a terminal in the project directory.
3. Run `docker-compose up --build` to start the Docker services.
4. Run `npm install` to install the project dependencies.
5. Run `npm run dev` to start the development server.
6. Open a new terminal and run `curl http://localhost:3000/api/get-users` to verify the API is working correctly.

## API Documentation

The API documentation can be accessed at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## API Configuration

To configure the API, create a `.env` file in the root of the project and add the following environment variables:

- `POSTGRES_HOST`: The PostgreSQL database host.
- `POSTGRES_PORT`: The PostgreSQL database port.
- `POSTGRES_USER`: The PostgreSQL database username.
- `POSTGRES_PASSWORD`: The PostgreSQL database password.
- `POSTGRES_DB`: The name of the PostgreSQL database.
- `EXTERNAL_API_URL`: The URL of the external API to fetch user data from.

## Contributions

We welcome contributions to the project! You can contribute in several ways:

- Reporting bugs or suggesting improvements in the documentation.
- Developing new features or enhancing existing ones.
- Fixing issues in the source code.
