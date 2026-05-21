import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ArchiveView } from './components/ArchiveView';
import { TimelineView } from './components/TimelineView';
import { ExhibitionView } from './components/ExhibitionView';
import { ShopView } from './components/ShopView';
import { TicketGenerator } from './components/TicketGenerator';
import { AppTab, AppTheme, RetroProduct } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<AppTab>('ARCHIVE');
  const [theme, setTheme] = useState<AppTheme>('YELLOW');

  // Shopping cart client state
  const [cartItems, setCartItems] = useState<{ product: RetroProduct; qty: number }[]>([]);

  // Cart operations
  const handleAddToCart = (product: RetroProduct, qty: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { product, qty }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Styling helper based on selected theme
  const containerClass = theme === 'YELLOW' ? 'bg-[#f4f4f4]' : 'bg-[#fff]';

  return (
    <div id="app-root-container" className={`min-h-screen text-black flex flex-col font-sans transition-colors duration-500 pb-12 ${containerClass}`}>
      {/* Upper border decoration representing CMYK bleed markers */}
      <div className="h-2 w-full flex select-none">
        <div className="flex-1 bg-[#00658d]" title="Cyan Bleed Marker" />
        <div className="flex-1 bg-[#b30069]" title="Magenta Bleed Marker" />
        <div className="flex-1 bg-[#f3e700]" title="Yellow Bleed Marker" />
        <div className="flex-1 bg-[#000]" title="K-Black Bleed Marker" />
      </div>

      {/* Main Page structure container */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-4 md:mt-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Main Top Nav Bar */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            theme={theme}
            setTheme={setTheme}
            cartCount={cartCount}
            triggerTicketPage={() => setActiveTab('TICKETS')}
          />

          {/* Core Content Canvas with Motion and transitions */}
          <main className="mt-4 md:mt-8 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {activeTab === 'ARCHIVE' && (
                  <ArchiveView
                    theme={theme}
                    onNavigateToShop={() => setActiveTab('SHOP')}
                  />
                )}

                {activeTab === 'HISTORY' && (
                  <TimelineView theme={theme} />
                )}

                {activeTab === 'EXHIBITION' && (
                  <ExhibitionView theme={theme} />
                )}

                {activeTab === 'SHOP' && (
                  <ShopView
                    theme={theme}
                    cartItems={cartItems}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onClearCart={handleClearCart}
                  />
                )}

                {activeTab === 'TICKETS' && (
                  <TicketGenerator theme={theme} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Dynamic Pop-Art footer block */}
        <footer className="w-full flex flex-col md:flex-row justify-between items-center p-6 md:p-8 gap-6 bg-white brutal-border brutal-shadow mt-16 relative overflow-hidden select-none">
          {/* Decorative halftone layer in footer */}
          <div className="absolute top-0 left-0 w-full h-full halftone-bg opacity-10 pointer-events-none z-0" />

          {/* Made in Daejeon status chip */}
          <div className="font-accent text-sm md:text-md text-black z-10 bg-[#f3e700] px-4 py-1 border-2 border-black tracking-wide uppercase italic rotate-[-1deg] text-stroke-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            © 1956-2026 SUNGSIMDANG LEGACY. MADE IN DAEJEON.
          </div>

          {/* Multi links */}
          <div className="flex flex-wrap gap-4 z-10 bg-white p-2.5 border-4 border-black shadow-[3px_3px_0px_0px_#000]">
            {['Privacy', 'Terms', 'Press Kit', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Retro Dispatch: [${link}] panel is integrated within the 70th Newspaper registry!`);
                }}
                className="font-accent text-sm md:text-base text-black hover:bg-[#f3e700] px-2 py-0.5 border-b-2 border-transparent hover:border-black transition-all"
              >
                {link}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
