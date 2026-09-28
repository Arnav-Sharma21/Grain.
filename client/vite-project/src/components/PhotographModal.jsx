import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

function PhotographModal({ photo, onClose, onToggleLike }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  if (!photo) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md text-white select-none">
        {/* Dismiss Backdrop */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* FLOATING LIGHTBOX CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-[94vw] max-w-[1400px] max-h-[90vh] rounded-2xl overflow-hidden border border-white/25 bg-black/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar inside Card */}
          <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/95 to-transparent border-b border-white/10 z-20">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#E60000] inline-block rounded-xs"></span>
              <span className="font-bold text-white text-base sm:text-xl font-uncut">{photo.title}</span>
              {photo.location && (
                <>
                  <span className="text-neutral-500 hidden sm:inline">&bull;</span>
                  <span className="font-serif-irregular italic text-neutral-300 text-sm hidden sm:inline">
                    {photo.location}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleLike && onToggleLike(photo.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                  photo.isLiked
                    ? 'bg-[#E60000] text-white border-[#E60000]'
                    : 'border-white/30 text-white hover:border-white bg-white/5'
                }`}
              >
                <Heart size={13} fill={photo.isLiked ? 'currentColor' : 'none'} />
                <span>{photo.likes || 0}</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/30 hover:border-white hover:bg-white/10 transition-colors cursor-pointer text-white"
                title="Close (ESC)"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Center Image Container */}
          <div className="relative flex-1 max-h-[70vh] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            <img
              src={photo.image}
              alt={photo.title}
              className="max-h-[66vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Bottom Bar inside Card */}
          <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-t from-black/95 to-transparent border-t border-white/10 z-20">
            <Link
              to={photo.username ? `/profile/${photo.username}` : '#'}
              onClick={photo.username ? onClose : undefined}
              className="text-white hover:text-[#E60000] transition-colors font-mono font-bold text-xs uppercase"
            >
              {photo.photographer || (photo.username ? `@${photo.username}` : 'Monograph Artist')}
            </Link>

            <span className="text-neutral-400 text-[11px] font-mono uppercase tracking-wider border border-white/20 px-2.5 py-1 rounded-md">
              {photo.category}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default PhotographModal
