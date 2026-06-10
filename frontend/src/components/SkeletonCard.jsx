function SkeletonCard({ darkMode }) {
    const bg = darkMode ? '#1a1d2e' : '#fff'
    const shimmer = darkMode ? '#2a2d3a' : '#f0f0f0'

    const line = (width, height = '12px') => ({
        background: shimmer,
        borderRadius: '6px',
        height,
        width,
        marginBottom: '8px'
    })

    return (
        <div style={{
            background: bg,
            border: darkMode ? '0.5px solid #2a2d3a' : '0.5px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}>
            <div style={line('60%', '16px')} />
            <div style={line('100%')} />
            <div style={line('100%')} />
            <div style={line('80%')} />
            <div style={line('40%', '10px')} />
            <div style={{
                ...line('100%', '32px'),
                marginTop: '8px',
                borderRadius: '6px'
            }} />
        </div>
    )
}

export default SkeletonCard