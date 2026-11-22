import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnnouncementBar from '../components/common/AnnouncementBar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import CustomCursor from '../components/common/CustomCursor';
import BackToTop from '../components/common/BackToTop';

export default function StorefrontLayout() {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Measure exact fixed header height dynamically to ensure 0 content overlap across all viewports
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    let ro = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      ro = new ResizeObserver(updateHeight);
      ro.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeight);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#1E1A1D]">
      {/* Desktop Custom Animated Cursor */}
      <CustomCursor />

      {/* 1. Reliable Fixed Top Header on All Devices */}
      <div
        id="storefront-fixed-header"
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 w-full"
      >
        <AnnouncementBar />
        <Header />
      </div>

      {/* 2. Layout Spacer: Prevents Page Content from Hiding Underneath the Fixed Header */}
      <div
        style={{ height: headerHeight ? `${headerHeight}px` : undefined }}
        className="h-[95px] sm:h-[105px] shrink-0 transition-[height]"
        aria-hidden="true"
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <CartDrawer />

      {/* 3. Floating Back-to-Top Button */}
      <BackToTop />
    </div>
  );
}
