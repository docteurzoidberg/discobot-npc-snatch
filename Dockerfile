FROM node:18-alpine

ARG BOT_TOKEN
ARG DISCORD_CLIENT_ID
ARG DISCORD_GUILD_ID

ENV LANG C.UTF-8
ENV EDITOR nano
ENV DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID
ENV DISCORD_GUILD_ID=$DISCORD_GUILD_ID
ENV BOT_TOKEN=$BOT_TOKEN
ENV DATA_PATH /data

RUN apk add dumb-init
RUN mkdir /data

# APP dir
WORKDIR /app

RUN npm install -g pino-pretty

# NODE_MODULES
COPY package*.json ./
RUN npm ci --omit=dev          

# APP
COPY . .

# REGISTER bot commands
RUN npm run register

# RUN
CMD ["dumb-init", "npm", "run", "start"]

