---
description: You can use Docker to launch your app in a container!
---

# Docker

## Using Docker

To streamline the deployment of your bot created with the bot.ts framework, you can use Docker. Docker allows you to encapsulate your application within a lightweight, portable container. The `Dockerfile` provided below sets up the necessary environment to run your bot. It uses a Node.js base image, copies your application files into the container, installs the dependencies, and configures the container to start your bot. To launch the Docker container, navigate to the directory containing your `Dockerfile` and execute the command `docker build -t <bot_name> .` to build the image, followed by `docker run -d <bot_name>` to run the container.

```docker
FROM oven/bun:latest

WORKDIR /app

COPY package.json .

RUN bun install

COPY . .

# Rebuild les dépendances natives
RUN bun run rebuild sqlite3 || true

CMD ["bun", "run", "start"]
```

### With Node container

```docker
FROM node:lts

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Rebuild native dependencies
RUN npm rebuild sqlite3 || true

CMD ["npm", "run", "start"]
```

## Using Docker Compose

For more advanced configurations and to manage your containers easily, you can use Docker Compose. The `compose.yml` file below demonstrates how to define and run your bot service. This setup automatically rebuilds and restarts the bot container if needed. Additionally, it mounts the `./data` directory from your host machine to `/data` in the container, ensuring your SQLite data is persistently stored and accessible. You can back up or access your SQLite data by navigating to the `./data` directory on your host machine.

```yaml
services:
  bot:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ${BOT_NAME}
    restart: always
    volumes:
      - ./data:/data
```

To start your bot with Docker Compose, simply run `docker-compose up -d` in the directory containing your `compose.yml` file. This will build and start the bot container in detached mode. If you need to back up your SQLite data, you can find it in the `./data` directory on your host machine.
