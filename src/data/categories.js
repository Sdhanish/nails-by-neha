// Centralized categories data

export const CATEGORIES = [
  {
    id: "press-on-nails",
    name: "Press-On Nails",
    slug: "press-on-nails",
    shortName: "Nails",
    description: "Handcrafted salon-quality reusable press-on sets in modern shapes and luxury finishes.",
    editorialTitle: "Curated Press-On Nails",
    bannerImage: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1600&q=80",
    itemCount: 18,
    highlight: "Reusable up to 5 times with gentle wear",
  },
  {
    id: "nail-care",
    name: "Nail Care",
    slug: "nail-care",
    shortName: "Care",
    description: "Nourishing botanical oils, strengthening elixirs, and salon-grade prep solutions.",
    editorialTitle: "Botanical Nail & Cuticle Care",
    bannerImage: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1600&q=80",
    itemCount: 2,
    highlight: "Infused with pure cold-pressed botanicals",
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    shortName: "Accessories",
    description: "Ultra-hold sticky tabs, precision glass files, cuticle sticks, and salon prep kits.",
    editorialTitle: "Essential Application Tools",
    bannerImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80",
    itemCount: 2,
    highlight: "Dermatologist-tested adhesives",
  },
  {
    id: "bundles",
    name: "Bundles & Kits",
    slug: "bundles",
    shortName: "Bundles",
    description: "Curated multi-set vanity boxes and complete starter bundles for effortless style transitions.",
    editorialTitle: "Vanity Bundles & Gift Sets",
    bannerImage: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1600&q=80",
    itemCount: 2,
    highlight: "Save up to 30% compared to individual sets",
  },
];

export const getCategoryBySlug = (slug) => {
  return CATEGORIES.find((cat) => cat.slug === slug);
};
