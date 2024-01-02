const { validationResult } = require("express-validator");
const Note = require("../models/Note");

const addNote = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({Error:err.array()});
    }
    try {
        const note = await Note.create({
            title: req.body.title,
            content: req.body.content,
            tag: req.body.tag,
            user: req.user.id,
            createdOn: Date.now(),
            lastModification: Date.now()
        })
        res.send(note);
    } catch (err) {
        console.error(err);
        res.status(400).send('Internal Server Problem');
    }
}

const getNotes = async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id });
        return res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Internal Server Problem');
    }
}

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ user: req.user.id, _id: req.params.id });
        return res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Internal Server Problem');
    }
}
const updateNote = async (req, res) => {
    try {
        let note = await Note.findOne({ _id: req.params.id });
        if (!note) {
            return res.status(404).json({Error:"Note Doesn't Exist"});
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unable To Update");
        }
        if (req.body.title) {
            if (req.body.title.length < 3)
                return res.json({ 'Error': 'Title Should Be Of Minimum Length 3' });
        }
        if (req.body.content) {
            if (req.body.content.length < 5)
                return res.json({ 'Error': 'Content Should Be Of Minimum Length 5' });
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: { ...req.body, lastModification: Date.now() } }, { new: true });
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Internal Server Problem');
    }
}

const deleteNote = async (req, res) => {
    try {
        let note = await Note.findOne({ _id: req.params.id });
        if (!note) {
            return res.status(404).send("Note Doesn't Exist");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unable To Delete");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note Deleted Successfully!!!" });
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Internal Server Problem');
    }
}

module.exports.addNote = addNote;
        module.exports.getNotes = getNotes;
        module.exports.getNoteById = getNoteById;
module.exports.updateNote = updateNote;
module.exports.deleteNote = deleteNote; 