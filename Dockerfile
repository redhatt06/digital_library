FROM node:16.15.1-alpine

WORKDIR /usr/src/app

ENV POSTGRES_HOST=postgres

COPY package*.json ./

run npm install

WORKDIR /usr/src/app/frontend

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend/ ./

RUN npm run build

WORKDIR /usr/src/app/backend

COPY ./backend/ ./

WORKDIR /usr/src/app

EXPOSE 5000

CMD ["npm", "run", "prod"]