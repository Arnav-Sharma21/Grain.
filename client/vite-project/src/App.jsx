import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import Landing from "./Pages/Landing"
import { AuthProvider } from "./context/AuthContext"
import PublicRoute from "./components/PublicRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./Pages/Profile"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-screen"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
