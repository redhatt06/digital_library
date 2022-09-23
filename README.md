# Digital Library Management

Simple digital library app built with React in the front-end, Express in the backend and PostgreSQL database.

# Prerequisites

## Docker
If you have [Docker](https://www.docker.com "Docker Homepage") installed you do not need to install anything else.
## NodeJS, PostgreSQL
Otherwise, you must have [NodeJS](https://nodejs.org "NodeJS Homepage") and [PostgreSQL](https://www.postgresql.org/download/ "Postgres Downloads") installed on your machine.

# Configuration

## .env
Create a .env file in the root directory and enter the following environment variables.
```
PORT=<Express listening PORT> //Defaults to 5000
POSTGRES_DB_NAME=<Database name>
POSTGRES_USERNAME=<Database Username>
POSTGRES_PASSWORD=<Database Password>
JWT_SECRET=<Some random string for JWT Token seed>
```
## docker-compose.yml
If you are using docker, you need to configure Postgres environment variables before building the containers.
```
enviorenment:
  POSTGRES_DB_NAME=<Database name>
  POSTGRES_USERNAME=<Database Username>
  POSTGRES_PASSWORD=<Database Password>
```
# Getting Started

## Docker
The following command will build both the Postgres and NodeJS containers and start running the server on localhost:5000
```
docker compose up
```

## NPM
The following command installs all dependencies and builds the app and starts serving on localhost:5000??????????????????????????????
```javascript
npm run serve
```

# Software Architecture
asdasdas
