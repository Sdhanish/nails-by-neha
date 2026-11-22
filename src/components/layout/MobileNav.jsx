import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Sparkles, User, Heart, ShoppingBag, ChevronRight, Phone, Mail } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function MobileNav({ isOpen, onClose, onOpenSearch }) {
  const { wishlistCount } = useWishlist();
  const { itemsCount, openCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1E1A1D]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-10 flex flex-col border-r border-[#EDE4E6] animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EDE4E6] flex items-center justify-between bg-[#FAF7F5]">
          <Link to="/" onClick={onClose} className="font-serif text-2xl tracking-wider text-[#1E1A1D]">
            {BRAND_CONFIG.name}
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6E6368] hover:text-[#1E1A1D] rounded-full hover:bg-[#EDE4E6]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Links Bar */}
        <div className="p-3 bg-[#F8EEF0] border-b border-[#EDE4E6] flex items-center justify-around text-xs">
          <Link
            to={isAuthenticated ? "/account" : "/login"}
            onClick={onClose}
            className="flex items-center gap-1.5 text-[#1E1A1D] font-medium hover:text-[#E85D75]"
          >
            <User className="w-4 h-4 text-[#E85D75]" />
            <span>{isAuthenticated ? user.name.split(' ')[0] : 'Sign In'}</span>
          </Link>
          <span className="text-[#EDE4E6]">|</span>
          <Link
            to="/shop?wishlist=true"
            onClick={onClose}
            className="flex items-center gap-1.5 text-[#1E1A1D] font-medium hover:text-[#E85D75]"
          >
            <Heart className="w-4 h-4 text-[#E85D75]" />
            <span>Wishlist ({wishlistCount})</span>
          </Link>
        </div>

        {/* Quiz Banner in Nav */}
        <div className="p-4 bg-gradient-to-r from-[#FAF7F5] to-[#F8EEF0] border-b border-[#EDE4E6]">
          <Link
            to="/find-your-match"
            onClick={onClose}
            className="flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E85D75]" />
              <div>
                <p className="text-xs font-semibold text-[#1E1A1D]">Find Your Match</p>
                <p className="text-[11px] text-[#6E6368]">Take our 60-second nail quiz</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#6E6368] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Navigation Routes */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {MAIN_NAV_ITEMS.map((item) => (
            <div key={item.label} className="py-1">
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F8EEF0] text-[#E85D75] font-semibold'
                      : 'text-[#1E1A1D] hover:bg-[#FAF7F5]'
                  } ${item.highlight ? 'text-[#E85D75]' : ''}`
                }
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#EDE4E6]" />
              </NavLink>

              {/* Submenu for categories */}
              {item.submenu && (
                <div className="pl-4 mt-1 space-y-1 border-l-2 border-[#F8EEF0] ml-3">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.path}
                      onClick={onClose}
                      className="block px-3 py-1.5 text-xs text-[#6E6368] hover:text-[#E85D75] transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 mt-4 border-t border-[#EDE4E6] space-y-1">
            <Link
              to="/account/orders"
              onClick={onClose}
              className="block px-3 py-2 text-xs text-[#6E6368] hover:text-[#1E1A1D]"
            >
              Order Tracking & History
            </Link>
            <Link
              to="/cart"
              onClick={onClose}
              className="block px-3 py-2 text-xs text-[#6E6368] hover:text-[#1E1A1D]"
            >
              Shopping Bag ({itemsCount})
            </Link>
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#EDE4E6] bg-[#FAF7F5] text-xs text-[#6E6368] space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#E85D75]" />
            <span>{BRAND_CONFIG.contact.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#E85D75]" />
            <span>{BRAND_CONFIG.contact.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
