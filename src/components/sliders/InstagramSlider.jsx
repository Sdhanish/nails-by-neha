import React, { useState, useRef } from 'react';
import { Heart } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback';
import { BRAND_CONFIG } from '../../config/brand';

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
  const [isPaused, setIsPaused] = useState(false);
  const dragInfo = useRef({ isDown: false, startX: 0, hasMoved: false });

  // Two identical sets of posts guarantee a mathematically seamless -50% loop reset with zero jitter
  const loopPosts = [...INSTA_POSTS, ...INSTA_POSTS];

  const handlePointerDown = (e) => {
    dragInfo.current = {
      isDown: true,
      startX: e.pageX || e.clientX,
      hasMoved: false,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragInfo.current.isDown) return;
    const currentX = e.pageX || e.clientX;
    if (Math.abs(currentX - dragInfo.current.startX) > 6) {
      dragInfo.current.hasMoved = true;
      setIsPaused(true);
    }
  };

  const handlePointerUp = () => {
    dragInfo.current.isDown = false;
    setIsPaused(false);
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none py-2"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        dragInfo.current.isDown = false;
        setIsPaused(false);
      }}
    >
      {/* Continuous GPU-accelerated Infinite Track */}
      <div
        className={`insta-marquee-track gap-3 sm:gap-4 lg:gap-5 px-3 ${
          isPaused ? 'is-paused' : ''
        }`}
      >
        {loopPosts.map((post, idx) => (
          <a
            key={`${post.id}-${idx}`}
            href={BRAND_CONFIG.social.instagram}
            target="_blank"
            rel="noreferrer"
            draggable={false}
            onClick={(e) => {
              if (dragInfo.current.hasMoved) e.preventDefault();
            }}
            className="group relative w-[155px] xs:w-[175px] sm:w-[215px] md:w-[245px] lg:w-[265px] aspect-4/5 rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#EDE4E6] shadow-2xs hover:shadow-md transition-all duration-300 block shrink-0"
          >
            <ImageWithFallback
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 pointer-events-none"
            />

            {/* Ambient Instagram Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A1D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white pointer-events-none">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#FADADD] mb-1">
                <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                <span>{post.likes}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-white/90 font-normal lowercase line-clamp-2 leading-snug">
                {post.caption}
              </p>
              <span className="text-[9px] sm:text-[10px] text-[#FADADD]/80 font-medium lowercase tracking-wider mt-0.5 sm:mt-1 block">
                {post.tag}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
