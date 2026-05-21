import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnniversaryTicket, AppTheme } from '../types';

interface TicketGeneratorProps {
  theme: AppTheme;
}

export const TicketGenerator: React.FC<TicketGeneratorProps> = ({ theme }) => {
  // Input builder states
  const [attendeeName, setAttendeeName] = useState('Eun-ah Hong');
  const [selectedDate, setSelectedDate] = useState('2026-05-21');
  const [ticketType, setTicketType] = useState<'VIP' | 'STANDARD' | 'BAKER_PASS'>('VIP');
  const [specialtyBadge, setSpecialtyBadge] = useState('CRUNCHY SOBORO');
  
  // Confetti / print output state
  const [ticketPrinted, setTicketPrinted] = useState(false);
  const [generatedSerial, setGeneratedSerial] = useState('SSD-VIP-0521-X923');

  const triggerGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName.trim()) {
      alert('Please fill in attendee name!');
      return;
    }

    const initials = attendeeName.split(' ').map((n) => n[0]).join('').toUpperCase() || 'SSD';
    const cleanDate = selectedDate.replace(/-/g, '').slice(4); // e.g. "0521"
    const randomHash = Math.floor(1000 + Math.random() * 9000);
    const newSerial = `SSD-${ticketType}-${cleanDate}-${initials}${randomHash}`;
    
    setGeneratedSerial(newSerial);
    setTicketPrinted(true);

    setTimeout(() => {
      setTicketPrinted(false);
    }, 4500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 select-none">
      
      {/* TICKET BUILDER PANEL (5 cols) */}
      <div className="col-span-1 lg:col-span-5 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] relative">
        <div className="absolute top-4 right-4 bg-black text-[#f3e700] border-2 border-white px-2 py-0.5 font-accent text-[9px] uppercase tracking-wider">
          SYSTEM_TERM_900
        </div>
        <h3 className="font-accent text-2xl border-b-2 border-black pb-2 mb-4 text-black uppercase tracking-wide">
          PERSONALIZATION CONSOLE
        </h3>
        
        <form onSubmit={triggerGenerate} className="flex flex-col gap-4 font-serif text-sm select-text">
          {/* 1. Attendee Name */}
          <div>
            <label className="block text-3xs font-black uppercase text-gray-500 mb-1">
              PATRON FULL NAME ON TICKET
            </label>
            <input
              type="text"
              required
              maxLength={22}
              value={attendeeName}
              onChange={(e) => setAttendeeName(e.target.value)}
              className="w-full bg-slate-50 border-2 border-black p-2 font-accent tracking-wide text-lg text-black outline-none focus:bg-white"
              placeholder="e.g. EUN-AH HONG"
            />
          </div>

          {/* 2. Visit Date Selection */}
          <div>
            <label className="block text-3xs font-black uppercase text-gray-500 mb-1">
              TARGET CELEBRATORY VISITATION DATE
            </label>
            <input
              type="date"
              required
              min="2026-05-21"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-50 border-2 border-black p-2 font-mono text-sm text-black outline-none focus:bg-white cursor-pointer"
            />
          </div>

          {/* 3. Specialty Bread stamp badge */}
          <div>
            <label className="block text-3xs font-black uppercase text-gray-500 mb-1">
              CHOSEN INK-STAMP specialty BADGE
            </label>
            <select
              value={specialtyBadge}
              onChange={(e) => setSpecialtyBadge(e.target.value)}
              className="w-full bg-slate-50 border-2 border-black p-2 font-accent text-sm tracking-wide text-black outline-none focus:bg-white cursor-pointer"
            >
              <option value="CRUNCHY SOBORO">튀김소보로 CRISPY KING</option>
              <option value="AROMATIC CHIVES">판타롱부추빵 RETRO GREEN</option>
              <option value="BOMUNSAN ECHO">보문산메아리 SWEET DOME</option>
              <option value="SACRED POPE TOAST">교황님의 치아바타 SACRED PASS</option>
            </select>
          </div>

          {/* 4. Ticket tier */}
          <div>
            <label className="block text-3xs font-black uppercase text-gray-500 mb-1">
              TICKET TIER CLASSIFICATION
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['VIP', 'STANDARD', 'BAKER_PASS'] as const).map((tier) => (
                <button
                  type="button"
                  key={tier}
                  onClick={() => setTicketType(tier)}
                  className={`font-accent text-xs py-2 border-2 border-black select-none tracking-wider ${
                    ticketType === tier ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  {tier === 'VIP' ? '💎 VIP GOLD' : tier === 'STANDARD' ? '🎟️ CLASSIC' : '🥐 BAKER PASS'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full font-accent border-4 border-black text-white bg-black py-4 mt-4 text-center text-lg tracking-wider hover:bg-[#b00c62] brutal-shadow cursor-pointer active:translate-y-[2px]"
          >
            FORGE TICKETING REGISTER
          </button>
        </form>
      </div>

      {/* REACTIVE TICKET DISPLAY PREVIEW (7 cols) */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-center bg-white border-4 border-black p-4 md:p-8 relative min-h-[460px]">
        {/* Confetti Celebration Banner when printable is loaded */}
        <AnimatePresence>
          {ticketPrinted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 bg-emerald-500 text-white font-accent border-4 border-black px-6 py-2.5 starburst-effect shadow-[4px_4px_0px_0px_#000] z-30"
            >
              🎉 Ticket Forged! Serial {generatedSerial} Active!
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Ticket card design (Layout matching early mid-century train pass and comic styling) */}
        <div 
          id="retro-bakers-pass"
          className={`w-full max-w-xl border-4 border-stroke border-black flex flex-col md:flex-row relative select-text shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${
            ticketType === 'VIP' ? 'bg-[#f3e700] text-black border-dashed' :
            ticketType === 'BAKER_PASS' ? 'bg-neutral-800 text-white border-solid' : 'bg-white text-black'
          }`}
        >
          {/* Faded background halftone layers */}
          <div className="absolute inset-0 halftone-bg opacity-10 pointer-events-none" />

          {/* LEFT HALF TICKET BODY */}
          <div className="flex-1 p-6 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-dashed border-black relative z-10">
            {/* Header row */}
            <div>
              <div className="flex justify-between items-center mb-2 h-6">
                <span className={`font-mono text-[9px] font-extrabold uppercase border px-2 py-0.5 ${
                  ticketType === 'BAKER_PASS' ? 'border-white bg-black text-white' : 'border-black bg-white text-black font-black'
                }`}>
                  {ticketType === 'VIP' ? '🌟 ANNIVERSARY PASS' : ticketType === 'BAKER_PASS' ? '🥐 MASTER LEAGUE' : '🎟️ STANDARD ADMISSION'}
                </span>
                <span className={`font-mono text-[8px] font-bold ${ticketType === 'BAKER_PASS' ? 'text-gray-400' : 'text-slate-600'}`}>
                  EST. 1956
                </span>
              </div>

              <h2 className={`font-accent text-3xl md:text-4xl text-stroke-black leading-none uppercase ${
                ticketType === 'BAKER_PASS' ? 'text-white' : 'text-black'
              }`}>
                SUNGSIMDANG 70
              </h2>
              <span className={`font-serif italic font-black text-xs leading-none -mt-1 block ${
                ticketType === 'BAKER_PASS' ? 'text-emerald-400' : 'text-[#b30069]'
              }`}>
                ANNIVERSARY GALA HALL
              </span>

              {/* Attendance metrics */}
              <div className="mt-6 flex flex-col gap-2 font-serif">
                <div className="flex flex-col">
                  <span className={`text-[9px] font-black uppercase ${ticketType === 'BAKER_PASS' ? 'text-gray-400' : 'text-gray-500'}`}>
                    REGISTERED ADMITTEE
                  </span>
                  <span className="font-accent text-lg md:text-xl leading-none uppercase tracking-wide">
                    {attendeeName || 'CHIEF ADVOCATOR'}
                  </span>
                </div>

                <div className="flex justify-between gap-4 mt-2">
                  <div className="flex flex-col">
                    <span className={`text-[9px] font-black uppercase ${ticketType === 'BAKER_PASS' ? 'text-gray-400' : 'text-gray-500'}`}>
                      TARGET DATE
                    </span>
                    <span className="font-mono text-xs font-black">
                      {selectedDate || '2026-05-21'}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className={`text-[9px] font-black uppercase ${ticketType === 'BAKER_PASS' ? 'text-gray-400' : 'text-gray-500'}`}>
                      VISITING GATE
                    </span>
                    <span className="font-accent text-xs font-bold tracking-widest text-[#b30069]">
                      EUNHAENG-01
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom stamp rows */}
            <div className="mt-8 pt-4 border-t-2 border-dashed border-black/40 flex justify-between items-center">
              <div>
                <span className={`text-[8px] font-black uppercase block ${ticketType === 'BAKER_PASS' ? 'text-gray-400' : 'text-gray-500'}`}>
                  ACTIVE SERIAL SIGNATURE
                </span>
                <span className="font-mono text-[9px] font-black block tracking-widest text-pink-500">
                  {generatedSerial}
                </span>
              </div>
              
              {/* Authenticity Ink Stamp */}
              <div className={`w-14 h-14 rounded-full border-4 ${
                ticketType === 'BAKER_PASS' ? 'border-emerald-400 text-emerald-400' : 'border-red-500 text-red-500'
              } flex flex-col justify-around p-1 items-center font-mono text-[7px] text-center shrink-0 uppercase select-none transform rotate-[-8deg] font-black`}>
                <span>SSD 1956</span>
                <span className="text-[10px] leading-none">SEALED</span>
              </div>
            </div>
          </div>

          {/* RIGHT STUB / BARCODE AXIS */}
          <div className={`md:w-36 p-6 flex flex-col justify-between items-center text-center border-t-4 md:border-t-0 border-black select-none ${
            ticketType === 'VIP' ? 'bg-[#fff] border-dashed' :
            ticketType === 'BAKER_PASS' ? 'bg-neutral-900 border-solid text-white' : 'bg-[#f4f4f4]'
          }`}>
            <div className="flex flex-col items-center">
              <span className="font-accent text-[8px] tracking-widest text-neutral-400 mb-1">
                STUB DEPT
              </span>
              
              {/* Chosen specialty badge as illustration stub stamp */}
              <div className="bg-black text-white px-2.5 py-1.5 border-2 border-black font-accent text-[11px] tracking-wide transform -rotate-3 hover:rotate-3 transition-transform shadow-[2px_2px_0px_0px_#000] max-w-28 text-white uppercase text-stroke-black bg-neutral-900 leading-snug">
                {specialtyBadge}
              </div>
            </div>

            {/* CSS-drawn high-fidelity Barcode */}
            <div className={`w-full flex-1 flex flex-col justify-center items-center my-4 ${ticketType === 'BAKER_PASS' ? 'opacity-80' : ''}`}>
              <div className="h-14 w-full flex items-center justify-center gap-0.5 bg-white p-2 border-2 border-black">
                {/* Simulated barcode lines */}
                {[2, 4, 1, 3, 2, 6, 1, 4, 2, 5, 1, 3, 2, 4, 1, 3, 1, 4, 2, 3].map((thickness, idx) => (
                  <div 
                    key={idx} 
                    className="h-full bg-black shrink-0" 
                    style={{ width: `${thickness}px` }}
                  />
                ))}
              </div>
              <span className={`font-mono text-[8px] font-black tracking-widest mt-1 block ${ticketType === 'BAKER_PASS' ? 'text-white' : 'text-slate-800'}`}>
                *SSD-GA-70-2026*
              </span>
            </div>

            <div className="font-accent text-[10px] tracking-widest text-neutral-500 uppercase">
              VISITOR VOW STUB
            </div>
          </div>
        </div>

        <p className="font-mono text-center text-xs tracking-wider text-slate-400 mt-8 uppercase">
          TICKET ENGINE READY FOR CUSTOM RENDERING. LIVE PERSONALIZATION COMPILED.
        </p>
      </div>
    </div>
  );
};
