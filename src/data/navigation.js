// Storefront navigation configuration

export const MAIN_NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Shop All", path: "/shop" },
  {
    label: "Press-On Nails",
    path: "/category/press-on-nails",
    submenu: [
      { label: "All Press-Ons", path: "/category/press-on-nails" },
      { label: "Almond Shape", path: "/shop?shape=Almond" },
      { label: "Square Shape", path: "/shop?shape=Square" },
      { label: "Coffin Shape", path: "/shop?shape=Coffin" },
      { label: "Chrome & Metallic", path: "/shop?finish=Chrome" },
      { label: "French Tips", path: "/shop?finish=French" },
    ],
  },
  { label: "Nail Care", path: "/category/nail-care" },
  { label: "Accessories", path: "/category/accessories" },
  { label: "Bundles", path: "/category/bundles" },
  { label: "Find Your Match", path: "/find-your-match", highlight: true },
];

export const FOOTER_SECTIONS = [
  {
    title: "Shop",
    links: [
      { label: "All Collections", path: "/shop" },
      { label: "Press-On Nails", path: "/category/press-on-nails" },
      { label: "Nail Care & Oils", path: "/category/nail-care" },
      { label: "Application Accessories", path: "/category/accessories" },
      { label: "Curated Bundles", path: "/category/bundles" },
      { label: "Bestsellers", path: "/shop?sort=bestselling" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Find Your Match Quiz", path: "/find-your-match" },
      { label: "Sizing Guide", path: "/#sizing-guide" },
      { label: "Application & Care Guide", path: "/#application-guide" },
      { label: "Customer Reviews", path: "/#reviews" },
      { label: "Editorial Lookbook", path: "/#lookbook" },
    ],
  },
  {
    title: "Customer Concierge",
    links: [
      { label: "Order Tracking", path: "/account/orders" },
      { label: "Shipping Policy", path: "/#shipping-policy" },
      { label: "Exchange & Returns", path: "/#returns-policy" },
      { label: "Frequently Asked Questions", path: "/#faq" },
      { label: "Contact Concierge", path: "/#contact" },
    ],
  },
  {
    title: "The Brand",
    links: [
      { label: "Our Story", path: "/#story" },
      { label: "Clean Beauty Standard", path: "/#clean-beauty" },
      { label: "Sustainability Promise", path: "/#sustainability" },
      { label: "Press & Inquiries", path: "/#press" },
      { label: "Privacy & Terms", path: "/#terms" },
    ],
  },
];
