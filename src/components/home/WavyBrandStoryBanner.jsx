import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ImageWithFallback from '../common/ImageWithFallback';

export default function WavyBrandStoryBanner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden my-4 sm:my-8 bg-[#FAF7F5]">
      {/* Container with responsive editorial aspect height */}
      <div className="relative w-full h-[360px] sm:h-[450px] lg:h-[520px] overflow-hidden flex items-center justify-center">
        {/* Full-Width Editorial Nail-Art Lifestyle Photography with Subtle Zoom Entrance */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.85, scale: 1.06 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1.0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=2000&q=85"
            alt="editorial salon-grade manicure with liquid champagne reflection"
            className="w-full h-full object-cover object-center"
          />

          {/* Balanced Editorial Contrast Overlay (preserves image vibrancy while ensuring white headline readability) */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#1E1A1D]/35 via-[#1E1A1D]/25 to-[#1E1A1D]/40 backdrop-brightness-[0.92]"
            aria-hidden="true"
          />
        </motion.div>

        {/* Top Organic Seamless SVG Wave Divider (pinned to top edge, filled with #FAF7F5) */}
        <svg
          className="absolute top-0 inset-x-0 w-full h-9 sm:h-14 z-10 pointer-events-none -mt-[1px]"
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 L1440,0 L1440,28 C1280,48 1120,12 960,32 C800,50 640,16 480,36 C320,52 160,18 0,32 Z"
            fill="#FAF7F5"
          />
        </svg>

        {/* Centered Editorial Headline: "for the love of nails." */}
        <div className="relative z-10 px-4 sm:px-6 text-center max-w-4xl mx-auto flex items-center justify-center">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-white tracking-[-0.03em] lowercase leading-[1.1] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] select-none"
          >
            for the love of nails.
          </motion.h2>
        </div>

        {/* Bottom Organic Seamless SVG Wave Divider (pinned to bottom edge, filled with #FAF7F5) */}
        <svg
          className="absolute bottom-0 inset-x-0 w-full h-9 sm:h-14 z-10 pointer-events-none -mb-[1px]"
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,56 L1440,56 L1440,28 C1280,8 1120,44 960,24 C800,6 640,40 480,20 C320,4 160,38 0,24 Z"
            fill="#FAF7F5"
          />
        </svg>
      </div>
    </section>
  );
}
