import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import NoteEditor from '../components/NoteEditor'
import NoteModal from '../components/NoteModal'
import Toast from '../components/Toast'
import SkeletonCard from '../components/SkeletonCard'
import {
    getNotesAPI, getStarredNotesAPI, getTrashedNotesAPI,
    createNoteAPI, updateNoteAPI, deleteNoteAPI,
    starNoteAPI, trashNoteAPI, restoreNoteAPI, summarizeNoteAPI
} from '../services/api'

function Dashboard() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [editNote, setEditNote] = useState(null)
    const [selectedNote, setSelectedNote] = useState(null)
    const [section, setSection] = useState('notes')
    const [toast, setToast] = useState({ message: '', type: '' })
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkMode') === 'true'
    )

    useEffect(() => { fetchNotes() }, [section])

    const fetchNotes = async () => {
        setLoading(true)
        try {
            let res
            if (section === 'notes') res = await getNotesAPI()
            else if (section === 'starred') res = await getStarredNotesAPI()
            else if (section === 'trash') res = await getTrashedNotesAPI()
            setNotes(res.data)
        } catch {
            showToast('Failed to fetch notes', 'error')
        } finally {
            setLoading(false)
        }
    }

    const showToast = (message, type = 'success') => {
        setToast({ message, type })
    }

    const toggleDarkMode = () => {
        const next = !darkMode
        setDarkMode(next)
        localStorage.setItem('darkMode', next)
    }

    const handleSave = async ({ title, content }) => {
        try {
            if (editNote) {
                const res = await updateNoteAPI(editNote._id, { title, content })
                setNotes(notes.map(n => n._id === editNote._id ? res.data : n))
                setEditNote(null)
                showToast('Note updated successfully')
            } else {
                const res = await createNoteAPI({ title, content })
                setNotes([res.data, ...notes])
                showToast('Note saved successfully')
            }
        } catch {
            showToast('Failed to save note', 'error')
        }
    }

    const handleTrash = async (id) => {
        try {
            await trashNoteAPI(id)
            setNotes(notes.filter(n => n._id !== id))
            showToast('Note moved to trash')
        } catch {
            showToast('Failed to move to trash', 'error')
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteNoteAPI(id)
            setNotes(notes.filter(n => n._id !== id))
            showToast('Note deleted permanently')
        } catch {
            showToast('Failed to delete note', 'error')
        }
    }

    const handleStar = async (id) => {
        try {
            const res = await starNoteAPI(id)
            setNotes(notes.map(n => n._id === id ? res.data : n))
            showToast(res.data.starred ? 'Note starred' : 'Note unstarred')
        } catch {
            showToast('Failed to star note', 'error')
        }
    }

    const handleRestore = async (id) => {
        try {
            await restoreNoteAPI(id)
            setNotes(notes.filter(n => n._id !== id))
            showToast('Note restored successfully')
        } catch {
            showToast('Failed to restore note', 'error')
        }
    }

    const handleSummarize = async (id) => {
        try {
            const res = await summarizeNoteAPI(id)
            setNotes(notes.map(n => n._id === id ? res.data : n))
            showToast('Summary generated successfully')
        } catch {
            showToast('Failed to summarize', 'error')
        }
    }

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    )

    const sidebarItems = [
        { key: 'notes', label: '📋 My Notes' },
        { key: 'starred', label: '⭐ Starred' },
        { key: 'trash', label: '🗑 Trash' }
    ]

    const contentBg = darkMode ? '#0f1117' : '#f8f9fc'
    const textColor = darkMode ? '#e2e8f0' : '#1e1b4b'
    const mutedColor = darkMode ? '#6b7280' : '#9ca3af'

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* Sidebar */}
                <div style={{
                    width: '200px',
                    background: '#13151f',
                    borderRight: '0.5px solid #2a2d3a',
                    padding: '20px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    flexShrink: 0,
                    overflowY: 'auto'
                }}>
                    {sidebarItems.map(item => (
                        <button
                            key={item.key}
                            onClick={() => setSection(item.key)}
                            style={{
                                textAlign: 'left',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: section === item.key ? 500 : 400,
                                background: section === item.key
                                    ? 'rgba(129,140,248,0.15)' : 'transparent',
                                color: section === item.key ? '#818cf8' : '#9ca3af'
                            }}>
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Main content */}
                <div style={{
                    flex: 1,
                    background: contentBg,
                    padding: '24px',
                    overflowY: 'auto'
                }}>
                    {section === 'notes' && (
                        <input
                            type="text"
                            placeholder="🔍 Search notes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                background: darkMode ? '#1a1d2e' : '#fff',
                                border: darkMode ? '0.5px solid #2a2d3a' : '0.5px solid #e2e8f0',
                                borderRadius: '10px',
                                padding: '10px 14px',
                                fontSize: '13px',
                                color: darkMode ? '#e2e8f0' : '#1e1b4b',
                                outline: 'none',
                                marginBottom: '16px'
                            }}
                        />
                    )}

                    {section === 'notes' && (
                        <div style={{ marginBottom: '24px' }}>
                            <NoteEditor
                                onSave={handleSave}
                                editNote={editNote}
                                onCancel={() => setEditNote(null)}
                                darkMode={darkMode}
                            />
                        </div>
                    )}

                    <h2 style={{
                        fontSize: '16px', fontWeight: 500,
                        color: textColor, marginBottom: '16px'
                    }}>
                        {section === 'notes' && 'My Notes'}
                        {section === 'starred' && '⭐ Starred Notes'}
                        {section === 'trash' && '🗑 Trash'}
                    </h2>

                    {/* ✅ Skeleton loading */}
                    {loading ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: '16px'
                        }}>
                            {[1, 2, 3].map(i => (
                                <SkeletonCard key={i} darkMode={darkMode} />
                            ))}
                        </div>
                    ) : filteredNotes.length === 0 ? (
                        <p style={{ color: mutedColor, fontSize: '14px' }}>
                            {search
                                ? 'No notes match your search.'
                                : section === 'notes' ? 'No notes yet. Create your first one!'
                                : section === 'starred' ? 'No starred notes yet.'
                                : 'Trash is empty.'
                            }
                        </p>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: '16px'
                        }}>
                            {filteredNotes.map(note => (
                                <NoteCard
                                    key={note._id}
                                    note={note}
                                    onEdit={setEditNote}
                                    onTrash={handleTrash}
                                    onDelete={handleDelete}
                                    onStar={handleStar}
                                    onRestore={handleRestore}
                                    onSummarize={handleSummarize}
                                    onView={setSelectedNote}
                                    darkMode={darkMode}
                                    section={section}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <NoteModal
                note={selectedNote}
                onClose={() => setSelectedNote(null)}
                darkMode={darkMode}
            />

            {/* ✅ Toast */}
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: '', type: '' })}
            />
        </div>
    )
}

export default Dashboard