FROM node:9

ENV PORT 8082
WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install
COPY ./ /app/

CMD PORT=$PORT node server.js

EXPOSE $PORT