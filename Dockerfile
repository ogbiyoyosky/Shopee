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
