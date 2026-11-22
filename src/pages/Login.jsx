import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export default function Login() {
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [password, setPassword] = useState('demo1234');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/account');
  };

  const handleDemoFill = () => {
    setEmail('ananya.sharma@example.com');
    setPassword('demo1234');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Sign In', path: '/login' }]} />

      <div className="bg-white rounded-3xl border border-[#EDE4E6] p-8 sm:p-10 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8EEF0] text-xs font-semibold uppercase tracking-wider text-[#E85D75] border border-[#EDE4E6]">
            <Sparkles className="w-3.5 h-3.5" /> Muse Privé
          </span>
          <h1 className="font-serif text-3xl text-[#1E1A1D]">Welcome Back</h1>
          <p className="text-xs text-[#6E6368]">
            Sign in to track orders, manage your bespoke sizing profile, and view your loyalty rewards.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#1E1A1D] font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ananya@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[#1E1A1D] font-medium">Password</label>
              <span className="text-[#6E6368] hover:text-[#E85D75] cursor-pointer">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Box */}
        <div className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#EDE4E6] text-[11px] text-[#6E6368] space-y-1.5 text-center">
          <p className="font-semibold text-[#1E1A1D]">Demonstration Access</p>
          <p>Click below to pre-fill credentials for our demo member account.</p>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-[#E85D75] hover:underline font-semibold"
          >
            Auto-fill Ananya's Demo Account
          </button>
        </div>

        <div className="text-center text-xs text-[#6E6368] pt-2 border-t border-[#EDE4E6]">
          Don't have a profile yet?{' '}
          <Link to="/register" className="text-[#E85D75] font-semibold hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
