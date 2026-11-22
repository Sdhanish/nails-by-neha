# MANI MUSE — Premium Press-On Nail Art & Luxury Nail-Care Storefront

A complete, polished, responsive React e-commerce storefront for an original press-on nail art and nail-care brand built with **React**, **Vite**, **Tailwind CSS**, **React Router**, **Swiper.js**, **Framer Motion**, and **Lucide React**.

---

## 💅 Brand Identity & Configuration

The brand identity is centralized in `src/config/brand.js`. To rebrand the storefront, simply modify this single file:
- **Brand Name:** MANI MUSE
- **Tagline:** The Art of Everyday Nail Luxury
- **Palette:**
  - Main Background: `#FAF7F5`
  - White Surfaces: `#FFFFFF`
  - Blush Sections: `#F8EEF0`
  - Primary Accent: `#E85D75`
  - Soft Pink Accent: `#FADADD`
  - Main Text: `#1E1A1D`
  - Secondary Text: `#6E6368`
  - Borders: `#EDE4E6`
- **Typography:** Instrument Serif (editorial headings) & Plus Jakarta Sans (body, UI, and buttons).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Run

```bash
# 1. Install dependencies (if needed)
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

Development server URL: `http://localhost:5173/`

---

## 🛍️ Completed Pages & Routes

| Route | Page / Feature Description |
|---|---|
| `/` | **Editorial Homepage** with 10 structured sections: Animated Hero, Trust strip, Collections slider, Best Sellers Swiper, Shop by Category, Editorial Brand Story, Find Your Match blush promo, Customer Reviews Swiper, Instagram / Inspiration slider, and Newsletter. |
| `/shop` | **Shop All Listing**: Live search, multi-faceted filtering (Category, Shape, Length, Finish, Occasion, Price, Stock), active filter chips, sorting (Bestselling, Newest, Price, Top Rated), and responsive grid. |
| `/category/press-on-nails` | **Press-On Nails Category**: Reusable category template with banner, category filters, and curated products. |
| `/category/nail-care` | **Nail Care Category**: Nourishing botanical oils and prep essentials. |
| `/category/accessories` | **Accessories Category**: Application tools, tempered glass files, and adhesive tabs. |
| `/category/bundles` | **Bundles & Vanity Kits**: Multi-set gift boxes and starter suites. |
| `/product/:slug` | **Product Details Page**: Multi-angle image gallery with thumbnails & mobile Swiper, shape/length/finish/size selectors, interactive Size Guide Modal, Add to Bag with toast feedback, collapsible information accordions, and related products Swiper. |
| `/find-your-match` | **Interactive Style Quiz**: 5-step quiz (Style, Shape, Length, Finish, Occasion) with progress bar, step animations, and tailored recommendations with Add to Bag actions. |
| `/search` | **Search Experience**: Dedicated search page + global slide-down search overlay with live product suggestions and recent search tags. |
| `/cart` | **Shopping Bag Page & Slide-Out Cart Drawer**: Quantity adjustments, variant displays, free shipping progress bar (threshold ₹799), demo coupon validation (`MUSE10`, `GLAM20`, `FREESHIP`), and localStorage persistence. |
| `/checkout` | **Mock Checkout**: Contact & delivery form validation, shipping preference, visual payment mock (UPI / Card), demo coupon application, order ID generator, and localStorage order saving. |
| `/order-confirmation` | **Order Confirmation**: Order ID, tracking details, delivery progress timeline, recipient details, and line-item receipt breakdown. |
| `/login` & `/register` | **Customer Authentication Screens**: Demo account sign in with 1-click test auto-fill. |
| `/account` | **Customer Profile**: Member tier, loyalty points, saved sizing matrix (Thumb to Pinky in mm), default address, and order quick links. |
| `/account/orders` | **Order History**: List of past demo orders with status badges and totals. |
| `/account/orders/:id` | **Order Details**: 4-stage tracking timeline (Placed, In Atelier, Dispatched, Delivered) and invoice breakdown. |
| `*` | **404 Not Found**: Bespoke editorial error screen with navigation back to Home / Shop. |

---

## 🎨 Interactive Features Implemented

1. **Slide-Out Cart Drawer:** Accessible from anywhere via the shopping bag icon. Displays dynamic free shipping progress, line item variant badges, live quantity controls, and totals.
2. **Instant Search Overlay:** Quick-search by set name, shape (e.g. *Almond*), finish (e.g. *Chrome*), or tags with instant thumbnails.
3. **Quick View Modal:** Allows selecting shape, length, size, and adding to bag directly from any product card.
4. **Atelier Sizing Guide Modal:** Explains XS-L sizing with exact millimeter measurements and step-by-step 2-minute tape measurement instructions.
5. **Interactive Style Finder Quiz:** Multi-step wizard with animated question transitions that calculates bespoke set matches.
6. **Persistent State:** Demo cart, wishlist, customer profile, and orders remain intact across browser refreshes via `localStorage`.
7. **Swiper.js Implementations:** Responsive touch carousels for Collections, Bestsellers, Customer Reviews, Instagram feed, Mobile PDP gallery, and Related Sets.
