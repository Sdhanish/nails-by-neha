import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, User, Heart, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import InstagramIcon from '../common/InstagramIcon';

const ESSENTIAL_NAV_LINKS = [
  { label: 'home', path: '/' },
  { label: 'shop all', path: '/shop' },
  { label: 'collections', path: '/shop?category=bundles' },
  { label: 'press-on nails', path: '/category/press-on-nails' },
  { label: 'nail care', path: '/category/nail-care' },
  { label: 'accessories', path: '/category/accessories' },
  { label: 'our story', path: '/#story' },
];

export default function LuxuryMenuOverlay({ isOpen, onClose }) {
  const { wishlistCount } = useWishlist();
  const { itemsCount, openCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll locking WITHOUT body padding shift (scrollbar-gutter: stable prevents jumping)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavigate = (path) => {
    onClose();
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(path.replace('/#', ''));
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(path.replace('/#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
        >
          {/* Subtle Dark Backdrop with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1E1A1D]/40 backdrop-blur-[2px]"
          />

          {/* Half-Screen Left Drawer with Luxury Blush Gradient & Shake-Free Slide */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 w-[88vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] max-w-lg bg-gradient-to-b from-[#FFFFFF] via-[#FFF9FA] to-[#F8EEF0] border-r border-[#EDE4E6] shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="p-6 sm:p-7 flex items-center justify-between border-b border-[#EDE4E6] shrink-0 bg-white/80 backdrop-blur-xs">
              <Link
                to="/"
                onClick={onClose}
                className="inline-flex items-baseline gap-1.5 group select-none"
              >
                <span className="font-extrabold text-lg sm:text-xl tracking-[-0.04em] text-[#1E1A1D] group-hover:text-[#E85D75] transition-colors whitespace-nowrap lowercase">
                  nails & lashes
                </span>
                <span className="font-light text-lg sm:text-xl tracking-[-0.04em] text-[#6E6368] group-hover:text-[#E85D75] transition-colors whitespace-nowrap lowercase">
                  by neha
                </span>
              </Link>

              {/* Clean Close Button: ICON ONLY without "Close" text */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#EDE4E6] bg-white text-[#1E1A1D] hover:bg-[#1E1A1D] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer group shadow-2xs"
                aria-label="Close navigation drawer"
              >
                <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
              </button>
            </div>

            {/* Essential Navigation Links with Staggered Entrance Animation */}
            <div className="px-8 sm:px-10 py-6 sm:py-8 flex-1 flex flex-col justify-center">
              <nav className="space-y-3.5 sm:space-y-4">
                {ESSENTIAL_NAV_LINKS.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + idx * 0.035,
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className="group relative flex items-center justify-between w-full text-left font-medium text-2xl sm:text-3xl lg:text-[2.1rem] text-[#1E1A1D] hover:text-[#E85D75] tracking-[-0.02em] transition-colors duration-200 cursor-pointer py-1 lowercase"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1.5 relative inline-block">
                        {item.label}
                        {/* Subtle Underline Gradient Indicator on Hover */}
                        <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-gradient-to-r from-[#E85D75] via-[#FADADD] to-transparent transition-all duration-300 group-hover:w-full" />
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#E85D75] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    </button>
                  </motion.div>
                ))}
              </nav>

              {/* Instagram Studio Callout Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 sm:pt-7 mt-5 border-t border-[#EDE4E6] space-y-3"
              >
                <a
                  href={BRAND_CONFIG.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#EDE4E6] hover:border-[#E85D75]/40 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F8EEF0] to-[#FAF7F5] border border-[#EDE4E6] flex items-center justify-center text-[#E85D75] group-hover:scale-105 group-hover:bg-[#E85D75] group-hover:text-white transition-all">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#1E1A1D] group-hover:text-[#E85D75] transition-colors block lowercase">
                        @nails_by_nehaaaaa
                      </span>
                      <span className="text-[10px] text-[#6E6368] lowercase">
                        daily studio sets &amp; client stories
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6E6368] group-hover:text-[#E85D75] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </motion.div>
            </div>

            {/* Quick Action Footer in Drawer */}
            <div className="p-6 sm:p-7 border-t border-[#EDE4E6] bg-white/70 space-y-3 shrink-0">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate(isAuthenticated ? '/account' : '/login');
                  }}
                  className="flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl border border-[#EDE4E6] bg-white hover:border-[#E85D75] hover:text-[#E85D75] text-[#1E1A1D] transition-colors text-[11px] font-medium lowercase"
                >
                  <User className="w-4 h-4" />
                  <span>{isAuthenticated ? 'account' : 'sign in'}</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    navigate('/shop?wishlist=true');
                  }}
                  className="flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl border border-[#EDE4E6] bg-white hover:border-[#E85D75] hover:text-[#E85D75] text-[#1E1A1D] transition-colors text-[11px] font-medium lowercase relative"
                >
                  <Heart className="w-4 h-4" />
                  <span>wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="absolute top-1.5 right-2 w-3.5 h-3.5 bg-[#E85D75] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    onClose();
                    openCart();
                  }}
                  className="flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl border border-[#EDE4E6] bg-white hover:border-[#E85D75] hover:text-[#E85D75] text-[#1E1A1D] transition-colors text-[11px] font-medium lowercase relative"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>bag</span>
                  {itemsCount > 0 && (
                    <span className="absolute top-1.5 right-2 w-3.5 h-3.5 bg-[#1E1A1D] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                      {itemsCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Atelier contact support hint */}
              <div className="text-center pt-1 text-[11px] text-[#6E6368] lowercase">
                handcrafted with care • studio in delhi, india
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
