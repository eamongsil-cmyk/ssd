import React from 'react';
import { motion } from 'motion/react';
import { AppTab, AppTheme } from '../types';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  cartCount: number;
  triggerTicketPage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  cartCount,
  triggerTicketPage,
}) => {
  const tabs: { key: AppTab; label: string }[] = [
    { key: 'HISTORY', label: 'HISTORY' },
    { key: 'EXHIBITION', label: 'EXHIBITION' },
    { key: 'ARCHIVE', label: 'ARCHIVE' },
    { key: 'SHOP', label: 'SHOP' },
  ];

  return (
    <nav className="sticky top-0 w-full z-40 flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-4 bg-white border-b-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 mb-8 md:mb-12">
      {/* Brand Title with retro italic punch */}
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <motion.div
          onClick={() => setActiveTab('ARCHIVE')}
          className="font-accent text-3xl md:text-4xl text-black uppercase italic tracking-tighter cursor-pointer select-none border-b-2 border-transparent hover:border-black active:scale-95 transition-all text-stroke-black"
          whileHover={{ skewX: -5 }}
        >
          SUNGSIMDANG 70
        </motion.div>
        
        {/* Toggle Theme - CMYK vs Electric Yellow */}
        <button
          onClick={() => setTheme(theme === 'YELLOW' ? 'CMYK' : 'YELLOW')}
          className="flex items-center gap-1.5 px-3 py-1 font-accent text-xs border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#f3e700] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          title="Toggle Comic Theme Mode!"
        >
          <span className={`w-3.5 h-3.5 rounded-full border-2 border-black ${theme === 'YELLOW' ? 'bg-[#f3e700]' : 'bg-[#b30069]'}`}></span>
          <span>{theme === 'YELLOW' ? 'YELLOW PRINT' : 'CMYK COMIC'}</span>
        </button>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-6 mb-4 md:mb-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-accent text-lg md:text-xl tracking-wider px-3 py-1.5 border-2 border-transparent transition-all duration-150 transform hover:skew-x-[-6deg] ${
                isActive
                  ? 'bg-[#f3e700] text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-black hover:bg-[#eeeeee] hover:border-black'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
        
        {/* Retro Shop Cart Indicator */}
        <button
          onClick={() => setActiveTab('SHOP')}
          className="relative flex items-center justify-center p-1.5 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00658d] hover:text-white transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-3.5 -right-3.5 font-accent text-xs bg-[#b30069] text-white px-2 py-0.5 border-2 border-black animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Action Ticket Button */}
      <motion.button
        id="ticket-button"
        onClick={triggerTicketPage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`font-accent text-xl md:text-2xl text-black border-4 border-black px-8 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#b00c62] active:translate-y-[2px] transition-all cursor-pointer ${
          activeTab === 'TICKETS' ? 'bg-[#b30069] text-white scale-105' : 'bg-[#f3e700]'
        }`}
      >
        TICKETS
      </motion.button>
    </nav>
  );
};
