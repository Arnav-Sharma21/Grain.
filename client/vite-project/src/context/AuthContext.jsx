/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../axiosCalls/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/users/me')
                if (!mounted) return
                setUser(response.data)
            } catch {
                if (!mounted) return
                setUser(null)
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchUser()

        return () => {
            mounted = false
        }
    }, [])

    const logout = async () => {
        try {
            await axiosInstance.post('/users/logout')
        } catch (error) {
            console.error('Logout error:', error)
        }
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
