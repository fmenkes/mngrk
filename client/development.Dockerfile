FROM node:8.16.0-alpine

COPY package.json package-lock.json /usr/src/app/

WORKDIR /usr/src/app
RUN npm ci
