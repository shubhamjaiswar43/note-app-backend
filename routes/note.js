const express = require('express');
const routes = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body } = require('express-validator');
const { addNote, getNotes, getNoteById, updateNote, deleteNote } = require("../controllers/note");

// Route 1 : creating a endpoint for adding a note to a logined user : '/api/note/addnote' : Login Required
routes.post('/addnote', fetchuser, [
    body('title', 'Length Must Be Minimum 3').isLength({ min: 3 }),
    body('content', 'Length Must Be Minimum 5').isLength({ min: 5 })
], addNote);

// Route 2 : creating a endpoint for getting all note to a logined user : '/api/note/getnotes' : Login Required
routes.get('/getnotes', fetchuser, getNotes);
routes.get('/getnote/:id', fetchuser, getNoteById);

// Route 3 : creating a endpoint for updating a note to a logined user : '/api/note/updatenode/:id' : Login Required
routes.put('/updatenote/:id', fetchuser, updateNote);

// Route 4 : creating a endpoint for deleting a note to a logined user : '/api/note/deletenote' : Login Required
routes.delete('/deletenote/:id', fetchuser, deleteNote);

module.exports = routes