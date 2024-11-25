import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, require: true }, // Username field, required
    email: { type: String, require: true }, // Email field, required
    authentication: {
        password: { type: String, require: true, select: false }, // Password field, required, not selected by default
        salt: { type: String, select: false }, // Salt field, not selected by default
        sessionToken: { type: String, select: false }, // Session token field, not selected by default
    },
});

// Create the User model from the schema
export const UserModel = mongoose.model('User', UserSchema);

// Function to get all users
export const getUsers = () => UserModel.find();

// Function to get a user by email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// Function to get a user by session token
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});

// Function to get a user by ID
export const getUsersById = (id: string) => UserModel.findById(id);

// Function to create a new user
export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject());

// Function to delete a user by ID
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

// Function to update a user by ID
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);