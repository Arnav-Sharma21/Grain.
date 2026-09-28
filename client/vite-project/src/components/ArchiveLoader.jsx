function ArchiveLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-[#090909] text-white flex flex-col items-center justify-center select-none font-sans antialiased">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#E60000] inline-block rounded-xs animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">
            GRAIN ARCHIVE
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          BASEL &bull; SWITZERLAND
        </span>
      </div>
    </div>
  )
}

export default ArchiveLoader
