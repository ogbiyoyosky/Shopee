# We'll use the Node slim image as a base cos it's light and nice
FROM node:10-alpine

WORKDIR /usr/src/services/api

# Copy package.json & package-lock.json to the root of the api dir
COPY package*.json ./

# Create an .env file by copying the .env.production file
COPY .env.production .env

# Add node_modules to the envionmental path variable so we can run binaries easily
ENV PATH /usr/src/services/api/node_modules/.bin:$PATH

USER root

# Install the good ol' NPM modules and get Adonis CLI in the game
RUN npm install --no-optional

# We'll use PM2 as a process manager for our Node server
RUN npm i -g pm2

# Copy everything to the root of the API service docker volume, and expose port to the outside world
COPY --chown=node:node . .

# Let all incoming connections use the port below
EXPOSE 3333

CMD npm run pm2:start
