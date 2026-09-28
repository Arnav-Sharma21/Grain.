import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import ArchiveLoader from './ArchiveLoader'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <ArchiveLoader />
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute
