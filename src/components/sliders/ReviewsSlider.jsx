import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../../data/reviews';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../common/ImageWithFallback';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ReviewsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const loopReviews = [...REVIEWS, ...REVIEWS];
  const total = REVIEWS.length;

  return (
    <div className="space-y-6">
      {/* Custom Header Controls in Clean Lowercase */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2 text-xs text-[#6E6368]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E85D75]" />
          <span className="font-medium text-[#1E1A1D] lowercase">
            {(activeIndex % total) + 1} of {total} impressions
          </span>
          <span className="hidden sm:inline text-[#6E6368]/60 text-[11px] ml-2 lowercase">
            • drag to read more
          </span>
        </div>
      </div>

      {/* Swiper Review Cards */}
      <div className="overflow-visible">
        <Swiper
          modules={[Navigation]}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          grabCursor={true}
          speed={600}
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="overflow-visible! py-2"
        >
          {loopReviews.map((review, idx) => (
            <SwiperSlide key={`${review.id}-${idx}`} className="h-auto">
              <div className="h-full flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white border border-[#EDE4E6] shadow-xs hover:border-[#E85D75]/40 hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold lowercase tracking-[-0.03em] leading-snug text-[#1E1A1D]">
                    "{review.title.toLowerCase()}"
                  </h4>

                  <p className="text-xs sm:text-sm text-[#6E6368] leading-relaxed italic font-normal lowercase">
                    "{review.comment.toLowerCase()}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EDE4E6] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F8EEF0] border border-[#EDE4E6] shrink-0">
                      <ImageWithFallback
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs text-[#1E1A1D] lowercase">
                          {review.name.toLowerCase()}
                        </span>
                        <span className="text-[10px] text-[#6E6368] lowercase">
                          • {review.location.toLowerCase()}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5 lowercase">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> verified client
                      </span>
                    </div>
                  </div>

                  {review.productSlug && (
                    <Link
                      to={`/product/${review.productSlug}`}
                      className="text-[11px] text-[#E85D75] hover:underline font-medium lowercase tracking-[-0.01em] text-right max-w-[120px] truncate block"
                    >
                      {review.productName.toLowerCase()} →
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
