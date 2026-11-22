import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

const STUDIO_CATEGORIES = [
  {
    name: 'press-on nails',
    link: '/category/press-on-nails',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80',
    alt: 'Handcrafted press-on nails',
  },
  {
    name: 'nail art',
    link: '/category/press-on-nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80',
    alt: 'Custom bespoke nail art',
  },
  {
    name: 'lash styling',
    link: '/find-your-match',
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=600&q=80',
    alt: 'Bespoke lash styling and extensions',
  },
  {
    name: 'nail care',
    link: '/category/nail-care',
    image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=600&q=80',
    alt: 'Botanical cuticle and nail care',
  },
  {
    name: 'custom designs',
    link: '/find-your-match',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80',
    alt: 'Custom bespoke atelier designs',
  },
  {
    name: 'explore all',
    link: '/shop',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    alt: 'Explore full atelier storefront',
  },
];

export default function ProductMarchingMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  // 3 repeats of the 6 categories = 18 items per group
  // Two identical groups (Set 1 and Set 2) guarantee that translating -50% of the combined track
  // shifts Set 1 exactly out of view while placing Set 2 at the exact starting coordinate of Set 1.
  // Group width is ~1,870px on mobile and ~3,020px on desktop, preventing any blank gap on any screen up to 4K.
  const marqueeGroup = [
    ...STUDIO_CATEGORIES,
    ...STUDIO_CATEGORIES,
    ...STUDIO_CATEGORIES,
  ];

  return (
    <section className="w-full py-4 sm:py-6 overflow-hidden">
      <div
        className="studio-icons-marquee-container relative w-full overflow-hidden select-none py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
      >
        {/* 
          Continuous Slow Infinite Marquee Track:
          - Animated via GPU translate3d(0, 0, 0) -> translate3d(-50%, 0, 0).
          - Zero React re-renders during motion.
          - Exact subpixel loop matching: both groups have identical items, gaps, and trailing padding.
          - touch-action: pan-y preserves natural vertical scrolling without interception.
        */}
        <div
          className={`flex w-max studio-icons-marquee-track ${
            isPaused ? 'is-paused' : ''
          }`}
        >
          {/* Set 1: Primary Group */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 lg:gap-10 pr-6 sm:pr-8 lg:pr-10">
            {marqueeGroup.map((item, idx) => (
              <CategoryIconCard
                key={`studio-primary-${item.name}-${idx}`}
                item={item}
                isClone={false}
              />
            ))}
          </div>

          {/* Set 2: Duplicate Group for 100% seamless, mathematically exact loop */}
          <div
            className="flex shrink-0 items-center gap-6 sm:gap-8 lg:gap-10 pr-6 sm:pr-8 lg:pr-10"
            aria-hidden="true"
          >
            {marqueeGroup.map((item, idx) => (
              <CategoryIconCard
                key={`studio-clone-${item.name}-${idx}`}
                item={item}
                isClone={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryIconCard({ item, isClone = false }) {
  return (
    <Link
      to={item.link}
      tabIndex={isClone ? -1 : 0}
      draggable={false}
      className="group flex flex-col items-center shrink-0 focus:outline-none transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* Circular category thumbnail with soft blush glow on hover */}
      <div className="relative w-[68px] h-[68px] xs:w-[76px] xs:h-[76px] sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full p-1 sm:p-1.5 group-hover:shadow-[0_8px_20px_rgba(232,93,117,0.18)] transition-all duration-300">
        <div className="w-full h-full rounded-full overflow-hidden bg-[#F8EEF0]">
          <ImageWithFallback
            src={item.image}
            alt={item.alt}
            className="w-full h-full object-cover rounded-full group-hover:scale-108 transition-transform duration-500 ease-out pointer-events-none"
          />
        </div>
      </div>

      {/* Category label underneath in clean lowercase */}
      <span className="text-[11px] sm:text-[13px] font-medium lowercase tracking-[-0.01em] text-[#1E1A1D] group-hover:text-[#E85D75] transition-colors text-center mt-2 sm:mt-3 whitespace-nowrap">
        {item.name}
      </span>
    </Link>
  );
}
