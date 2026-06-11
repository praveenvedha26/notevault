import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String },
    starred: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Note = mongoose.model('Note', NoteSchema);
export default Note;