import express from "express";

import authentication from "./authentication";
import users from './users';
import products from "./products";
import cart from "./cart";

// Create a new router instance
const router = express.Router();

// Export a function that sets up the routes
export default (): express.Router => {
    // Initialize authentication routes
    authentication(router);

    // Initialize user routes
    users(router);

    products(router);

    // Initialize cart routes
    cart(router);

    // Return the configured router
    return router;
}