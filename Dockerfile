FROM node:16.15.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

run npm install

WORKDIR /usr/src/app/frontend

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend/ ./

RUN npm run build

WORKDIR /usr/src/app/backend

COPY ./backend/ ./

EXPOSE 5000

CMD ["npm", "run", "start"]