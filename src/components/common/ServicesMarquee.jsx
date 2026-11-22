import React from 'react';
import { Sparkles, Heart, Eye, Check, ShieldCheck } from 'lucide-react';

const SERVICES_ITEMS = [
  { text: 'handcrafted press-on nails', icon: Sparkles },
  { text: 'custom nail art & sculpting', icon: Check },
  { text: 'bespoke lash extensions & styling', icon: Eye },
  { text: 'personalised apex & size fitting', icon: ShieldCheck },
  { text: 'salon quality without damage', icon: Sparkles },
  { text: 'cold-pressed cuticle elixirs', icon: Heart },
  { text: 'reusable multi-density acrylics', icon: Check },
  { text: 'made with love by neha', icon: Heart },
];

export default function ServicesMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-[#F8EEF0] border-y border-[#EDE4E6] py-3 text-xs">
      {/* Soft Gradient Fade on Edges */}
      <div
        className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#F8EEF0] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#F8EEF0] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Continuous Marquee Track */}
      <div className="animate-marquee-slow items-center gap-8 sm:gap-12 select-none">
        {SERVICES_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`srv-1-${idx}`} className="flex items-center gap-2 shrink-0">
              <Icon className="w-3.5 h-3.5 text-[#E85D75]" />
              <span className="text-[#1E1A1D] font-medium lowercase tracking-[-0.01em] text-[11px] sm:text-xs whitespace-nowrap">
                {item.text}
              </span>
              <span className="text-[#E85D75]/40 ml-6" aria-hidden="true">✦</span>
            </div>
          );
        })}

        {/* Duplicate Set for Seamless Infinite Loop */}
        {SERVICES_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`srv-2-${idx}`} className="flex items-center gap-2 shrink-0">
              <Icon className="w-3.5 h-3.5 text-[#E85D75]" />
              <span className="text-[#1E1A1D] font-medium lowercase tracking-[-0.01em] text-[11px] sm:text-xs whitespace-nowrap">
                {item.text}
              </span>
              <span className="text-[#E85D75]/40 ml-6" aria-hidden="true">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
