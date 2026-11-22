import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Register', path: '/register' }]} />

      <div className="bg-white rounded-3xl border border-[#EDE4E6] p-8 sm:p-10 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8EEF0] text-xs font-semibold uppercase tracking-wider text-[#E85D75] border border-[#EDE4E6]">
            <Sparkles className="w-3.5 h-3.5" /> Join The Privé Circle
          </span>
          <h1 className="font-serif text-3xl text-[#1E1A1D]">Create an Account</h1>
          <p className="text-xs text-[#6E6368]">
            Enjoy seamless checkouts, saved nail sizes, and private drop invitations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#1E1A1D] font-medium mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Rhea Kapoor"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
            />
          </div>

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
              placeholder="rhea@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
            />
          </div>

          <div>
            <label className="block text-[#1E1A1D] font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
            />
          </div>

          <div>
            <label className="block text-[#1E1A1D] font-medium mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#6E6368] pt-2 border-t border-[#EDE4E6]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#E85D75] font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
