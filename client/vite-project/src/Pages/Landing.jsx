import { useState, useRef } from 'react'
import SwissGridOverlay from '../components/SwissGridOverlay'
import CylindricalStack from '../components/CylindricalStack'
import Hero from '../components/Hero'
import CoreOfferingCard from '../components/cards/CoreOfferingCard'
import ShowcaseCard from '../components/cards/ShowcaseCard'
import ProofMetricsCard from '../components/cards/ProofMetricsCard'

function Landing() {
  const [showGrid, setShowGrid] = useState(false)
  const stackRef = useRef(null)

  return (
    <div className="min-h-screen bg-[#090909] text-white font-sans antialiased selection:bg-[#E60000] selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Swiss Architectural 12-Column Construction Grid Overlay */}
      <SwissGridOverlay show={showGrid} />

      {/* 3D FILM REEL PROJECTOR GATE PRESENTATION */}
      <main className="w-full relative z-20">
        <CylindricalStack
          ref={stackRef}
          cardTitles={['Cinema', 'Track', 'Curate', 'Watchlist']}
          showGrid={showGrid}
          setShowGrid={setShowGrid}
        >
          {/* CARD 1: THE FILM PLATFORM (Blade Runner 2049) */}
          <Hero />

          {/* CARD 2: TRACK & LOG (2001: A Space Odyssey - 3.png) */}
          <CoreOfferingCard />

          {/* CARD 3: CURATE & LISTS (Troy - 2.png) */}
          <ShowcaseCard />

          {/* CARD 4: WATCHLIST & COMMUNITY (Moonlight - 1.webp) */}
          <ProofMetricsCard />
        </CylindricalStack>
      </main>
    </div>
  )
}

export default Landing