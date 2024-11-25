This project is a user authentication and management API built with Node.js, Express, and MongoDB. It provides endpoints for user registration, login, and management. The API includes features such as:

User Registration: Allows new users to create an account by providing an email, password, and username.
User Login: Authenticates users by verifying their email and password, and generates a session token for maintaining user sessions.
User Management: Provides endpoints to get all users, delete a user by ID, and update a user's username. These actions require the user to be authenticated and, in some cases, to be the owner of the account being modified.
The project uses middleware to handle authentication and authorization, ensuring that only authenticated users can access certain endpoints and that users can only modify their own data. It also connects to a MongoDB database to store user information securely.

Based on Youtube Tutorial: https://www.youtube.com/watch?v=b8ZUb_Okxro
