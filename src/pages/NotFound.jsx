import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Home } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8EEF0] text-xs font-semibold uppercase tracking-wider text-[#E85D75] border border-[#EDE4E6]">
        <Sparkles className="w-3.5 h-3.5" /> 404 • Page Not Found
      </span>

      <h1 className="font-serif text-4xl sm:text-6xl text-[#1E1A1D]">
        An Untended Cuticle.
      </h1>

      <p className="text-xs sm:text-sm text-[#6E6368] max-w-md mx-auto leading-relaxed">
        The page you are looking for has been reshaped, polished, or moved elsewhere in our atelier.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="px-8 py-3.5 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/shop"
          className="px-8 py-3.5 rounded-full border border-[#EDE4E6] bg-white hover:bg-[#FAF7F5] text-[#1E1A1D] text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Shop</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
