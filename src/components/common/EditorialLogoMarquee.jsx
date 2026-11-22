import React from 'react';

const EDITORIAL_LOGOS = [
  { name: 'VOGUE', fontClass: 'tracking-[0.25em] font-normal text-lg sm:text-xl' },
  { name: 'ELLE', fontClass: 'tracking-[0.3em] font-bold text-lg sm:text-xl' },
  { name: "Harper's BAZAAR", fontClass: 'tracking-[0.15em] font-light text-base sm:text-lg' },
  { name: 'COSMOPOLITAN', fontClass: 'tracking-[0.22em] font-semibold text-xs sm:text-sm' },
  { name: 'GRAZIA', fontClass: 'tracking-[0.25em] font-medium text-base sm:text-lg' },
  { name: 'FEMINA', fontClass: 'tracking-[0.2em] font-bold text-base sm:text-lg' },
  { name: "L'OFFICIEL", fontClass: 'tracking-[0.18em] font-light text-base sm:text-lg' },
  { name: 'VANITY FAIR', fontClass: 'tracking-[0.2em] font-normal text-sm sm:text-base' },
];

export default function EditorialLogoMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-[#EDE4E6] bg-white py-4 sm:py-5">
      {/* Editorial Heading in Clean Lowercase Plus Jakarta Sans */}
      <div className="text-center mb-2.5">
        <span className="text-[11px] font-semibold lowercase tracking-[-0.01em] text-[#6E6368]">
          beauty &amp; style inspiration
        </span>
      </div>

      {/* Marquee Viewport with Soft Gradient Edge Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade Mask */}
        <div
          className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Right Fade Mask */}
        <div
          className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Continuous Linear Scrolling Track Moving Left to Right */}
        <div className="animate-marquee-ltr items-center gap-10 sm:gap-16 select-none opacity-70 hover:opacity-95 transition-opacity">
          {/* First set of logos */}
          {EDITORIAL_LOGOS.map((logo, idx) => (
            <div
              key={`logo-1-${idx}`}
              className="flex items-center gap-10 sm:gap-16 shrink-0"
            >
              <span className={`text-[#1E1A1D] whitespace-nowrap cursor-default ${logo.fontClass}`}>
                {logo.name}
              </span>
              <span className="text-[#EDE4E6] text-xs" aria-hidden="true">✦</span>
            </div>
          ))}

          {/* Duplicate set for seamless continuous looping without gap */}
          {EDITORIAL_LOGOS.map((logo, idx) => (
            <div
              key={`logo-2-${idx}`}
              className="flex items-center gap-10 sm:gap-16 shrink-0"
            >
              <span className={`text-[#1E1A1D] whitespace-nowrap cursor-default ${logo.fontClass}`}>
                {logo.name}
              </span>
              <span className="text-[#EDE4E6] text-xs" aria-hidden="true">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
