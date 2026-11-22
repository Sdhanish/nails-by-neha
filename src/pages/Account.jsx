import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  User,
  Package,
  Heart,
  Sparkles,
  MapPin,
  Ruler,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export default function Account() {
  const { user, logout, orders } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  // If not logged in, show guest prompt or login button
  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#1E1A1D]">Please Sign In</h2>
        <p className="text-xs text-[#6E6368]">
          Sign in to your demo account to access your orders and profile.
        </p>
        <Link
          to="/login"
          className="px-6 py-2.5 rounded-full bg-[#1E1A1D] text-white text-xs font-semibold inline-block"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'My Atelier Account', path: '/account' }]} />

      {/* Member Banner Card */}
      <div className="bg-[#F8EEF0] rounded-3xl p-6 sm:p-10 border border-[#EDE4E6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white border border-[#EDE4E6] flex items-center justify-center text-[#E85D75] font-serif text-2xl font-bold shrink-0">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#1E1A1D]">
                {user.name}
              </h1>
              <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#1E1A1D] text-white tracking-wider">
                {user.memberTier || 'Muse Privé Gold'}
              </span>
            </div>
            <p className="text-xs text-[#6E6368] mt-0.5">{user.email} • {user.phone}</p>
            <p className="text-[11px] text-[#E85D75] font-medium mt-1">
              Member since {user.joinedDate || '2025'} • {user.points || 480} Rewards Points
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full border border-[#EDE4E6] bg-white hover:bg-[#FAF7F5] text-xs font-semibold text-[#6E6368] hover:text-[#1E1A1D] flex items-center gap-1.5 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Quick Access Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/account/orders"
          className="p-5 rounded-2xl bg-white border border-[#EDE4E6] hover:border-[#E85D75]/40 transition-all flex items-center justify-between group shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8EEF0] text-[#E85D75] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-xs text-[#1E1A1D]">Order History</h3>
              <p className="text-[11px] text-[#6E6368]">{orders.length} Atelier Orders</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6E6368] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/shop?wishlist=true"
          className="p-5 rounded-2xl bg-white border border-[#EDE4E6] hover:border-[#E85D75]/40 transition-all flex items-center justify-between group shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8EEF0] text-[#E85D75] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-xs text-[#1E1A1D]">Saved Wishlist</h3>
              <p className="text-[11px] text-[#6E6368]">{wishlistCount} Saved Creations</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6E6368] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/find-your-match"
          className="p-5 rounded-2xl bg-white border border-[#EDE4E6] hover:border-[#E85D75]/40 transition-all flex items-center justify-between group shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8EEF0] text-[#E85D75] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-xs text-[#1E1A1D]">Style Matcher</h3>
              <p className="text-[11px] text-[#6E6368]">Retake Style Quiz</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6E6368] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Sizing Profile & Shipping Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sizing Profile */}
        <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE4E6]">
            <h3 className="font-serif text-xl text-[#1E1A1D] flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#E85D75]" /> Saved Sizing Profile
            </h3>
            <span className="text-[11px] font-semibold text-[#E85D75] bg-[#F8EEF0] px-2.5 py-0.5 rounded-full">
              Size M (Default)
            </span>
          </div>

          <p className="text-xs text-[#6E6368] leading-relaxed">
            Your custom width measurements are remembered so all sets fit seamlessly upon arrival.
          </p>

          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6]">
              <span className="block text-[10px] text-[#6E6368]">Thumb</span>
              <span className="font-bold text-[#1E1A1D]">16mm</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6]">
              <span className="block text-[10px] text-[#6E6368]">Index</span>
              <span className="font-bold text-[#1E1A1D]">12.5mm</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6]">
              <span className="block text-[10px] text-[#6E6368]">Middle</span>
              <span className="font-bold text-[#1E1A1D]">13.5mm</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6]">
              <span className="block text-[10px] text-[#6E6368]">Ring</span>
              <span className="font-bold text-[#1E1A1D]">11.5mm</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6]">
              <span className="block text-[10px] text-[#6E6368]">Pinky</span>
              <span className="font-bold text-[#1E1A1D]">9mm</span>
            </div>
          </div>
        </div>

        {/* Saved Delivery Destination */}
        <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE4E6]">
            <h3 className="font-serif text-xl text-[#1E1A1D] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E85D75]" /> Default Atelier Destination
            </h3>
            <span className="text-xs text-[#6E6368]">Primary</span>
          </div>

          <div className="space-y-1 text-xs text-[#6E6368] leading-relaxed">
            <p className="font-semibold text-[#1E1A1D]">{user.address?.fullName || user.name}</p>
            <p>{user.address?.street}</p>
            <p>{user.address?.city}, {user.address?.state} - {user.address?.postalCode}</p>
            <p>{user.address?.country || 'India'}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#1E1A1D]">Recent Orders</h2>
          <Link
            to="/account/orders"
            className="text-xs font-semibold text-[#E85D75] hover:underline"
          >
            View All ({orders.length})
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-[#EDE4E6] divide-y divide-[#EDE4E6] overflow-hidden">
          {orders.slice(0, 2).map((order) => (
            <div key={order.id} className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-[#1E1A1D]">#{order.id}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-100">
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-[#6E6368]">
                  Placed on {order.date} • {order.items.length} item(s) • Total: ₹{order.total}
                </p>
              </div>

              <Link
                to={`/account/orders/${order.id}`}
                className="px-5 py-2 rounded-full border border-[#EDE4E6] hover:bg-[#FAF7F5] text-xs font-semibold text-[#1E1A1D] flex items-center gap-1.5 transition-colors"
              >
                <span>Track & Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
