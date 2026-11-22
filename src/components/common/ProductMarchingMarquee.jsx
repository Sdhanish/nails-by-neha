import React from 'react';
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
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-y-6 gap-x-3 sm:gap-x-4 lg:gap-x-6 justify-items-center">
        {STUDIO_CATEGORIES.map((item) => (
          <CategoryIconCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

function CategoryIconCard({ item }) {
  return (
    <Link
      to={item.link}
      draggable={false}
      className="group flex flex-col items-center focus:outline-none transition-transform duration-300 hover:-translate-y-1.5"
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
