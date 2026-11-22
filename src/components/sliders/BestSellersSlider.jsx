import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import ProductCard from '../products/ProductCard';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function BestSellersSlider({ products = [] }) {
  const swiperRef = useRef(null);

  // Duplicated to ensure smooth uninterrupted infinite looping across screen widths
  const loopProducts = [...products, ...products, ...products];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Soft Vignette Edge Masks */}
      <div
        className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF7F5] via-[#FAF7F5]/85 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF7F5] via-[#FAF7F5]/85 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Swiper with FreeMode + Autoplay: Smooth continuous left-to-right crawl with drag/swipe support */}
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
            reverseDirection: true, // Left-to-Right movement!
          }}
          speed={9000}
          allowTouchMove={true}
          grabCursor={true}
          spaceBetween={18}
          slidesPerView={1.3}
          breakpoints={{
            480: {
              slidesPerView: 2.2,
              spaceBetween: 16,
            },
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
  );
}
