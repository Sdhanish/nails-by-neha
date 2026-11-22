// Centralized Brand Configuration for Nails & Lashes by Neha
// To rebrand the site, change the values below.

export const BRAND_CONFIG = {
  name: "Nails & Lashes by Neha",
  shortName: "Neha's Studio",
  legalName: "Nails & Lashes by Neha Studio",
  tagline: "The Art of Handcrafted Nails & Bespoke Lashes",
  heroHeadline: "Your Nails. Your Lashes. Your Signature.",
  heroDescription:
    "Salon-inspired press-on nail artistry and bespoke beauty services, thoughtfully created to make every moment feel special.",
  shortDescription:
    "Handcrafted salon-grade press-on nails, conditioning botanical nail care, and bespoke lash styling crafted for effortless, damage-free luxury.",

  // Brand Palette Constants
  colors: {
    bg: "#FAF7F5",
    white: "#FFFFFF",
    blush: "#F8EEF0",
    primary: "#E85D75",
    softpink: "#FADADD",
    text: "#1E1A1D",
    muted: "#6E6368",
    border: "#EDE4E6",
  },

  // E-commerce thresholds & currency
  currency: {
    symbol: "₹",
    code: "INR",
  },
  shipping: {
    freeThreshold: 799,
    standardFee: 99,
    expressFee: 149,
    estimatedDays: "2 - 4 Business Days",
  },

  // Announcements
  announcements: [
    "A little luxury, delivered to your fingertips.",
    "Follow our latest studio looks on Instagram @nails_by_nehaaaaa",
    "Complimentary luxury prep kit included with every press-on order.",
    "Free standard delivery across India on orders above ₹799.",
    "Use code NEHA10 for 10% off your first set.",
  ],

  // Promotional coupons for demo checkout
  coupons: {
    NEHA10: { discountPercent: 10, description: "10% off your order" },
    MUSE10: { discountPercent: 10, description: "10% off your order" },
    GLAM20: { discountPercent: 20, description: "20% festive discount" },
    FREESHIP: { freeShipping: true, description: "Complimentary shipping" },
  },

  // Contact placeholders
  contact: {
    email: "concierge@nailsbyneha.com",
    phone: "+91 98765 43210",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM IST",
    address: "Studio Atelier, Bangalore, Karnataka",
  },

  social: {
    instagram: "https://www.instagram.com/nails_by_nehaaaaa/",
    pinterest: "https://pinterest.com",
    tiktok: "https://tiktok.com",
    facebook: "https://facebook.com",
  },
};

export default BRAND_CONFIG;
