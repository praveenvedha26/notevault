import Note from '../models/Note.js'
import Groq from 'groq-sdk'

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' })
        }
        const note = await Note.create({ title, content, userId: req.user.userId });
        return res.status(201).json(note);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId, deleted: false });
        return res.json(notes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getStarredNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId, starred: true, deleted: false });
        return res.json(notes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTrashedNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId, deleted: true });
        return res.json(notes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.userId.toString() !== req.user.userId)
            return res.status(403).json({ message: 'Not authorized' });
        return res.json(note);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.userId.toString() !== req.user.userId)
            return res.status(403).json({ message: 'Not authorized' });
        const { title, content } = req.body;
        if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' })
        }
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, { title, content }, { new: true }
        );
        return res.json(updatedNote);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.userId.toString() !== req.user.userId)
            return res.status(403).json({ message: 'Not authorized' });
        await Note.findByIdAndDelete(req.params.id);
        return res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const starNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.userId.toString() !== req.user.userId)
            return res.status(403).json({ message: 'Not authorized' });
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, { starred: !note.starred }, { new: true }
        );
        return res.json(updatedNote);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const trashNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.userId.toString() !== req.user.userId)
            return res.status(403).json({ message: 'Not authorized' });
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, { deleted: true }, { new: true }
        );
        return res.json(updatedNote);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const restoreNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.userId.toString() !== req.user.userId)
            return res.status(403).json({ message: 'Not authorized' });
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, { deleted: false }, { new: true }
        );
        return res.json(updatedNote);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const summarizeNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.userId.toString() !== req.user.userId)
            return res.status(403).json({ message: 'Not authorized' });

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{
                role: 'user',
                content: `Summarize the following note in 2-3 clear sentences:\n\n${note.content}`
            }]
        });

        const summary = completion.choices[0].message.content;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, { summary }, { new: true }
        );
        return res.json(updatedNote);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};