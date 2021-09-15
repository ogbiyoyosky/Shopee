<<<<<<< HEAD
FROM node:10-alpine

WORKDIR /usr/app

COPY package*.json ./

# ENV PATH /usr/app/node_modules/.bin:$PATH

USER root

RUN npm i

RUN npm i -g pm2

COPY --chown=node:node . .

COPY ./.env ./.env

#RUN source .env

RUN node ace migration:run -f

RUN node ace seed

# ENV DOCKERIZE_VERSION v0.6.0
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCK

CMD ["npm", "start"]
=======
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
>>>>>>> 50266d1f5adf26e8af23fec6a6933bfd95965561
