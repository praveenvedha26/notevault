function NoteModal({ note, onClose, darkMode }) {
    if (!note) return null

    const bg = darkMode ? '#1a1d2e' : '#fff'
    const textColor = darkMode ? '#e2e8f0' : '#1e1b4b'
    const mutedColor = darkMode ? '#9ca3af' : '#6b7280'
    const borderColor = darkMode ? '#2a2d3a' : '#e2e8f0'

    const date = new Date(note.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    })

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000, padding: '20px'
            }}>
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: bg,
                    borderRadius: '16px',
                    border: `0.5px solid ${borderColor}`,
                    width: '100%',
                    maxWidth: '640px',
                    maxHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                <div style={{
                    padding: '20px 24px',
                    borderBottom: `0.5px solid ${borderColor}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px'
                }}>
                    <div>
                        <h2 style={{
                            fontSize: '20px', fontWeight: 500,
                            color: textColor, marginBottom: '4px'
                        }}>
                            {note.title}
                        </h2>
                        <p style={{ fontSize: '12px', color: mutedColor }}>
                            {date} {note.starred ? '⭐' : ''}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none', border: 'none',
                            cursor: 'pointer', fontSize: '20px',
                            color: mutedColor, lineHeight: 1,
                            flexShrink: 0
                        }}>
                        ✕
                    </button>
                </div>

                <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                    <p style={{
                        fontSize: '15px', color: textColor,
                        lineHeight: '1.8', whiteSpace: 'pre-wrap'
                    }}>
                        {note.content}
                    </p>

                    {note.summary && (
                        <div style={{
                            marginTop: '24px',
                            background: darkMode ? '#1e2130' : '#eef2ff',
                            border: darkMode ? '0.5px solid #4f46e5' : '0.5px solid #c7d2fe',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <p style={{
                                fontSize: '12px', fontWeight: 500,
                                color: darkMode ? '#818cf8' : '#4f46e5',
                                marginBottom: '8px'
                            }}>
                                ✨ AI Summary
                            </p>
                            <p style={{
                                fontSize: '14px', lineHeight: '1.7',
                                color: darkMode ? '#a5b4fc' : '#4338ca'
                            }}>
                                {note.summary}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NoteModal