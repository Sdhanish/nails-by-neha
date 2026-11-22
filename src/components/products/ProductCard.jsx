import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import ImageWithFallback from '../common/ImageWithFallback';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, {}, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <>
      <div
        className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-[#EDE4E6] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#E85D75]/12 hover:border-[#E85D75]/40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Image Area with Editorial Framing */}
        <Link
          to={`/product/${product.slug}`}
          className="relative aspect-4/5 w-full overflow-hidden bg-[#F8EEF0] block"
        >
          {/* Primary image */}
          <div
            className={`absolute inset-0 transition-opacity duration-600 ease-out ${
              isHovered && product.images.length > 1 ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <ImageWithFallback
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            />
          </div>

          {/* Secondary image on hover */}
          {product.images.length > 1 && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ImageWithFallback
                src={secondaryImage}
                alt={`${product.name} atelier angle`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              />
            </div>
          )}

          {/* Badges in Lowercase Refined Plus Jakarta Sans */}
          <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 flex flex-col gap-1 z-10 pointer-events-none">
            {product.badge && (
              <span className="bg-[#1E1A1D]/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-medium lowercase tracking-[-0.01em] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-2xs">
                {product.badge.toLowerCase()}
              </span>
            )}
            {discountPercent && (
              <span className="bg-[#E85D75] text-white text-[9px] sm:text-[10px] font-semibold lowercase tracking-[-0.01em] px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full shadow-2xs w-fit">
                save {discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist Button with Tactile Tap Spring Animation */}
          <motion.button
            whileTap={{ scale: 0.82 }}
            onClick={handleWishlistClick}
            className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
              isFavorited
                ? 'bg-white text-[#E85D75] scale-105'
                : 'bg-white/90 backdrop-blur-xs text-[#6E6368] hover:text-[#E85D75] hover:bg-white hover:scale-105'
            }`}
            aria-label={isFavorited ? 'remove from wishlist' : 'save to wishlist'}
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
                isFavorited ? 'fill-current scale-110' : ''
              }`}
            />
          </motion.button>

          {/* Floating Actions Strip (revealed on desktop hover) */}
          <div className="hidden sm:flex absolute inset-x-3.5 bottom-3.5 gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              onClick={handleQuickViewClick}
              className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#1E1A1D] hover:text-[#E85D75] rounded-full text-xs font-medium lowercase tracking-[-0.01em] shadow-md flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer border border-[#EDE4E6] active:scale-95"
            >
              <Eye className="w-3.5 h-3.5 text-[#6E6368]" />
              <span>quick view</span>
            </button>
            <button
              onClick={handleQuickAdd}
              className="py-2 px-3.5 bg-[#1E1A1D] hover:bg-[#E85D75] text-white rounded-full text-xs font-medium lowercase tracking-[-0.01em] shadow-md flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95"
              title="quick add to bag"
              aria-label={`add ${product.name.toLowerCase()} to bag`}
            >
              {justAdded ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </Link>

        {/* Card Content & Hierarchy */}
        <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between bg-white space-y-2 sm:space-y-3">
          <div>
            {/* Meta Tags: Silhouette & Star Rating */}
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#6E6368] mb-0.5 sm:mb-1">
              <span className="font-normal lowercase truncate max-w-[90px] xs:max-w-none">
                {product.shape ? `${product.shape.toLowerCase()} • ${product.length?.toLowerCase()}` : product.categoryName?.toLowerCase()}
              </span>
              <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 font-semibold shrink-0">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                <span className="text-[#1E1A1D] text-[11px] sm:text-xs font-semibold">{product.rating}</span>
                <span className="text-[#6E6368]/60 text-[9px] sm:text-[10px]">({product.reviewCount})</span>
              </div>
            </div>

            {/* Product Title in Lowercase Weight 700 with Tight Tracking */}
            <Link
              to={`/product/${product.slug}`}
              className="block group-hover:text-[#E85D75] transition-colors"
            >
              <h3 className="font-bold text-xs sm:text-base md:text-lg text-[#1E1A1D] lowercase tracking-[-0.03em] leading-snug line-clamp-1">
                {product.name.toLowerCase()}
              </h3>
            </Link>

            {/* Finish & Subtitle */}
            <p className="text-[11px] sm:text-xs text-[#6E6368] font-normal lowercase line-clamp-1 mt-0.5 leading-normal">
              {product.shortDescription?.toLowerCase()}
            </p>
          </div>

          {/* Pricing & Mobile Quick Action */}
          <div className="flex items-center justify-between pt-2 sm:pt-2.5 border-t border-[#EDE4E6]/80">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-base font-bold text-[#1E1A1D] tracking-[-0.02em]">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-[#6E6368]/70 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Mobile-visible quick add button */}
            <button
              onClick={handleQuickAdd}
              className="sm:hidden p-1.5 rounded-full bg-[#FAF7F5] hover:bg-[#E85D75] hover:text-white text-[#1E1A1D] border border-[#EDE4E6] transition-colors cursor-pointer active:scale-95"
              aria-label={`add ${product.name.toLowerCase()} to bag`}
            >
              {justAdded ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <ShoppingBag className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
