import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Edit3,
  UserCheck,
  UserPlus,
  X,
  Heart,
  ArrowUpRight,
  Star,
  Film,
  List,
  Bookmark,
  Clapperboard,
  RotateCcw,
  Sparkles,
  Camera,
  CheckCircle2
} from 'lucide-react'
import { axiosInstance } from '../axiosCalls/axios'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import SwissGridOverlay from '../components/SwissGridOverlay'
import {
  FOUR_FAVORITES,
  LIFETIME_STATS,
  DIARY_LOGS,
  CURATED_LISTS,
  WATCHLIST
} from '../data/cinemaData'

function Profile() {
  const { username } = useParams()
  const { user: loggedInUser } = useAuth()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', username: '', email: '', bio: '' })
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState('')
  const [showGrid, setShowGrid] = useState(false)
  const [activeListModal, setActiveListModal] = useState(null) // 'followers' | 'following' | null
  const [activeTab, setActiveTab] = useState('diary') // 'diary' | 'watchlist' | 'lists' | 'reviews'
  const [inspectFilm, setInspectFilm] = useState(null)
  const [diaryEntries, setDiaryEntries] = useState(DIARY_LOGS)
  const [watchlistItems, setWatchlistItems] = useState(WATCHLIST)
  const [curatedLists, setCuratedLists] = useState(CURATED_LISTS)
  const [fourFavorites] = useState(FOUR_FAVORITES)
  const [, setError] = useState('')

  const isOwnProfile = loggedInUser?.username === username

  useEffect(() => {
    let mounted = true

    const loadProfile = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await axiosInstance.get(`/users/profile/${username}`)
        const profile = response.data.userData
        if (!mounted) return

        setUserData(profile)

        if (isOwnProfile) {
          setIsFollowing(false)
          return
        }

        const meResponse = await axiosInstance.get('/users/me')
        const myFollowingList = meResponse.data.followings || []
        const followingIds = myFollowingList.map((item) =>
          typeof item === 'object' ? item._id : item
        )

        setIsFollowing(
          followingIds.some((id) => id?.toString() === profile._id?.toString())
        )
      } catch (requestError) {
        console.error('Failed to fetch profile data:', requestError)
        if (mounted) {
          setUserData(null)
          setError(requestError.response?.data?.message || 'Cinephile not found in archive.')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    if (username) {
      loadProfile()
    }

    return () => {
      mounted = false
    }
  }, [username, isOwnProfile])

  const handleFollowToggle = async () => {
    if (!userData?._id || actionLoading) return

    try {
      setActionLoading(true)

      if (isFollowing) {
        await axiosInstance.delete(`/users/${userData._id}/unfollow`)
      } else {
        await axiosInstance.post(`/users/${userData._id}/follow`)
      }

      const updatedRes = await axiosInstance.get(`/users/profile/${username}`)
      setUserData(updatedRes.data.userData)
      setIsFollowing((prev) => !prev)
    } catch (requestError) {
      console.error('Follow action failed:', requestError)
      alert(requestError.response?.data?.message || 'Action failed.')
    } finally {
      setActionLoading(false)
    }
  }

  const openEditProfile = () => {
    setEditForm({
      name: userData?.name || '',
      username: userData?.username || '',
      email: userData?.email || '',
      bio: userData?.bio || ''
    })
    setPreviewImage(userData?.profileImage || '')
    setSelectedImage(null)
    setIsEditOpen(true)
  }

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    setUserData((prev) => ({
      ...prev,
      ...editForm,
      profileImage: previewImage || prev?.profileImage
    }))
    setIsEditOpen(false)
  }

  const handleToggleDiaryLike = (id) => {
    setDiaryEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          return {
            ...entry,
            isLiked: !entry.isLiked,
            likesCount: entry.isLiked ? entry.likesCount - 1 : entry.likesCount + 1
          }
        }
        return entry
      })
    )
  }

  const handleToggleListLike = (id) => {
    setCuratedLists((prev) =>
      prev.map((list) => {
        if (list.id === id) {
          const isLiked = list.userLiked
          return {
            ...list,
            userLiked: !isLiked,
            likes: isLiked ? list.likes - 1 : list.likes + 1
          }
        }
        return list
      })
    )
  }

  const handleRemoveFromWatchlist = (id) => {
    setWatchlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Render star ratings (e.g. 5 stars, 4.5 stars)
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalf = rating % 1 !== 0
    return (
      <div className="flex items-center gap-0.5 text-[#E60000]">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={13} fill="currentColor" />
        ))}
        {hasHalf && <Star size={13} fill="currentColor" className="opacity-60" />}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex flex-col font-sans relative overflow-hidden pb-16">
        <div className="fixed inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center z-10 px-4">
          <div className="w-[94vw] max-w-md p-8 sm:p-12 rounded-2xl border border-black/80 bg-white text-black shadow-2xl flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 border-2 border-black border-t-[#E60000] animate-spin mb-4" />
            <span className="text-[#E60000] font-mono text-xs uppercase font-bold tracking-wider">
              Loading Cinephile Dossier
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex flex-col font-sans relative overflow-hidden pb-16">
        <div className="fixed inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center z-10 px-4">
          <div className="w-[94vw] max-w-lg p-8 sm:p-12 rounded-2xl border border-black/80 bg-white text-black shadow-2xl text-center">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-uncut">
              Cinephile Not Found
            </h2>
            <p className="font-serif-irregular italic text-neutral-600 mt-2 text-sm">
              The requested cinephile could not be located in the permanent cinema archive.
            </p>
            <Link
              to="/home"
              className="mt-6 inline-flex px-6 py-3 bg-black hover:bg-[#E60000] text-white text-xs uppercase font-bold tracking-wider rounded-xl transition-colors"
            >
              Return to Feed &rarr;
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#090909] text-black font-sans antialiased selection:bg-[#E60000] selection:text-white flex flex-col relative overflow-x-hidden pb-20"
    >
      {/* Subtle Swiss Architectural Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

      {/* Swiss Architectural 12-Column Construction Grid Overlay */}
      <SwissGridOverlay show={showGrid} />

      {/* Floating Island Navbar */}
      <Navbar showGrid={showGrid} setShowGrid={setShowGrid} />

      {/* =========================================================================
          SECTION 1: CINEPHILE ARCHIVAL DOSSIER & LIFETIME STATS (CARD 1)
          ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-[94vw] max-w-[1580px] mx-auto mt-4 sm:mt-6 mb-8 rounded-3xl border border-black/80 bg-white p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative z-10 select-none overflow-hidden"
      >
        {/* Subtle grid pattern inside dossier */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        {/* Top Metadata Strip */}
        <div className="flex items-center justify-between text-xs uppercase text-neutral-500 pb-3 border-b border-black mb-6 font-semibold">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#E60000] inline-block rounded-xs animate-pulse" />
            <span className="text-[#E60000] font-bold tracking-wider">CINEPHILE DOSSIER</span>
            <span className="text-neutral-300">&bull;</span>
            <span className="font-mono text-neutral-600">ARCHIVE MEMBER 2026</span>
          </div>
          <div className="font-mono text-[11px] text-neutral-400 hidden sm:flex items-center gap-2">
            <span>35MM / 70MM LOGBOOK</span>
            <span>&bull;</span>
            <span>BASEL / HOLLYWOOD</span>
          </div>
        </div>

        {/* Giant Cinephile Typography & Overview */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar with hover overlay */}
            <div className="relative group">
              {userData.profileImage || previewImage ? (
                <img
                  src={previewImage || userData.profileImage}
                  alt={userData.name}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-cover border-2 border-black rounded-2xl shadow-md"
                />
              ) : (
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-black text-white flex items-center justify-center font-black text-3xl uppercase rounded-2xl border-2 border-black shadow-md">
                  {userData.name?.slice(0, 2) || 'CP'}
                </div>
              )}

              {isOwnProfile && (
                <button
                  type="button"
                  onClick={openEditProfile}
                  className="absolute inset-0 bg-black/60 rounded-2xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Change avatar"
                >
                  <Camera size={18} />
                  <span className="text-[10px] font-mono uppercase mt-1">Edit</span>
                </button>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.05em] uppercase leading-none font-uncut">
                  {userData.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-md bg-[#E60000]/10 text-[#E60000] border border-[#E60000]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Verified Archivist
                </span>
              </div>

              <p className="text-sm text-[#E60000] font-mono font-bold uppercase mt-2 flex items-center gap-2">
                <span>@{userData.username}</span>
                <span className="text-neutral-400">&bull;</span>
                <span className="text-neutral-500 font-normal normal-case font-serif-irregular italic text-sm">
                  Cinephile &amp; 70mm Enthusiast
                </span>
              </p>

              <p className="text-xs uppercase font-medium text-neutral-700 mt-3 max-w-xl border-l-2 border-[#E60000] pl-3 py-1 leading-relaxed">
                {userData.bio ||
                  'Obsessed with photochemical 70mm prints, dystopian neo-noir, Kubrickian compositions, and Wong Kar-wai color saturation.'}
              </p>
            </div>
          </div>

          {/* Action Button: Edit or Follow */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            {isOwnProfile ? (
              <button
                type="button"
                onClick={openEditProfile}
                className="px-6 py-3 bg-black hover:bg-[#E60000] text-white text-xs uppercase font-bold flex items-center gap-2 transition-all cursor-pointer rounded-xl shadow-lg hover:shadow-xl"
              >
                <Edit3 size={13} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFollowToggle}
                disabled={actionLoading}
                className={`px-6 py-3 text-xs uppercase font-bold flex items-center gap-2 transition-all cursor-pointer rounded-xl shadow-lg ${
                  isFollowing
                    ? 'border-2 border-black text-black hover:border-[#E60000] hover:text-[#E60000] bg-neutral-50'
                    : 'bg-[#E60000] text-white hover:bg-red-700'
                }`}
              >
                {actionLoading ? (
                  <span>Syncing...</span>
                ) : isFollowing ? (
                  <>
                    <UserCheck size={14} />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={14} />
                    <span>Follow Archivist</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Letterboxd-style Lifetime Cinema Statistics Bar */}
        <div className="mt-8 pt-5 border-t border-black grid grid-cols-3 sm:grid-cols-6 gap-4 text-xs uppercase font-semibold">
          <div className="border-r border-black/15 pr-3">
            <span className="font-bold text-xl sm:text-2xl block font-uncut tracking-tight">
              {userData.posts?.length || LIFETIME_STATS.filmsLogged}
            </span>
            <span className="text-neutral-500 text-[10px] font-mono tracking-wider">Films Logged</span>
          </div>

          <div className="border-r border-black/15 pr-3">
            <span className="font-bold text-xl sm:text-2xl block font-uncut tracking-tight">
              {LIFETIME_STATS.thisYear}
            </span>
            <span className="text-neutral-500 text-[10px] font-mono tracking-wider">This Year</span>
          </div>

          <div className="border-r border-black/15 pr-3">
            <span className="font-bold text-xl sm:text-2xl block font-uncut tracking-tight">
              {curatedLists.length}
            </span>
            <span className="text-neutral-500 text-[10px] font-mono tracking-wider">Curated Lists</span>
          </div>

          <div className="border-r border-black/15 pr-3">
            <span className="font-bold text-xl sm:text-2xl block font-uncut tracking-tight">
              {diaryEntries.length + 90}
            </span>
            <span className="text-neutral-500 text-[10px] font-mono tracking-wider">Reviews</span>
          </div>

          {/* Followers Clickable Modal */}
          <button
            type="button"
            onClick={() => setActiveListModal('followers')}
            className="text-left group cursor-pointer border-r border-black/15 pr-3"
          >
            <span className="font-bold text-xl sm:text-2xl block font-uncut tracking-tight group-hover:text-[#E60000] transition-colors">
              {userData.followers?.length || 0}
            </span>
            <span className="text-neutral-500 text-[10px] font-mono tracking-wider group-hover:underline">
              Followers
            </span>
          </button>

          {/* Following Clickable Modal */}
          <button
            type="button"
            onClick={() => setActiveListModal('following')}
            className="text-left group cursor-pointer"
          >
            <span className="font-bold text-xl sm:text-2xl block font-uncut tracking-tight group-hover:text-[#E60000] transition-colors">
              {userData.followings?.length || 0}
            </span>
            <span className="text-neutral-500 text-[10px] font-mono tracking-wider group-hover:underline">
              Following
            </span>
          </button>
        </div>
      </motion.section>

      {/* =========================================================================
          SECTION 2: FOUR FAVORITE FILMS (THE LETTERBOXD HALLMARK)
          ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-[94vw] max-w-[1580px] mx-auto mb-10 rounded-3xl border border-black/80 bg-white p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative z-10 select-none overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-black mb-6">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#E60000]" />
            <h2 className="text-xl sm:text-2xl font-black uppercase font-uncut tracking-tight">
              Four Favorite Films<span className="text-[#E60000]">.</span>
            </h2>
          </div>
          <span className="text-neutral-400 font-mono text-[11px] uppercase tracking-wider hidden sm:inline-block">
            PINNED CINEPHILE CANON
          </span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {fourFavorites.map((film, idx) => (
            <motion.div
              key={film.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onClick={() => setInspectFilm(film)}
              className="group relative rounded-2xl overflow-hidden border border-black/80 bg-black cursor-pointer shadow-lg flex flex-col"
            >
              {/* Poster / Still Image Container */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Index Pill in Top Left */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md border border-white/20 text-[10px] font-mono font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#E60000] inline-block rounded-xs" />
                  <span>0{idx + 1}</span>
                </div>

                {/* Star Rating Badge in Top Right */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/20">
                  {renderStars(film.rating)}
                </div>

                {/* Bottom title inside poster */}
                <div className="absolute bottom-3 inset-x-3 text-white">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#E60000] font-bold block mb-0.5">
                    {film.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black uppercase font-uncut tracking-tight leading-tight">
                    {film.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Card Strip */}
              <div className="p-3.5 bg-neutral-950 text-neutral-300 flex items-center justify-between text-xs border-t border-white/10">
                <div>
                  <p className="font-serif-irregular italic text-white text-xs truncate max-w-[170px]">
                    {film.director}
                  </p>
                  <p className="font-mono text-[10px] text-neutral-400 mt-0.5">
                    {film.year} &bull; {film.format}
                  </p>
                </div>

                <span className="p-1.5 rounded-lg bg-white/10 group-hover:bg-[#E60000] group-hover:text-white transition-colors text-neutral-300">
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* =========================================================================
          SECTION 3: TABBED CINEPHILE CONTENT SUITE
          Tabs: [ DIARY / RECENT LOGS ] [ WATCHLIST ] [ CURATED LISTS ] [ REVIEWS ]
          ========================================================================= */}
      <section className="w-[94vw] max-w-[1580px] mx-auto z-10">
        {/* Navigation Tabs Bar */}
        <div className="rounded-2xl border border-black/80 bg-white p-2.5 shadow-xl mb-8 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('diary')}
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'diary'
                  ? 'bg-black text-white'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <Clapperboard size={14} />
              <span>Diary / Recent Logs</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/20 text-white">
                {diaryEntries.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('watchlist')}
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'watchlist'
                  ? 'bg-black text-white'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <Bookmark size={14} />
              <span>Watchlist</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/20 text-white">
                {watchlistItems.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('lists')}
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'lists'
                  ? 'bg-black text-white'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <List size={14} />
              <span>Curated Lists</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/20 text-white">
                {curatedLists.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'bg-black text-white'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <Film size={14} />
              <span>Critiques</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-neutral-400 pr-3">
            <span>SHOWING ARCHIVE STREAM</span>
            <span>&bull;</span>
            <span className="text-[#E60000]">CHRONOLOGICAL</span>
          </div>
        </div>

        {/* =========================================================================
            TAB CONTENT 1: DIARY / RECENT LOGS
            ========================================================================= */}
        <AnimatePresence mode="wait">
          {activeTab === 'diary' && (
            <motion.div
              key="tab-diary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {diaryEntries.map((log) => (
                <article
                  key={log.id}
                  className="rounded-3xl border border-black/80 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row gap-6 lg:gap-10 transition-transform duration-300 hover:-translate-y-1 select-none"
                >
                  {/* Left: Film Widescreen Thumbnail */}
                  <div
                    onClick={() => setInspectFilm(log)}
                    className="relative w-full lg:w-[340px] xl:w-[400px] h-52 sm:h-64 rounded-2xl overflow-hidden border border-black/80 bg-black cursor-pointer group shrink-0"
                  >
                    <img
                      src={log.image}
                      alt={log.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                    {/* Venue Badge */}
                    <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-sm text-white px-3 py-1 rounded-lg border border-white/20 text-[10px] font-mono">
                      {log.venue}
                    </div>

                    {/* Inspect Icon */}
                    <div className="absolute top-3 right-3 p-2 bg-black/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Right: Review Details & Commentary */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Date & Star Strip */}
                      <div className="flex items-center justify-between pb-3 border-b border-black/15 text-xs">
                        <div className="flex items-center gap-3 font-mono">
                          <span className="w-2 h-2 bg-[#E60000] inline-block rounded-xs" />
                          <span className="font-bold text-black">{log.dateLogged}</span>
                          {log.isRewatch && (
                            <span className="flex items-center gap-1 text-[10px] text-neutral-500 uppercase">
                              <RotateCcw size={10} />
                              <span>Rewatch</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {renderStars(log.rating)}
                          <span className="text-[11px] font-mono font-bold text-neutral-600">
                            {log.rating}.0
                          </span>
                        </div>
                      </div>

                      {/* Title & Director */}
                      <div className="mt-3">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <h3
                            onClick={() => setInspectFilm(log)}
                            className="text-2xl sm:text-3xl font-black uppercase font-uncut tracking-tight hover:text-[#E60000] transition-colors cursor-pointer"
                          >
                            {log.title}
                          </h3>
                          <span className="text-sm font-mono text-neutral-400">({log.year})</span>
                        </div>
                        <p className="font-serif-irregular italic text-neutral-600 text-sm mt-0.5">
                          Directed by {log.director} &bull; Aspect Ratio {log.aspectRatio}
                        </p>
                      </div>

                      {/* Cinephile Review Body */}
                      <p className="mt-4 text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans border-l-2 border-black/30 pl-4 py-1">
                        &ldquo;{log.review}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-6 pt-3 border-t border-black/15 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-neutral-400">
                        GRAIN ARCHIVAL LOGBOOK #0{log.id.slice(-2)}
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleDiaryLike(log.id)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-bold uppercase transition-colors cursor-pointer ${
                            log.isLiked
                              ? 'bg-[#E60000] text-white border-[#E60000]'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:border-black'
                          }`}
                        >
                          <Heart size={12} fill={log.isLiked ? 'currentColor' : 'none'} />
                          <span>{log.likesCount}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setInspectFilm(log)}
                          className="px-3.5 py-1.5 bg-black hover:bg-[#E60000] text-white text-xs uppercase font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>Inspect</span>
                          <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          )}

          {/* =========================================================================
              TAB CONTENT 2: WATCHLIST
              ========================================================================= */}
          {activeTab === 'watchlist' && (
            <motion.div
              key="tab-watchlist"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {watchlistItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-black/80 bg-white overflow-hidden shadow-lg flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
                      {item.runtime}
                    </div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[10px] font-mono uppercase text-[#E60000] font-bold block">
                        {item.genre}
                      </span>
                      <h4 className="text-lg font-black uppercase font-uncut leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 bg-white">
                    <p className="font-serif-irregular italic text-xs text-neutral-700">
                      Dir. {item.director} &bull; {item.year}
                    </p>
                    <p className="font-mono text-[10px] text-neutral-400 mt-1">
                      Queued: {item.addedDate}
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleRemoveFromWatchlist(item.id)}
                        className="text-[11px] font-mono text-neutral-400 hover:text-[#E60000] uppercase font-bold cursor-pointer"
                      >
                        Remove
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          alert(`Marked "${item.title}" as watched! Added to your Diary.`)
                          handleRemoveFromWatchlist(item.id)
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-black text-white hover:bg-[#E60000] text-[11px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
                      >
                        <CheckCircle2 size={12} />
                        <span>Log Film</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* =========================================================================
              TAB CONTENT 3: CURATED LISTS
              ========================================================================= */}
          {activeTab === 'lists' && (
            <motion.div
              key="tab-lists"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {curatedLists.map((list) => (
                <article
                  key={list.id}
                  className="rounded-3xl border border-black/80 bg-white p-6 sm:p-8 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform"
                >
                  <div>
                    {/* Stacked covers */}
                    <div className="grid grid-cols-3 gap-2 h-36 rounded-xl overflow-hidden border border-black/80 mb-5 bg-neutral-900">
                      {list.covers.map((c, i) => (
                        <div key={i} className="relative h-full overflow-hidden">
                          <img
                            src={c}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-500 pb-2 border-b border-black/10 font-mono">
                      <span>{list.itemCount} FILMS ARCHIVED</span>
                      <span>UPDATED {list.updatedAt}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black uppercase font-uncut tracking-tight mt-3">
                      {list.title}
                    </h3>
                    <p className="text-xs text-neutral-600 font-sans mt-2 leading-relaxed">
                      {list.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleToggleListLike(list.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase transition-colors cursor-pointer ${
                        list.userLiked
                          ? 'bg-[#E60000] text-white border-[#E60000]'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:border-black'
                      }`}
                    >
                      <Heart size={12} fill={list.userLiked ? 'currentColor' : 'none'} />
                      <span>{list.likes}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => alert(`Opening curated collection "${list.title}"`)}
                      className="px-4 py-1.5 bg-black hover:bg-[#E60000] text-white text-xs uppercase font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Explore List</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </div>
                </article>
              ))}
            </motion.div>
          )}

          {/* =========================================================================
              TAB CONTENT 4: CRITIQUES & ESSAYS
              ========================================================================= */}
          {activeTab === 'reviews' && (
            <motion.div
              key="tab-reviews"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {diaryEntries.map((log) => (
                <div
                  key={`critique-${log.id}`}
                  className="rounded-3xl border border-black/80 bg-white p-6 sm:p-8 shadow-xl"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-black/10 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#E60000] rounded-xs" />
                      <span className="font-bold">{log.title.toUpperCase()}</span>
                      <span className="text-neutral-400">({log.year})</span>
                    </div>
                    <div>{renderStars(log.rating)}</div>
                  </div>

                  <h4 className="text-2xl font-black uppercase font-uncut tracking-tight mt-3">
                    On Spatial Architecture and Sensorial Sound
                  </h4>
                  <p className="font-serif-irregular italic text-neutral-600 text-sm mt-1">
                    An archival retrospective by {userData.name}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans">
                    {log.review}
                  </p>

                  <div className="mt-6 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>RECORDED AT {log.venue.toUpperCase()}</span>
                    <span className="text-black font-bold font-uncut uppercase cursor-pointer hover:text-[#E60000]">
                      Full Essay &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* =========================================================================
          FILM DETAIL INSPECT MODAL (LIGHTBOX)
          ========================================================================= */}
      <AnimatePresence>
        {inspectFilm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setInspectFilm(null)} />

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
                  src={inspectFilm.image}
                  alt={inspectFilm.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <button
                  type="button"
                  onClick={() => setInspectFilm(null)}
                  className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-[#E60000] text-white rounded-full transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-[#E60000] inline-block rounded-xs" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                      {inspectFilm.year} &bull; {inspectFilm.format || inspectFilm.aspectRatio || '70mm Widescreen'}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase font-uncut tracking-tight leading-none">
                    {inspectFilm.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-black/15">
                  <div>
                    <p className="font-serif-irregular italic text-sm text-neutral-800">
                      Directed by {inspectFilm.director}
                    </p>
                    {inspectFilm.cinematographer && (
                      <p className="font-mono text-[11px] text-neutral-500">
                        Cinematography by {inspectFilm.cinematographer}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {renderStars(inspectFilm.rating || 5)}
                    <span className="font-mono font-bold text-xs">
                      {inspectFilm.rating || 5}.0
                    </span>
                  </div>
                </div>

                {inspectFilm.quote && (
                  <p className="font-serif-irregular italic text-sm text-neutral-700 bg-neutral-100 p-3 rounded-xl border-l-2 border-[#E60000]">
                    &ldquo;{inspectFilm.quote}&rdquo;
                  </p>
                )}

                {inspectFilm.review && (
                  <div>
                    <h5 className="text-xs font-mono font-bold uppercase text-neutral-500 mb-1">
                      Cinephile Critique
                    </h5>
                    <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans">
                      {inspectFilm.review}
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-black/15 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-neutral-400">
                    PERMANENT ARCHIVE ENTRY
                  </span>

                  <button
                    type="button"
                    onClick={() => setInspectFilm(null)}
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

      {/* =========================================================================
          EDIT PROFILE MODAL
          ========================================================================= */}
      <AnimatePresence>
        {isOwnProfile && isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setIsEditOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative z-10 w-full max-w-md bg-white border border-black p-6 sm:p-8 text-black shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-black">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#E60000] rounded-xs" />
                  <span className="text-xs font-bold uppercase font-mono tracking-wider text-[#E60000]">
                    Edit Cinephile Dossier
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="text-black hover:text-[#E60000] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="mt-4 space-y-4 font-sans text-sm">
                <div>
                  <label className="block text-xs uppercase font-bold mb-1">Avatar Frame</label>
                  <div className="flex items-center gap-4 border border-black p-3 bg-neutral-50 rounded-2xl">
                    <img
                      src={
                        previewImage ||
                        userData?.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(editForm.name || 'User')}&background=000&color=fff`
                      }
                      alt="Profile preview"
                      className="w-14 h-14 object-cover border border-black rounded-xl"
                    />
                    <div className="flex-1">
                      <label className="inline-block px-3 py-1.5 bg-black text-white text-xs uppercase font-bold cursor-pointer hover:bg-[#E60000] transition-colors rounded-xl">
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      {selectedImage && (
                        <p className="mt-1 text-[10px] text-neutral-600 truncate max-w-[180px]">
                          {selectedImage.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold mb-1">Archivist Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="w-full border border-black px-3.5 py-2.5 text-black rounded-xl focus:outline-none focus:border-[#E60000]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                    className="w-full border border-black px-3.5 py-2.5 text-black rounded-xl focus:outline-none focus:border-[#E60000]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full border border-black px-3.5 py-2.5 text-black rounded-xl focus:outline-none focus:border-[#E60000]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold mb-1">Cinephile Bio</label>
                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleEditChange}
                    rows="3"
                    className="w-full border border-black px-3.5 py-2.5 text-black rounded-xl focus:outline-none focus:border-[#E60000] text-xs resize-none"
                    placeholder="Write your cinema philosophy, favorite directors, 70mm memories..."
                  />
                </div>

                <div className="pt-3 border-t border-black flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="px-4 py-2 border border-black text-xs uppercase cursor-pointer hover:bg-neutral-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white hover:bg-[#E60000] text-xs uppercase font-bold cursor-pointer transition-colors rounded-xl"
                  >
                    Save Dossier &rarr;
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          FOLLOWERS / FOLLOWING LIST MODAL
          ========================================================================= */}
      <AnimatePresence>
        {activeListModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setActiveListModal(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative z-10 w-full max-w-md bg-white border border-black p-6 sm:p-8 text-black shadow-2xl rounded-3xl max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-black mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#E60000] rounded-xs" />
                  <span className="text-xs font-bold uppercase text-[#E60000] font-mono">
                    {activeListModal === 'followers'
                      ? 'FOLLOWERS DOSSIER'
                      : 'FOLLOWING DOSSIER'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveListModal(null)}
                  className="text-black hover:text-[#E60000] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-neutral-200">
                {((activeListModal === 'followers' ? userData.followers : userData.followings) || [])
                  .length === 0 ? (
                  <p className="text-xs uppercase font-medium text-neutral-500 py-6 text-center font-mono">
                    NO {activeListModal.toUpperCase()} FOUND IN ARCHIVE.
                  </p>
                ) : (
                  (activeListModal === 'followers' ? userData.followers : userData.followings).map(
                    (user) => (
                      <div
                        key={user._id || user.username}
                        className="py-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              user.profileImage ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=000&color=fff`
                            }
                            alt={user.name}
                            className="w-10 h-10 border border-black object-cover rounded-xl"
                          />
                          <div>
                            <p className="font-bold text-xs uppercase">{user.name}</p>
                            <p className="text-[11px] text-[#E60000] font-semibold uppercase font-mono">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/profile/${user.username}`}
                          onClick={() => setActiveListModal(null)}
                          className="px-3 py-1 bg-black text-white text-[10px] uppercase font-bold hover:bg-[#E60000] transition-colors rounded-lg font-mono"
                        >
                          View &rarr;
                        </Link>
                      </div>
                    )
                  )
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Profile
