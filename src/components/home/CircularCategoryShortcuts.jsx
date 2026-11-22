import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../common/ImageWithFallback';

const SHORTCUTS = [
  {
    name: 'press-on nails',
    link: '/category/press-on-nails',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=400&q=80',
    alt: 'Handcrafted press-on nails',
  },
  {
    name: 'nail art',
    link: '/category/press-on-nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80',
    alt: 'Custom bespoke nail art',
  },
  {
    name: 'lash styling',
    link: '/find-your-match',
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=400&q=80',
    alt: 'Bespoke lash extensions and styling',
  },
  {
    name: 'nail care',
    link: '/category/nail-care',
    image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=400&q=80',
    alt: 'Botanical cuticle and nail care',
  },
  {
    name: 'custom designs',
    link: '/find-your-match',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=400&q=80',
    alt: 'Custom made atelier designs',
  },
  {
    name: 'explore all',
    link: '/shop',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
    alt: 'Explore entire atelier collection',
  },
];

export default function CircularCategoryShortcuts() {
  return (
    <section className="w-full py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal scroll container on mobile, centered on desktop */}
        <div className="flex items-center gap-6 sm:gap-8 md:gap-10 overflow-x-auto no-scrollbar py-2 px-1 sm:justify-center">
          {SHORTCUTS.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="group flex flex-col items-center shrink-0 transition-transform focus:outline-none"
            >
              {/* Circular image crop: 90-110px desktop, responsive on mobile */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full p-1 bg-white border border-[#EDE4E6] group-hover:border-[#E85D75]/60 group-hover:shadow-md transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#F8EEF0]">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>

              {/* Short lowercase label underneath */}
              <span className="text-xs sm:text-[13px] font-medium lowercase tracking-[-0.01em] text-[#1E1A1D] group-hover:text-[#E85D75] transition-colors text-center mt-2.5 whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
