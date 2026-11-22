import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ImageWithFallback from '../components/common/ImageWithFallback';
import {
  CheckCircle,
  Truck,
  Package,
  Calendar,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const { getOrderById, orders } = useAuth();

  const orderId = searchParams.get('orderId') || (orders[0] ? orders[0].id : 'MM-84920');
  const order = getOrderById(orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#1E1A1D]">Order Not Found</h2>
        <p className="text-xs text-[#6E6368]">
          No matching demo order was located in your current session.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 rounded-full bg-[#1E1A1D] text-white text-xs font-semibold inline-block"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Order Confirmation', path: '/order-confirmation' }]} />

      {/* Main Confirmation Hero Card */}
      <div className="bg-white rounded-3xl border border-[#EDE4E6] p-8 sm:p-12 shadow-sm text-center space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F8EEF0] text-xs font-semibold uppercase tracking-wider text-[#E85D75] border border-[#EDE4E6]">
          <Sparkles className="w-3.5 h-3.5" /> Order Confirmed
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1A1D]">
          Thank you for choosing {BRAND_CONFIG.name}.
        </h1>

        <p className="text-xs sm:text-sm text-[#6E6368] max-w-md mx-auto leading-relaxed">
          Your order <strong className="text-[#1E1A1D]">#{order.id}</strong> has been received by our Bengaluru atelier and is being carefully prepped.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-[#6E6368]">
          <span className="flex items-center gap-1.5 bg-[#FAF7F5] px-3.5 py-1.5 rounded-full border border-[#EDE4E6]">
            <Calendar className="w-3.5 h-3.5 text-[#E85D75]" />
            Order Date: {order.date}
          </span>
          <span className="flex items-center gap-1.5 bg-[#FAF7F5] px-3.5 py-1.5 rounded-full border border-[#EDE4E6]">
            <Truck className="w-3.5 h-3.5 text-[#E85D75]" />
            {order.carrier} (Tracking: {order.trackingNumber})
          </span>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl text-[#1E1A1D]">
          Atelier Fulfillment Progress
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          {order.timeline.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-xs space-y-1 ${
                step.completed
                  ? 'border-emerald-300 bg-emerald-50/40 text-[#1E1A1D]'
                  : 'border-[#EDE4E6] bg-[#FAF7F5] text-[#6E6368]'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                <span
                  className={`w-2 h-2 rounded-full ${
                    step.completed ? 'bg-emerald-600' : 'bg-[#EDE4E6]'
                  }`}
                />
                <span>{step.step}</span>
              </div>
              <p className="text-[11px] text-[#6E6368] pl-4">{step.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details & Items Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Items in Order */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl text-[#1E1A1D] pb-3 border-b border-[#EDE4E6]">
            Creations in this Order ({order.items.length})
          </h2>

          <div className="space-y-4 divide-y divide-[#EDE4E6]">
            {order.items.map((item, idx) => (
              <div key={idx} className="pt-4 first:pt-0 flex gap-4 items-center">
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#F8EEF0] border border-[#EDE4E6] shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-[#1E1A1D] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#6E6368]">
                    Shape: {item.shape || 'Standard'} • Size: {item.size || 'M'}
                  </p>
                  <p className="text-xs text-[#6E6368]">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <span className="font-semibold text-sm text-[#1E1A1D]">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Shipping Address & Financials */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 space-y-3 text-xs">
            <h3 className="font-serif text-lg text-[#1E1A1D] pb-2 border-b border-[#EDE4E6]">
              Delivery Destination
            </h3>
            <p className="font-semibold text-[#1E1A1D]">{order.shippingAddress?.fullName}</p>
            <p className="text-[#6E6368] leading-relaxed">
              {order.shippingAddress?.street} <br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
            </p>
            <div className="pt-2 border-t border-[#EDE4E6]">
              <span className="text-[#6E6368]">Payment Method:</span>{' '}
              <strong className="text-[#1E1A1D]">{order.paymentMethod}</strong>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 space-y-2 text-xs">
            <h3 className="font-serif text-lg text-[#1E1A1D] pb-2 border-b border-[#EDE4E6]">
              Payment Summary
            </h3>
            <div className="flex justify-between text-[#6E6368]">
              <span>Subtotal</span>
              <span className="text-[#1E1A1D] font-medium">₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#E85D75]">
                <span>Savings</span>
                <span className="font-medium">-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-[#6E6368]">
              <span>Shipping</span>
              <span className="text-[#1E1A1D] font-medium">
                {order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold text-[#1E1A1D] pt-2 border-t border-[#EDE4E6]">
              <span>Total Paid</span>
              <span className="font-serif text-xl text-[#E85D75]">₹{order.total}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/account/orders"
              className="w-full py-3 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold uppercase tracking-wider text-center transition-colors shadow-sm"
            >
              View Order in Account
            </Link>
            <Link
              to="/shop"
              className="w-full py-3 rounded-full border border-[#EDE4E6] bg-white hover:bg-[#FAF7F5] text-xs font-semibold text-[#1E1A1D] text-center transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
