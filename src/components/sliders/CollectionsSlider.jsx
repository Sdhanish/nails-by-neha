import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback';
import { COLLECTIONS } from '../../data/collections';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function CollectionsSlider() {
  const swiperRef = useRef(null);

  // Duplicated to ensure uninterrupted infinite Swiper looping
  const loopCollections = [
    ...COLLECTIONS,
    ...COLLECTIONS,
    ...COLLECTIONS,
    ...COLLECTIONS,
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Subtly softened Vignette Edge Masks (reduced width & opacity to prevent clipping cards) */}
      <div
        className="absolute inset-y-0 left-0 w-4 sm:w-12 lg:w-16 bg-gradient-to-r from-[#FAF7F5]/70 via-[#FAF7F5]/30 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-4 sm:w-12 lg:w-16 bg-gradient-to-l from-[#FAF7F5]/70 via-[#FAF7F5]/30 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Swiper: Centered active card on mobile so each card is 100% visible and unclipped */}
      <div className="overflow-visible py-2">
        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={650}
          allowTouchMove={true}
          grabCursor={true}
          spaceBetween={14}
          slidesPerView={1.14}
          breakpoints={{
            360: {
              slidesPerView: 1.15,
              spaceBetween: 14,
              centeredSlides: true,
            },
            414: {
              slidesPerView: 1.22,
              spaceBetween: 16,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 20,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 2.8,
              spaceBetween: 24,
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 3.3,
              spaceBetween: 24,
              centeredSlides: false,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full"
        >
          {loopCollections.map((col, idx) => (
            <SwiperSlide key={`${col.id}-${idx}`} className="h-auto">
              <CollectionCard collection={col} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function CollectionCard({ collection }) {
  return (
    <Link
      to={collection.link}
      className="group relative flex flex-col h-[290px] xs:h-[310px] sm:h-[330px] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#EDE4E6] shadow-xs hover:border-[#E85D75]/40 hover:shadow-lg transition-all duration-500 block"
    >
      {/* Campaign Photography with Controlled Aspect */}
      <div className="relative w-full h-full overflow-hidden bg-[#F8EEF0]">
        <ImageWithFallback
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Minimal Editorial Tag in Lowercase */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/95 backdrop-blur-md text-[#1E1A1D] text-[10px] font-medium lowercase tracking-[-0.01em] px-3 py-1 rounded-full border border-[#EDE4E6] shadow-xs">
            {collection.tag?.toLowerCase()}
          </span>
        </div>

        {/* Hover Arrow Trigger */}
        <div className="absolute top-4 right-4 z-10 w-8.5 h-8.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E1A1D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md group-hover:text-[#E85D75] group-hover:scale-105">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A1D]/85 via-[#1E1A1D]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

        {/* Minimal Collection Name & Subtitle in Lowercase */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white z-10 space-y-1">
          <span className="text-[11px] text-[#FADADD] font-normal lowercase tracking-normal block line-clamp-1">
            {collection.subtitle?.toLowerCase()}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold lowercase tracking-[-0.03em] leading-[1.1] group-hover:text-[#FADADD] transition-colors line-clamp-1">
            {collection.title?.toLowerCase()}
          </h3>
          <div className="pt-1 sm:pt-1.5 flex items-center gap-1 text-xs font-medium lowercase tracking-[-0.01em] text-[#FADADD] group-hover:translate-x-1 transition-transform">
            <span>explore edit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
