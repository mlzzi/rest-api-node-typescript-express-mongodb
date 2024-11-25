# Project Architecture Overview

This project is a user authentication and management API built with Node.js, Express, and MongoDB. Below is an explanation of the project's architecture, the role of each component, and how Express fits into the overall structure.

## Project Structure

The project is organized into several key components:

1. **Controllers**: Handle the business logic for each route. Examples include authentication controllers (`login`, `register`) and user controllers (`getAllUsers`, `deleteUser`, `updateUser`).

2. **Middlewares**: Functions that process requests before they reach the controllers. Examples include `isAuthenticated` and `isOwner`, which check if the user is authenticated and if they own the resource.

3. **Models**: Define the data structure and interact with the MongoDB database. For instance, the `UserModel` defines the user schema.

4. **Helpers**: Utility functions that perform common tasks, such as generating password hashes (`authentication`) and random strings (`random`).

5. **Routes**: Define the API endpoints and associate each route with a specific controller. For example, authentication and user routes.

6. **Server**: Configures and starts the Express server, sets up global middlewares (like `bodyParser`, `cookieParser`, `compression`, `cors`), and connects to the MongoDB database.

## Best Practices

The project follows several best practices:

- **Modularity**: Separation of concerns into different modules (controllers, middlewares, models, helpers) makes the codebase easier to maintain and scale.
- **Middleware Usage**: Using middlewares for authentication and authorization enhances security and code organization.
- **Centralized Configuration**: Server configuration and database connection are centralized, making them easier to manage and modify.
- **Promises with Mongoose**: Using Promises with Mongoose improves asynchronous handling and code readability.

## Component Roles

- **Controllers**: Implement business logic and handle HTTP requests.
- **Middlewares**: Process requests before they reach the controllers, adding layers of security and validation.
- **Models**: Define data structures and provide methods to interact with the database.
- **Helpers**: Provide utility functions used throughout the project.
- **Routes**: Map API endpoints to their corresponding controllers.
- **Server**: Configures the Express server, applies global middlewares, and starts the application.

## How Express Fits In

Express is the web framework that serves as the foundation of the application. It simplifies the creation of routes, the application of middlewares, and the management of HTTP requests and responses. In this project, Express is used to:

- **Define Routes**: Routes are defined using the Express Router, organizing the API endpoints.
- **Apply Middlewares**: Global middlewares (such as `bodyParser`, `cookieParser`, `compression`, `cors`) are applied to process all incoming requests.
- **Start the Server**: The Express server is configured to listen on a specific port, making the API accessible.

### Based on Youtube Tutorial: https://www.youtube.com/watch?v=b8ZUb_Okxro
