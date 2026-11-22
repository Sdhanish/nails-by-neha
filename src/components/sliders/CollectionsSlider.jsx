import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback';
import { COLLECTIONS } from '../../data/collections';
import { useMarqueeDrag } from '../../hooks/useMarqueeDrag';

export default function CollectionsSlider() {
  const { trackRef, containerProps } = useMarqueeDrag({
    direction: 'ltr',
    speed: 45,
  });

  // 3 repeats of the 4 collections = 12 cards per group
  // Two identical groups (Set 1 and Set 2) guarantee that translating from -50% to 0%
  // continuously moves the collection cards from LEFT TO RIGHT in a truly seamless infinite marquee.
  // Group width is ~3,700px on mobile and ~4,850px on desktop, preventing any blank gap on any display up to 4K.
  const marqueeGroup = [
    ...COLLECTIONS,
    ...COLLECTIONS,
    ...COLLECTIONS,
  ];

  return (
    <div
      {...containerProps}
      className="lookbook-marquee-container relative w-full overflow-hidden select-none py-2 cursor-grab active:cursor-grabbing"
    >
      {/* 
        Continuous Left-to-Right Infinite Marquee Track with Manual Drag & Touch Swipe:
        - Animated using GPU translate3d via ultra-smooth RAF loop.
        - Moves continuously from LEFT TO RIGHT with zero jumps or resets upon drag release.
        - Zero React state re-renders while moving or dragging.
        - Exact subpixel loop matching: both groups have identical items, gaps, and trailing padding.
        - touch-action: pan-y preserves natural vertical scrolling without interception.
      */}
      <div
        ref={trackRef}
        className="flex w-max lookbook-marquee-track"
      >
        {/* Set 1: Primary Group */}
        <div className="flex shrink-0 items-stretch gap-3.5 sm:gap-5 lg:gap-6 pr-3.5 sm:pr-5 lg:pr-6">
          {marqueeGroup.map((col, idx) => (
            <div
              key={`lookbook-primary-${col.id}-${idx}`}
              className="w-[270px] xs:w-[295px] sm:w-[325px] md:w-[355px] lg:w-[380px] shrink-0 flex flex-col"
            >
              <CollectionCard
                collection={col}
                isClone={false}
              />
            </div>
          ))}
        </div>

        {/* Set 2: Duplicate Group for 100% seamless, mathematically exact loop */}
        <div
          className="flex shrink-0 items-stretch gap-3.5 sm:gap-5 lg:gap-6 pr-3.5 sm:pr-5 lg:pr-6"
          aria-hidden="true"
        >
          {marqueeGroup.map((col, idx) => (
            <div
              key={`lookbook-clone-${col.id}-${idx}`}
              className="w-[270px] xs:w-[295px] sm:w-[325px] md:w-[355px] lg:w-[380px] shrink-0 flex flex-col"
            >
              <CollectionCard
                collection={col}
                isClone={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollectionCard({ collection, isClone = false }) {
  return (
    <Link
      to={collection.link}
      draggable={false}
      tabIndex={isClone ? -1 : 0}
      className="group relative flex flex-col w-full h-[225px] xs:h-[245px] sm:h-[290px] md:h-[330px] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#EDE4E6] shadow-xs hover:border-[#E85D75]/40 hover:shadow-lg transition-all duration-500 block shrink-0"
    >
      {/* Campaign Photography with Controlled Aspect & Reserved Background */}
      <div className="relative w-full h-full overflow-hidden bg-[#F8EEF0]">
        <ImageWithFallback
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 pointer-events-none"
        />

        {/* Minimal Editorial Tag in Lowercase */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
          <span className="bg-white/95 backdrop-blur-md text-[#1E1A1D] text-[9px] sm:text-[10px] font-medium lowercase tracking-[-0.01em] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#EDE4E6] shadow-2xs">
            {collection.tag?.toLowerCase()}
          </span>
        </div>

        {/* Hover Arrow Trigger */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E1A1D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md group-hover:text-[#E85D75] group-hover:scale-105 pointer-events-none">
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>

        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A1D]/85 via-[#1E1A1D]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

        {/* Minimal Collection Name & Subtitle in Lowercase */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 text-white z-10 space-y-0.5 sm:space-y-1 pointer-events-none">
          <span className="text-[10px] sm:text-[11px] text-[#FADADD] font-normal lowercase tracking-normal block line-clamp-1">
            {collection.subtitle?.toLowerCase()}
          </span>
          <h3 className="text-base sm:text-2xl font-bold lowercase tracking-[-0.03em] leading-[1.15] group-hover:text-[#FADADD] transition-colors line-clamp-1">
            {collection.title?.toLowerCase()}
          </h3>
          <div className="pt-0.5 sm:pt-1.5 flex items-center gap-1 text-[11px] sm:text-xs font-medium lowercase tracking-[-0.01em] text-[#FADADD] group-hover:translate-x-1 transition-transform">
            <span>explore edit</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
