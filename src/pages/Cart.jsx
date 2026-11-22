import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ImageWithFallback from '../components/common/ImageWithFallback';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export default function Cart() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    total,
    shippingFee,
    discountAmount,
    couponCode,
    setCouponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingRemaining,
    freeShippingProgress,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(inputCode)) {
      setInputCode('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Shopping Bag', path: '/cart' }]} />

      <div className="space-y-1">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1A1D]">
          Your Shopping Bag
        </h1>
        <p className="text-xs text-[#6E6368]">
          Review your selected salon-quality press-on sets and vanity accessories.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#EDE4E6] p-12 sm:p-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F8EEF0] text-[#E85D75] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 opacity-60" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1A1D]">
            Your shopping bag is currently empty
          </h2>
          <p className="text-xs text-[#6E6368] max-w-sm mx-auto leading-relaxed">
            Discover handcrafted press-on nails and nourishing cuticle botanicals designed for effortless everyday luxury.
          </p>
          <Link
            to="/shop"
            className="px-8 py-3.5 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-block cursor-pointer shadow-sm"
          >
            Explore The Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Items Table */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Meter */}
            <div className="p-4 bg-[#F8EEF0] rounded-2xl border border-[#EDE4E6]">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-[#1E1A1D]">
                  <Sparkles className="w-3.5 h-3.5 text-[#E85D75]" />
                  {freeShippingRemaining > 0 ? (
                    <span>
                      Add <strong className="text-[#E85D75]">₹{freeShippingRemaining}</strong> more for complimentary express delivery
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-semibold">
                      ✓ Complimentary express delivery unlocked!
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

            {/* Items List */}
            <div className="bg-white rounded-3xl border border-[#EDE4E6] divide-y divide-[#EDE4E6] overflow-hidden">
              <div className="p-4 bg-[#FAF7F5] hidden sm:grid grid-cols-12 text-xs font-semibold uppercase tracking-wider text-[#6E6368]">
                <div className="col-span-6">Creation</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {items.map((item) => (
                <div key={item.key} className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Image & Title */}
                  <div className="sm:col-span-6 flex gap-4 items-center">
                    <Link
                      to={`/product/${item.slug}`}
                      className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-[#F8EEF0] border border-[#EDE4E6] shrink-0"
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="space-y-1">
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-medium text-sm sm:text-base text-[#1E1A1D] hover:text-[#E85D75] transition-colors leading-tight"
                      >
                        {item.name}
                      </Link>

                      <div className="flex flex-wrap gap-1 text-[11px] text-[#6E6368]">
                        {item.shape && item.shape !== 'Standard' && (
                          <span className="bg-[#FAF7F5] px-2 py-0.5 rounded border border-[#EDE4E6]">
                            {item.shape}
                          </span>
                        )}
                        {item.length && item.length !== 'Standard' && (
                          <span className="bg-[#FAF7F5] px-2 py-0.5 rounded border border-[#EDE4E6]">
                            {item.length}
                          </span>
                        )}
                        {item.size && (
                          <span className="bg-[#FAF7F5] px-2 py-0.5 rounded border border-[#EDE4E6] font-semibold text-[#1E1A1D]">
                            Size: {item.size}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-xs text-[#6E6368] hover:text-[#E85D75] inline-flex items-center gap-1 pt-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-2 text-left sm:text-center text-xs sm:text-sm font-medium text-[#1E1A1D]">
                    <span className="sm:hidden text-[#6E6368] mr-2">Price:</span>
                    ₹{item.price}
                  </div>

                  {/* Quantity Controls */}
                  <div className="sm:col-span-2 flex items-center sm:justify-center">
                    <div className="flex items-center border border-[#EDE4E6] rounded-full bg-[#FAF7F5]">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="p-1 px-2.5 text-[#6E6368] hover:text-[#1E1A1D]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold px-2 text-[#1E1A1D]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="p-1 px-2.5 text-[#6E6368] hover:text-[#1E1A1D]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="sm:col-span-2 text-left sm:text-right font-semibold text-sm sm:text-base text-[#1E1A1D]">
                    <span className="sm:hidden text-[#6E6368] mr-2">Subtotal:</span>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs">
              <Link
                to="/shop"
                className="text-[#1E1A1D] hover:text-[#E85D75] font-semibold underline underline-offset-4"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-[#6E6368] hover:text-[#E85D75]"
              >
                Clear Bag
              </button>
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-6 shadow-xs sticky top-24">
            <h2 className="font-serif text-2xl text-[#1E1A1D] pb-3 border-b border-[#EDE4E6]">
              Order Summary
            </h2>

            {/* Coupon Box */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#1E1A1D] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#E85D75]" /> Promo / Gift Code
              </label>
              {appliedCoupon ? (
                <div className="p-3 bg-[#F8EEF0] rounded-2xl border border-[#EDE4E6] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#E85D75] uppercase">{appliedCoupon.code}</span>
                    <p className="text-[11px] text-[#6E6368]">{appliedCoupon.description}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#6E6368] hover:text-[#E85D75] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="MUSE10 or GLAM20"
                    className="px-3.5 py-2.5 rounded-full text-xs bg-[#FAF7F5] border border-[#EDE4E6] uppercase focus:outline-hidden text-[#1E1A1D] flex-1"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-[#6E6368] pt-2 border-t border-[#EDE4E6]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#1E1A1D]">₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#E85D75]">
                  <span>Coupon Discount</span>
                  <span className="font-semibold">-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="font-semibold text-[#1E1A1D]">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold text-[#1E1A1D] pt-3 border-t border-[#EDE4E6]">
                <span>Total Amount</span>
                <span className="font-serif text-2xl text-[#E85D75]">₹{total}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Badges */}
            <div className="pt-2 border-t border-[#EDE4E6] text-[11px] text-[#6E6368] space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E85D75] shrink-0" />
                <span>Complimentary luxury prep suite included</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#E85D75] shrink-0" />
                <span>Zero-risk sizing exchange guarantee</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
