import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import moonlightImg from '../../assets/cards/1.webp'

function ProofMetricsCard() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Layer 0: Full-Bleed Background Cinema Still with Slow Cinematic Scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={moonlightImg}
          alt="Moonlight - Barry Jenkins"
          loading="eager"
          decoding="async"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2.6, ease: [0.08, 0.82, 0.17, 1] }}
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />
        {/* Subtle Bottom Ambient Gradient for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/25 pointer-events-none" />
      </div>

      {/* Layer 1: Monumental Title Rising From Below (Hero Style) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none overflow-hidden pb-[14vh] sm:pb-[18vh]">
        <motion.div
          initial={{ y: '135%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2.6,
            delay: 0.2,
            ease: [0.08, 0.82, 0.17, 1],
          }}
          className="flex items-center justify-center"
        >
          <h2 className="font-display font-medium uppercase tracking-[-0.14em] leading-none text-white/90 select-none text-center whitespace-nowrap text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
            WATCHLIST<span className="text-[#E60000]">.</span>
          </h2>
        </motion.div>
      </div>

      {/* Layer 2: Meaningful Cinephile Captions, Actions & Film Credit */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-10 lg:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-5 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <p className="font-sans text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed font-light mb-4">
            Never forget a film to watch. Save upcoming releases and festival gems to your watchlist, follow fellow cinephiles, and track what your friends are streaming.
          </p>

          {/* Clean Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/signup"
              className="px-5 sm:px-6 py-2 sm:py-2.5 bg-white text-black hover:bg-[#E60000] hover:text-white transition-all text-xs font-bold font-mono uppercase tracking-wider rounded-lg shadow-lg cursor-pointer"
            >
              Start Film Diary
            </Link>
            <Link
              to="/login"
              className="px-5 sm:px-6 py-2 sm:py-2.5 border border-white/40 hover:border-white text-white hover:bg-white/10 transition-all text-xs font-bold font-mono uppercase tracking-wider rounded-lg backdrop-blur-sm cursor-pointer"
            >
              Cinephile Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-left sm:text-right shrink-0 pointer-events-none"
        >
          <span className="font-sans text-xs text-neutral-400 font-light">
            Moonlight (2016) &bull; Barry Jenkins
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default ProofMetricsCard
