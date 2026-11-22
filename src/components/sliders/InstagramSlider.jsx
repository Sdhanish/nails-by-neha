import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Heart } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback';
import { BRAND_CONFIG } from '../../config/brand';

import 'swiper/css';
import 'swiper/css/free-mode';

const INSTA_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    likes: '1.4k',
    tag: '#nailsbyneha',
    caption: 'blush hour catching golden hour reflections',
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    likes: '2.8k',
    tag: '#chromeobsession',
    caption: 'liquid champagne chrome on tapered almond',
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    likes: '3.1k',
    tag: '#bridalbloom',
    caption: 'handcrafted pearls for the modern bride',
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    likes: '950',
    tag: '#frenchaffair',
    caption: 'short square micro-french perfection',
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80',
    likes: '1.8k',
    tag: '#atelierritual',
    caption: 'botanical cuticle elixir infused with cold-pressed rose',
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    likes: '2.2k',
    tag: '#studioprivé',
    caption: "behind the scenes at neha's nail & lash studio",
  },
  {
    id: 'ig-7',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    likes: '2.5k',
    tag: '#pearlwhisper',
    caption: 'iridescent glazed donut nails in natural daylight',
  },
];

export default function InstagramSlider() {
  const swiperRef = useRef(null);

  // 3 sets (21 slides) ensures continuous seamless looping without visible resets or gaps
  const loopPosts = [...INSTA_POSTS, ...INSTA_POSTS, ...INSTA_POSTS];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Subtly softened Vignette Edge Gradient Masks */}
      <div
        className="absolute inset-y-0 left-0 w-6 sm:w-12 lg:w-16 bg-gradient-to-r from-[#FAF7F5]/70 via-[#FAF7F5]/30 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-6 sm:w-12 lg:w-16 bg-gradient-to-l from-[#FAF7F5]/70 via-[#FAF7F5]/30 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Full-width continuous linear Swiper with FreeMode + Autoplay & Touch/Mouse drag */}
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
            reverseDirection: false, // Smooth right-to-left continuous crawl
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
              slidesPerView: 4.2,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 5.2,
              spaceBetween: 24,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="swiper-linear-marquee overflow-visible!"
        >
          {loopPosts.map((post, idx) => (
            <SwiperSlide key={`${post.id}-${idx}`} className="h-auto">
              <div className="group relative aspect-4/5 rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#EDE4E6] shadow-2xs hover:shadow-md transition-all duration-300">
                <ImageWithFallback
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Ambient Instagram Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A1D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-[#FADADD] mb-1">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                  <p className="text-[11px] text-white/90 font-normal lowercase line-clamp-2 leading-snug">
                    {post.caption}
                  </p>
                  <span className="text-[10px] text-[#FADADD]/80 font-medium lowercase tracking-wider mt-1 block">
                    {post.tag}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
