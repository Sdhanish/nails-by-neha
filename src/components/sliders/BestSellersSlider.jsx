import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ProductCard from '../products/ProductCard';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function BestSellersSlider({ products = [] }) {
  const swiperRef = useRef(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Mobile: Initially show first 4 products, expand to all products upon tapping arrow
  const mobileVisibleProducts = isMobileExpanded ? products : products.slice(0, 4);

  // Duplicated to ensure smooth uninterrupted infinite looping on desktop
  const loopProducts = [...products, ...products, ...products];

  return (
    <div className="w-full">
      {/* 1. Mobile View (<= 767px): Clean 2-column grid with initial 4 items + arrow-only expansion */}
      <div className="best-sellers-mobile block md:hidden px-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {mobileVisibleProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Minimal, elegant arrow-only expansion button (NO text) */}
        {products.length > 4 && (
          <div className="flex justify-center pt-5 pb-1">
            <button
              onClick={() => setIsMobileExpanded(!isMobileExpanded)}
              className="best-sellers-arrow-btn w-11 h-11 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D] hover:border-[#E85D75] hover:text-[#E85D75] hover:bg-[#FFF9FA] shadow-xs flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer group"
              aria-label={isMobileExpanded ? "Show fewer best sellers" : "Show more best sellers"}
              aria-expanded={isMobileExpanded}
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  isMobileExpanded
                    ? 'rotate-180 text-[#E85D75]'
                    : 'rotate-0 text-[#1E1A1D] group-hover:text-[#E85D75]'
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* 2. Desktop & Tablet View (>= 768px): Preserved full-width continuous Swiper without side gradient masks */}
      <div className="hidden md:block relative w-full overflow-hidden">
        {/* Full-width continuous linear Swiper with FreeMode + Autoplay & drag/swipe support */}
        <div className="overflow-visible py-2">
          <Swiper
            modules={[Autoplay, FreeMode]}
            loop={true}
            freeMode={{
              enabled: true,
              momentum: false,
            }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              reverseDirection: true, // Left-to-Right movement
            }}
            speed={9000}
            allowTouchMove={true}
            grabCursor={true}
            spaceBetween={20}
            slidesPerView={3.2}
            breakpoints={{
              768: {
                slidesPerView: 3.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4.4,
                spaceBetween: 24,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="swiper-linear-marquee overflow-visible!"
          >
            {loopProducts.map((product, idx) => (
              <SwiperSlide key={`${product.id}-${idx}`} className="h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
