import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXHIBITION_SLIDES } from '../data';
import { AppTheme } from '../types';

interface ExhibitionViewProps {
  theme: AppTheme;
}

export const ExhibitionView: React.FC<ExhibitionViewProps> = ({ theme }) => {
  // Gallery slider state
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  // Custom poster designer state
  const [posterTitle, setPosterTitle] = useState('CRUNCHY BREAD!');
  const [posterSubtitle, setPosterSubtitle] = useState('MADE IN DAEJEON');
  const [posterComicWord, setPosterComicWord] = useState('POW!');
  const [posterColor, setPosterColor] = useState<'YELLOW' | 'MAGENTA' | 'CYAN' | 'GRAIN'>('YELLOW');
  const [posterRotated, setPosterRotated] = useState(true);
  const [posterCreatedList, setPosterCreatedList] = useState<string[]>([]);
  const [creatorStampUnlocked, setCreatorStampUnlocked] = useState(false);

  const activeSlide = EXHIBITION_SLIDES[activeSlideIdx];

  const handleNextSlide = () => {
    setActiveSlideIdx((prev) => (prev + 1) % EXHIBITION_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlideIdx((prev) => (prev - 1 + EXHIBITION_SLIDES.length) % EXHIBITION_SLIDES.length);
  };

  const saveCustomPoster = () => {
    setPosterCreatedList([...posterCreatedList, `${posterComicWord} — ${posterTitle}`]);
    setCreatorStampUnlocked(true);
    alert(`🎨 POP-ART POSTER LOCKED IN AT THE GALLERY! (Title: "${posterTitle}"). Check out your virtual exhibition space at the bottom.`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
      
      {/* SECTION 1: Vintage Bakery Virtual Slideshow (Columns 12) */}
      <div className="col-span-1 md:col-span-12 bg-white text-black border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        <div className="absolute top-4 right-4 bg-black text-[#f3e700] px-3.5 py-1 font-accent text-xs tracking-wider border-2 border-white z-10 select-none">
          EXHIBIT ROOM #043
        </div>

        <h2 className="font-accent text-3xl md:text-5xl uppercase text-slate-900 leading-none tracking-tight mb-2">
          THE VIRTUAL COMIC GALLERY
        </h2>
        <p className="font-serif font-black underline decoration-4 decoration-[#b30069] text-base md:text-lg mb-8 text-[#b30069]">
          1956-2026: The Graphic Arts & Sound Waves of Dough
        </p>

        {/* Slideshow Display Vault */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t-4 border-black pt-8 items-center">
          
          {/* Slide Visual (Left half) */}
          <div className="relative bg-[#eee] border-4 border-black min-h-[300px] md:min-h-[380px] flex flex-col justify-between overflow-hidden brutal-shadow">
            {/* Background pattern */}
            <div className="absolute inset-0 halftone-bg opacity-20 pointer-events-none" />
            
            {/* Visual hotlink image representation */}
            <div className="w-full flex-1 flex items-center justify-center relative p-6">
              {activeSlide.image ? (
                <div className="w-full h-[280px] border-4 border-black relative">
                  <img
                    alt={activeSlide.title}
                    className="w-full h-full object-cover grayscale contrast-150 mix-blend-multiply"
                    src={activeSlide.image}
                  />
                  <div className="absolute inset-0 bg-[#f3e700]/30 mix-blend-color pointer-events-none" />
                </div>
              ) : (
                /* Fallback stylized comic sketch card for older ovens or sharing */
                <div className="border-4 border-black p-6 bg-white w-full h-[240px] flex flex-col justify-center items-center shadow-inner relative overflow-hidden">
                  <div className="absolute top-2 left-2 font-mono text-4xs font-black text-gray-400">1956_ARCHIVES</div>
                  {activeSlide.id === 'exhibit-oven' ? (
                    <span className="material-symbols-outlined text-7xl text-black font-black">oven_gen</span>
                  ) : (
                    <span className="material-symbols-outlined text-7xl text-black font-black">diversity_1</span>
                  )}
                  <span className="font-accent text-red-500 text-3xl tracking-widest mt-2 block animate-pulse">
                    OVEN POWERED
                  </span>
                </div>
              )}

              {/* Float pop-art text bubble absolute */}
              <motion.div
                key={activeSlide.soundBubble}
                animate={{ scale: [1, 1.1, 1], rotate: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute rotate-[-12deg] bg-[#f3e700] border-4 border-black px-6 py-2.5 font-accent text-xl md:text-2xl text-black tracking-widest z-10 bottom-2 right-2 shadow-[3px_3px_0px_0px_#000]"
              >
                {activeSlide.soundBubble}
              </motion.div>
            </div>

            {/* Bottom tape metadata */}
            <div className="bg-black text-white p-3 border-t-4 border-black flex justify-between font-accent text-sm md:text-base">
              <span>TAG: {activeSlide.id.toUpperCase()}</span>
              <span className="text-[#f3e700] font-bold">TIMECODE: {activeSlide.year}</span>
            </div>
          </div>

          {/* Slide Description (Right half) */}
          <div className="flex flex-col justify-between h-full gap-4">
            <div>
              <span className="font-accent text-black text-2xl bg-[#f3e700] border-2 border-black px-3.5 py-0.5 inline-block mb-3">
                STEP {activeSlideIdx + 1} OF 3
              </span>
              <h3 className="font-accent text-2xl md:text-4xl text-black leading-none uppercase mb-1">
                {activeSlide.title}
              </h3>
              <h4 className="font-serif font-black italic text-neutral-600 text-sm md:text-base mb-4">
                {activeSlide.koreanTitle}
              </h4>
              <p className="font-serif text-neutral-800 leading-relaxed text-base md:text-lg">
                {activeSlide.description}
              </p>
            </div>

            {/* Fact container tape */}
            <div className="border-l-8 border-[#b30069] pl-4 bg-neutral-50 px-3 py-3 brutal-border my-2">
              <span className="font-mono text-2xs font-extrabold text-gray-500 uppercase tracking-widest block">TELEMETRY TRIVIA</span>
              <p className="font-serif text-sm font-bold italic leading-tight text-neutral-700 mt-1">
                "{activeSlide.funFact}"
              </p>
            </div>

            {/* Slideshow Nav Control Row */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handlePrevSlide}
                className="font-accent bg-black text-white border-4 border-black px-4 py-2 hover:bg-[#f3e700] hover:text-black transition-all brutal-shadow active:translate-y-[2px]"
              >
                ◀ BACK
              </button>
              <button
                onClick={handleNextSlide}
                className="font-accent bg-[#f3e700] text-black border-4 border-black px-6 py-2 hover:bg-black hover:text-white transition-all brutal-shadow active:translate-y-[2px] flex-1 font-black tracking-widest text-center"
              >
                PROCEED TO NEXT CHAMBER ▶
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Pop-Art Poster Designer Panel (Columns 12) */}
      <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-8 bg-neutral-50 p-6 md:p-8 border-4 border-black brutal-shadow">
        <div className="col-span-1 md:col-span-12">
          <div className="bg-[#00658d] text-white py-1 px-4 border-2 border-black inline-block mb-2 font-accent text-xs skew-badge">
            STICKER LAB WORKSHOP
          </div>
          <h2 className="font-accent text-3xl md:text-4xl uppercase text-black italic">
            DESIGN A NEWSPAPER POSTER!
          </h2>
          <p className="font-serif text-sm text-neutral-700 max-w-2xl mt-1 leading-normal">
            Express your inner master baker. Customize texts, comic bubbles, stamps, and background tones. Lock it in to display your design in the virtual showroom.
          </p>
        </div>

        {/* LEFT POSTER SETTINGS PANEL (4 cols) */}
        <div className="col-span-1 md:col-span-5 bg-white border-4 border-black p-6 flex flex-col gap-4">
          <h3 className="font-accent text-xl border-b-2 border-black pb-2 mb-2 uppercase tracking-wide">
            DESIGN CONSOLE
          </h3>

          {/* 1. Poster Title field */}
          <div>
            <label className="block font-accent text-xs uppercase text-slate-800 mb-1.5 font-bold">
              POSTER HERO HEADER TEXT
            </label>
            <input
              type="text"
              maxLength={22}
              value={posterTitle}
              onChange={(e) => setPosterTitle(e.target.value.toUpperCase())}
              className="w-full bg-slate-50 border-2 border-black p-2 font-accent tracking-wide text-lg text-black focus:bg-white focus:ring-0 outline-none"
              placeholder="E.G. KNEAD BREAD!"
            />
          </div>

          {/* 2. Subtitle field */}
          <div>
            <label className="block font-accent text-xs uppercase text-slate-800 mb-1.5 font-bold">
              POSTER FOOTER SLOGAN
            </label>
            <input
              type="text"
              maxLength={30}
              value={posterSubtitle}
              onChange={(e) => setPosterSubtitle(e.target.value)}
              className="w-full bg-slate-50 border-2 border-black p-2 font-serif font-black text-sm text-black focus:ring-0 outline-none"
              placeholder="e.g. EST. 1956 DAEJEON"
            />
          </div>

          {/* 3. Choose comic sticker */}
          <div>
            <label className="block font-accent text-xs uppercase text-slate-800 mb-1.5 font-bold">
              ACTION BADGE TYPE
            </label>
            <div className="flex flex-wrap gap-2">
              {['POW!', 'KNEAD!', 'FORGED!', '70 YRS', 'HUNGRY!'].map((badge) => (
                <button
                  key={badge}
                  onClick={() => setPosterComicWord(badge)}
                  className={`font-accent text-xs px-2.5 py-1.5 border-2 border-black tracking-widest hover:bg-neutral-50 ${
                    posterComicWord === badge ? 'bg-[#f3e700] text-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white text-gray-500'
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Choose color palette */}
          <div>
            <label className="block font-accent text-xs uppercase text-slate-800 mb-1.5 font-bold">
              BACKPLATE RADICAL TONE
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['YELLOW', 'MAGENTA', 'CYAN', 'GRAIN'] as const).map((col) => (
                <button
                  key={col}
                  onClick={() => setPosterColor(col)}
                  className={`py-1.5 font-accent text-xxs border-2 border-black tracking-wide ${
                    posterColor === col ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Skew toggle */}
          <div className="flex items-center gap-3 mt-2">
            <input
              id="skew-toggle"
              type="checkbox"
              checked={posterRotated}
              onChange={(e) => setPosterRotated(e.target.checked)}
              className="w-5 h-5 border-2 border-black text-[#b30069] checked:bg-[#b30069] rounded-none outline-none cursor-pointer"
            />
            <label htmlFor="skew-toggle" className="font-accent text-xs cursor-pointer uppercase select-none text-black font-semibold">
              APPLY RADICAL SKEW EFFECT (-6deg)
            </label>
          </div>

          {/* Action button */}
          <button
            onClick={saveCustomPoster}
            className="w-full font-accent border-4 border-black text-black bg-[#f3e700] py-3.5 mt-4 text-center text-lg tracking-wider hover:bg-black hover:text-[#f3e700] cursor-pointer shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px]"
          >
            LOCK POSTER IN GALLERY ✨
          </button>
        </div>

        {/* RIGHT POSTER INTERACTIVE CANVAS PREVIEW (7 cols) */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-center items-center bg-white border-4 border-black p-4 md:p-8 relative min-h-[400px]">
          
          {/* Halftone canvas container */}
          <div 
            id="popart-poster-canvas"
            className={`w-full max-w-sm aspect-[4/5] border-4 border-black p-6 flex flex-col justify-between relative shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] select-none overflow-hidden transition-all duration-300 ${
              posterColor === 'YELLOW' ? 'bg-[#f3e700]' :
              posterColor === 'MAGENTA' ? 'bg-[#b30069] text-white' :
              posterColor === 'CYAN' ? 'bg-[#00658d] text-white' : 'bg-[#e2bdc8]'
            } ${posterColor === 'GRAIN' ? 'halftone-bg' : ''}`}
          >
            {/* Stamp elements within */}
            <div className={`absolute inset-0 pointer-events-none opacity-20 ${
              posterColor === 'YELLOW' ? 'halftone-bg-magenta' : 'halftone-bg'
            }`} />

            {/* Poster Header */}
            <div className="relative z-10">
              <span className="font-mono text-xs font-black tracking-widest block uppercase opacity-85">
                ★ SUNGSIMDANG GRAPHIC CORP ★
              </span>
              <h4 className="font-accent text-xxs tracking-widest uppercase mb-4">
                AUTHENTIC RETRO SPECIFICATION SHEET
              </h4>
            </div>

            {/* Main Title content styled like a giant billboard block */}
            <div className="relative z-10 my-4 text-center">
              <h1 className={`font-serif leading-none tracking-tighter uppercase font-black px-2 py-1 transform select-all ${
                posterRotated ? '-rotate-6 skew-x-[-4deg]' : ''
              } ${
                posterColor === 'MAGENTA' || posterColor === 'CYAN' 
                  ? 'bg-white text-black' 
                  : 'bg-black text-[#f3e700]'
              } border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-2xl md:text-3xl text-stroke-black`}>
                {posterTitle || 'KNEAD DOUGH!'}
              </h1>
            </div>

            {/* Comic burst bubble centered */}
            <motion.div
              animate={{ rotate: [-8, 8, -8], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-[40%] bg-pink-500 font-accent text-white text-2xl md:text-3xl px-5 py-2.5 star-shape border-2 border-black z-20 text-stroke-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="block transform rotate-12">{posterComicWord}</span>
            </motion.div>

            {/* Poster Footer with subtitle */}
            <div className="relative z-10 pt-4 border-t-2 border-black flex justify-between items-end">
              <div>
                <p className={`font-serif text-[11px] font-black tracking-tight leading-tight uppercase ${
                  posterColor === 'MAGENTA' || posterColor === 'CYAN' ? 'text-white' : 'text-black'
                }`}>
                  {posterSubtitle || '1956 ANNIVERSARY SERIES'}
                </p>
                <span className="font-mono text-[9px] block uppercase opacity-80">
                  DAEJEON LEGACY • NO TRADEMARK MOCK
                </span>
              </div>
              <div className="h-8 w-14 bg-black border border-white flex flex-col justify-around px-1 font-mono text-[6px] text-white overflow-hidden uppercase shrink-0">
                <span>SEAL: LOCKED</span>
                <span className="text-[#f3e700]">70_YEARS_OK</span>
              </div>
            </div>
          </div>

          <p className="font-mono text-center text-xs tracking-wider text-slate-400 mt-6 uppercase">
            LIVE DYNAMIC CANVAS PREVIEW. ADJUST THE DIALS TO FORGE.
          </p>

          {/* Exhibition Shelf Showcase displaying saved list */}
          <AnimatePresence>
            {posterCreatedList.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mt-6 bg-slate-100 border-2 border-black p-4 text-black select-text"
              >
                <span className="font-accent text-xs bg-[#b30069] text-white px-2 py-0.5 border border-black uppercase tracking-wider">
                  GALLERY SHOWROOM SHELF
                </span>
                <ul className="mt-2 list-disc list-inside font-serif text-sm font-bold text-neutral-800">
                  {posterCreatedList.map((ps, idx) => (
                    <li key={idx}>{ps} (Logged as Record Exhibition #{idx + 8261})</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
