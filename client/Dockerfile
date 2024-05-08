# syntax=docker/dockerfile:1.4

FROM node:20-alpine  

ENV CI=true

WORKDIR /app/frontend
# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies with Yarn
RUN yarn install --frozen-lockfile

# Bundle app source inside Docker image
COPY . .

# Build the application for production with Yarn
RUN yarn build

# Expose port to the Docker host, so we can access it
# from the outside.
EXPOSE 4173

# When the container starts, nginx keeps running.
CMD [ "yarn","run", "preview", "--host", "0.0.0.0"]
