import { useEffect } from 'react'

function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [message])

    if (!message) return null

    const bg = type === 'error' ? '#4b1c1c' : '#1a2e1a'
    const color = type === 'error' ? '#f87171' : '#4ade80'
    const icon = type === 'error' ? '✕' : '✓'

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: bg,
            color: color,
            padding: '12px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 2000,
            border: `0.5px solid ${color}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
            <span style={{ fontWeight: 600 }}>{icon}</span>
            {message}
        </div>
    )
}

export default Toast