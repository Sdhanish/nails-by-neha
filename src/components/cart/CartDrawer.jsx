import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/brand';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ImageWithFallback from '../common/ImageWithFallback';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    total,
    shippingFee,
    discountAmount,
    freeShippingThreshold,
    freeShippingRemaining,
    freeShippingProgress,
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1E1A1D]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col border-l border-[#EDE4E6]">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#EDE4E6] flex items-center justify-between bg-[#FAF7F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E85D75]" />
              <h2 className="font-serif text-2xl text-[#1E1A1D]">Shopping Bag</h2>
              <span className="text-xs bg-[#F8EEF0] text-[#1E1A1D] px-2 py-0.5 rounded-full font-medium border border-[#EDE4E6]">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#6E6368] hover:text-[#1E1A1D] rounded-full hover:bg-[#EDE4E6]/50 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="p-4 bg-[#F8EEF0] border-b border-[#EDE4E6]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-[#1E1A1D]">
                <Sparkles className="w-3.5 h-3.5 text-[#E85D75]" />
                {freeShippingRemaining > 0 ? (
                  <span>
                    Add{' '}
                    <strong className="text-[#E85D75]">
                      ₹{freeShippingRemaining}
                    </strong>{' '}
                    more for complimentary luxury shipping
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold">
                    ✓ You've unlocked Complimentary Express Delivery!
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#6E6368]">
                {freeShippingProgress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#EDE4E6] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E85D75] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EDE4E6]">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F8EEF0] flex items-center justify-center text-[#E85D75]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl text-[#1E1A1D]">Your bag is empty</h3>
                  <p className="text-xs text-[#6E6368] max-w-xs mx-auto">
                    Explore our salon-inspired press-on nails and conditioning botanicals.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#1E1A1D] text-white text-xs font-semibold hover:bg-[#E85D75] transition-colors inline-block"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.key} className="py-4 first:pt-0 flex gap-4">
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="w-20 h-24 rounded-lg overflow-hidden shrink-0 border border-[#EDE4E6] bg-[#F8EEF0]"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-medium text-sm text-[#1E1A1D] hover:text-[#E85D75] transition-colors leading-tight line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="text-[#6E6368] hover:text-[#E85D75] p-1 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant details */}
                      <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-[#6E6368]">
                        {item.shape && item.shape !== 'Standard' && (
                          <span className="bg-[#FAF7F5] px-1.5 py-0.5 rounded border border-[#EDE4E6]">
                            {item.shape}
                          </span>
                        )}
                        {item.length && item.length !== 'Standard' && (
                          <span className="bg-[#FAF7F5] px-1.5 py-0.5 rounded border border-[#EDE4E6]">
                            {item.length}
                          </span>
                        )}
                        {item.finish && item.finish !== 'Standard' && (
                          <span className="bg-[#FAF7F5] px-1.5 py-0.5 rounded border border-[#EDE4E6]">
                            {item.finish}
                          </span>
                        )}
                        {item.size && (
                          <span className="bg-[#FAF7F5] px-1.5 py-0.5 rounded border border-[#EDE4E6] font-medium text-[#1E1A1D]">
                            Size: {item.size}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#EDE4E6] rounded-full bg-[#FAF7F5]">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="p-1 px-2 text-[#6E6368] hover:text-[#1E1A1D]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-[#1E1A1D]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="p-1 px-2 text-[#6E6368] hover:text-[#1E1A1D]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#1E1A1D]">
                          ₹{item.price * item.quantity}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="block text-[11px] text-[#6E6368] line-through">
                            ₹{item.originalPrice * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Totals and CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EDE4E6] bg-[#FAF7F5] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6E6368]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1E1A1D]">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#E85D75]">
                    <span>Coupon Savings</span>
                    <span className="font-semibold">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#1E1A1D]">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#1E1A1D] pt-2 border-t border-[#EDE4E6]">
                  <span>Estimated Total</span>
                  <span className="text-[#E85D75] font-serif text-xl">₹{total}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 bg-[#1E1A1D] hover:bg-[#E85D75] text-white rounded-full font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="flex-1 py-2.5 text-center border border-[#EDE4E6] rounded-full text-xs font-medium text-[#1E1A1D] hover:bg-[#FFFFFF] transition-colors"
                  >
                    View Bag Page
                  </Link>
                  <button
                    onClick={closeCart}
                    className="flex-1 py-2.5 text-center border border-[#EDE4E6] rounded-full text-xs font-medium text-[#6E6368] hover:text-[#1E1A1D] hover:bg-[#FFFFFF] transition-colors"
                  >
                    Keep Shopping
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-center text-[#6E6368]">
                Taxes calculated at checkout • Complimentary prep kit with every order
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
