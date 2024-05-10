# J.P. Morgan Payments Swag Shop

We have created this sample showcase application to illustrate integration with the J.P. Morgan Online Payments API through a complete storefront application.
The project is developed using React JS/TS for the frontend and Node.js with Express for the backend.

## Architecture Overview

This application follows the classic client/server model:

- Client/Frontend: The React TS application presents the merchandise and manages the user interface.
- Server/Backend: An Express server handles API requests to the J.P. Morgan Online Payments API, authenticating via OAuth.

We have a React TS frontend application responsible for displaying our swag and handling the user experience.
We then have a Express backend application which will send the requests to our Online Payments API.
The backend sends requests to our API using OAuth authentication.

## Setup Instructions

The application comprises two parts: the client and the server.

### Client Setup

1. Create a .env file in the client directory with the following entries:

```
VITE_KEY="my_awesome_secure_key"
VITE_ASTEROIDS_URL="https://unicorn-payments-asteroids.azurewebsites.net/?"
```

2. Execute the following commands in your terminal:

```sh
cd client
yarn install
yarn start
```

### Server Setup

1. Run these commands in your command prompt:

```sh
cd server
yarn install
yarn start
```

## Deployment Strategy

We deploy the application using Docker, facilitated by docker-compose for multi-container management and Docker multi-stage builds for optimized image creation. Deployment targets Microsoft Azure Web App Service.

## Contribution

We welcome any contributions you have. Steps for contribution are:

1. If this is your first time contributing to JPMC codebases you will need to fill out our Contribution Licence Agreement (CLA). More information can be found at: https://github.com/jpmorgan-payments/.github/blob/main/CONTRIBUTING.md
2. Write your code and create a PR and we will review it
3. Your code will then be reviewed and merged if no issues are found.
