import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ImageWithFallback from '../components/common/ImageWithFallback';
import SizeGuideModal from '../components/common/SizeGuideModal';
import RelatedProductsSlider from '../components/sliders/RelatedProductsSlider';
import {
  Star,
  Heart,
  Plus,
  Minus,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Check,
  Share2,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useToast } from '../context/ToastContext';

import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const product = getProductBySlug(slug);

  // Fallback if slug not found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#1E1A1D]">Atelier Creation Not Found</h2>
        <p className="text-xs text-[#6E6368]">The requested set might have been retired or moved.</p>
        <Link
          to="/shop"
          className="px-6 py-2.5 bg-[#1E1A1D] text-white rounded-full text-xs font-semibold inline-block"
        >
          Return to Gallery
        </Link>
      </div>
    );
  }

  // Active gallery image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Variant selections
  const [selectedShape, setSelectedShape] = useState(
    product.shape || (product.availableShapes && product.availableShapes[0]) || ''
  );
  const [selectedLength, setSelectedLength] = useState(
    product.length || (product.availableLengths && product.availableLengths[0]) || ''
  );
  const [selectedFinish, setSelectedFinish] = useState(
    product.finish || (product.availableFinishes && product.availableFinishes[0]) || ''
  );
  const [selectedSize, setSelectedSize] = useState(
    (product.availableSizes && product.availableSizes[0]) || 'M'
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion active state
  const [openAccordion, setOpenAccordion] = useState('description');

  // Reset variant options on slug change
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedShape(product.shape || (product.availableShapes && product.availableShapes[0]) || '');
    setSelectedLength(product.length || (product.availableLengths && product.availableLengths[0]) || '');
    setSelectedFinish(product.finish || (product.availableFinishes && product.availableFinishes[0]) || '');
    setSelectedSize((product.availableSizes && product.availableSizes[0]) || 'M');
    setQuantity(1);
  }, [slug, product]);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(
      product,
      {
        shape: selectedShape,
        length: selectedLength,
        finish: selectedFinish,
        size: selectedSize,
      },
      quantity
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard', 'info');
    }
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.shape === product.shape)
  ).slice(0, 6);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop All', path: '/shop' },
          { label: product.categoryName, path: `/category/${product.category}` },
          { label: product.name, path: `/product/${product.slug}` },
        ]}
      />

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left: Gallery (Mobile Swiper + Desktop Stack) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mobile Swiper (hidden on desktop) */}
          <div className="lg:hidden rounded-2xl overflow-hidden border border-[#EDE4E6] bg-[#F8EEF0] relative">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="aspect-square sm:aspect-4/3"
            >
              {product.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} slide ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 bg-[#1E1A1D] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* Desktop Gallery Composition */}
          <div className="hidden lg:flex gap-4">
            {/* Thumbnails Sidebar */}
            <div className="flex flex-col gap-3 w-20 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#F8EEF0] ${
                    activeImageIndex === idx
                      ? 'border-[#E85D75] shadow-xs'
                      : 'border-[#EDE4E6] hover:border-[#1E1A1D]/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="flex-1 aspect-4/5 rounded-3xl overflow-hidden border border-[#EDE4E6] bg-[#F8EEF0] relative shadow-xs">
              <ImageWithFallback
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-5 left-5 bg-[#1E1A1D] text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  {product.badge}
                </span>
              )}
              {discountPercent && (
                <span className="absolute top-5 right-5 bg-[#E85D75] text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                  Save {discountPercent}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Actions & Configurator */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E85D75]">
                {product.categoryName} • Atelier Handcrafted
              </span>
              <button
                onClick={handleShare}
                className="p-1.5 text-[#6E6368] hover:text-[#1E1A1D] rounded-full hover:bg-[#F8EEF0]"
                title="Share set"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1A1D]">
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex items-center gap-3 text-xs pt-1">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-[#1E1A1D]">{product.rating}</span>
              </div>
              <span className="text-[#6E6368]">
                ({product.reviewCount} demonstration reviews)
              </span>
              <span className="text-[#EDE4E6]">|</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                In Stock ({product.stock} sets left)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pt-3">
              <span className="font-serif text-3xl font-semibold text-[#1E1A1D]">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-[#6E6368] line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              {discountPercent && (
                <span className="text-xs font-semibold bg-[#E85D75]/10 text-[#E85D75] px-2.5 py-0.5 rounded-full">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#6E6368]">Inclusive of all taxes & luxury prep suite</p>
          </div>

          <p className="text-xs sm:text-sm text-[#6E6368] leading-relaxed border-t border-[#EDE4E6] pt-4">
            {product.description}
          </p>

          {/* Option: Shape */}
          {product.availableShapes && product.availableShapes.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-[#1E1A1D]">
                  Nail Shape: <strong className="font-semibold text-[#E85D75]">{selectedShape}</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.availableShapes.map((shape) => (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => setSelectedShape(shape)}
                    className={`px-4 py-2 text-xs rounded-full border transition-all cursor-pointer ${
                      selectedShape === shape
                        ? 'border-[#1E1A1D] bg-[#1E1A1D] text-white font-medium shadow-xs'
                        : 'border-[#EDE4E6] bg-white text-[#1E1A1D] hover:border-[#1E1A1D]'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Option: Length */}
          {product.availableLengths && product.availableLengths.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-[#1E1A1D]">
                  Nail Length: <strong className="font-semibold text-[#E85D75]">{selectedLength}</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.availableLengths.map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setSelectedLength(len)}
                    className={`px-4 py-2 text-xs rounded-full border transition-all cursor-pointer ${
                      selectedLength === len
                        ? 'border-[#1E1A1D] bg-[#1E1A1D] text-white font-medium shadow-xs'
                        : 'border-[#EDE4E6] bg-white text-[#1E1A1D] hover:border-[#1E1A1D]'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Option: Size */}
          {product.availableSizes && product.availableSizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-[#1E1A1D]">
                  Fit Size: <strong className="font-semibold text-[#E85D75]">{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#E85D75] hover:underline flex items-center gap-1 font-medium"
                >
                  <Ruler className="w-3.5 h-3.5" /> Measurement Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs rounded-full border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-[#1E1A1D] bg-[#1E1A1D] text-white font-medium shadow-xs'
                        : 'border-[#EDE4E6] bg-white text-[#1E1A1D] hover:border-[#1E1A1D]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#EDE4E6]">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#EDE4E6] rounded-full bg-white p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-[#6E6368] hover:text-[#1E1A1D]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-[#1E1A1D] min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-[#6E6368] hover:text-[#1E1A1D]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Primary Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add to Bag • ₹{product.price * quantity}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-full border border-[#EDE4E6] transition-colors ${
                  isFavorited
                    ? 'bg-[#FADADD] text-[#E85D75] border-[#FADADD]'
                    : 'bg-white text-[#6E6368] hover:text-[#1E1A1D]'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Quick Benefits list */}
            <div className="p-3.5 rounded-2xl bg-[#F8EEF0] border border-[#EDE4E6] text-xs space-y-1.5 text-[#6E6368]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#E85D75] shrink-0" />
                <span>Complimentary luxury prep suite included with file & tabs</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#E85D75] shrink-0" />
                <span>Free dispatch on orders ₹799+ • Delivered in 2-4 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-[#E85D75] shrink-0" />
                <span>Reusable up to 5 times with our zero-damage jelly tabs</span>
              </div>
            </div>
          </div>

          {/* Accordion / Collapsible Sections */}
          <div className="divide-y divide-[#EDE4E6] border-t border-b border-[#EDE4E6] text-xs">
            {/* Description Details */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion('description')}
                className="w-full flex items-center justify-between text-left font-semibold text-[#1E1A1D] py-1 cursor-pointer"
              >
                <span>Atelier Architecture & Finish</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === 'description' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'description' && (
                <div className="pt-2 text-[#6E6368] leading-relaxed space-y-2">
                  <p>{product.description}</p>
                  <p>
                    Each nail tip is hand-buffed and coated with automotive-grade UV gel glaze to resist everyday hairline scratches, makeup stains, and hot showers.
                  </p>
                </div>
              )}
            </div>

            {/* What's Included */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion('included')}
                className="w-full flex items-center justify-between text-left font-semibold text-[#1E1A1D] py-1 cursor-pointer"
              >
                <span>What's In The Box</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === 'included' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'included' && (
                <ul className="pt-2 text-[#6E6368] space-y-1.5 pl-4 list-disc">
                  {product.whatsIncluded.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Application Instructions */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion('application')}
                className="w-full flex items-center justify-between text-left font-semibold text-[#1E1A1D] py-1 cursor-pointer"
              >
                <span>Application Instructions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === 'application' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'application' && (
                <div className="pt-2 text-[#6E6368] leading-relaxed space-y-2">
                  <p>{product.applicationTips}</p>
                </div>
              )}
            </div>

            {/* Removal & Care */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion('removal')}
                className="w-full flex items-center justify-between text-left font-semibold text-[#1E1A1D] py-1 cursor-pointer"
              >
                <span>Removal & Zero-Damage Care</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === 'removal' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'removal' && (
                <div className="pt-2 text-[#6E6368] leading-relaxed space-y-2">
                  <p>{product.removalTips}</p>
                </div>
              )}
            </div>

            {/* Shipping & Delivery */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex items-center justify-between text-left font-semibold text-[#1E1A1D] py-1 cursor-pointer"
              >
                <span>Shipping & Delivery Policy</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === 'shipping' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'shipping' && (
                <div className="pt-2 text-[#6E6368] leading-relaxed space-y-1.5">
                  <p>All orders are dispatched within 24 hours from our Bengaluru atelier.</p>
                  <p>Metro cities: 2-3 business days. Rest of India: 3-5 business days.</p>
                  <p>Discreet, rigid, luxury keepsake box packaging guarantees zero transit damage.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#EDE4E6] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E85D75]">
                Complete Your Look
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1A1D]">
                Pairs Beautifully With
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-semibold text-[#1E1A1D] hover:text-[#E85D75]"
            >
              View More
            </Link>
          </div>
          <RelatedProductsSlider products={relatedProducts} />
        </section>
      )}

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
