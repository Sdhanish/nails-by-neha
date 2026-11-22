import React, { useState, useEffect } from 'react';
import { X, Star, Heart, Check, ArrowRight, Ruler } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../common/ImageWithFallback';
import SizeGuideModal from '../common/SizeGuideModal';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedShape, setSelectedShape] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedShape(product.shape || (product.availableShapes && product.availableShapes[0]) || '');
      setSelectedLength(product.length || (product.availableLengths && product.availableLengths[0]) || '');
      setSelectedFinish(product.finish || (product.availableFinishes && product.availableFinishes[0]) || '');
      setSelectedSize((product.availableSizes && product.availableSizes[0]) || 'M');
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(
      product,
      {
        shape: selectedShape,
        length: selectedLength,
        finish: selectedFinish,
        size: selectedSize,
      },
      quantity
    );
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#1E1A1D]/60 backdrop-blur-xs transition-opacity duration-200"
          onClick={onClose}
        />

        {/* Modal Container */}
        <div className="relative bg-[#FFFFFF] rounded-2xl max-w-3xl w-full shadow-2xl border border-[#EDE4E6] z-10 overflow-hidden my-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#6E6368] hover:text-[#1E1A1D] hover:bg-[#F8EEF0] rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image View */}
            <div className="relative bg-[#F8EEF0] aspect-4/5 md:aspect-auto">
              <ImageWithFallback
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#1E1A1D] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Right Product Details & Options */}
            <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#E85D75] mb-1">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="font-semibold text-[#1E1A1D]">{product.rating}</span>
                  <span className="text-[#6E6368]">({product.reviewCount} reviews)</span>
                </div>

                <h3 className="font-serif text-2xl text-[#1E1A1D] mb-1">{product.name}</h3>
                <p className="text-xs text-[#6E6368] mb-3 line-clamp-2">
                  {product.shortDescription}
                </p>

                {/* Pricing */}
                <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[#EDE4E6]">
                  <span className="text-xl font-semibold text-[#1E1A1D]">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-[#6E6368] line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="text-[11px] font-semibold bg-[#E85D75]/10 text-[#E85D75] px-2 py-0.5 rounded-full">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Option: Shape */}
                {product.availableShapes && product.availableShapes.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-[#1E1A1D] mb-1.5">
                      Shape: <span className="text-[#6E6368]">{selectedShape}</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {product.availableShapes.map((shape) => (
                        <button
                          key={shape}
                          type="button"
                          onClick={() => setSelectedShape(shape)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${
                            selectedShape === shape
                              ? 'border-[#1E1A1D] bg-[#1E1A1D] text-white font-medium'
                              : 'border-[#EDE4E6] text-[#1E1A1D] hover:border-[#1E1A1D]'
                          }`}
                        >
                          {shape}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Option: Length */}
                {product.availableLengths && product.availableLengths.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-[#1E1A1D] mb-1.5">
                      Length: <span className="text-[#6E6368]">{selectedLength}</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {product.availableLengths.map((len) => (
                        <button
                          key={len}
                          type="button"
                          onClick={() => setSelectedLength(len)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${
                            selectedLength === len
                              ? 'border-[#1E1A1D] bg-[#1E1A1D] text-white font-medium'
                              : 'border-[#EDE4E6] text-[#1E1A1D] hover:border-[#1E1A1D]'
                          }`}
                        >
                          {len}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Option: Size */}
                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-[#1E1A1D]">
                        Size: <span className="text-[#6E6368]">{selectedSize}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="text-[11px] text-[#E85D75] hover:underline flex items-center gap-1"
                      >
                        <Ruler className="w-3 h-3" /> Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.availableSizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${
                            selectedSize === size
                              ? 'border-[#1E1A1D] bg-[#1E1A1D] text-white font-medium'
                              : 'border-[#EDE4E6] text-[#1E1A1D] hover:border-[#1E1A1D]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-3 border-t border-[#EDE4E6]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 bg-[#1E1A1D] hover:bg-[#E85D75] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm text-center"
                  >
                    Add to Bag • ₹{product.price * quantity}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-full border border-[#EDE4E6] transition-colors ${
                      isFavorited ? 'bg-[#FADADD] text-[#E85D75]' : 'text-[#6E6368] hover:text-[#1E1A1D]'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="text-xs text-[#6E6368] hover:text-[#E85D75] inline-flex items-center gap-1 font-medium transition-colors"
                  >
                    View Complete Product Experience <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </>
  );
}
