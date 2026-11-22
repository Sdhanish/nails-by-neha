import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { getBestsellers } from '../data/products';
import ImageWithFallback from '../components/common/ImageWithFallback';
import ScrollReveal from '../components/common/ScrollReveal';
import HeroSlider from '../components/sliders/HeroSlider';
import ProductMarchingMarquee from '../components/common/ProductMarchingMarquee';
import CollectionsSlider from '../components/sliders/CollectionsSlider';
import BestSellersSlider from '../components/sliders/BestSellersSlider';
import ReviewsSlider from '../components/sliders/ReviewsSlider';
import InstagramSlider from '../components/sliders/InstagramSlider';
import WavyBrandStoryBanner from '../components/home/WavyBrandStoryBanner';

export default function Home() {
  const bestsellers = getBestsellers();

  return (
    <div className="space-y-14 sm:space-y-20 lg:space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO CAMPAIGN BANNER (Alternating Content/Image Layouts, Autoplay, Lowercase Headings) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4">
        <HeroSlider />
      </section>


      {/* 3. SEASONAL LOOKBOOK / FEATURED COLLECTIONS (Continuous Right to Left + Full Width) */}
      <section className="w-full space-y-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold lowercase tracking-[-0.01em] text-[#E85D75]">
                  seasonal lookbook
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold lowercase tracking-[-0.03em] leading-[1.1] text-[#1E1A1D]">
                  featured collections
                </h2>
              </div>
              <Link
                to="/shop"
                className="text-xs font-medium lowercase tracking-[-0.01em] text-[#1E1A1D] hover:text-[#E85D75] flex items-center gap-1.5 transition-colors group"
              >
                <span>explore all edits</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <CollectionsSlider />
      </section>

      {/* 4. STUDIO STORY — EDITORIAL BREAKER (Little Details, Beautifully Done) */}
      <section id="story" className="bg-white border-y border-[#EDE4E6] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Imagery */}
            <div className="lg:col-span-6 relative">
              <ScrollReveal delay={0.1} yOffset={24}>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-7 aspect-3/4 rounded-3xl overflow-hidden bg-[#F8EEF0] border border-[#EDE4E6] shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
                      alt="Atelier Craftsmanship"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-5 space-y-4">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-[#F8EEF0] border border-[#EDE4E6] shadow-md">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
                        alt="Manicure Gleam"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F8EEF0] border border-[#EDE4E6] text-xs">
                      <span className="text-[10px] font-semibold lowercase tracking-[-0.01em] text-[#E85D75] block mb-1">
                        our promise
                      </span>
                      <p className="text-[#1E1A1D] font-normal lowercase leading-snug">
                        zero salon drilling. zero harsh uv damage. 100% reusable beauty.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Story Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal delay={0.15} yOffset={24}>
                <span className="text-xs font-semibold lowercase tracking-[-0.01em] text-[#E85D75]">
                  the studio standard
                </span>

                <h2 className="text-3xl sm:text-5xl font-bold lowercase tracking-[-0.03em] leading-[1.1] text-[#1E1A1D] mt-1">
                  little details. <br />
                  <span className="text-[#E85D75]">
                    beautifully done.
                  </span>
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-[#6E6368] leading-relaxed font-normal lowercase mt-4">
                  <p>
                    at <strong className="text-[#1E1A1D] font-bold">{BRAND_CONFIG.name.toLowerCase()}</strong>, we believe an immaculate set of nails and sculpted lash aesthetic are your personal signature — quiet markers of confidence, taste, and self-care.
                  </p>
                  <p>
                    traditional salon visits involve hours of aggressive filing, toxic fumes, and inflexible sets. we craft luxury press-on sets built with multi-density acrylic resin that match the natural apex, feather-thin cuticles, and mirror shine of master salon work.
                  </p>
                  <p>
                    apply in under ten minutes for a wedding, photoshoot, or client meeting, and remove gently with our silicone tabs without damaging your natural nail beds.
                  </p>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    to="/shop"
                    className="px-8 py-3.5 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-medium lowercase tracking-[-0.01em] transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>explore the studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="text-xs text-[#6E6368] italic border-l-2 border-[#E85D75] pl-4 py-1 lowercase">
                    "designed for the woman whose time is as precious as her beauty."
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STUDIO ICONS / BEST SELLERS (Continuous Left to Right + Full Width) */}
      <section className="w-full space-y-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold lowercase tracking-[-0.01em] text-[#E85D75]">
                  studio icons
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold lowercase tracking-[-0.03em] leading-[1.1] text-[#1E1A1D]">
                  best sellers
                </h2>
              </div>
              <Link
                to="/shop?sort=bestselling"
                className="text-xs font-medium lowercase tracking-[-0.01em] text-[#1E1A1D] hover:text-[#E85D75] flex items-center gap-1.5 transition-colors group"
              >
                <span>view all bestsellers</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <BestSellersSlider products={bestsellers} />
      </section>

      {/* 2. STUDIO ARCHIVE — STATIC CATEGORY ROW */}
      <ProductMarchingMarquee />

      {/* 6. CUSTOMER REVIEWS SWIPER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold lowercase tracking-[-0.01em] text-[#E85D75]">
              verified customer stories
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold lowercase tracking-[-0.03em] leading-[1.1] text-[#1E1A1D]">
              loved by studio clients
            </h2>
            <p className="text-xs text-[#6E6368] font-normal lowercase">
              real feedback from press-on and lash beauty enthusiasts across india.
            </p>
          </div>
        </ScrollReveal>

        <ReviewsSlider />
      </section>

      {/* 7. WAVY EDITORIAL BRAND STORY BANNER (Full Width, Organic Wave Edges, "for the love of nails.") */}
      <WavyBrandStoryBanner />

      {/* 8. INSTAGRAM / INSPIRATION GALLERY (Full Width Continuous Motion) */}
      <section className="w-full space-y-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold lowercase tracking-[-0.01em] text-[#E85D75]">
                  daily inspiration
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold lowercase tracking-[-0.03em] leading-[1.1] text-[#1E1A1D]">
                  styled by neha &amp; community
                </h2>
              </div>
              <a
                href={BRAND_CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium lowercase tracking-[-0.01em] text-[#1E1A1D] hover:text-[#E85D75] flex items-center gap-1.5 transition-colors group"
              >
                <span>follow our studio @nails_by_nehaaaaa</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        <InstagramSlider />
      </section>
    </div>
  );
}
