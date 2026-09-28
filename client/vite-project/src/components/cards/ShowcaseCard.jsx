import { motion } from 'framer-motion'
import odyssey2026Img from '../../assets/cards/2.png'

function ShowcaseCard() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Layer 0: Full-Bleed Background Cinema Still with Slow Cinematic Scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={odyssey2026Img}
          alt="The Odyssey - Christopher Nolan"
          loading="eager"
          decoding="async"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2.6, ease: [0.08, 0.82, 0.17, 1] }}
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />
        {/* Subtle Bottom Ambient Gradient for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Layer 1: Monumental Title Rising From Below (Hero Style with text-black against the sunlit sky) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none overflow-hidden pb-[12vh] sm:pb-[16vh]">
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
          <h2 className="font-display font-medium uppercase tracking-[-0.14em] leading-none text-black select-none text-center whitespace-nowrap text-[27vw] sm:text-[25vw] md:text-[23vw] lg:text-[21vw]">
            CURATE<span className="text-[#E60000]">.</span>
          </h2>
        </motion.div>
      </div>

      {/* Layer 2: Meaningful Cinephile Captions & Film Credit */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-10 lg:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <p className="font-sans text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed font-light">
            Build and share custom film lists. Rank masterworks, organize themed marathons, compile complete director retrospectives, and discover lists created by fellow cinephiles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-left sm:text-right shrink-0"
        >
          <span className="font-sans text-xs text-neutral-300 font-light">
            The Odyssey (2026) &bull; Christopher Nolan
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default ShowcaseCard
