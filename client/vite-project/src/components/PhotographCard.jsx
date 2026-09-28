import { motion } from 'framer-motion'
import { Heart, Maximize2 } from 'lucide-react'
import { Link } from 'react-router-dom'

function PhotographCard({ photo, index, onSelect, onToggleLike }) {
  const indexFormatted = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border border-black/80 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black text-[11px] uppercase font-bold bg-white">
        <div className="flex items-center gap-2">
          <span className="text-white bg-black px-1.5 py-0.5 rounded-sm">
            {indexFormatted}
          </span>
          <span className="tracking-tight font-uncut">{photo.title}</span>
        </div>
        <span className="text-neutral-500 text-[10px] font-mono">{photo.location}</span>
      </div>

      {/* Photograph Frame */}
      <div
        onClick={() => onSelect(photo)}
        className="relative overflow-hidden cursor-pointer bg-black aspect-[4/5] sm:aspect-[3/4]"
      >
        <img
          src={photo.image}
          alt={photo.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover Vignette & Maximize Icon */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-start justify-end">
          <span className="w-8 h-8 bg-black text-white flex items-center justify-center border border-white/30 text-xs rounded-lg shadow-lg">
            <Maximize2 size={13} />
          </span>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="p-3 bg-white border-t border-black flex items-center justify-between text-xs font-bold">
        <Link
          to={`/profile/${photo.username}`}
          className="hover:text-[#E60000] uppercase tracking-tight truncate font-mono text-[11px]"
        >
          @{photo.username}
        </Link>

        <button
          onClick={() => onToggleLike(photo.id)}
          className={`flex items-center gap-1.5 px-2.5 py-1 border text-[10px] uppercase font-bold transition-colors cursor-pointer rounded-lg ${
            photo.isLiked
              ? 'bg-[#E60000] text-white border-[#E60000]'
              : 'border-black/30 hover:border-black text-black'
          }`}
        >
          <Heart size={11} fill={photo.isLiked ? 'currentColor' : 'none'} />
          <span>{photo.likes || 0}</span>
        </button>
      </div>
    </motion.article>
  )
}

export default PhotographCard
