import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ArrowRight, Sparkles } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback';

import 'swiper/css';

const HERO_SLIDES = [
  {
    id: 'slide-1',
    eyebrow: 'handcrafted press-on sets',
    heading: 'your nails. your signature.',
    description: 'salon-grade press-on nails and bespoke studio artistry designed to make every moment feel effortless.',
    ctaText: 'explore collection',
    ctaLink: '/shop',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'handcrafted press-on nails with glossy salon finish',
  },
  {
    id: 'slide-2',
    eyebrow: 'nail & lash styling',
    heading: 'a little luxury, every day.',
    description: 'thoughtfully designed nails and lash-complementing aesthetics, tailored for your everyday style.',
    ctaText: 'discover best sellers',
    ctaLink: '/shop?sort=bestselling',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'champagne chrome nails with mirror reflection',
  },
  {
    id: 'slide-3',
    eyebrow: 'studio signatures',
    heading: 'find your perfect set.',
    description: 'explore elegant shapes, delicate finishes and custom lengths made to express your individuality.',
    ctaText: 'find your set',
    ctaLink: '/find-your-match',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'couture bridal manicure with delicate embellishments',
  },
  {
    id: 'slide-4',
    eyebrow: 'artisan finishes',
    heading: 'effortless glamour, undamaged nails.',
    description: 'multi-density acrylic resin with natural apex curves. 10-minute application, up to 2 weeks of reusable wear.',
    ctaText: 'shop press-on nails',
    ctaLink: '/category/press-on-nails',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'refined micro french manicure on natural nail bed',
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[2.25rem] overflow-hidden border border-[#EDE4E6] bg-[#F8EEF0] shadow-xs">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        grabCursor={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="w-full"
      >
        {HERO_SLIDES.map((slide, idx) => {
          // Alternating layout: Even index (0, 2) = Text Left, Image Right; Odd index (1, 3) = Image Left, Text Right
          const isEven = idx % 2 === 0;

          return (
            <SwiperSlide key={slide.id} className="w-full">
              {({ isActive }) => (
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] max-h-[490px] lg:max-h-[510px] bg-[#F8EEF0] items-stretch">
                  {/* Text Content Column with Staggered Entrance Animations */}
                  <div
                    className={`order-1 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    } lg:col-span-6 xl:col-span-6 flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-14 py-8 sm:py-10 lg:py-11 z-10 relative`}
                  >
                    {/* Eyebrow Badge in Lowercase */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-xs border border-[#EDE4E6] text-[10px] sm:text-[11px] font-medium lowercase tracking-[-0.01em] text-[#E85D75] mb-3 w-fit shadow-2xs transition-all duration-600 delay-100 ease-out ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-[#E85D75] shrink-0" />
                      <span>{slide.eyebrow}</span>
                    </div>

                    {/* Editorial Main Heading: Lowercase, Bold 700, Tight Tracking -0.03em, Leading 1.1 */}
                    <h1
                      className={`font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-[#1E1A1D] tracking-[-0.03em] leading-[1.1] mb-3 sm:mb-3.5 lowercase transition-all duration-600 delay-200 ease-out ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                      }`}
                    >
                      {slide.heading}
                    </h1>

                    {/* Short Supporting Description */}
                    <p
                      className={`text-xs sm:text-sm text-[#6E6368] leading-relaxed max-w-md mb-6 sm:mb-7 font-normal lowercase transition-all duration-600 delay-300 ease-out ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                      }`}
                    >
                      {slide.description}
                    </p>

                    {/* CTA Button: Lowercase, Medium 500, Tracking -0.01em */}
                    <div
                      className={`flex items-center transition-all duration-600 delay-400 ease-out ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <Link
                        to={slide.ctaLink}
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-white text-xs font-medium tracking-[-0.01em] lowercase transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer bg-gradient-to-r from-[#E85D75] via-[#E24E68] to-[#D44760] hover:from-[#DE5169] hover:via-[#D44760] hover:to-[#C0354E] hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Photography Column with Smooth Image Scale Transition */}
                  <div
                    className={`order-2 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    } lg:col-span-6 xl:col-span-6 relative w-full h-72 sm:h-80 lg:h-auto min-h-[280px] overflow-hidden bg-[#F8EEF0]`}
                  >
                    <div
                      className={`lg:absolute lg:inset-0 w-full h-full transition-transform duration-1000 ease-out ${
                        isActive ? 'scale-100' : 'scale-105'
                      }`}
                    >
                      <ImageWithFallback
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Desktop Fade Mask: When Image is Right (isEven), fade from Left; When Image is Left (!isEven), fade from Right */}
                    {isEven ? (
                      <div
                        className="hidden lg:block absolute inset-y-0 left-0 w-36 xl:w-48 bg-gradient-to-r from-[#F8EEF0] via-[#F8EEF0]/80 via-40% to-transparent pointer-events-none z-10"
                        aria-hidden="true"
                      />
                    ) : (
                      <div
                        className="hidden lg:block absolute inset-y-0 right-0 w-36 xl:w-48 bg-gradient-to-l from-[#F8EEF0] via-[#F8EEF0]/80 via-40% to-transparent pointer-events-none z-10"
                        aria-hidden="true"
                      />
                    )}

                    {/* Mobile & Tablet: Seamless Top-to-Bottom Linear Gradient from Blush to Photography */}
                    <div
                      className="lg:hidden absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F8EEF0] via-[#F8EEF0]/80 to-transparent pointer-events-none z-10"
                      aria-hidden="true"
                    />

                    {/* Subtle soft ambient light vignette */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#1E1A1D]/10 via-transparent to-transparent pointer-events-none z-10"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
