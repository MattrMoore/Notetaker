// Importing required modules
const router = require('express').Router(); // Express router for defining the routes
const store = require('../db/store'); // Custom module for interacting with the notes datastore

// Define GET route for retrieving all notes
router.get('/notes', (req, res) => {
  store
    .getNotes() // Call the getNotes method from the store module
    .then((notes) => {
      return res.json(notes); // Send the notes data as a response
    })
    .catch((err) => res.status(500).json(err)); // In case of any error, send the error as a response with a 500 status code
});

// Define POST route for creating a new note
router.post('/notes', (req, res) => {
  store
    .addNote(req.body) // Call the addNote method from the store module with the request body as parameter
    .then((note) => res.json(note)) // Send the newly created note data as a response
    .catch((err) => res.status(500).json(err)); // In case of any error, send the error as a response with a 500 status code
});

// Define DELETE route for deleting a note by id
router.delete('/notes/:id', (req, res) => {
  store
    .removeNote(req.params.id) // Call the removeNote method from the store module with the id from the route parameters
    .then(() => res.json({ ok: true })) // If the note was successfully deleted, respond with a JSON object indicating success
    .catch((err) => res.status(500).json(err)); // In case of any error, send the error as a response with a 500 status code
});

// Export the router so it can be used by other modules
module.exports = router;
