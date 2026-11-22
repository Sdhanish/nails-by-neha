import React, { useState, useEffect } from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InstagramIcon from './InstagramIcon';

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const announcements = BRAND_CONFIG.announcements;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div className="bg-[#1E1A1D] text-[#FAF7F5] py-2 px-4 text-xs font-medium tracking-wide border-b border-[#312B2F] relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex w-44 items-center gap-2 text-left text-[11px] text-[#FAF7F5]/70">
          <a
            href={BRAND_CONFIG.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#FADADD] transition-colors inline-flex items-center gap-1.5"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#E85D75]" />
            <span>@nails_by_nehaaaaa</span>
          </a>
        </div>

        <div className="flex-1 text-center overflow-hidden h-5 flex items-center justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 transition-all duration-300 hover:text-[#FADADD]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E85D75]" />
            <span>{announcements[index]}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60 inline" />
          </Link>
        </div>

        <div className="hidden md:flex w-44 justify-end items-center gap-3 text-[11px] text-[#FAF7F5]/70">
          <Link to="/find-your-match" className="hover:text-[#FADADD] transition-colors">
            Match Quiz
          </Link>
          <span>•</span>
          <Link to="/account/orders" className="hover:text-[#FADADD] transition-colors">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
