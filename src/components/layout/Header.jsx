import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import LuxuryMenuOverlay from './LuxuryMenuOverlay';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { wishlistCount } = useWishlist();
  const { itemsCount, openCart } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-250 ${
          isScrolled
            ? 'bg-gradient-to-r from-white/95 via-[#FAF7F5]/95 to-[#F8EEF0]/90 backdrop-blur-md shadow-xs border-b border-[#EDE4E6]'
            : 'bg-gradient-to-r from-[#FAF7F5] via-[#FFF9FA] to-[#FAF7F5] border-b border-[#EDE4E6]/80'
        } py-3 sm:py-3.5`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Luxury Editorial Hamburger Button with smooth micro-interaction */}
            <div className="flex items-center shrink-0">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-[#EDE4E6] bg-white/80 hover:bg-white text-[#1E1A1D] hover:border-[#E85D75]/60 hover:shadow-xs active:scale-95 transition-all duration-200 cursor-pointer shadow-2xs"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
              >
                {/* 2-line icon with subtle hover motion */}
                <div className="w-4 h-3.5 flex flex-col justify-between py-0.5">
                  <span className="w-full h-0.5 bg-[#1E1A1D] rounded-full transition-all duration-200 group-hover:w-3/4 group-hover:bg-[#E85D75]" />
                  <span className="w-3/4 h-0.5 bg-[#E85D75] rounded-full transition-all duration-200 group-hover:w-full" />
                </div>
             
              </button>
            </div>

            {/* Center: Brand Logo in Lowercase with Exact Typography Rules */}
            {/* First part: ExtraBold 800; Second part: Light 300; Tight tracking -0.04em */}
            <div className="text-center flex flex-col items-center justify-center px-2">
              <Link to="/" className="inline-flex items-baseline gap-1 sm:gap-1.5 group select-none">
                <span className="font-extrabold text-lg sm:text-2xl lg:text-[1.65rem] tracking-[-0.04em] text-[#1E1A1D] group-hover:text-[#E85D75] transition-colors whitespace-nowrap lowercase">
                  nails & lashes
                </span>
                <span className="font-light text-lg sm:text-2xl lg:text-[1.65rem] tracking-[-0.04em] text-[#6E6368] group-hover:text-[#E85D75] transition-colors whitespace-nowrap lowercase">
                  by neha
                </span>
              </Link>
            </div>

            {/* Right: Functional Action Icons */}
            <div className="flex items-center justify-end space-x-1 sm:space-x-1.5 shrink-0">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 sm:p-2.5 text-[#1E1A1D] hover:text-[#E85D75] hover:bg-white rounded-full transition-all duration-200 cursor-pointer active:scale-95"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Account Icon */}
              <Link
                to={isAuthenticated ? '/account' : '/login'}
                className="p-1.5 sm:p-2.5 text-[#1E1A1D] hover:text-[#E85D75] hover:bg-white rounded-full transition-all duration-200 hidden sm:flex active:scale-95"
                aria-label={isAuthenticated ? 'Account' : 'Sign In'}
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              {/* Wishlist Icon with Live Count */}
              <Link
                to="/shop?wishlist=true"
                className="p-1.5 sm:p-2.5 text-[#1E1A1D] hover:text-[#E85D75] hover:bg-white rounded-full transition-all duration-200 relative active:scale-95"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#E85D75] text-white text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-200">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Button with Live Cart Quantity */}
              <button
                onClick={openCart}
                className="p-1.5 sm:p-2.5 text-[#1E1A1D] hover:text-[#E85D75] hover:bg-white rounded-full transition-all duration-200 relative cursor-pointer active:scale-95"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {itemsCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#1E1A1D] text-white text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-200">
                    {itemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Luxury Navigation Drawer Overlay */}
      <LuxuryMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
