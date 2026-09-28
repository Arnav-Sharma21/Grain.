import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Plus, LogOut, Grid } from 'lucide-react'

function Navbar({ onOpenUpload, showGrid, setShowGrid }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-3 sm:top-4 z-40 w-full px-3 sm:px-0 text-black select-none pointer-events-auto">
      <div className="w-[94vw] max-w-[1580px] mx-auto h-14 sm:h-16 px-4 sm:px-8 rounded-2xl border border-black/80 bg-white/95 backdrop-blur-md shadow-2xl flex items-center justify-between">
        {/* Brand */}
        <Link to={user ? "/home" : "/"} className="flex items-center gap-3 group">
          <div className="w-6 h-6 bg-[#E60000] text-white flex items-center justify-center font-bold text-xs tracking-tighter rounded-sm">
            +
          </div>
          <span className="text-xl font-black tracking-tighter uppercase leading-none font-uncut">
            GRAIN<span className="text-[#E60000]">.</span>
          </span>
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs uppercase tracking-wider font-semibold">
          {setShowGrid !== undefined && (
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[11px] transition-colors cursor-pointer ${
                showGrid
                  ? 'bg-black text-white border-black'
                  : 'bg-neutral-50 text-black border-black/30 hover:border-black'
              }`}
            >
              <Grid size={12} />
              <span>Grid {showGrid ? 'On' : 'Off'}</span>
            </button>
          )}

          {user ? (
            <>
              <Link
                to="/home"
                className={`transition-colors font-bold ${
                  location.pathname === '/home' ? 'text-[#E60000]' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Feed
              </Link>

              {onOpenUpload && (
                <button
                  onClick={onOpenUpload}
                  className="flex items-center gap-1 px-3.5 py-1.5 bg-[#E60000] text-white text-[11px] font-bold rounded-lg hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
                >
                  <Plus size={13} strokeWidth={3} />
                  <span>Upload</span>
                </button>
              )}

              <Link
                to={`/profile/${user.username}`}
                className="hover:text-[#E60000] transition-colors border border-black/70 rounded-lg px-2.5 py-1 font-mono text-[11px]"
              >
                @{user.username}
              </Link>

              <button
                onClick={handleLogout}
                className="p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-black hover:text-[#E60000] transition-colors px-2 py-1 font-bold"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-black hover:bg-[#E60000] text-white transition-colors rounded-lg font-bold"
              >
                Sign Up &rarr;
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
