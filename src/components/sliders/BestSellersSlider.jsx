import React, { useState } from 'react';
import ProductCard from '../products/ProductCard';

export default function BestSellersSlider({ products = [] }) {
  const [isPaused, setIsPaused] = useState(false);

  if (!products || products.length === 0) return null;

  // We use the 12 bestsellers per group.
  // Two identical groups (Set 1 and Set 2) guarantee that translating -50% of the combined track
  // shifts Set 1 exactly out of view while placing Set 2 at the exact starting coordinate of Set 1.
  // Group width is ~2,750px on mobile and ~3,890px on desktop, preventing any blank gap on any screen up to 4K.
  const marqueeGroup = products;

  return (
    <div
      className="bestsellers-marquee-container relative w-full overflow-hidden select-none py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
    >
      {/* 
        Slow, Continuous Infinite Best Sellers Marquee Track:
        - Animated using GPU translate3d(0, 0, 0) -> translate3d(-50%, 0, 0).
        - Zero React re-renders while moving.
        - Exact subpixel loop matching: both groups have identical items, gaps, and trailing padding.
        - touch-action: pan-y preserves natural vertical scrolling without interception.
      */}
      <div
        className={`flex w-max bestsellers-marquee-track ${
          isPaused ? 'is-paused' : ''
        }`}
      >
        {/* Set 1: Primary Group */}
        <div className="flex shrink-0 items-stretch gap-3.5 sm:gap-5 lg:gap-6 pr-3.5 sm:pr-5 lg:pr-6">
          {marqueeGroup.map((product, idx) => (
            <div
              key={`bestseller-primary-${product.id}-${idx}`}
              className="w-[190px] xs:w-[215px] sm:w-[250px] md:w-[280px] lg:w-[300px] shrink-0 flex flex-col"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Set 2: Duplicate Group for 100% seamless, mathematically exact loop */}
        <div
          className="flex shrink-0 items-stretch gap-3.5 sm:gap-5 lg:gap-6 pr-3.5 sm:pr-5 lg:pr-6"
          aria-hidden="true"
        >
          {marqueeGroup.map((product, idx) => (
            <div
              key={`bestseller-clone-${product.id}-${idx}`}
              className="w-[190px] xs:w-[215px] sm:w-[250px] md:w-[280px] lg:w-[300px] shrink-0 flex flex-col"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
