import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { useToast } from '../context/ToastContext';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  ArrowRight,
  Sparkles,
  Tag,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export default function Checkout() {
  const {
    items,
    subtotal,
    total,
    shippingFee,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();
  const { user, placeOrder } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#1E1A1D]">Your bag is empty</h2>
        <p className="text-xs text-[#6E6368]">
          Add your favorite press-on sets to proceed to checkout.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 rounded-full bg-[#1E1A1D] text-white text-xs font-semibold inline-block"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    fullName: user?.name || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || 'Karnataka',
    postalCode: user?.address?.postalCode || '',
    country: 'India',
  });

  const [shippingMethod, setShippingMethod] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [couponInput, setCouponInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.email || !formData.phone || !formData.fullName || !formData.street || !formData.city || !formData.postalCode) {
      addToast('Please fill in all required shipping fields', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate seamless processing
    setTimeout(() => {
      const createdOrder = placeOrder({
        items,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        paymentMethod: paymentMethod === 'upi' ? `UPI (${upiId})` : 'Card / Net Banking (Demo)',
        shippingAddress: { ...formData },
      });

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation?orderId=${createdOrder.id}`);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Bag', path: '/cart' },
          { label: 'Demo Checkout', path: '/checkout' },
        ]}
      />

      {/* Demo Notice Banner */}
      <div className="p-4 bg-[#F8EEF0] rounded-2xl border border-[#EDE4E6] flex items-center gap-3 text-xs text-[#1E1A1D]">
        <AlertCircle className="w-4 h-4 text-[#E85D75] shrink-0" />
        <p>
          <strong className="font-semibold text-[#E85D75]">Demo Checkout:</strong> No real payment gateway or card information is collected. Order will be recorded to your demo customer account in localStorage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Checkout Form */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmitOrder} className="space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE4E6]">
                <h2 className="font-serif text-xl sm:text-2xl text-[#1E1A1D]">
                  1. Contact Information
                </h2>
                <span className="text-xs text-[#6E6368]">
                  {user ? 'Logged in as ' + user.name : 'Guest Checkout'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#1E1A1D] font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="concierge@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
                  />
                </div>

                <div>
                  <label className="block text-[#1E1A1D] font-medium mb-1">
                    Phone Number (SMS tracking) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-[#1E1A1D] pb-3 border-b border-[#EDE4E6]">
                2. Atelier Delivery Address
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#1E1A1D] font-medium mb-1">
                    Full Recipient Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ananya Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
                  />
                </div>

                <div>
                  <label className="block text-[#1E1A1D] font-medium mb-1">
                    Street Address, Flat / Villa No. *
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Flat 402, Lotus Blossom Residency, 12th Main"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#1E1A1D] font-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Bengaluru"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1E1A1D] font-medium mb-1">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1E1A1D] font-medium mb-1">
                      Postal PIN Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="560038"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-[#1E1A1D] pb-3 border-b border-[#EDE4E6]">
                3. Shipping Preference
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'express'
                      ? 'border-[#E85D75] bg-[#F8EEF0]'
                      : 'border-[#EDE4E6] bg-[#FAF7F5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-[#E85D75]" />
                    <div>
                      <p className="text-xs font-semibold text-[#1E1A1D]">
                        Atelier Express Priority Dispatch
                      </p>
                      <p className="text-[11px] text-[#6E6368]">
                        Delivered in 2–3 business days via BlueDart Air
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#1E1A1D]">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : `₹${shippingFee}`}
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Selection (Visual Demo) */}
            <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE4E6]">
                <h2 className="font-serif text-xl sm:text-2xl text-[#1E1A1D]">
                  4. Payment Method
                </h2>
                <span className="text-[11px] bg-[#F8EEF0] text-[#E85D75] px-2.5 py-0.5 rounded-full font-semibold border border-[#EDE4E6]">
                  Demo Mode
                </span>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border block cursor-pointer transition-colors ${
                    paymentMethod === 'upi'
                      ? 'border-[#E85D75] bg-[#F8EEF0]'
                      : 'border-[#EDE4E6] bg-[#FAF7F5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <QrCode className="w-4 h-4 text-[#E85D75]" />
                      <span className="text-xs font-semibold text-[#1E1A1D]">
                        Instant UPI / Google Pay / PhonePe (Demo)
                      </span>
                    </div>
                    {paymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-[#E85D75]" />}
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-[#EDE4E6] text-xs">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#EDE4E6] text-[#1E1A1D]"
                      />
                      <span className="text-[10px] text-[#6E6368] mt-1 block">
                        Pre-filled with simulated demo UPI address
                      </span>
                    </div>
                  )}
                </label>

                {/* Card Option */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border block cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-[#E85D75] bg-[#F8EEF0]'
                      : 'border-[#EDE4E6] bg-[#FAF7F5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-[#E85D75]" />
                      <span className="text-xs font-semibold text-[#1E1A1D]">
                        Credit / Debit Cards (Demo Simulation)
                      </span>
                    </div>
                    {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-[#E85D75]" />}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-[#EDE4E6] text-xs text-[#6E6368]">
                      Simulated card checkout. No card numbers requested for demonstration.
                    </div>
                  )}
                </label>
              </div>

              {/* Complete Order Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Placing Atelier Order...</span>
                  ) : (
                    <>
                      <span>Complete Mock Order • ₹{total}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-[#6E6368] mt-2">
                  By confirming, you place a demonstration order. You will receive an instant confirmation screen.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE4E6]">
            <h2 className="font-serif text-2xl text-[#1E1A1D]">Bag Summary</h2>
            <span className="text-xs text-[#6E6368]">{items.length} items</span>
          </div>

          {/* Items mini list */}
          <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-[#EDE4E6]">
            {items.map((item) => (
              <div key={item.key} className="pt-3 first:pt-0 flex gap-3 items-center">
                <div className="w-14 h-16 rounded-lg overflow-hidden bg-[#F8EEF0] border border-[#EDE4E6] shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#1E1A1D] truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#6E6368]">
                    Qty: {item.quantity} • {item.shape || 'Standard'} • Size: {item.size}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#1E1A1D]">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Coupon Input */}
          <div className="space-y-2 pt-3 border-t border-[#EDE4E6]">
            <label className="block text-xs font-medium text-[#1E1A1D] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#E85D75]" /> Promo Code
            </label>
            {appliedCoupon ? (
              <div className="p-3 bg-[#F8EEF0] rounded-xl border border-[#EDE4E6] flex items-center justify-between text-xs">
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
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="MUSE10"
                  className="px-3.5 py-2 rounded-xl text-xs bg-[#FAF7F5] border border-[#EDE4E6] uppercase text-[#1E1A1D] flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold uppercase"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Summary Details */}
          <div className="space-y-2 text-xs text-[#6E6368] pt-3 border-t border-[#EDE4E6]">
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
              <span>BlueDart Express Shipping</span>
              <span className="font-semibold text-[#1E1A1D]">
                {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shippingFee}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-semibold text-[#1E1A1D] pt-3 border-t border-[#EDE4E6]">
              <span>Final Order Total</span>
              <span className="font-serif text-2xl text-[#E85D75]">₹{total}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#EDE4E6] text-[11px] text-[#6E6368] space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-[#1E1A1D]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E85D75]" />
              Includes Atelier Prep Suite
            </div>
            <p>Every set arrives with 48 adhesive tabs, glue, crystal file, and cuticle stick.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
