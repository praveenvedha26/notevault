import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
    createNote, getNotes, getNoteById, updateNote,
    deleteNote, starNote, trashNote, restoreNote,
    summarizeNote, getStarredNotes, getTrashedNotes
} from '../controllers/noteController.js';

const router = express.Router();

router.get('/', authMiddleware, getNotes);
router.get('/starred', authMiddleware, getStarredNotes);
router.get('/trash', authMiddleware, getTrashedNotes);
router.post('/', authMiddleware, createNote);
router.get('/:id', authMiddleware, getNoteById);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);
router.put('/:id/star', authMiddleware, starNote);
router.put('/:id/trash', authMiddleware, trashNote);
router.put('/:id/restore', authMiddleware, restoreNote);
router.post('/:id/summarize', authMiddleware, summarizeNote);

export default router;