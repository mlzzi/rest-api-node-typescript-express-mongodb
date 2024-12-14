# REST API Project

This is a REST API project that allows you to create, read, update, and delete data. The application was developed using Node.js with Express and MongoDB for data management.

## Features

- **Authentication**: Authentication middleware using cookies.
- **Routing**: Routes to manage users, products, and shopping cart.
- **Database**: MongoDB connection for data persistence.
- **Encryption**: Creation of password hashes using HMAC and SHA256.

### Prerequisites

- **Node.js**: The API was developed using Node.js. Download the latest version at [nodejs.org](https://nodejs.org/).
- **MongoDB**: The API uses MongoDB. If you don’t have a local MongoDB instance, you can use MongoDB Atlas to create a cloud database.

## Endpoints

### Users

- **GET /users**: Returns all users.
- **GET /users/:id**: Returns a specific user by ID.
- **DELETE /users/:id**: Deletes a user by ID.
- **PATCH /users/:id**: Updates a user by ID.

### Products

- **GET /products**: Returns all products.
- **GET /products/:id**: Returns a specific product by ID.

### Shopping Cart

- **GET /cart**: Returns all products in the cart.
- **GET /cart/:id**: Returns a specific product from the cart.
- **POST /cart/:id**: Adds a product to the cart.
- **DELETE /cart/:id**: Removes a product from the cart.

## Authentication

Authentication is performed through a token stored in cookies. The `isAuthenticated` middleware checks for the presence of the token and validates whether the user is authenticated before allowing access to the endpoints.

### Session Management

To authenticate the user, the system generates a session token and stores it in a cookie called `DEFAULT-AUTH`. This cookie is used to identify the user in subsequent sessions.

## Development

- **Express**: Framework for building the API.
- **MongoDB**: NoSQL database for storing user, product, and cart data.
- **Middleware**: Authentication and authorization middlewares.
- **Axios**: HTTP request library.