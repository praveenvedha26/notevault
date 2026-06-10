import { useState, useEffect } from 'react'

function NoteEditor({ onSave, editNote, onCancel, darkMode }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        if (editNote) { setTitle(editNote.title); setContent(editNote.content) }
        else { setTitle(''); setContent('') }
    }, [editNote])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title || !content) return
        onSave({ title, content })
        setTitle(''); setContent('')
    }

    const inputStyle = {
        width: '100%',
        background: darkMode ? '#0f1117' : '#f8f9fc',
        border: darkMode ? '0.5px solid #2a2d3a' : '0.5px solid #e2e8f0',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '13px',
        color: darkMode ? '#e2e8f0' : '#1e1b4b',
        outline: 'none'
    }

    return (
        <div style={{
            background: darkMode ? '#1a1d2e' : '#fff',
            border: darkMode ? '0.5px solid #2a2d3a' : '0.5px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px'
        }}>
            <h2 style={{
                fontSize: '14px', fontWeight: 500, marginBottom: '12px',
                color: darkMode ? '#818cf8' : '#6366f1'
            }}>
                {editNote ? '✏️ Edit Note' : '✨ New Note'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                />
                <textarea
                    placeholder="Write your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    style={{ ...inputStyle, resize: 'none' }}
                />
                <p style={{
                    fontSize: '11px',
                    color: darkMode ? '#6b7280' : '#9ca3af',
                    textAlign: 'right'
                }}>
                    {content.trim() === '' ? 0 : content.trim().split(/\s+/).length} words
                    · {content.length} characters
                </p>
                <div className="flex gap-2">
                    <button type="submit" style={{
                        flex: 1, background: '#6366f1', color: '#fff',
                        border: 'none', borderRadius: '8px', padding: '8px',
                        fontSize: '13px', cursor: 'pointer', fontWeight: 500
                    }}>
                        {editNote ? 'Update Note' : 'Save Note'}
                    </button>
                    {editNote && (
                        <button type="button" onClick={onCancel} style={{
                            flex: 1,
                            background: 'transparent',
                            border: darkMode ? '0.5px solid #2a2d3a' : '0.5px solid #e2e8f0',
                            borderRadius: '8px', padding: '8px',
                            fontSize: '13px', cursor: 'pointer',
                            color: darkMode ? '#9ca3af' : '#6b7280'
                        }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default NoteEditor