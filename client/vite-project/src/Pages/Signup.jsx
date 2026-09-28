import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, Clapperboard, Film } from 'lucide-react'
import { axiosInstance } from '../axiosCalls/axios'

function Signup() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' })
  const [loader, setLoader] = useState(false)
  const [err, setErr] = useState('')
  const [sheetMode, setSheetMode] = useState('light')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErr('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)
    setErr('')

    try {
      await axiosInstance.post('/users/register', form)
      navigate('/login', { replace: true })
    } catch (error) {
      setErr(error.response?.data?.message || 'Registration rejected. Check input fields.')
    } finally {
      setLoader(false)
    }
  }

  const isLight = sheetMode === 'light'

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.97, y: 25 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.07
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const semicircleVariants = {
    hidden: { x: -70, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <div className="h-screen h-[100dvh] bg-[#090909] text-black font-sans antialiased flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden relative selection:bg-[#E60000] selection:text-white">
      {/* Subtle Dark Stage Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

      {/* Top Navigation Strip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-[94vw] max-w-[1180px] mx-auto flex items-center justify-between pb-2 z-20 shrink-0"
      >
        <Link
          to="/"
          className="group flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 backdrop-blur-sm"
        >
          <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
          <span>Return to Archive</span>
        </Link>

        {/* Dual Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-black/60 border border-white/20 p-1 rounded-xl backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setSheetMode('light')}
            className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
              isLight
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Light Mode
          </button>
          <button
            type="button"
            onClick={() => setSheetMode('dark')}
            className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
              !isLight
                ? 'bg-neutral-800 text-white shadow-md border border-white/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Dark Mode
          </button>
        </div>
      </motion.div>

      {/* =========================================================================
          HORIZONTAL LANDSCAPE CARD WITH EMBEDDED MOUNTED SEMICIRCLE
          - Fits completely within viewport height (no scrolling)
          - Left: Mounted Semicircle with "SIGN UP." embedded inside
          - Right: Clean, high-clarity, intuitive registration form
          ========================================================================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`w-[94vw] max-w-[1180px] h-[82vh] max-h-[680px] min-h-[500px] rounded-3xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden flex flex-col justify-between transition-colors duration-500 z-10 shrink-0 ${
          isLight
            ? 'bg-white text-black border border-black/80'
            : 'bg-[#121212] text-white border border-white/20'
        }`}
      >
        {/* Subtle Card Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        {/* Top Header Row inside Card */}
        <div className="flex items-center justify-between px-6 sm:px-10 pt-5 pb-3 border-b border-current/15 text-xs font-mono select-none z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E60000] inline-block rounded-xs animate-pulse" />
            <span className="font-bold tracking-tight">GRAIN CINEMA ARCHIVE</span>
            <span className="text-neutral-400">&bull;</span>
            <span className="text-neutral-400">BASEL, SWITZERLAND</span>
          </div>

          <div className="text-neutral-400 uppercase text-[11px] flex items-center gap-1.5">
            <Film size={12} className="text-[#E60000]" />
            <span>CINEPHILE REGISTRY</span>
          </div>
        </div>

        {/* Center Main Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto px-4 sm:px-8 z-10">
          {/* LEFT: Mounted Semicircle with SIGN UP embedded inside */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-start">
            <motion.div
              variants={semicircleVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`w-[260px] sm:w-[320px] lg:w-[360px] h-[260px] sm:h-[320px] lg:h-[360px] rounded-r-full flex flex-col justify-center pl-8 sm:pl-12 pr-6 shadow-2xl transition-colors duration-500 relative overflow-hidden group ${
                isLight
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              }`}
            >
              {/* Subtle inner arc ring */}
              <div className="absolute inset-2 rounded-r-full border border-current opacity-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-25" />

              <span className="text-xs uppercase tracking-widest font-mono opacity-60 mb-2 flex items-center gap-2">
                <Clapperboard size={12} className="text-[#E60000]" />
                Archive Access
              </span>

              {/* Exact route-specific title embedded inside the semicircle */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none font-uncut select-none">
                SIGN UP<span className="text-[#E60000]">.</span>
              </h1>

              <p className="font-serif-irregular italic text-sm mt-3 opacity-70">
                Cinephile Registry &amp; Watchlist
              </p>
            </motion.div>
          </div>

          {/* RIGHT: Clear, Intuitive, Uncluttered Registration Form */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-md mx-auto lg:mx-0 w-full">
            <motion.div variants={itemVariants} className="space-y-1 mb-5">
              <h2 className="text-2xl sm:text-3xl font-bold font-uncut uppercase tracking-tight">
                Create Account
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 font-sans">
                Join the platform to track cinema, curate watchlists, and publish reviews.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Row 1: Full Name & Username */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Elena Rostova"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E60000]/25 ${
                      isLight
                        ? 'bg-neutral-50 text-black border-neutral-300 focus:border-[#E60000]'
                        : 'bg-neutral-900 text-white border-white/20 focus:border-[#E60000]'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={form.username}
                    onChange={handleChange}
                    placeholder="elenarostova"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E60000]/25 ${
                      isLight
                        ? 'bg-neutral-50 text-black border-neutral-300 focus:border-[#E60000]'
                        : 'bg-neutral-900 text-white border-white/20 focus:border-[#E60000]'
                    }`}
                  />
                </div>
              </motion.div>

              {/* Email Address */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="cinephile@grain.archive"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E60000]/25 ${
                    isLight
                      ? 'bg-neutral-50 text-black border-neutral-300 focus:border-[#E60000]'
                      : 'bg-neutral-900 text-white border-white/20 focus:border-[#E60000]'
                  }`}
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E60000]/25 ${
                    isLight
                      ? 'bg-neutral-50 text-black border-neutral-300 focus:border-[#E60000]'
                      : 'bg-neutral-900 text-white border-white/20 focus:border-[#E60000]'
                  }`}
                />
              </motion.div>

              {/* Error Notice */}
              <AnimatePresence>
                {err && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    className="p-2.5 border border-[#E60000] text-xs text-[#E60000] font-semibold bg-red-500/10 rounded-xl"
                  >
                    {err}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <motion.button
                  type="submit"
                  disabled={loader}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 px-6 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all cursor-pointer rounded-xl shadow-lg group ${
                    isLight
                      ? 'bg-black text-white hover:bg-[#E60000]'
                      : 'bg-white text-black hover:bg-[#E60000] hover:text-white'
                  }`}
                >
                  <span>{loader ? 'Creating Dossier...' : 'Create Account'}</span>
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>
              </motion.div>
            </form>

            {/* Switch to Login */}
            <motion.div variants={itemVariants} className="mt-5 pt-3.5 border-t border-current/15 flex items-center justify-between text-xs">
              <span className="text-neutral-500">Already an archivist?</span>
              <Link
                to="/login"
                className="font-bold underline hover:text-[#E60000] transition-colors"
              >
                Sign In &rarr;
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer Row inside Card */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-3 border-t border-current/15 text-[11px] font-mono text-neutral-400 select-none z-10">
          <div>GRAIN. &bull; 2026 ARCHIVE</div>
          <div>BASEL &bull; TOKYO &bull; ZURICH &bull; NEW YORK</div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
