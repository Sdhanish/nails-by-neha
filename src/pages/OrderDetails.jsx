import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ImageWithFallback from '../components/common/ImageWithFallback';
import {
  Package,
  Truck,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowLeft,
  MapPin,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export default function OrderDetails() {
  const { id } = useParams();
  const { getOrderById } = useAuth();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#1E1A1D]">Order Not Found</h2>
        <p className="text-xs text-[#6E6368]">
          We couldn't locate order #{id}. It may have been cleared or placed in another session.
        </p>
        <Link
          to="/account/orders"
          className="px-6 py-2.5 rounded-full bg-[#1E1A1D] text-white text-xs font-semibold inline-block"
        >
          Back to Order History
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'My Account', path: '/account' },
          { label: 'Order History', path: '/account/orders' },
          { label: `Order #${order.id}`, path: `/account/orders/${order.id}` },
        ]}
      />

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-serif text-2xl sm:text-3xl text-[#1E1A1D]">
              Order #{order.id}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
              {order.status}
            </span>
          </div>
          <p className="text-xs text-[#6E6368]">
            Placed on {order.date} • Handled by {order.carrier}
          </p>
        </div>

        <Link
          to="/account/orders"
          className="px-4 py-2 rounded-full border border-[#EDE4E6] text-xs font-medium text-[#1E1A1D] hover:bg-[#FAF7F5] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Orders</span>
        </Link>
      </div>

      {/* Tracking & Timeline */}
      <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EDE4E6]">
          <h2 className="font-serif text-xl text-[#1E1A1D] flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#E85D75]" /> Tracking Details
          </h2>
          <span className="text-xs font-mono text-[#6E6368]">
            Tracking #: {order.trackingNumber}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          {order.timeline.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                step.completed
                  ? 'border-emerald-200 bg-emerald-50/50 text-[#1E1A1D]'
                  : 'border-[#EDE4E6] bg-[#FAF7F5] text-[#6E6368]'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                {step.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Clock className="w-4 h-4 text-[#6E6368] shrink-0" />
                )}
                <span>{step.step}</span>
              </div>
              <p className="text-[11px] text-[#6E6368] pl-6">{step.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Items & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Items */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-4">
          <h3 className="font-serif text-xl text-[#1E1A1D] pb-3 border-b border-[#EDE4E6]">
            Items in Order ({order.items.length})
          </h3>

          <div className="space-y-4 divide-y divide-[#EDE4E6]">
            {order.items.map((item, idx) => (
              <div key={idx} className="pt-4 first:pt-0 flex gap-4 items-center">
                <Link
                  to={`/product/${item.slug}`}
                  className="w-16 h-20 rounded-xl overflow-hidden bg-[#F8EEF0] border border-[#EDE4E6] shrink-0"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.slug}`}
                    className="font-medium text-xs sm:text-sm text-[#1E1A1D] hover:text-[#E85D75] truncate block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-[11px] text-[#6E6368]">
                    Shape: {item.shape || 'Standard'} • Size: {item.size || 'M'}
                  </p>
                  <p className="text-[11px] text-[#6E6368]">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#1E1A1D]">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary & Address */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 space-y-3 text-xs">
            <h3 className="font-serif text-lg text-[#1E1A1D] pb-2 border-b border-[#EDE4E6]">
              Delivery Destination
            </h3>
            <p className="font-semibold text-[#1E1A1D]">
              {order.shippingAddress?.fullName}
            </p>
            <p className="text-[#6E6368] leading-relaxed">
              {order.shippingAddress?.street} <br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
            </p>
            <div className="pt-2 border-t border-[#EDE4E6]">
              <span className="text-[#6E6368]">Payment:</span>{' '}
              <strong className="text-[#1E1A1D]">{order.paymentMethod}</strong>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 space-y-2 text-xs">
            <h3 className="font-serif text-lg text-[#1E1A1D] pb-2 border-b border-[#EDE4E6]">
              Billing Breakdown
            </h3>
            <div className="flex justify-between text-[#6E6368]">
              <span>Subtotal</span>
              <span className="font-medium text-[#1E1A1D]">₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#E85D75]">
                <span>Discount</span>
                <span className="font-medium">-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-[#6E6368]">
              <span>Delivery</span>
              <span className="font-medium text-[#1E1A1D]">
                {order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold text-[#1E1A1D] pt-2 border-t border-[#EDE4E6]">
              <span>Total Paid</span>
              <span className="font-serif text-xl text-[#E85D75]">₹{order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
