// Importing required modules
const express = require('express'); // Express.js for creating the server
const apiRoutes = require('./routes/apiRoutes'); // Custom module for API routes
const htmlRoutes = require('./routes/htmlRoutes'); // Custom module for HTML routes

// Initialize the Express app
const app = express();

// Define the port the server will run on, defaulting to 3001 if the environment doesn't provide one
const PORT = process.env.PORT || 3001;

// Configure Express middleware
app.use(express.json()); // Enable support for JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // Enable support for URL-encoded bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

// Define route handlers
app.use('/api', apiRoutes); // Handle all requests starting with '/api' using apiRoutes
app.use('/', htmlRoutes); // Handle all other requests using htmlRoutes

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
