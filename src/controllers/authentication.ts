import express, { response } from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

// Login function
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            res.sendStatus(400); // Bad Request
            return;
        }

        // Retrieve user by email and include authentication fields
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        // If user is not found
        if (!user) {
            res.sendStatus(400); // Bad Request
            return;
        }

        // Generate expected hash using the provided password and stored salt
        const expectedHash = authentication(user.authentication.salt, password);

        // Compare the provided password hash with the stored password hash
        if (user.authentication.password !== expectedHash) {
            res.sendStatus(403); // Forbidden
            return;
        }

        // Generate a new session token
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user.id.toString());

        // Save the updated user with the new session token
        await user.save();

        // Set the session token as a cookie
        res.cookie('MURILO-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        // Respond with the user object
        res.status(200).json(user).end();
        return;

    } catch (error) {
        console.log(error);
        res.sendStatus(400); // Bad Request
        return;
    }
};

// Register function
export const register = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { email, password, username } = req.body;

        // Check if email, password, and username are provided
        if (!email || !password || !username) {
            res.sendStatus(400); // Bad Request
            return;
        }

        // Check if a user with the provided email already exists
        const existingUser = await getUserByEmail(email);

        // If user already exists
        if (existingUser) {
            res.sendStatus(400); // Bad Request
            return;
        }

        // Generate a salt and hash the password
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });

        // Respond with the newly created user object
        res.status(200).json(user).end();
        return;

    } catch (error) {
        console.log('error', error);
        res.sendStatus(400); // Bad Request
        return;
    }
};