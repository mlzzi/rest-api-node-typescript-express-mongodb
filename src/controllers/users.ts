import express from 'express';

import { deleteUserById, getUsers, getUsersById } from '../db/users';

// Function to get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        // Retrieve all users from the database
        const users = await getUsers();

        // Respond with the list of users
        res.status(200).json(users);
        return;

    } catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad Request
        return;
    }
};

// Function to get a user by ID
export const getUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await getUsersById(id);
        if (!user) {
            res.sendStatus(404); // Not Found
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

// Function to delete a user by ID
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        // Delete the user with the specified ID
        const deleteUser = await deleteUserById(id);

        // Respond with the deleted user information
        res.json(deleteUser);
        return;

    } catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad Request
        return;
    }
}

// Function to update a user's username by ID
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        // Check if username is provided
        if (!username) {
            res.sendStatus(400); // Bad Request
            return;
        }

        // Retrieve the user by ID
        const user = await getUsersById(id);

        // Update the user's username
        user.username = username;
        await user.save();

        // Respond with the updated user information
        res.status(200).json(user).end();
        return;

    } catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad Request
        return;
    }
}