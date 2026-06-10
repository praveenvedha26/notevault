import { useState } from 'react'

function NoteCard({ note, onEdit, onTrash, onStar, onSummarize, onRestore, onDelete, onView, darkMode, section }) {
    const [summarizing, setSummarizing] = useState(false)

    const card = darkMode
        ? { background: '#1a1d2e', border: '0.5px solid #2a2d3a', color: '#e2e8f0' }
        : { background: '#fff', border: '0.5px solid #e2e8f0', color: '#1e1b4b' }

    const muted = darkMode ? '#6b7280' : '#9ca3af'
    const btnStyle = {
        flex: 1, fontSize: '11px', textAlign: 'center',
        border: darkMode ? '0.5px solid #2a2d3a' : '0.5px solid #e2e8f0',
        color: darkMode ? '#9ca3af' : '#6b7280',
        borderRadius: '6px', padding: '4px', cursor: 'pointer',
        background: 'transparent'
    }

    const handleSummarize = async () => {
        setSummarizing(true)
        try { await onSummarize(note._id) }
        finally { setSummarizing(false) }
    }

    const date = new Date(note.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
    })

    return (
        <div style={{
            ...card,
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            {/* Title + Star */}
            <div className="flex items-start justify-between">
                <h2
                    onClick={() => onView(note)}
                    style={{
                        fontSize: '15px', fontWeight: 500,
                        color: card.color, cursor: 'pointer',
                        textDecoration: 'underline',
                        textDecorationColor: darkMode ? '#2a2d3a' : '#e2e8f0'
                    }}>
                    {note.title}
                </h2>
                <button
                    onClick={() => onStar(note._id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                    {note.starred ? '⭐' : '☆'}
                </button>
            </div>

            {/* Preview content */}
            <p style={{
                fontSize: '13px', color: muted, lineHeight: '1.5',
                overflow: 'hidden', display: '-webkit-box',
                WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'
            }}>
                {note.content}
            </p>

            {/* AI Summary */}
            {note.summary && (
                <div style={{
                    background: darkMode ? '#1e2130' : '#eef2ff',
                    border: darkMode ? '0.5px solid #4f46e5' : '0.5px solid #c7d2fe',
                    borderRadius: '8px', padding: '8px 10px'
                }}>
                    <p style={{
                        fontSize: '11px', fontWeight: 500,
                        color: darkMode ? '#818cf8' : '#4f46e5', marginBottom: '4px'
                    }}>
                        ✨ AI Summary
                    </p>
                    <p style={{
                        fontSize: '11px',
                        color: darkMode ? '#a5b4fc' : '#4338ca', lineHeight: '1.5'
                    }}>
                        {note.summary}
                    </p>
                </div>
            )}

            {/* Date */}
            <p style={{ fontSize: '11px', color: muted }}>{date}</p>

            {/* Actions */}
            {section === 'trash' ? (
                <div className="flex gap-2">
                    <button onClick={() => onRestore(note._id)}
                        style={{ ...btnStyle, color: '#818cf8' }}>
                        Restore
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Permanently delete this note? This cannot be undone.')) {
                                onDelete(note._id)
                            }
                        }}
                        style={{ ...btnStyle, color: '#f87171', border: '0.5px solid #4b1c1c' }}>
                        Delete Forever
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleSummarize}
                        disabled={summarizing}
                        style={{
                            width: '100%', fontSize: '12px', padding: '6px',
                            background: darkMode ? '#1e2130' : '#eef2ff',
                            color: darkMode ? '#818cf8' : '#4f46e5',
                            border: darkMode ? '0.5px solid #4f46e5' : '0.5px solid #c7d2fe',
                            borderRadius: '6px', cursor: 'pointer'
                        }}>
                        {summarizing ? 'Summarizing...' : '✨ Summarize with AI'}
                    </button>
                    <div className="flex gap-2">
                        <button onClick={() => onEdit(note)} style={btnStyle}>Edit</button>
                        <button onClick={() => onTrash(note._id)}
                            style={{ ...btnStyle, color: '#f87171', border: '0.5px solid #4b1c1c' }}>
                            Trash
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NoteCard