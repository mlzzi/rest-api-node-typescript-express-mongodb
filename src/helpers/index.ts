import crypto from 'crypto';

// Secret key used in the HMAC algorithm
const SECRET = 'MLZ-REST-API';

// Function to generate a random string
export const random = () => crypto.randomBytes(128).toString('base64');

// Function to create an authentication hash using salt and password
export const authentication = (salt: string, password: string) => {
    // Create HMAC using SHA-256, combining salt and password, and update with the secret key
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};