import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../../config/brand';
import { FOOTER_SECTIONS } from '../../data/navigation';
import { Mail, Phone, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import InstagramIcon from '../common/InstagramIcon';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('welcome to the studio circle! 10% coupon sent.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-[#EDE4E6] text-[#1E1A1D] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Banner */}
        <div className="bg-[#F8EEF0] rounded-3xl p-8 sm:p-12 mb-14 border border-[#EDE4E6] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium lowercase tracking-[-0.01em] text-[#E85D75]">
              <Sparkles className="w-3.5 h-3.5" /> studio beauty circle
            </span>
            <h3 className="font-bold text-2xl sm:text-3xl text-[#1E1A1D] tracking-[-0.03em] leading-[1.1] lowercase">
              receive private drop invites & 10% off your first set.
            </h3>
            <p className="text-xs text-[#6E6368] leading-relaxed lowercase font-normal">
              curated nail art releases, lash styling lookbooks, and vip previews delivered straight to your inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0">
            {isSubscribed ? (
              <div className="p-4 bg-white rounded-2xl border border-[#EDE4E6] text-center space-y-1">
                <p className="text-sm font-semibold text-[#1E1A1D] lowercase">you're on the vip list ✨</p>
                <p className="text-xs text-[#6E6368] lowercase">
                  check your inbox for your 10% code: <strong className="text-[#E85D75]">NEHA10</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter your email address..."
                  required
                  className="px-4 py-3 rounded-full text-xs bg-white border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D] placeholder:text-[#6E6368]/60 flex-1 lowercase"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-medium tracking-[-0.01em] lowercase transition-all duration-200 cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-[#EDE4E6]">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3.5">
            <Link to="/" className="inline-flex items-baseline gap-1.5 group select-none">
              <span className="font-extrabold text-2xl tracking-[-0.04em] text-[#1E1A1D] group-hover:text-[#E85D75] transition-colors whitespace-nowrap lowercase">
                nails & lashes
              </span>
              <span className="font-light text-2xl tracking-[-0.04em] text-[#6E6368] group-hover:text-[#E85D75] transition-colors whitespace-nowrap lowercase">
                by neha
              </span>
            </Link>
            <p className="text-xs text-[#6E6368] leading-relaxed max-w-sm lowercase font-normal">
              {BRAND_CONFIG.shortDescription.toLowerCase()}
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#6E6368]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#E85D75] shrink-0" />
                <span className="lowercase">{BRAND_CONFIG.contact.address.toLowerCase()}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E85D75] shrink-0" />
                <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="hover:text-[#E85D75] lowercase">
                  {BRAND_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E85D75] shrink-0" />
                <span>{BRAND_CONFIG.contact.phone}</span>
              </div>
            </div>

            {/* Social Link */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND_CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#EDE4E6] flex items-center justify-center text-[#1E1A1D] hover:text-[#E85D75] hover:border-[#E85D75] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#6E6368] hover:text-[#E85D75] font-medium transition-colors"
              >
                @nails_by_nehaaaaa
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="font-bold text-sm text-[#1E1A1D] tracking-[-0.02em] lowercase">
                {section.title.toLowerCase()}
              </h4>
              <ul className="space-y-2 text-xs text-[#6E6368]">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="hover:text-[#E85D75] transition-colors leading-relaxed block lowercase"
                    >
                      {link.label.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6E6368]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E85D75]" />
            <span className="lowercase">© {new Date().getFullYear()} {BRAND_CONFIG.legalName.toLowerCase()}. all rights reserved.</span>
          </div>

          {/* Payment Methods: Hidden on mobile (< 768px), visible on tablet and desktop (>= 768px) */}
          <div className="hidden md:flex items-center gap-2 text-[11px] font-medium text-[#6E6368]">
            <span className="px-2 py-0.5 rounded bg-[#FAF7F5] border border-[#EDE4E6]">upi</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF7F5] border border-[#EDE4E6]">visa</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF7F5] border border-[#EDE4E6]">mastercard</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF7F5] border border-[#EDE4E6]">rupay</span>
            <span className="px-2 py-0.5 rounded bg-[#FAF7F5] border border-[#EDE4E6]">netbanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
