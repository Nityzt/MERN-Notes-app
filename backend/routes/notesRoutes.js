const express = require('express');
const { getNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/notesController.js');

const router = express.Router();

router.get('/', getNotes); // Get all notes
router.get('/:id', getNote); // Get a single note by ID
router.post('/', createNote); // Create a new note
router.put('/:id', updateNote); // Update a note by ID
router.delete('/:id', deleteNote); // Delete a note by ID


module.exports = router;
