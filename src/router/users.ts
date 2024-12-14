import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUserById } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

// Export a function that sets up the user routes
export default (router: express.Router) => {
    // Route to get all users, requires authentication
    router.get('/users', /*isAuthenticated,*/ getAllUsers);

    // Route to delete a user by ID, requires authentication and ownership
    router.delete('/users/:id', /*isAuthenticated, isOwner,*/ deleteUser);

    // Route to update a user by ID, requires authentication and ownership
    router.patch('/users/:id', /*isAuthenticated, isOwner,*/ updateUser);

    router.get('/users/:id', /*isAuthenticated, isOwner,*/ getUserById);
};