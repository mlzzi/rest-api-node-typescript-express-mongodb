import express from "express";
import { get, merge } from 'lodash';

import { getUserBySessionToken } from "../db/users";

// Middleware to check if the current user is the owner of the resource
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        // If current user ID is not found in the request
        if (!currentUserId) {
            res.sendStatus(403); // Forbidden
            console.log("id")
            return;
        }

        // If the current user ID does not match the ID in the request parameters
        if (currentUserId.toString() !== id) {
            res.sendStatus(403); // Forbidden
            return;
        }

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad Request
        return;
    }
};

// Middleware to check if the user is authenticated
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['DEFAULT-AUTH'];

        // If session token is not found in the cookies
        if (!sessionToken) {
            res.sendStatus(403); // Forbidden
            return;
        }

        // Retrieve user by session token
        const existingUser = await getUserBySessionToken(sessionToken);

        // If user with the session token does not exist
        if (!existingUser) {
            res.sendStatus(403); // Forbidden
            return;
        }

        // Merge the user identity into the request object
        merge(req, { identity: existingUser });

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad Request
        return;
    }
}