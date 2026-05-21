import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DispatchArticle, AppTheme } from '../types';
import { DISPATCH_ARTICLES } from '../data';

interface ArchiveViewProps {
  theme: AppTheme;
  onNavigateToShop: () => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ theme, onNavigateToShop }) => {
  // Dispatches Read State
  const [selectedArticle, setSelectedArticle] = useState<DispatchArticle | null>(null);

  // Kneading Mini Game State
  const [kneadCount, setKneadCount] = useState(0);
  const [gameUnlocked, setGameUnlocked] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'SUCCESS'>('IDLE');
  const [timeLeft, setTimeLeft] = useState(10);
  const [showKneadBubble, setShowKneadBubble] = useState<string | null>(null);

  // Stay Hungry Clicker State
  const [hungerClicks, setHungerClicks] = useState(0);
  const [hungerLevel, setHungerLevel] = useState('FAMISHED');
  const [burstText, setBurstText] = useState<string | null>(null);
  const [burstCoord, setBurstCoord] = useState({ x: 0, y: 0 });

  // Handle Kneading Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'PLAYING') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        if (kneadCount >= 40) {
          setGameState('SUCCESS');
          setGameUnlocked(true);
        } else {
          setGameState('IDLE');
          alert('Too slow! Try to knead faster! Need 40 kneads in 10s.');
          setKneadCount(0);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft, kneadCount]);

  const handleKneadClick = (e: React.MouseEvent) => {
    if (gameState === 'IDLE') {
      setGameState('PLAYING');
      setTimeLeft(10);
      setKneadCount(1);
      return;
    }

    if (gameState === 'PLAYING') {
      setKneadCount((prev) => prev + 1);
      
      // Random comic noise
      const noises = ['POW!', 'KNEAD!', 'CRUSH!', 'KAPOW!', 'SPLAT!', 'STRETCH!'];
      const randomNoise = noises[Math.floor(Math.random() * noises.length)];
      setShowKneadBubble(randomNoise);

      // Check immediate victory inside state cycle
      if (kneadCount + 1 >= 40) {
        setGameState('SUCCESS');
        setGameUnlocked(true);
      }
    }
  };

  const handleHungerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBurstCoord({ x, y });

    const newClicks = hungerClicks + 1;
    setHungerClicks(newClicks);

    const soundBubbles = ['NOM NOM!', 'BURP!', 'MORE GLUTEN!', 'CRUNCHY!', 'SOBORO LOVE!', 'STAY HUNGRY!'];
    const randomBubble = soundBubbles[Math.floor(Math.random() * soundBubbles.length)];
    setBurstText(randomBubble);

    setTimeout(() => setBurstText(null), 800);

    if (newClicks < 5) setHungerLevel('FAMISHED');
    else if (newClicks < 15) setHungerLevel('STUFFED');
    else if (newClicks < 30) setHungerLevel('DOUGH COMA');
    else setHungerLevel('SOBORO GOD 👑');
  };

  // Quick theme mapping
  const primaryBg = theme === 'YELLOW' ? 'bg-[#f3e700]' : 'bg-[#b30069]';
  const primaryTextColor = theme === 'YELLOW' ? 'text-black' : 'text-[#b30069]';
  const primaryBorderColor = theme === 'YELLOW' ? 'border-black' : 'border-[#b30069]';
  const buttonBg = theme === 'YELLOW' ? 'bg-black text-white hover:bg-neutral-800' : 'bg-[#00658d] text-white hover:bg-[#004c6b]';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
      {/* Header Newspaper Banner (Spans full) */}
      <header className="col-span-1 md:col-span-12 mb-12 relative">
        {/* Starburst badge overlapping */}
        <motion.div
          animate={{ rotate: [-6, 6, -6], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute -top-12 -left-12 w-32 h-32 bg-[#f3e700] kapow-badge border-4 border-black flex items-center justify-center z-10 cursor-pointer shadow-[4px_4px_0px_0px_#000000]"
          onClick={() => {
            const sparkles = ['KAPOW!', '70 YEARS!', 'LEGENDARY!', 'EST. 1956'];
            alert(sparkles[Math.floor(Math.random() * sparkles.length)] + ' — Sungsimdang was founded in 1956 near Daejeon Station.');
          }}
        >
          <span className="font-accent text-black text-2xl tracking-wide transform rotate-12">70 YRS!</span>
        </motion.div>

        {/* Oversized typography main card */}
        <div id="newspaper-banner" className="relative brutal-border bg-white text-black p-6 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] select-none">
          {/* Halftone backplate accent */}
          <div className={`absolute inset-0 ${theme === 'YELLOW' ? 'halftone-bg' : 'halftone-bg-cyan'} opacity-15`} />
          
          <h1 className="relative z-10 font-serif font-extrabold text-[#111111] text-center tracking-tighter uppercase leading-none">
            <span className={`block font-accent text-5xl md:text-8xl py-1 md:py-2 ${primaryBg} text-white text-stroke-black inline-block px-8 border-4 border-black translate-y-[-10px] transform -rotate-1 shadow-[4px_4px_0px_0px_#000000]`}>
              BAKER'S
            </span>
            <span className="block text-6xl md:text-9xl tracking-tight mt-4 text-stroke-thick text-white font-black drop-shadow-[6px_6px_0px_#000]">
              DELIGHT!
            </span>
          </h1>
        </div>
      </header>

      {/* LEFT COLUMN: Main Vintage Photo Canvas & Headline Story (8 cols) */}
      <div className="col-span-1 md:col-span-8 flex flex-col gap-10">
        
        {/* Vintage Image card panel */}
        <div className="brutal-border brutal-shadow bg-[#f3e700] p-4 relative group">
          {/* Flame status indicator icon */}
          <div 
            onClick={() => setShowGame(!showGame)}
            className="absolute top-6 right-6 w-14 h-14 bg-white rounded-full border-4 border-black flex items-center justify-center z-20 group-hover:bg-[#b30069] group-hover:text-white transition-all cursor-pointer shadow-[3px_3px_0px_0px_#000]"
            title="Start Interactive Kneading Game!"
          >
            <span className="material-symbols-outlined text-3xl font-black animate-pulse">local_fire_department</span>
          </div>

          {/* Interactive game notification banner */}
          <div className="absolute top-6 left-6 z-20 bg-black text-[#f3e700] border-2 border-white px-3 py-1 font-accent text-xs uppercase tracking-wider animate-bounce">
            {gameState === 'IDLE' ? '⚡ CLICK PHOTO TO KNEAD! ⚡' : '🔥 KNEAD RAPIDLY! 🔥'}
          </div>

          {/* The primary hotlinked image with creative overlays */}
          <div 
            onClick={handleKneadClick}
            className="w-full h-[400px] md:h-[500px] border-4 border-black bg-white overflow-hidden relative cursor-pointer select-none"
          >
            <img
              alt="Vintage Bakers Kneading Dough"
              className="w-full h-full object-cover grayscale contrast-175 mix-blend-multiply opacity-85 transition-all duration-300 group-hover:scale-102"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1tl0sqTMDNUxWB_Y0Ts3ZA2hFvzkjZ_s6ettRmcJARWUM32EFY_rU86YpuasN3jfoB3M9KNLjk4DOWsfJ8mJD6cc9vwF2hFEzn7zkWgyGWc4FVu3QuexHPcEBdfI6mm7GxaHFqxdJaWjNGtEIX9MMz4E67MFMtVA50JupZ82bMxuWY4d_ZI5-ckUgHfjsv6IscFs3bu45OjRvFKpQJgEXq3RNqqrzU6pvKscktzDhWzfG964zfmSKgFrdZEAwpvEpXunb-LQspA"
            />
            
            {/* Color tint filter */}
            <div className={`absolute inset-0 ${theme === 'YELLOW' ? 'bg-[#f3e700]' : 'bg-[#b30069]'} opacity-25 mix-blend-color pointer-events-none`} />
            
            {/* Kneading Interactive Game overlay panels */}
            {gameState === 'PLAYING' && (
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-6 text-center select-none pointer-events-none">
                <span className="font-accent text-white text-5xl md:text-7xl mb-2 text-stroke-black drop-shadow-md">
                  KNEAD IT!
                </span>
                <span className="font-sans font-black text-4xl text-[#f3e700]">
                  {kneadCount} / 40
                </span>
                <div className="w-1/2 h-4 bg-gray-700 border-2 border-white mt-4 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 transition-all duration-100" 
                    style={{ width: `${(kneadCount / 40) * 100}%` }}
                  />
                </div>
                <span className="text-white text-lg font-bold mt-2">
                  TIME LEFT: <span className="text-red-400">{timeLeft}s</span>
                </span>
              </div>
            )}

            {/* Victory Pop art banner inside photo */}
            {gameState === 'SUCCESS' && (
              <div className="absolute inset-0 bg-emerald-500/90 flex flex-col justify-center items-center p-6 text-center shadow-inner">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="bg-[#f3e700] border-4 border-black p-4 brutal-shadow max-w-sm"
                >
                  <span className="font-accent text-black text-4xl block">FORGED!</span>
                  <p className="font-serif text-sm font-bold text-black mt-2">
                    You massaged the flour like a champion. Real-time hydration unlocked! Use checkout secret code:
                  </p>
                  <div className="bg-black text-white py-1.5 font-mono text-lg tracking-widest mt-2 border-2 border-black">
                    BAKERPOW70
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setGameState('IDLE');
                      setKneadCount(0);
                    }}
                    className="mt-3 px-3 py-1 bg-white text-black font-accent border-2 border-black hover:bg-black hover:text-white transition-all text-xs"
                  >
                    RESET OVEN
                  </button>
                </motion.div>
              </div>
            )}

            {/* Float Bubbles animation on click */}
            <AnimatePresence>
              {showKneadBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 150 }}
                  animate={{ opacity: 1, scale: 1.5, y: -50, rotate: Math.random() * 20 - 10 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute left-1/3 top-1/4 transform -translate-x-1/2 bg-white text-black border-4 border-black px-4 py-2 font-accent text-2xl tracking-widest brutal-shadow pointer-events-none z-30"
                >
                  {showKneadBubble}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <figcaption className="mt-4 font-accent text-xl md:text-3xl bg-white text-black px-5 py-2.5 border-4 border-black inline-block -ml-8 -mb-8 z-30 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ART OF THE DOUGH!
          </figcaption>
        </div>

        {/* Vintage comic editorial story panel */}
        <article className="bg-white text-black border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative select-text">
          <div className="absolute -right-6 top-1/4 w-12 h-12 bg-[#00658d] rounded-full border-4 border-black" />
          <div className="absolute -left-4 bottom-1/4 w-8 h-8 bg-black border-4 border-black transform rotate-45" />

          {/* Styled newspaper header */}
          <h2 className="font-accent text-3xl md:text-5xl uppercase tracking-tight mb-6 bg-[#f3e700] text-black border-2 border-black inline-block px-4 py-1 skew-badge text-stroke-black">
            THE KNEAD FOR SPEED
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neutral-800 border-t-4 border-black pt-6 font-serif leading-relaxed text-base md:text-lg">
            <div>
              <p className="mb-4 font-bold text-black">
                <span className="text-5xl md:text-6xl font-accent float-left mr-3 leading-none bg-black text-[#f3e700] px-3.5 py-1.5 border-2 border-black translate-y-1">
                  F
                </span>
                or seven decades, the ovens of Daejeon have never slept. A ferocious, relentless pursuit of artisan bakery perfection documented in layers of flour, warm steam, and local sweat. 
              </p>
              <p className="mb-4">
                This isn't just basic breadmaking; or simple baking. It's a structural physical engineering marvel applied to complex carbohydrates. 
              </p>
            </div>
            <div>
              <p className="mb-4">
                The sheer kinetic impact required to construct the legendary crisp textures of our famous Soboro demands total physical respect. Every fold, every punch down, is a calculated strike against industrial mediocrity.
              </p>
              
              {/* Highlight callout box */}
              <div className="border-l-8 border-[#f3e700] pl-4 my-6 bg-[#eeeeee] p-4 border-4 border-black brutal-shadow-sm">
                <p className="font-accent text-xl md:text-2xl uppercase tracking-tighter leading-none text-black">
                  "WE DON'T JUST BAKE BREAD. WE FORGE IT."
                </p>
              </div>

              <p>
                As we march into a new era, the family principles remain violently unchanged. Quality is entirely non-negotiable. The kiln is always fired. Prepare your palate for extreme impact.
              </p>
            </div>
          </div>
        </article>
      </div>

      {/* RIGHT COLUMN: Sidebar (4 cols) */}
      <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
        
        {/* POW SHOP callout card */}
        <div className="bg-[#f3e700] text-black border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col">
          {/* Halftone backplate decoration */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-white rounded-full border-4 border-black opacity-40 translate-x-12 translate-y-[-12px] halftone-bg" />
          
          <h3 className="font-accent text-3xl uppercase tracking-wider mb-3 bg-white text-black inline-block px-3 py-0.5 border-2 border-black self-start">
            POW!
          </h3>
          
          <p className="font-serif font-black text-lg md:text-xl leading-snug mb-6 relative z-10">
            Experience the explosive taste of heritage. 70th Anniversary limited items dropping daily.
          </p>

          <button
            onClick={onNavigateToShop}
            className={`w-full font-accent text-lg md:text-xl py-3 border-4 border-black flex justify-between items-center px-4 transition-all brutal-shadow hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] cursor-pointer ${buttonBg}`}
          >
            <span>SHOP NOW</span>
            <span className="material-symbols-outlined text-2xl font-black">arrow_forward</span>
          </button>
        </div>

        {/* LATEST DISPATCHES: Interactive story drawer */}
        <div className="bg-white text-black border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(243,231,0,1)]">
          <h3 className="font-accent text-2xl border-b-4 border-black pb-2 mb-4 tracking-wide uppercase">
            LATEST DISPATCHES
          </h3>
          <ul className="flex flex-col">
            {DISPATCH_ARTICLES.map((article, idx) => (
              <li
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className={`py-3 flex gap-3 items-center group cursor-pointer transition-all duration-150 ${
                  idx < DISPATCH_ARTICLES.length - 1 ? 'border-b-2 border-black' : ''
                }`}
              >
                {/* Decorative solid square bullet */}
                <div className="w-3.5 h-3.5 bg-black group-hover:bg-[#b30069] group-hover:scale-110 transition-all shrink-0" />
                <span className="font-serif font-black text-sm md:text-base group-hover:underline tracking-tight group-hover:text-[#b30069]">
                  {article.title}
                </span>
              </li>
            ))}
          </ul>
          <p className="font-mono text-center text-xs tracking-widest text-neutral-500 mt-4 uppercase">
            PRESS [CLICK] TO EXPAND ARTICLE
          </p>
        </div>

        {/* STAY HUNGRY interactive cookie clicker Box */}
        <div 
          onClick={handleHungerClick}
          className="relative halftone-bg border-4 border-black flex flex-col items-center justify-center min-h-[220px] cursor-pointer select-none overflow-hidden hover:scale-[1.01] active:scale-[0.99] transition-all brutal-shadow"
          title="Feed the dough! Click to fill stay hungry bar."
        >
          {/* Inner banner */}
          <div className="bg-white p-4 border-4 border-black text-center transform -rotate-3 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-accent text-3xl block leading-none text-black">STAY</span>
            <span className="font-accent text-4xl block leading-none text-[#f3e700] text-stroke-black">
              HUNGRY
            </span>
          </div>

          {/* Clicks stats tracking badge */}
          <div className="absolute bottom-2 bg-black text-white font-mono text-2xs px-2.5 py-0.5 border border-white z-10 z-index">
            HUNGER STATUS: {hungerLevel} ({hungerClicks})
          </div>

          {/* Exploding click bubbles */}
          {burstText && (
            <div 
              className="absolute bg-[#b30069] text-white border-2 border-black text-xs font-accent px-2 py-1 z-30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-ping"
              style={{ top: burstCoord.y, left: burstCoord.x }}
            >
              {burstText}
            </div>
          )}
        </div>
      </div>

      {/* DISPATCH DETAIL LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-text">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-white text-black brutal-border max-w-2xl w-full max-h-[85vh] flex flex-col brutal-shadow-lg"
            >
              {/* Modal header with category tape */}
              <div className="bg-[#b30069] text-white p-4 border-b-4 border-black flex justify-between items-center">
                <span className="font-accent text-xl tracking-wider text-white text-stroke-black">
                  {selectedArticle.category}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 border-transparent px-3 py-0.5 font-accent text-sm tracking-widest cursor-pointer transition-all"
                >
                  [CLOSE X]
                </button>
              </div>

              {/* Modal content body */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 font-serif">
                <div className="bg-[#f3e700] border-2 border-black px-4 py-2 mb-4 self-start inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-xs font-mono tracking-widest text-black font-bold">
                    FILED ON: {selectedArticle.date}
                  </span>
                </div>

                <h3 className="font-accent text-4xl uppercase tracking-tight leading-none text-black mt-2 mb-1">
                  {selectedArticle.title}
                </h3>
                <h4 className="font-serif font-black underline decoration-4 decoration-[#b30069] text-[#b30069] text-lg mb-6">
                  {selectedArticle.koreanTitle}
                </h4>

                <div className="prose prose-stone leading-relaxed text-neutral-800 text-lg">
                  {selectedArticle.content.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-4">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Comic style tag badges */}
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t-2 border-dashed border-neutral-300">
                  {selectedArticle.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-neutral-100 border-2 border-black font-accent text-xs px-2.5 py-1 text-neutral-700 tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal footer closing tape */}
              <div className="bg-[#f9f9f9] border-t-4 border-black p-4 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-black text-white border-2 border-black px-6 py-2 font-accent text-lg tracking-wider brutal-shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] cursor-pointer"
                >
                  KNEAD ONWARD
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
