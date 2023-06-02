// Importing required modules
const path = require('path'); // Node.js path module for handling and transforming file paths
const router = require('express').Router(); // Express router for defining the routes

// Define GET route for '/notes' endpoint
router.get('/notes', (req, res) => {
  // Send the notes.html file located in the 'public' directory as a response
  // path.join is used here to ensure the file path is correctly formed regardless of the operating system
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Define GET route for all other endpoints (indicated by '*')
router.get('*', (req, res) => {
  // Send the index.html file located in the 'public' directory as a response for any other route
  // This acts as a catch-all route for the application
  // path.join is used here to ensure the file path is correctly formed regardless of the operating system
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Export the router so it can be used by other modules
module.exports = router;
