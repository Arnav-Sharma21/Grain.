import {
  Children,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Grid } from 'lucide-react'
import { CylindricalStackContext } from '../context/CylindricalStackContext'

gsap.registerPlugin(ScrollTrigger)

/**
 * CylindricalStack:
 * A Cinematic Film Reel Projector Gate.
 * The outer black margins and border gate remain 100% stationary throughout,
 * while only the film frames in the center aperture roll through vertically like celluloid film.
 */
const CylindricalStack = forwardRef(function CylindricalStack(
  {
    children,
    cardTitles = ['Cinema', 'Track', 'Curate', 'Watchlist'],
    className = '',
    onActiveIndexChange,
    showGrid,
    setShowGrid,
  },
  ref
) {
  const containerRef = useRef(null)
  const pinRef = useRef(null)
  const stageRef = useRef(null)
  const cardRefs = useRef([])
  const lenisRef = useRef(null)
  const scrollTriggerRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const cards = Children.toArray(children)
  const totalCards = cards.length

  // Programmatically scroll directly to a specific card
  const scrollToCard = (index) => {
    if (index < 0 || index >= totalCards) return
    const st = scrollTriggerRef.current
    if (st && lenisRef.current) {
      const start = st.start
      const end = st.end
      const scrollDistance = end - start
      const targetScroll = start + (index / (totalCards - 1)) * scrollDistance
      lenisRef.current.scrollTo(targetScroll, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      const cardHeight = window.innerHeight
      window.scrollTo({
        top: index * cardHeight,
        behavior: 'smooth',
      })
    }
  }

  useImperativeHandle(ref, () => ({
    scrollToCard,
    activeIndex,
    totalCards,
  }))

  useEffect(() => {
    if (totalCards <= 1) return

    // 1. Initialize Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // 2. Build GSAP Film Reel context
    const ctx = gsap.context(() => {
      const cardEls = cardRefs.current.filter(Boolean)
      const n = cardEls.length

      // Initial state: Card 0 is in the projector gate.
      // All subsequent cards wait below the gate (yPercent: 100).
      cardEls.forEach((el, i) => {
        gsap.set(el, {
          yPercent: i === 0 ? 0 : 100,
          zIndex: i === 0 ? 10 : 5,
          willChange: 'transform',
        })
      })

      // Master scrub timeline pinned across scroll distance
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${(n - 1) * 100}%`,
          pin: pinRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress
            setScrollProgress(progress)
            const calculatedIndex = Math.min(
              n - 1,
              Math.max(0, Math.floor(progress * (n - 1) + 0.5))
            )
            setActiveIndex(calculatedIndex)
            if (onActiveIndexChange) {
              onActiveIndexChange(calculatedIndex)
            }
          },
        },
      })

      scrollTriggerRef.current = masterTl.scrollTrigger

      // Build the vertical film reel transitions through the fixed projector gate
      for (let k = 0; k < n - 1; k++) {
        const stepTime = k

        // Outgoing frame k: rolls upward out of the gate
        masterTl.to(
          cardEls[k],
          {
            yPercent: -100,
            ease: 'power2.inOut',
            duration: 1,
          },
          stepTime
        )

        // Incoming frame k + 1: rolls up into the gate from below
        masterTl.to(
          cardEls[k + 1],
          {
            yPercent: 0,
            ease: 'power2.inOut',
            duration: 1,
          },
          stepTime
        )
      }
    }, containerRef)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ctx.revert()
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
      scrollTriggerRef.current = null
    }
  }, [totalCards, onActiveIndexChange])

  return (
    <CylindricalStackContext.Provider value={{ scrollToCard, activeIndex, totalCards }}>
      <div
        ref={containerRef}
        className={`relative w-full ${className}`}
        style={{ height: `${totalCards * 100}vh` }}
      >
        {/* Pinned Viewport Container */}
        <div
          ref={pinRef}
          className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex flex-col items-center justify-center bg-[#090909] select-none"
        >
          {/* Subtle Swiss Architectural Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* TOP MARGIN BAR (Permanent, consistent across all cards) */}
          <header className="absolute top-3 sm:top-5 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between pointer-events-auto">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="w-5 h-5 bg-[#E60000] text-white flex items-center justify-center font-bold text-[11px] rounded-xs">
                +
              </span>
              <span className="text-lg font-black tracking-tighter uppercase font-uncut text-white">
                GRAIN<span className="text-[#E60000]">.</span>
              </span>
              <span className="hidden sm:inline font-mono text-[10px] text-neutral-400 uppercase tracking-widest pl-2 border-l border-white/20">
                FILM ARCHIVE &amp; SOCIAL DIARY
              </span>
            </Link>

            <div className="flex items-center gap-3 sm:gap-4">
              {setShowGrid !== undefined && (
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    showGrid
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 text-neutral-300 border-white/20 hover:border-white/50'
                  }`}
                >
                  <Grid size={11} />
                  <span>Grid {showGrid ? 'On' : 'Off'}</span>
                </button>
              )}

              <Link
                to="/login"
                className="px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 bg-[#E60000] hover:bg-red-600 text-white text-xs font-mono uppercase font-bold tracking-wider rounded-md transition-colors shadow-sm"
              >
                Join
              </Link>
            </div>
          </header>

          {/* FIXED FILM GATE APERTURE (Permanent stationary border & rounded frame) */}
          <div
            ref={stageRef}
            className="relative w-[92vw] max-w-[1580px] h-[84vh] sm:h-[82vh] max-h-[880px] min-h-[540px] mx-auto z-10 rounded-2xl sm:rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] bg-black overflow-hidden select-none"
          >
            {/* The Film Frames Moving Through The Gate */}
            {cards.map((child, index) => {
              const isActive = activeIndex === index
              return (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="card-slot absolute inset-0 w-full h-full overflow-hidden select-none"
                  style={{
                    pointerEvents: isActive ? 'auto' : 'none',
                    zIndex: isActive ? 10 : 5,
                  }}
                >
                  {child}
                </div>
              )
            })}
          </div>

          {/* RIGHT MARGIN HUD (Stationary Index Controls) */}
          <aside className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3 text-white pointer-events-auto">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2 border-b border-white/20 pb-1">
              INDEX
            </div>
            {cards.map((_, idx) => {
              const isCurrent = activeIndex === idx
              const title = cardTitles[idx] || `Stage 0${idx + 1}`
              return (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={`group flex items-center gap-3 transition-all cursor-pointer text-right ${
                    isCurrent ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <span className="text-[11px] font-mono tracking-wider transition-colors">
                    <span className={isCurrent ? 'text-[#E60000] font-bold' : ''}>
                      0{idx + 1}
                    </span>{' '}
                    <span className="font-uncut uppercase tracking-wider text-[10px] opacity-80 group-hover:opacity-100">
                      {title}
                    </span>
                  </span>
                  <span
                    className={`h-0.5 transition-all duration-300 ${
                      isCurrent
                        ? 'w-7 bg-[#E60000]'
                        : 'w-3 bg-white/30 group-hover:w-5 group-hover:bg-white/70'
                    }`}
                  />
                </button>
              )
            })}
          </aside>

          {/* BOTTOM MARGIN HUD (Stationary Scrubber Bar) */}
          <div className="absolute bottom-3 sm:bottom-4 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-400 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#E60000] inline-block" />
              <span className="text-white font-medium">GRAIN CINEMA ARCHIVE</span>
            </div>
            <div className="flex items-center gap-3">
              <span>0{activeIndex + 1} OF 0{totalCards}</span>
              <div className="w-16 h-1 bg-white/20 overflow-hidden rounded-full hidden sm:block">
                <div
                  className="h-full bg-[#E60000] transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CylindricalStackContext.Provider>
  )
})

export default CylindricalStack
