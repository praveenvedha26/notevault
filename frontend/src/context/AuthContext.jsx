import { createContext, useState, useContext } from 'react'

// 1. Create the context
const AuthContext = createContext()

// 2. Provider — wraps the whole app, holds the state
export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    )
    const [userId, setUserId] = useState(
        localStorage.getItem('userId') || null
    )

    const login = (token, userId) => {
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        setToken(token)
        setUserId(userId)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        setToken(null)
        setUserId(null)
    }

    return (
        <AuthContext.Provider value={{ token, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// 3. Custom hook — easy way to use auth anywhere
export function useAuth() {
    return useContext(AuthContext)
}