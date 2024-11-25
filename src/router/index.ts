import express from "express";

import authentication from "./authentication";
import users from './users';

// Create a new router instance
const router = express.Router();

// Export a function that sets up the routes
export default (): express.Router => {
    // Initialize authentication routes
    authentication(router);

    // Initialize user routes
    users(router);

    // Return the configured router
    return router;
}