import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RetroProduct, AppTheme } from '../types';
import { RETRO_PRODUCTS } from '../data';

interface ShopViewProps {
  theme: AppTheme;
  onAddToCart: (product: RetroProduct, qty: number) => void;
  cartItems: { product: RetroProduct; qty: number }[];
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  theme,
  onAddToCart,
  cartItems,
  onRemoveFromCart,
  onClearCart,
}) => {
  // Category filter state
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'bread' | 'merch'>('ALL');

  // Coupon code states
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal percentage, e.g. 0.20
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  // Email state (prefilled from metadata eamongsil@gmail.com)
  const [email, setEmail] = useState('eamongsil@gmail.com');
  const [deliveryName, setDeliveryName] = useState('Eun-ah Hong');

  // Checkout Success modal state
  const [checkoutReceipt, setCheckoutReceipt] = useState<{
    orderId: string;
    items: { name: string; qty: number; price: number }[];
    total: number;
    email: string;
  } | null>(null);

  const filteredProducts = RETRO_PRODUCTS.filter((product) => {
    if (activeFilter === 'ALL') return true;
    return product.category === activeFilter;
  });

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const discountAmount = Math.round(cartSubtotal * appliedDiscount);
  const cartTotal = cartSubtotal - discountAmount;

  const handleApplyCoupon = () => {
    setCouponError(null);
    setCouponSuccess(null);
    
    if (couponCode.toUpperCase().trim() === 'BAKERPOW70') {
      setAppliedDiscount(0.20); // 20% discount
      setCouponSuccess('⚡ BAKERCOUPON VERIFIED: 20% OFF EXTRA FLOUR UNLOCKED! ⚡');
    } else {
      setCouponError('❌ DISCONNECTED DIALOG: CODE NOT CODIFIED IN SEXTANT INDEX');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your flour basket is empty!');
      return;
    }

    const receipt = {
      orderId: `SSD-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cartItems.map((c) => ({
        name: c.product.name,
        qty: c.qty,
        price: c.product.price,
      })),
      total: cartTotal,
      email: email,
    };

    setCheckoutReceipt(receipt);
  };

  const handleCloseReceipt = () => {
    setCheckoutReceipt(null);
    onClearCart();
    setCouponCode('');
    setAppliedDiscount(0);
    setCouponSuccess(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 select-none">
      
      {/* PRODUCTS VIEW (Columns 8 on wide, spans full on mobile) */}
      <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
        
        {/* Banner with retro style */}
        <div className="bg-white text-black border-4 border-black p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_#000]">
          <div>
            <h3 className="font-accent text-2xl uppercase tracking-wider text-black">
              EUNHAENG-DONG VINTAGE BOOTH
            </h3>
            <p className="font-serif text-sm text-neutral-600 mt-1">
              Select fresh carbohydrates baked on Daejeon soil, or authentic 70th Anniversary physical merch.
            </p>
          </div>

          {/* Tab Filter selectors */}
          <div className="flex gap-2 shrink-0">
            {(['ALL', 'bread', 'merch'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-accent text-xs px-3 py-1.5 border-2 border-black tracking-wider hover:bg-[#f3e700] transition-colors ${
                  activeFilter === cat ? 'bg-[#f3e700] text-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white text-gray-500'
                }`}
              >
                {cat === 'ALL' ? 'ALL STUFF' : cat === 'bread' ? 'CARBS(빵)' : 'MERCH(굿즈)'}
              </button>
            ))}
          </div>
        </div>

        {/* Product Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white border-4 border-black p-4 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
            >
              <div>
                {/* Product category tag */}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-accent text-[10px] tracking-widest bg-[#00658d] text-white px-2 py-0.5 border border-black uppercase">
                    {product.category}
                  </span>
                  <span className="font-accent text-sm bg-[#f3e700] px-2 py-0.5 border border-black font-semibold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-black">
                    ₩{product.price.toLocaleString()}
                  </span>
                </div>

                {/* Styled illustration preview frame */}
                <div className="w-full aspect-square bg-[#f9f9f9] border-2 border-dashed border-black flex items-center justify-center p-2 mb-4 relative overflow-hidden group">
                  <div className="absolute inset-0 halftone-bg opacity-10 pointer-events-none" />
                  
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover grayscale contrast-150 mix-blend-multiply opacity-80" 
                    />
                  ) : (
                    /* Elegant icon based representation for mock image */
                    <div className="flex flex-col items-center text-center">
                      <span className="material-symbols-outlined text-5xl text-neutral-800 scale-110 mb-1">
                        {product.id === 'pantaron-chives' ? 'eco' :
                         product.id === 'bomunsan-echo' ? 'volcano' :
                         product.id === 'anniversary-metal-badge' ? 'editor_choice' :
                         product.id === 'canvas-flour-tote' ? 'shopping_bag' : 'order_approve'}
                      </span>
                      <span className="font-accent text-[10px] text-[#b30069] tracking-wider font-extrabold uppercase mt-1 animate-pulse">
                        SSD AUTHENTIC
                      </span>
                    </div>
                  )}

                  {/* Bubble effect on overlay */}
                  <div className="absolute inset-0 bg-[#f3e700] opacity-0 group-hover:opacity-10 transition-all pointer-events-none mix-blend-color" />
                </div>

                {/* Product details */}
                <h4 className="font-accent text-xl leading-none uppercase text-black">
                  {product.name}
                </h4>
                <p className="font-serif font-black underline decoration-2 decoration-neutral-300 text-sm italic text-[#00658d] mb-2">
                  {product.koreanName}
                </p>
                <p className="font-serif text-xs leading-normal text-neutral-600 mb-4 h-16 overflow-y-auto">
                  {product.description}
                </p>

                {/* Sticker Badges */}
                <div className="flex flex-wrap gap-1 mb-4 select-none">
                  {product.badges.map((b) => (
                    <span key={b} className="font-accent text-[8px] tracking-wider bg-neutral-100 border border-black text-neutral-700 px-1.5 py-0.5">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to basket item controller */}
              <button
                onClick={() => onAddToCart(product, 1)}
                className="w-full font-accent border-2 border-black bg-black text-[#f3e700] py-2 hover:bg-[#f3e700] hover:text-black transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer text-sm"
              >
                + ADD TO OVEN CAR BASKET
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SHOPPING CART LEDGER SIDEBAR (4 cols) */}
      <div className="col-span-1 lg:col-span-4 flex flex-col">
        
        {/* Ledger receipt envelope panel */}
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(179,0,105,1)] relative flex flex-col justify-between h-full">
          {/* Faded halftone backplate for contrast */}
          <div className="absolute inset-0 halftone-bg opacity-5 pointer-events-none" />

          <div className="relative z-10">
            <div className="bg-[#b30069] text-white p-2 border-2 border-black font-accent text-center text-sm tracking-wider uppercase mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              🧾 BAKERY LEDGER INVOICE
            </div>

            {/* Cart list stream */}
            {cartItems.length === 0 ? (
              <div className="h-48 border-2 border-dashed border-neutral-300 flex flex-col justify-center items-center text-center p-4">
                <span className="material-symbols-outlined text-4xl text-neutral-300 mb-2">remove_shopping_cart</span>
                <span className="font-accent text-lg text-neutral-400">YOUR BASKET IS HOLLOW</span>
                <p className="font-serif text-2xs text-neutral-400 max-w-xs mt-1">
                  Click "+ ADD TO OVEN" on bakery cards to load carbohydrate logs into checking stream.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-56 overflow-y-auto mb-6 border-b-2 border-dashed border-black pb-4 select-text">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <h5 className="font-accent text-sm truncate text-black uppercase leading-tight">
                        {item.product.name}
                      </h5>
                      <span className="font-mono text-3xs text-neutral-500 font-bold">
                        ₩{item.product.price.toLocaleString()} x {item.qty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-accent text-sm font-semibold shrink-0 text-black">
                        ₩{(item.product.price * item.qty).toLocaleString()}
                      </span>
                      
                      {/* Delete button */}
                      <button
                        onClick={() => onRemoveFromCart(item.product.id)}
                        className="bg-red-100 hover:bg-red-500 hover:text-white text-red-700 px-1.5 py-0.5 border border-black font-accent text-[9px] cursor-pointer"
                        title="Remove product"
                      >
                        [X]
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Calculations Panel */}
            <div className="flex flex-col gap-1 text-sm border-b-4 border-black pb-4 mb-6 select-text">
              <div className="flex justify-between">
                <span className="font-serif font-black text-neutral-600">CARB SUB-TOTAL:</span>
                <span className="font-mono font-bold text-black">₩{cartSubtotal.toLocaleString()}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-black">
                  <span className="font-serif">OVEN DECK VOUCHER (20% OFF):</span>
                  <span className="font-mono">-[₩{discountAmount.toLocaleString()}]</span>
                </div>
              )}

              <div className="flex justify-between text-lg font-black border-t-2 border-black pt-2 mt-1">
                <span className="font-accent tracking-wide">GRAND TOTAL:</span>
                <span className="font-mono text-stroke-black text-[#b30069] bg-[#f3e700] px-1.5 border border-black shadow-[1px_1px_0px_0px_#000]">
                  ₩{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Enter coupon (Secret is BAKERPOW70) */}
            <div className="mb-6">
              <label className="block font-accent text-xxs uppercase text-slate-800 mb-1 font-bold">
                PROMO SECRET STICKER CODE
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. BAKERPOW70"
                  className="bg-slate-50 border-2 border-black px-2 py-1 font-mono text-xs text-black min-w-0 flex-1 outline-none focus:bg-white"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="font-accent text-xs bg-black text-white px-3 py-1.5 border-2 border-black hover:bg-[#b30069] cursor-pointer active:translate-y-[1px]"
                >
                  APPLY
                </button>
              </div>

              {/* Promo messages */}
              {couponError && (
                <p className="text-red-600 font-mono text-[9px] mt-1 uppercase font-semibold">
                  {couponError}
                </p>
              )}
              {couponSuccess && (
                <p className="text-emerald-600 font-mono text-[9px] mt-1 uppercase font-semibold">
                  {couponSuccess}
                </p>
              )}
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckout} className="flex flex-col gap-3 font-serif select-text">
              <span className="font-accent text-xxs bg-neutral-100 py-0.5 px-2 text-slate-700 tracking-wider inline-block">
                PATRON INFORMATION REGISTRATION
              </span>
              
              <div>
                <label className="block text-3xs font-black uppercase text-gray-500 mb-0.5">
                  DELIVEREE FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={deliveryName}
                  onChange={(e) => setDeliveryName(e.target.value)}
                  className="w-full bg-slate-50 border border-black p-1.5 text-xs text-black outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-3xs font-black uppercase text-gray-500 mb-0.5">
                  COMMUNICATION DIGITAL MAIL (GUEST EMAIL)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-black p-1.5 text-xs text-black outline-none focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={cartItems.length === 0}
                className={`w-full font-accent text-lg py-3 border-4 border-black text-black bg-[#f3e700] brutal-shadow hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_#000] active:translate-y-[2px] cursor-pointer mt-4 ${
                  cartItems.length === 0 ? 'opacity-50 cursor-not-allowed transform-none shadow-none hover:transform-none hover:shadow-none' : ''
                }`}
              >
                PROCEED WITH FLOUR SHIPMENT ▶
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* CHECKOUT RECIEPT OVERLAY LIGHTBOX */}
      <AnimatePresence>
        {checkoutReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-text">
            <motion.div
              initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.9, rotate: 2, opacity: 0 }}
              className="bg-white border-4 border-black p-6 md:p-8 max-w-md w-full text-black shadow-[16px_16px_0px_0px_#000]"
            >
              <div className="text-center font-accent select-none mb-6">
                {/* Visual success splash */}
                <div className="w-16 h-16 bg-[#f3e700] star-shape mx-auto border-2 border-black flex items-center justify-center animate-spin">
                  <span className="material-symbols-outlined text-2xl font-black">sports_score</span>
                </div>
                <h3 className="text-4xl uppercase tracking-tighter text-stroke-black mt-3">KAPOW!</h3>
                <h4 className="text-lg uppercase text-emerald-600 font-bold italic">
                  CARB REGISTER TRANSMITTED!
                </h4>
              </div>

              {/* Receipt table body */}
              <div className="font-mono text-xs border-y-4 border-dashed border-black py-4 my-4 flex flex-col gap-2 bg-[#f4f4f4] p-4">
                <div className="flex justify-between font-bold">
                  <span>ORDER IDENTIFIER:</span>
                  <span className="text-[#b30069]">{checkoutReceipt.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>REGISTRATION DATE:</span>
                  <span>2026-05-21 14:59 (GMT)</span>
                </div>
                <div className="flex justify-between">
                  <span>EMAIL DESTINATION:</span>
                  <span>{checkoutReceipt.email}</span>
                </div>

                <div className="border-t border-black my-2" />

                {/* Items loop */}
                <div className="flex flex-col gap-1.5 font-bold">
                  {checkoutReceipt.items.map((it, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{it.name} (x{it.qty})</span>
                      <span>₩{(it.price * it.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-black my-2" />

                <div className="flex justify-between text-sm font-black">
                  <span>TOTAL LEVIED:</span>
                  <span className="text-emerald-700">₩{checkoutReceipt.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center font-serif text-xxs text-neutral-500 px-4 leading-normal select-none">
                Note: Sungsimdang order ledger registers you for virtual queue pickups. We prepare ovens specifically for Eun-ah Hong! Thank you for 70 years!
              </div>

              <button
                onClick={handleCloseReceipt}
                className="w-full font-accent border-4 border-black text-white bg-black py-3 mt-6 text-center tracking-wider hover:bg-[#b00c62] brutal-shadow cursor-pointer active:translate-y-[2px]"
              >
                BAKE ANOTHER Batch [OK]
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
