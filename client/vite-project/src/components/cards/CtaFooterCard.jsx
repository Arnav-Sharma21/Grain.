import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import heroArchImg from '../../assets/hero-bg.jpg'

function CtaFooterCard({ onScrollToTop }) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-8 lg:p-10 bg-[#080808] text-white select-none relative overflow-y-auto font-sans antialiased">
      {/* Background Architectural Monolith (Muted Silver-Gelatin) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img
          src={heroArchImg}
          alt="Silver Gelatin Architecture"
          className="w-full h-full object-cover object-center grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-[#080808]/90" />
      </div>

      {/* Subtle Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] z-0" />

      {/* Top Metadata */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/20 z-10 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#E60000] inline-block rounded-xs" />
          <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
            05 / 05 &bull; ENROLLMENT
          </span>
          <span className="text-neutral-500 font-light hidden sm:inline">&bull;</span>
          <span className="font-serif-irregular italic text-xs text-neutral-400 font-normal hidden sm:inline">
            Publish Your Monograph
          </span>
        </div>
        <div className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
          JOIN THE ARCHIVE
        </div>
      </div>

      {/* Center: Monumental Brand Title & Action Callout */}
      <div className="my-auto py-6 sm:py-10 text-center space-y-5 max-w-4xl mx-auto z-10">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#E60000] font-bold block mb-2">
            THE ARCHIVE AWAITS
          </span>
          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black font-uncut uppercase tracking-tight text-white leading-none">
            GRAIN<span className="text-[#E60000]">.</span>
          </h2>
          <div className="text-xl sm:text-3xl lg:text-4xl font-serif-irregular italic font-light text-neutral-400 mt-2">
            A Permanent Home for Lens-Based Artists
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
          Step into a quiet, uncompressed space built for photographic depth. Publish your first monograph series and join a global network of curators and visual artists.
        </p>

        {/* CTA Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/signup"
            className="px-8 py-3.5 bg-[#E60000] hover:bg-red-700 text-white text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2 transition-all rounded-xl shadow-2xl font-mono"
          >
            <span>Create Account</span>
            <ArrowUpRight size={14} />
          </Link>
          <Link
            to="/login"
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs uppercase tracking-widest font-bold inline-flex items-center transition-all rounded-xl backdrop-blur-sm font-mono"
          >
            Sign In
          </Link>
          {onScrollToTop && (
            <button
              onClick={onScrollToTop}
              className="px-4 py-3.5 border border-white/15 hover:border-white/40 text-neutral-400 hover:text-white text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-all rounded-xl cursor-pointer font-mono"
              title="Return to Hero Monolith"
            >
              <ArrowUp size={13} />
              <span>Top</span>
            </button>
          )}
        </div>

        {/* Curatorial Hub Directory */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 text-left border-t border-white/10 max-w-2xl mx-auto text-[11px] font-mono text-neutral-400">
          <div>
            <span className="text-white font-bold block mb-1">CURATION</span>
            <span>Annual Selection</span>
            <br />
            <span>Printed Monographs</span>
          </div>
          <div>
            <span className="text-white font-bold block mb-1">HUBS</span>
            <span>Basel &bull; Tokyo</span>
            <br />
            <span>Zurich &bull; New York</span>
          </div>
          <div>
            <span className="text-white font-bold block mb-1">MEDIUMS</span>
            <span>Medium Format</span>
            <br />
            <span>Large Format 4x5</span>
          </div>
          <div>
            <span className="text-white font-bold block mb-1">NETWORK</span>
            <span>Zero Algorithms</span>
            <br />
            <span>100% Lossless</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Row */}
      <footer className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-white/20 gap-2 text-xs font-mono text-neutral-500 uppercase z-10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#E60000] inline-block rounded-xs" />
          <span className="text-white font-bold">GRAIN. &bull; 2026 ARCHIVE</span>
        </div>
        <div className="text-[11px]">
          BASEL &bull; TOKYO &bull; ZURICH &bull; NEW YORK
        </div>
      </footer>
    </div>
  )
}

export default CtaFooterCard
