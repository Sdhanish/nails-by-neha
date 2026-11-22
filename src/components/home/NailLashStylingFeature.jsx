import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Clock, RefreshCw } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback';

const PILLARS = [
  {
    icon: Sparkles,
    title: 'salon apex curvature',
    desc: 'handcrafted apex curves with seamless cuticle lines',
  },
  {
    icon: Clock,
    title: '10-minute application',
    desc: 'complete salon prep kit included in every set',
  },
  {
    icon: RefreshCw,
    title: 'up to 5x reusability',
    desc: 'gentle silicone tabs protect your natural nail bed',
  },
  {
    icon: ShieldCheck,
    title: 'studio dispatch',
    desc: 'complimentary express delivery on orders over ₹799',
  },
];

export default function NailLashStylingFeature() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="rounded-3xl bg-white border border-[#EDE4E6] overflow-hidden p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text and Pillars Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold lowercase tracking-[-0.01em] text-[#E85D75]">
                nail &amp; lash styling
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold lowercase tracking-[-0.03em] leading-[1.1] text-[#1E1A1D]">
                a little luxury, every day
              </h2>
              <p className="text-xs sm:text-sm text-[#6E6368] font-normal lowercase leading-relaxed max-w-xl pt-1">
                handcrafted press-on sets and bespoke lash styling designed to bring effortless beauty to every moment. crafted in small studio batches for zero salon damage and enduring shine.
              </p>
            </div>

            {/* 4 Refined Editorial Pillars (No Numeric Markers) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {PILLARS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF7F5] border border-[#EDE4E6]/60">
                    <div className="w-8 h-8 rounded-full bg-[#F8EEF0] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#E85D75]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold lowercase tracking-[-0.02em] text-[#1E1A1D]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#6E6368] font-normal lowercase leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compact CTA Button */}
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-medium lowercase tracking-[-0.01em] transition-colors shadow-xs"
              >
                <span>explore atelier styles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Supporting Photography with Controlled Aspect */}
          <div className="lg:col-span-5">
            <div className="relative aspect-4/5 w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F8EEF0] border border-[#EDE4E6] shadow-sm">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80"
                alt="Nail and lash styling craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A1D]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#FADADD] block font-semibold mb-1">
                  Atelier Guarantee
                </span>
                <p className="text-xs sm:text-sm font-medium leading-snug">
                  100% reusable press-ons &amp; damage-free beauty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
