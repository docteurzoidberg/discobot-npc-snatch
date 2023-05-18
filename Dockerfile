FROM node:18-alpine3.17

RUN npm install -g typescript pnpm

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

# NODE_MODULES
COPY package*.json ./
COPY pnpm-lock.yaml ./ 
RUN pnpm install --frozen-lockfile  

# APP
COPY . .

RUN pnpm build

# REGISTER bot commands
RUN pnpm register

# RUN
CMD ["dumb-init", "pnpm", "start"]

