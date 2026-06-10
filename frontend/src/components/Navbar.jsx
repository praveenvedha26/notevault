import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar({ darkMode, toggleDarkMode }) {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="flex items-center justify-between px-6 py-4"
            style={{ background: '#0f1117', borderBottom: '0.5px solid #2a2d3a' }}>
            <h1 style={{ color: '#818cf8', fontWeight: 600, fontSize: '18px' }}>
                NoteVault — Secure Notes Management System
            </h1>
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleDarkMode}
                    style={{
                        background: '#1e2130',
                        border: '0.5px solid #2a2d3a',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        color: '#9ca3af',
                        fontSize: '13px',
                        cursor: 'pointer'
                    }}>
                    {darkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
                <button
                    onClick={handleLogout}
                    style={{
                        background: 'transparent',
                        border: '0.5px solid #2a2d3a',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        color: '#6b7280',
                        fontSize: '13px',
                        cursor: 'pointer'
                    }}>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar