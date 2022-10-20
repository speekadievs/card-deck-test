FROM node:16-alpine

RUN apk add --update --no-cache libc6-compat
RUN apk add --no-cache python3 py3-pip git make g++

RUN npm install pm2 -g
RUN mkdir -p /app/tmp

WORKDIR /app

COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy source files
COPY . /app

# Build the app
RUN npm run build

CMD /bin/sh -c "node ace migration:run --force && pm2-runtime build/server.js"
