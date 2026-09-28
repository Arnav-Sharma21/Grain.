import { motion, useScroll, useTransform } from 'framer-motion'
import bladeRunnerBg from '../assets/blade_runner_bg.webp'
import bladeRunnerFg from '../assets/blade_runner_fg_full.webp'
import originalHeroBg from '../assets/hero-bg.jpg'
import originalHeroFg from '../assets/hero-fg.png'

function Hero({
  heroScale: externalHeroScale,
  textParallaxY: externalTextParallaxY,
  useBladeRunner = true,
  customBgImage,
  customFgImage,
}) {
  const { scrollY } = useScroll()
  const defaultHeroScale = useTransform(scrollY, [0, 800], [1, 1.05])
  const defaultTextParallaxY = useTransform(scrollY, [0, 600], [0, -70])

  const heroScale = externalHeroScale !== undefined ? externalHeroScale : defaultHeroScale
  const textParallaxY = externalTextParallaxY !== undefined ? externalTextParallaxY : defaultTextParallaxY

  const activeBg = customBgImage || (useBladeRunner ? bladeRunnerBg : originalHeroBg)
  const activeFg = customFgImage !== undefined ? customFgImage : (useBladeRunner ? bladeRunnerFg : originalHeroFg)

  return (
    <section className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Layer 0: Full-Bleed Background Photograph */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={activeBg}
          alt="Atmospheric Background Environment"
          loading="eager"
          decoding="async"
          style={{ scale: heroScale }}
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />
        {/* Subtle ambient bottom gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Layer 1: Monumental Title Rising Slowly From Below Behind The Subject Monolith */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none overflow-hidden pb-[10vh] sm:pb-[14vh]">
        <motion.div
          initial={{ y: "135%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 2.8,
            delay: 0.35,
            ease: [0.08, 0.82, 0.17, 1],
          }}
          style={{ y: textParallaxY }}
          className="flex items-center justify-center"
        >
          <h1 className="font-display font-medium uppercase tracking-[-0.15em] leading-none text-black select-none text-center whitespace-nowrap text-[27vw] sm:text-[25vw] md:text-[23vw] lg:text-[21vw] relative -left-[1%]">
            GRAIN<span className="text-[#E60000]">.</span>
          </h1>
        </motion.div>
      </div>

      {/* Layer 2: Foreground Transparent Cutout Monolith */}
      {activeFg && (
        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
          <motion.img
            src={activeFg}
            alt="Foreground Cutout"
            loading="eager"
            decoding="async"
            style={{ scale: heroScale }}
            className="w-full h-full object-cover object-center pointer-events-none select-none"
          />
        </div>
      )}

      {/* Layer 3: Clean Cinephile Tagline */}
      <div className="absolute inset-x-0 bottom-0 z-30 p-6 sm:p-10 lg:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <p className="font-sans text-xs sm:text-sm lg:text-base text-neutral-300 leading-relaxed font-light">
            The social network for cinema lovers. Track every film you watch, curate custom lists, and explore masterworks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-left sm:text-right shrink-0"
        >
          <span className="font-sans text-xs text-neutral-400 font-light">
            Blade Runner 2049 (2017) &bull; Denis Villeneuve
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
