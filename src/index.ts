import express, { Router } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';

// Create an instance of the Express application
const app = express();

// Port
const PORT = "8080"

// Enable CORS with credentials
app.use(cors({
    credentials: true,
}));

// Use compression middleware to gzip responses
app.use(compression());

// Use cookie parser middleware to parse cookies
app.use(cookieParser());

// Use body parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Create an HTTP server with the Express app
const server = http.createServer(app);

// Start the server and listen on port 8000
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
});

// MongoDB connection URL
const MONGO_URL = '' // Insert MongoDB URL

// Set mongoose to use JavaScript Promises
mongoose.Promise = Promise;

// Connect to MongoDB using mongoose
mongoose.connect(MONGO_URL);

// Log any connection errors
mongoose.connection.on('error', (error: Error) => console.log(error));

// Use the router for all routes starting with '/'
app.use('/', router());