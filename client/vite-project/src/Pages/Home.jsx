import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Heart,
  ArrowUpRight,
  Star,
  Bookmark,
  X,
  Clapperboard
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import SwissGridOverlay from '../components/SwissGridOverlay'
import { CINEMA_STREAM_CARDS, STREAM_CATEGORIES } from '../data/cinemaData'

function Home() {
  const { user } = useAuth()
  const [streamCards, setStreamCards] = useState(CINEMA_STREAM_CARDS)
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [isLogOpen, setIsLogOpen] = useState(false)
  const [showGrid, setShowGrid] = useState(false)
  const [logForm, setLogForm] = useState({
    title: '',
    director: '',
    year: '2026',
    format: '70mm IMAX',
    rating: 5,
    review: ''
  })

  const filteredCards =
    activeCategory === 'All'
      ? streamCards
      : streamCards.filter(
          (c) => c.category.toLowerCase() === activeCategory.toLowerCase()
        )

  const handleToggleLike = (id) => {
    setStreamCards((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            isLiked: !c.isLiked,
            likes: c.isLiked ? c.likes - 1 : c.likes + 1
          }
        }
        return c
      })
    )
  }

  const handleToggleBookmark = (id) => {
    setStreamCards((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, isBookmarked: !c.isBookmarked }
        }
        return c
      })
    )
  }

  const handleLogSubmit = (e) => {
    e.preventDefault()
    if (!logForm.title) return

    const newEntry = {
      id: `stream-${Date.now()}`,
      filmId: `custom-${Date.now()}`,
      title: logForm.title,
      headline: logForm.title.split(' ')[0].toUpperCase() + '.',
      year: logForm.year || '2026',
      director: logForm.director || 'Unknown Director',
      cinematographer: 'Archival Cinematography',
      format: logForm.format || '35mm Widescreen',
      category: 'New Releases (2026)',
      image: streamCards[0].image,
      loggedBy: user?.username || 'cinephile',
      loggedByName: user?.name || 'Archivist',
      avatar:
        user?.profileImage ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=000&color=fff`,
      rating: Number(logForm.rating) || 5,
      likes: 1,
      isLiked: true,
      isBookmarked: false,
      critique: logForm.review || 'An extraordinary screening logged into the permanent archive.',
      venue: 'Cinema Archive Stream'
    }

    setStreamCards([newEntry, ...streamCards])
    setIsLogOpen(false)
    setLogForm({
      title: '',
      director: '',
      year: '2026',
      format: '70mm IMAX',
      rating: 5,
      review: ''
    })
  }

  const renderStars = (rating) => {
    const count = Math.floor(rating)
    return (
      <div className="flex items-center gap-0.5 text-[#E60000]">
        {[...Array(count)].map((_, i) => (
          <Star key={i} size={12} fill="currentColor" />
        ))}
      </div>
    )
  }

  // Framer Motion entrance variants matching Login and Profile
  const pageVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#090909] text-black font-sans antialiased selection:bg-[#E60000] selection:text-white flex flex-col relative overflow-x-hidden pb-20"
    >
      {/* Subtle Swiss Architectural Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

      {/* Swiss Architectural 12-Column Construction Grid Overlay */}
      <SwissGridOverlay show={showGrid} />

      {/* Floating Island Navbar */}
      <Navbar
        onOpenUpload={() => setIsLogOpen(true)}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
      />

      {/* =========================================================================
          SECTION 1: STREAM HEADER & FILTER CONTROL CARD (HERO STYLE)
          ========================================================================= */}
      <motion.header
        variants={itemVariants}
        className="w-[94vw] max-w-[1580px] mx-auto mt-4 sm:mt-6 mb-8 rounded-3xl border border-black/80 bg-white p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative z-10 select-none overflow-hidden"
      >
        {/* Subtle Grid Lines inside header */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        {/* Top Metadata Strip */}
        <div className="flex items-center justify-between text-xs uppercase text-neutral-500 pb-3 border-b border-black mb-6 font-semibold">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#E60000] inline-block rounded-xs animate-pulse" />
            <span className="text-[#E60000] font-bold tracking-wider">GRAIN CINEMA STREAM</span>
            <span className="text-neutral-300">&bull;</span>
            <span className="font-mono text-neutral-600">@{user?.username || 'cinephile'}</span>
          </div>
          <div className="font-mono text-[11px] text-neutral-400 hidden sm:flex items-center gap-2">
            <span>{filteredCards.length} / {streamCards.length} PRINTS AVAILABLE</span>
            <span>&bull;</span>
            <span>70MM &bull; 35MM ARCHIVE</span>
          </div>
        </div>

        {/* Title & Action Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.05em] uppercase leading-none font-uncut">
                STREAM<span className="text-[#E60000]">.</span>
              </h1>
            </div>
            <p className="font-serif-irregular italic text-neutral-600 text-sm sm:text-base mt-2">
              The living archive of 70mm archival prints, contemporary masterworks, and curated cinema.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsLogOpen(true)}
              className="px-6 py-3 bg-[#E60000] hover:bg-red-700 text-white text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer rounded-xl shadow-lg hover:shadow-xl"
            >
              <Plus size={14} strokeWidth={3} />
              <span>Log Film</span>
            </button>
          </div>
        </div>

        {/* Category Strip */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-black text-xs uppercase font-semibold">
          {STREAM_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer rounded-xl font-mono ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-black text-white shadow-md'
                  : 'bg-neutral-50 text-neutral-700 border border-neutral-300 hover:border-black hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.header>

      {/* =========================================================================
          SECTION 2: MONUMENTAL FULL-BLEED CINEMA FEED CARDS (HERO STYLE)
          ========================================================================= */}
      <main className="w-full flex flex-col items-center z-10 space-y-8 sm:space-y-10">
        {filteredCards.map((card, idx) => (
          <motion.article
            key={card.id}
            variants={itemVariants}
            onClick={() => setSelectedFilm(card)}
            className="w-[94vw] max-w-[1580px] mx-auto rounded-3xl overflow-hidden border border-black/80 bg-black shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] group relative cursor-pointer select-none transition-transform duration-500 hover:-translate-y-1 flex flex-col"
          >
            {/* The Cinema Aperture Window */}
            <div className="relative w-full h-[68vh] sm:h-[80vh] overflow-hidden">
              {/* Full-Bleed Cinema Still with Slow Scale */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/25 transition-colors duration-500 group-hover:via-black/20" />

              {/* Layer 1: Monumental Title Rising (Hero Style) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-12 overflow-hidden">
                <span className="font-display font-medium uppercase tracking-[-0.14em] leading-none text-white/20 select-none text-center whitespace-nowrap text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] transition-transform duration-700 group-hover:scale-105 group-hover:text-white/30">
                  {card.headline}
                </span>
              </div>

              {/* Top Floating Archival Badges */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 bg-black/85 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-mono font-bold tracking-wider">
                <span className="w-1.5 h-1.5 bg-[#E60000] inline-block rounded-xs" />
                <span>0{idx + 1} &bull; {card.format}</span>
                <span className="text-neutral-500">&bull;</span>
                <span className="text-neutral-300">{card.year}</span>
              </div>

              {/* Top Right: Cinephile Info Pill */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex items-center gap-2.5 bg-black/85 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-mono">
                <img
                  src={card.avatar}
                  alt={card.loggedByName}
                  className="w-5 h-5 rounded-full object-cover border border-white/40"
                />
                <span className="font-bold">@{card.loggedBy}</span>
                <span className="text-neutral-500">&bull;</span>
                {renderStars(card.rating)}
              </div>

              {/* Bottom Floating Bar */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 bg-gradient-to-t from-black via-black/75 to-transparent flex flex-col sm:flex-row items-start sm:items-end justify-between text-white gap-6">
                <div className="max-w-2xl">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-uncut leading-none">
                      {card.title}
                    </h2>
                    <span className="font-mono text-sm text-[#E60000] font-bold">
                      ({card.year})
                    </span>
                  </div>

                  <p className="font-serif-irregular italic text-neutral-300 text-sm sm:text-base mt-1.5">
                    Directed by {card.director} &bull; Cinematography by {card.cinematographer}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-neutral-200 line-clamp-2 leading-relaxed border-l-2 border-[#E60000] pl-3 py-0.5">
                    &ldquo;{card.critique}&rdquo;
                  </p>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex items-center gap-3 shrink-0 pointer-events-auto">
                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleBookmark(card.id)
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      card.isBookmarked
                        ? 'bg-white text-black border-white'
                        : 'bg-black/80 backdrop-blur-sm text-white border-white/30 hover:border-white'
                    }`}
                    title="Toggle Watchlist"
                  >
                    <Bookmark size={15} fill={card.isBookmarked ? 'currentColor' : 'none'} />
                  </button>

                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleLike(card.id)
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs uppercase transition-all shadow-lg cursor-pointer ${
                      card.isLiked
                        ? 'bg-[#E60000] text-white border-[#E60000]'
                        : 'bg-black/80 backdrop-blur-sm text-white border-white/30 hover:border-white'
                    }`}
                  >
                    <Heart size={14} fill={card.isLiked ? 'currentColor' : 'none'} />
                    <span>{card.likes}</span>
                  </button>

                  {/* Inspect Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFilm(card)
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-black hover:bg-[#E60000] hover:text-white transition-all text-xs font-bold uppercase rounded-xl shadow-lg cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </main>

      {/* =========================================================================
          LOG FILM MODAL
          ========================================================================= */}
      <AnimatePresence>
        {isLogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setIsLogOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative z-10 w-full max-w-lg bg-white border border-black p-6 sm:p-8 text-black shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-black">
                <div className="flex items-center gap-2">
                  <Clapperboard size={16} className="text-[#E60000]" />
                  <span className="text-xs font-bold uppercase font-mono tracking-wider text-[#E60000]">
                    Log Cinema Entry
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLogOpen(false)}
                  className="text-black hover:text-[#E60000] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleLogSubmit} className="mt-4 space-y-4 font-sans text-sm">
                <div>
                  <label className="block text-xs uppercase font-bold mb-1">Film Title</label>
                  <input
                    type="text"
                    required
                    value={logForm.title}
                    onChange={(e) => setLogForm({ ...logForm, title: e.target.value })}
                    placeholder="e.g. 2001: A Space Odyssey"
                    className="w-full border border-black px-3.5 py-2.5 text-black rounded-xl focus:outline-none focus:border-[#E60000]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase font-bold mb-1">Director</label>
                    <input
                      type="text"
                      value={logForm.director}
                      onChange={(e) => setLogForm({ ...logForm, director: e.target.value })}
                      placeholder="Stanley Kubrick"
                      className="w-full border border-black px-3.5 py-2.5 text-black rounded-xl focus:outline-none focus:border-[#E60000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold mb-1">Release Year</label>
                    <input
                      type="text"
                      value={logForm.year}
                      onChange={(e) => setLogForm({ ...logForm, year: e.target.value })}
                      placeholder="1968"
                      className="w-full border border-black px-3.5 py-2.5 text-black rounded-xl focus:outline-none focus:border-[#E60000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase font-bold mb-1">Format / Venue</label>
                    <input
                      type="text"
                      value={logForm.format}
                      onChange={(e) => setLogForm({ ...logForm, format: e.target.value })}
                      placeholder="70mm Super Panavision"
                      className="w-full border border-black px-3.5 py-2.5 text-black rounded-xl focus:outline-none focus:border-[#E60000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold mb-1">Rating (1 - 5)</label>
                    <select
                      value={logForm.rating}
                      onChange={(e) => setLogForm({ ...logForm, rating: Number(e.target.value) })}
                      className="w-full border border-black px-3.5 py-2.5 text-black rounded-xl focus:outline-none focus:border-[#E60000]"
                    >
                      <option value="5">★★★★★ (5 Stars)</option>
                      <option value="4">★★★★☆ (4 Stars)</option>
                      <option value="3">★★★☆☆ (3 Stars)</option>
                      <option value="2">★★☆☆☆ (2 Stars)</option>
                      <option value="1">★☆☆☆☆ (1 Star)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold mb-1">Cinephile Review / Critique</label>
                  <textarea
                    rows="3"
                    value={logForm.review}
                    onChange={(e) => setLogForm({ ...logForm, review: e.target.value })}
                    className="w-full border border-black px-3.5 py-2.5 text-black rounded-xl focus:outline-none focus:border-[#E60000] text-xs resize-none"
                    placeholder="Write your impressions on cinematography, pacing, projection quality..."
                  />
                </div>

                <div className="pt-3 border-t border-black flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsLogOpen(false)}
                    className="px-4 py-2 border border-black text-xs uppercase cursor-pointer hover:bg-neutral-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white hover:bg-[#E60000] text-xs uppercase font-bold cursor-pointer transition-colors rounded-xl"
                  >
                    Add to Cinema Log &rarr;
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          FILM DETAIL INSPECT MODAL (LIGHTBOX)
          ========================================================================= */}
      <AnimatePresence>
        {selectedFilm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setSelectedFilm(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-2xl bg-white border border-black/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-black"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Still Header */}
              <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
                <img
                  src={selectedFilm.image}
                  alt={selectedFilm.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <button
                  type="button"
                  onClick={() => setSelectedFilm(null)}
                  className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-[#E60000] text-white rounded-full transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-[#E60000] inline-block rounded-xs" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                      {selectedFilm.year} &bull; {selectedFilm.format}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase font-uncut tracking-tight leading-none">
                    {selectedFilm.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-black/15">
                  <div>
                    <p className="font-serif-irregular italic text-sm text-neutral-800">
                      Directed by {selectedFilm.director}
                    </p>
                    <p className="font-mono text-[11px] text-neutral-500">
                      Cinematography by {selectedFilm.cinematographer}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {renderStars(selectedFilm.rating)}
                    <span className="font-mono font-bold text-xs">
                      {selectedFilm.rating}.0
                    </span>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-mono font-bold uppercase text-neutral-500 mb-1">
                    Cinephile Critique &bull; Logged by @{selectedFilm.loggedBy}
                  </h5>
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans bg-neutral-100 p-3 rounded-xl border-l-2 border-[#E60000]">
                    &ldquo;{selectedFilm.critique}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-black/15 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-neutral-400">
                    SCREENED AT {selectedFilm.venue?.toUpperCase() || 'ARCHIVE'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedFilm(null)}
                    className="px-5 py-2 bg-black hover:bg-[#E60000] text-white text-xs uppercase font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Close Frame
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Home
