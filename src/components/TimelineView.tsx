import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMELINE_EVENTS } from '../data';
import { AppTheme } from '../types';

interface TimelineViewProps {
  theme: AppTheme;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ theme }) => {
  // Stamps collected in local state
  const [collectedStamps, setCollectedStamps] = useState<string[]>([]);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const toggleStamp = (year: string) => {
    if (collectedStamps.includes(year)) {
      setCollectedStamps(collectedStamps.filter((y) => y !== year));
    } else {
      setCollectedStamps([...collectedStamps, year]);
      
      const event = TIMELINE_EVENTS.find((e) => e.year === year);
      const title = event ? event.badgeText : 'MILESTONE';
      
      setShowNotification(`✨ DISPATCH STAMP UNLOCKED: [${title}] ✨`);
      setTimeout(() => setShowNotification(null), 3000);
    }
  };

  const isAllCollected = collectedStamps.length === TIMELINE_EVENTS.length;

  return (
    <div className="relative pb-12">
      {/* Introduction banner */}
      <div className="bg-[#b30069] text-white border-4 border-black p-6 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 halftone-bg" />
        <h2 className="font-accent text-3xl md:text-5xl uppercase tracking-tighter text-stroke-black mb-2 text-white">
          70 YRS TIMELINE RETROSPECTIVE
        </h2>
        <p className="font-serif text-lg leading-relaxed text-white font-medium max-w-3xl">
          Track the seven-decade kinetic path from a single tent stove at Daejeon Station to Michelin-recognized global baking dominance. Explore milestones below, and <strong>collect all 6 history stamps</strong> to claim the Master Historian Badge!
        </p>
        
        {/* Stamp inventory tracker banner */}
        <div className="bg-white border-4 border-black p-3 mt-4 text-black flex flex-wrap items-center justify-between gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 relative">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-[#b30069] font-black">sports_score</span>
            <div>
              <span className="font-accent text-lg tracking-wide uppercase">STAMP COLLECTION:</span>
              <span className="font-mono text-sm ml-2 font-black">{collectedStamps.length} / 6 STAMPS ACCUMULATED</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {TIMELINE_EVENTS.map((ev) => {
              const collected = collectedStamps.includes(ev.year);
              return (
                <div 
                  key={ev.year}
                  className={`w-10 h-10 border-2 border-black flex items-center justify-center font-accent text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                    collected ? 'bg-[#f3e700] text-black rotate-[-6deg]' : 'bg-neutral-100 text-neutral-400 opacity-60'
                  }`}
                  title={`${ev.year} Milestone Stamp`}
                >
                  {ev.year.slice(2)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gamification Milestone Banner */}
      <AnimatePresence>
        {isAllCollected && (
          <motion.div
            initial={{ scale: 0.8, rotate: -5, y: -50, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="mb-8 p-6 bg-emerald-500 text-white border-4 border-black text-center brutal-shadow-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 halftone-bg opacity-15" />
            <span className="font-accent text-4xl block leading-none text-stroke-black animate-pulse">
              🏆 MASTER HISTORIAN AWARDED! 🏆
            </span>
            <p className="font-serif text-base mt-2 font-bold max-w-xl mx-auto text-white">
              You've officially logged all seventy years of Sungsimdang history records! Use this knowledge to bread-knead with ultimate purpose and pride.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding system notification bubble */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-6 right-6 z-50 bg-[#b30069] text-white border-4 border-black font-accent text-lg px-6 py-3.5 tracking-wider brutal-shadow max-w-sm hover:skew-x-2 transition-all cursor-pointer"
            onClick={() => setShowNotification(null)}
          >
            {showNotification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical Timeline Panels */}
      <div className="relative border-l-4 border-black ml-4 md:ml-24 pl-8 md:pl-16 flex flex-col gap-12">
        {TIMELINE_EVENTS.map((event, index) => {
          const isCollected = collectedStamps.includes(event.year);
          const isExpanded = expandedYear === event.year;
          
          return (
            <div key={event.year} className="relative group select-none">
              
              {/* Year Stamp Badge on the vertical line axis */}
              <div 
                className={`absolute left-0 top-0 w-14 h-14 rounded-full border-4 border-black -translate-x-[61px] md:-translate-x-[93px] flex items-center justify-center font-accent text-sm md:text-base z-10 cursor-pointer shadow-[3px_3px_0px_0px_#000] active:scale-95 transition-all ${
                  isCollected ? 'bg-[#f3e700] text-black rotate-[-6deg]' : 'bg-white text-black'
                }`}
                onClick={() => toggleStamp(event.year)}
                title="Click axis node to unlock milestone stamp!"
              >
                {event.year}
              </div>

              {/* Connecting dashed wire */}
              <div className="absolute left-0 top-7 w-8 md:w-16 border-t-4 border-dashed border-black -translate-x-8 md:-translate-x-16 pointer-events-none" />

              {/* Main Comic Event Panel Card */}
              <div className="bg-white text-black border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  {/* Category Stamp */}
                  <span className="font-accent text-sm tracking-wider bg-[#00658d] text-white px-3 py-1 border-2 border-black inline-block uppercase">
                    {event.badgeText}
                  </span>
                  
                  {/* Interactive Stamp button */}
                  <button
                    onClick={() => toggleStamp(event.year)}
                    className={`font-accent text-xs px-3 py-1 border-2 border-black transition-all ${
                      isCollected 
                        ? 'bg-[#f3e700] text-black shadow-[1px_1px_0px_0px_#000] rotate-[2deg]' 
                        : 'bg-white text-gray-500 shadow-[3px_3px_0px_0px_#000] hover:bg-neutral-100 active:shadow-[1px_1px_0px_0px_#000]'
                    }`}
                  >
                    {isCollected ? '✓ COLLECTED' : '🎟️ COLLECT STAMP'}
                  </button>
                </div>

                <h3 className="font-accent text-2xl md:text-4xl uppercase text-black leading-none tracking-tight">
                  {event.title}
                </h3>
                <h4 className="font-serif font-black underline decoration-2 decoration-[#00658d] text-[#00658d] text-base md:text-lg mb-4">
                  {event.koreanTitle}
                </h4>

                <p className="font-serif leading-relaxed text-neutral-800 text-base md:text-lg">
                  {event.description}
                </p>

                {/* Expanded Fun Fact view details toggle */}
                <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                  <button
                    className="flex items-center gap-1 font-accent text-sm text-[#b30069] tracking-wider hover:underline"
                    onClick={() => setExpandedYear(isExpanded ? null : event.year)}
                  >
                    <span>{isExpanded ? '▲ CONCEAL DETAIL LOGS' : '▼ OVERFLOW HISTORIC DICTIONARY'}</span>
                    <span className="material-symbols-outlined text-sm">
                      {isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-3"
                      >
                        <div className="bg-[#f9f9f9] border-2 border-black p-4 halftone-bg opacity-90">
                          <span className="font-accent text-xs bg-black text-[#f3e700] px-2 py-0.5 border border-black uppercase tracking-widest inline-block mb-2">
                            AUTHENTIC SECRET FACT
                          </span>
                          <p className="font-serif text-sm font-black italic leading-normal text-slate-800">
                            "{event.fact}"
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
