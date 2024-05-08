FROM node:21

# Working directory for the server application
WORKDIR /app/server

# Copy package.json and lockfile
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy server source code
COPY . .

# Expose port for the server (adjust if needed)
EXPOSE 8081  

# Start the server using a script (adjust based on your project)
CMD [ "yarn", "start"]
