function SwissGridOverlay({ show }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-30 pointer-events-none max-w-[100vw] h-full flex px-4 sm:px-8">
      <div className="w-full h-full grid grid-cols-6 sm:grid-cols-12 gap-4 border-x border-[#E60000]/20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-[#E60000]/15 flex flex-col justify-between py-2 text-[9px] font-telemetry text-[#E60000]/40 select-none"
          >
            <span>COL {String(i + 1).padStart(2, '0')}</span>
            <span>GRID 12</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SwissGridOverlay
