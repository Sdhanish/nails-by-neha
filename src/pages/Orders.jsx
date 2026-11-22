import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { Package, ChevronRight, Truck, Calendar, ShoppingBag } from 'lucide-react';

export default function Orders() {
  const { orders } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'My Account', path: '/account' },
          { label: 'Order History', path: '/account/orders' },
        ]}
      />

      <div className="space-y-1">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1A1D]">
          Order History & Tracking
        </h1>
        <p className="text-xs text-[#6E6368]">
          Review past shipments, view tracking status, and re-order signature sets.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#EDE4E6] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F8EEF0] text-[#E85D75] flex items-center justify-center mx-auto">
            <Package className="w-8 h-8 opacity-60" />
          </div>
          <h2 className="font-serif text-2xl text-[#1E1A1D]">No orders found</h2>
          <p className="text-xs text-[#6E6368] max-w-sm mx-auto">
            You haven't placed any demonstration orders yet.
          </p>
          <Link
            to="/shop"
            className="px-6 py-2.5 rounded-full bg-[#1E1A1D] text-white text-xs font-semibold inline-block"
          >
            Explore The Gallery
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-[#EDE4E6] overflow-hidden shadow-xs hover:border-[#E85D75]/40 transition-colors"
            >
              {/* Order Header */}
              <div className="p-4 sm:p-6 bg-[#FAF7F5] border-b border-[#EDE4E6] flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <span className="text-[#6E6368] text-[11px] block">Order Placed</span>
                    <span className="font-medium text-[#1E1A1D]">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-[#6E6368] text-[11px] block">Order ID</span>
                    <span className="font-bold text-[#1E1A1D]">#{order.id}</span>
                  </div>
                  <div>
                    <span className="text-[#6E6368] text-[11px] block">Total Amount</span>
                    <span className="font-bold text-[#E85D75]">₹{order.total}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                    {order.status}
                  </span>
                  <Link
                    to={`/account/orders/${order.id}`}
                    className="px-4 py-2 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Details & Timeline</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Items List Mini */}
              <div className="p-4 sm:p-6 divide-y divide-[#EDE4E6]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center gap-4">
                    <div className="w-14 h-16 rounded-xl overflow-hidden bg-[#F8EEF0] border border-[#EDE4E6] shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs sm:text-sm text-[#1E1A1D] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#6E6368]">
                        Qty: {item.quantity} • {item.shape || 'Standard'} • Size: {item.size || 'M'}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#1E1A1D]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
