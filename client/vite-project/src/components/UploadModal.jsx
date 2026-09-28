import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function UploadModal({ isOpen, onClose, onAddPhoto }) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    series: '',
    image: '',
    category: 'Architecture',
    location: 'Basel, Switzerland'
  })
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.image) {
      alert('Please provide a title and an image URL.')
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      const newEntry = {
        id: `swiss-${Date.now()}`,
        title: formData.title,
        series: formData.series || 'Independent Works',
        photographer: user?.name || 'Photographer',
        username: user?.username || 'photographer',
        avatar: user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=E60000&color=fff`,
        image: formData.image,
        category: formData.category,
        year: '2026',
        location: formData.location || 'Undisclosed',
        likes: 0,
        isLiked: false,
        saved: false
      }

      onAddPhoto(newEntry)
      setSubmitting(false)
      onClose()
    }, 300)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative z-10 w-full max-w-lg bg-white border border-black/80 text-black shadow-2xl p-6 sm:p-8 rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black">
            <div className="flex items-center gap-2">
              <Upload size={18} className="text-[#E60000]" />
              <h2 className="text-2xl font-black uppercase tracking-tight font-uncut">
                Publish Monograph
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-[#E60000] cursor-pointer rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-sm font-sans">
            <div>
              <label className="block text-[11px] font-mono uppercase font-bold text-neutral-700 mb-1">
                Photograph Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Concrete Echoes"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-black rounded-lg px-3.5 py-2.5 text-black focus:outline-none focus:border-[#E60000]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase font-bold text-neutral-700 mb-1">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.image}
                onChange={handleChange}
                className="w-full border border-black rounded-lg px-3.5 py-2.5 text-black focus:outline-none focus:border-[#E60000]"
              />
            </div>

            {/* Preview if exists */}
            {formData.image && (
              <div className="relative aspect-[16/9] bg-black border border-black rounded-xl overflow-hidden shadow-inner">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-neutral-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-black rounded-lg px-3 py-2 text-black bg-white focus:outline-none focus:border-[#E60000] cursor-pointer"
                >
                  <option value="Architecture">Architecture</option>
                  <option value="Brutalist">Brutalist</option>
                  <option value="Street">Street</option>
                  <option value="Minimal">Minimal</option>
                  <option value="Landscape">Landscape</option>
                  <option value="Portrait">Portrait</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-neutral-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Zurich, Switzerland"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-black rounded-lg px-3 py-2 text-black focus:outline-none focus:border-[#E60000]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-black flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-black rounded-lg text-xs uppercase font-bold text-black hover:bg-neutral-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-black hover:bg-[#E60000] text-white text-xs uppercase font-bold transition-colors cursor-pointer rounded-lg shadow-md"
              >
                {submitting ? 'Uploading...' : 'Publish &rarr;'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default UploadModal
