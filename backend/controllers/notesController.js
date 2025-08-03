const notes = require('../models/Note.js');

const getNotes = async (_, res) => {
    try {
        const allNotes = await notes.find().sort({createdAt: -1}); //Sort by newest first 
        res.status(200).json(allNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNote = async(req,res)=>{
    try {
        const {id} = req.params;
        const note = await notes.findById(id);
        if(!note){
            res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNote = async (req, res) => {
    try {
        const newNote = await notes.create(req.body);
        const note = await newNote.save();
        if(!note){
            res.status(400).json({message: 'Note not created successfully'});
        }
        res.status(200).json(newNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateNote = async (req, res) => {
    
    try {
        const {id} = req.params;
        const Note = await notes.findByIdAndUpdate(id, req.body);
        if (!Note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        const updatedNote = await notes.findById(id);
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteNote = async (req, res) => {
    
    try {
        const {id} = req.params
        const deletedNote = await notes.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
};