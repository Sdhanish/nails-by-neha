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
    name: 'vanity bundles',
    link: '/category/bundles',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80',
    alt: 'Curated vanity sets and gift bundles',
  },
  {
    name: 'accessories',
    link: '/category/accessories',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    alt: 'Salon application kits and tools',
  },
  {
    name: 'custom designs',
    link: '/find-your-match',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    alt: 'Custom bespoke atelier designs',
  },
  {
    name: 'explore all',
    link: '/shop',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    alt: 'Explore full atelier storefront',
  },
];

export default function ProductMarchingMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#feeaee] via-[#F8EEF0] to-[#fcc1ce] py-10 sm:py-16 lg:py-20 my-4 sm:my-8 select-none">
      {/* Top Organic Seamless SVG Wave Divider: Blends smoothly from #FAF7F5 into #F8EEF0 */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none -mt-[1px]">
        <svg
          className="w-full h-7 xs:h-9 sm:h-12 lg:h-16 block"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 L1440,0 L1440,30 C1260,54 1080,12 900,36 C720,56 540,16 360,40 C180,58 60,22 0,34 Z"
            fill="#FAF7F5"
          />
        </svg>
      </div>

      {/* Main Studio Archive Content: Editorial Header + Balanced 8-Card Responsive Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Subtle Editorial Header */}
        <div className="text-center mb-6 sm:mb-9 space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold lowercase tracking-[-0.01em] text-[#E85D75]">
            studio archive
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold lowercase tracking-[-0.03em] leading-[1.15] text-[#1E1A1D]">
            explore by category
          </h2>
        </div>

        {/* Static Responsive Grid: 4 columns on mobile (2 rows of 4), 8 columns on tablet & desktop */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-y-6 xs:gap-y-7 sm:gap-y-8 gap-x-2 xs:gap-x-3.5 sm:gap-x-4 lg:gap-x-6 justify-items-center">
          {STUDIO_CATEGORIES.map((item) => (
            <CategoryIconCard key={item.name} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom Organic Seamless SVG Wave Divider: Blends smoothly from #F8EEF0 into #FAF7F5 */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none -mb-[1px]">
        <svg
          className="w-full h-7 xs:h-9 sm:h-12 lg:h-16 block"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,60 L1440,60 L1440,30 C1260,6 1080,48 900,24 C720,4 540,44 360,20 C180,2 60,38 0,26 Z"
            fill="#FAF7F5"
          />
        </svg>
      </div>
    </section>
  );
}

function CategoryIconCard({ item }) {
  return (
    <Link
      to={item.link}
      draggable={false}
      className="group flex flex-col items-center focus:outline-hidden transition-transform duration-300 hover:-translate-y-1.5 w-full max-w-[120px]"
    >
      {/* Circular category thumbnail with soft blush glow and white inner rim on hover */}
      <div className="relative w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-26 xl:h-26 rounded-full p-1 bg-white border border-[#EDE4E6] shadow-xs group-hover:border-[#E85D75]/50 group-hover:shadow-[0_8px_20px_rgba(232,93,117,0.20)] transition-all duration-300">
        <div className="w-full h-full rounded-full overflow-hidden bg-[#FAF0F2]">
          <ImageWithFallback
            src={item.image}
            alt={item.alt}
            className="w-full h-full object-cover rounded-full group-hover:scale-108 transition-transform duration-500 ease-out pointer-events-none"
          />
        </div>
      </div>

      {/* Category label underneath in clean lowercase */}
      <span className="text-[10px] xs:text-[11px] sm:text-xs lg:text-[13px] font-medium lowercase tracking-[-0.01em] text-[#1E1A1D] group-hover:text-[#E85D75] transition-colors text-center mt-2 leading-tight">
        {item.name}
      </span>
    </Link>
  );
}
