import { motion } from 'framer-motion'
import spaceOdysseyImg from '../../assets/cards/3.png'

function CoreOfferingCard() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Layer 0: Full-Bleed Background Cinema Still with Slow Cinematic Scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={spaceOdysseyImg}
          alt="2001: A Space Odyssey - Stanley Kubrick"
          loading="eager"
          decoding="async"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2.6, ease: [0.08, 0.82, 0.17, 1] }}
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none" />
      </div>

      {/* Layer 1: Monumental Title Rising From Below (Hero Style) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none overflow-hidden pb-[10vh] sm:pb-[14vh]">
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
          <h2 className="font-display font-medium uppercase tracking-[-0.14em] leading-none text-white/95 select-none text-center whitespace-nowrap text-[27vw] sm:text-[25vw] md:text-[23vw] lg:text-[21vw] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
            TRACK<span className="text-[#E60000]">.</span>
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
            Log every film you watch. Rate with precision, record viewing dates, write personal reviews, and compile your lifetime cinema diary.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-left sm:text-right shrink-0"
        >
          <span className="font-sans text-xs text-neutral-400 font-light">
            2001: A Space Odyssey (1968) &bull; Stanley Kubrick
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default CoreOfferingCard
