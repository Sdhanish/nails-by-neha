import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import ProductCard from '../components/products/ProductCard';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  SlidersHorizontal,
  X,
  Search as SearchIcon,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useWishlist();

  // URL search params sync
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialShape = searchParams.get('shape') || 'all';
  const initialLength = searchParams.get('length') || 'all';
  const initialFinish = searchParams.get('finish') || 'all';
  const initialOccasion = searchParams.get('occasion') || 'all';
  const initialSort = searchParams.get('sort') || 'featured';
  const initialWishlistOnly = searchParams.get('wishlist') === 'true';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedShape, setSelectedShape] = useState(initialShape);
  const [selectedLength, setSelectedLength] = useState(initialLength);
  const [selectedFinish, setSelectedFinish] = useState(initialFinish);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState(initialSort);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [wishlistOnly, setWishlistOnly] = useState(initialWishlistOnly);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    if (searchParams.get('search') !== null) setSearchQuery(searchParams.get('search') || '');
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('shape')) setSelectedShape(searchParams.get('shape'));
    if (searchParams.get('finish')) setSelectedFinish(searchParams.get('finish'));
    if (searchParams.get('occasion')) setSelectedOccasion(searchParams.get('occasion'));
    if (searchParams.get('sort')) setSortBy(searchParams.get('sort'));
    if (searchParams.get('wishlist') === 'true') setWishlistOnly(true);
  }, [searchParams]);

  // Filter options definitions
  const shapes = ['Almond', 'Square', 'Oval', 'Coffin', 'Stiletto'];
  const lengths = ['Short', 'Medium', 'Long'];
  const finishes = ['Glossy', 'Matte', 'Chrome', 'Glitter', 'French', 'Nude'];
  const occasions = ['Everyday', 'Wedding', 'Party', 'Office', 'Festive'];
  const priceOptions = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹700', value: 'under-700' },
    { label: '₹700 – ₹999', value: '700-999' },
    { label: '₹1,000 & Above', value: 'above-1000' },
  ];

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedShape('all');
    setSelectedLength('all');
    setSelectedFinish('all');
    setSelectedOccasion('all');
    setPriceRange('all');
    setOnlyInStock(false);
    setWishlistOnly(false);
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Wishlist filter
    if (wishlistOnly) {
      result = result.filter((p) => wishlist.includes(p.id));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.finish && p.finish.toLowerCase().includes(q)) ||
          (p.shape && p.shape.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Shape
    if (selectedShape !== 'all') {
      result = result.filter(
        (p) =>
          p.shape === selectedShape ||
          (p.availableShapes && p.availableShapes.includes(selectedShape))
      );
    }

    // Length
    if (selectedLength !== 'all') {
      result = result.filter(
        (p) =>
          p.length === selectedLength ||
          (p.availableLengths && p.availableLengths.includes(selectedLength))
      );
    }

    // Finish
    if (selectedFinish !== 'all') {
      result = result.filter(
        (p) =>
          p.finish === selectedFinish ||
          (p.availableFinishes && p.availableFinishes.includes(selectedFinish))
      );
    }

    // Occasion
    if (selectedOccasion !== 'all') {
      result = result.filter((p) => p.occasion === selectedOccasion);
    }

    // Price
    if (priceRange === 'under-700') {
      result = result.filter((p) => p.price < 700);
    } else if (priceRange === '700-999') {
      result = result.filter((p) => p.price >= 700 && p.price <= 999);
    } else if (priceRange === 'above-1000') {
      result = result.filter((p) => p.price >= 1000);
    }

    // Stock
    if (onlyInStock) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'bestselling':
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'top-rated':
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedShape,
    selectedLength,
    selectedFinish,
    selectedOccasion,
    priceRange,
    onlyInStock,
    wishlistOnly,
    wishlist,
    sortBy,
  ]);

  // Active filters count
  const activeFiltersCount = [
    searchQuery ? 1 : 0,
    selectedCategory !== 'all' ? 1 : 0,
    selectedShape !== 'all' ? 1 : 0,
    selectedLength !== 'all' ? 1 : 0,
    selectedFinish !== 'all' ? 1 : 0,
    selectedOccasion !== 'all' ? 1 : 0,
    priceRange !== 'all' ? 1 : 0,
    onlyInStock ? 1 : 0,
    wishlistOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Shop All', path: '/shop' }]} />

      {/* Header Banner */}
      <div className="bg-[#F8EEF0] rounded-3xl p-6 sm:p-10 border border-[#EDE4E6] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E85D75]">
            Atelier Gallery
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1A1D] mt-1">
            {wishlistOnly ? 'Saved Favorites' : 'The Complete Collection'}
          </h1>
          <p className="text-xs text-[#6E6368] mt-2 max-w-xl">
            Explore handcrafted press-on nails, cold-pressed cuticle elixirs, and bespoke vanity sets created for flawless, long-lasting luxury.
          </p>
        </div>

        <div className="shrink-0 bg-white/80 backdrop-blur-xs px-4 py-2 rounded-2xl border border-[#EDE4E6] text-xs font-medium text-[#1E1A1D]">
          Showing <strong className="text-[#E85D75]">{filteredProducts.length}</strong> of{' '}
          {PRODUCTS.length} creations
        </div>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3.5 rounded-2xl border border-[#EDE4E6]">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6368]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sets, finishes, tags..."
            className="w-full pl-9 pr-8 py-2 rounded-full text-xs bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6368] hover:text-[#1E1A1D]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Toggle for Mobile & Sort Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-[#EDE4E6] text-xs font-medium text-[#1E1A1D] hover:bg-[#FAF7F5]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#E85D75]" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Sort By Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6E6368] hidden md:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-full text-xs font-medium bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="bestselling">Best Selling</option>
              <option value="newest">New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="top-rated">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
          <span className="text-[#6E6368] text-[11px] font-medium">Active filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
              "{searchQuery}"
              <X
                className="w-3 h-3 cursor-pointer hover:text-[#E85D75]"
                onClick={() => setSearchQuery('')}
              />
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
              Category: {selectedCategory}
              <X
                className="w-3 h-3 cursor-pointer hover:text-[#E85D75]"
                onClick={() => setSelectedCategory('all')}
              />
            </span>
          )}
          {selectedShape !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
              Shape: {selectedShape}
              <X
                className="w-3 h-3 cursor-pointer hover:text-[#E85D75]"
                onClick={() => setSelectedShape('all')}
              />
            </span>
          )}
          {selectedLength !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
              Length: {selectedLength}
              <X
                className="w-3 h-3 cursor-pointer hover:text-[#E85D75]"
                onClick={() => setSelectedLength('all')}
              />
            </span>
          )}
          {selectedFinish !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
              Finish: {selectedFinish}
              <X
                className="w-3 h-3 cursor-pointer hover:text-[#E85D75]"
                onClick={() => setSelectedFinish('all')}
              />
            </span>
          )}
          {selectedOccasion !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
              Occasion: {selectedOccasion}
              <X
                className="w-3 h-3 cursor-pointer hover:text-[#E85D75]"
                onClick={() => setSelectedOccasion('all')}
              />
            </span>
          )}
          {priceRange !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
              Price: {priceOptions.find((p) => p.value === priceRange)?.label}
              <X
                className="w-3 h-3 cursor-pointer hover:text-[#E85D75]"
                onClick={() => setPriceRange('all')}
              />
            </span>
          )}
          {wishlistOnly && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FADADD] text-[#1E1A1D]">
              Wishlist Only
              <X
                className="w-3 h-3 cursor-pointer hover:text-[#E85D75]"
                onClick={() => setWishlistOnly(false)}
              />
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-[11px] text-[#E85D75] hover:underline flex items-center gap-1 ml-2 font-medium"
          >
            <RotateCcw className="w-3 h-3" /> Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Desktop Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar (hidden on mobile) */}
        <aside className="hidden lg:block bg-white p-6 rounded-2xl border border-[#EDE4E6] space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE4E6]">
            <h3 className="font-serif text-lg text-[#1E1A1D] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#E85D75]" /> Filter Atelier
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#E85D75] hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E6368]">
              Category
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`block w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#F8EEF0] text-[#E85D75] font-semibold'
                    : 'text-[#1E1A1D] hover:bg-[#FAF7F5]'
                }`}
              >
                All Categories ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`block w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-[#F8EEF0] text-[#E85D75] font-semibold'
                      : 'text-[#1E1A1D] hover:bg-[#FAF7F5]'
                  }`}
                >
                  {cat.name} ({cat.itemCount})
                </button>
              ))}
            </div>
          </div>

          {/* Shape */}
          <div className="space-y-2 pt-2 border-t border-[#EDE4E6]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E6368]">
              Nail Shape
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedShape('all')}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  selectedShape === 'all'
                    ? 'bg-[#1E1A1D] text-white border-[#1E1A1D]'
                    : 'bg-white text-[#1E1A1D] border-[#EDE4E6] hover:border-[#1E1A1D]'
                }`}
              >
                All
              </button>
              {shapes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedShape(s)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                    selectedShape === s
                      ? 'bg-[#1E1A1D] text-white border-[#1E1A1D]'
                      : 'bg-white text-[#1E1A1D] border-[#EDE4E6] hover:border-[#1E1A1D]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div className="space-y-2 pt-2 border-t border-[#EDE4E6]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E6368]">
              Length
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedLength('all')}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  selectedLength === 'all'
                    ? 'bg-[#1E1A1D] text-white border-[#1E1A1D]'
                    : 'bg-white text-[#1E1A1D] border-[#EDE4E6] hover:border-[#1E1A1D]'
                }`}
              >
                All
              </button>
              {lengths.map((len) => (
                <button
                  key={len}
                  onClick={() => setSelectedLength(len)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                    selectedLength === len
                      ? 'bg-[#1E1A1D] text-white border-[#1E1A1D]'
                      : 'bg-white text-[#1E1A1D] border-[#EDE4E6] hover:border-[#1E1A1D]'
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          {/* Finish */}
          <div className="space-y-2 pt-2 border-t border-[#EDE4E6]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E6368]">
              Finish / Effect
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedFinish('all')}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  selectedFinish === 'all'
                    ? 'bg-[#1E1A1D] text-white border-[#1E1A1D]'
                    : 'bg-white text-[#1E1A1D] border-[#EDE4E6] hover:border-[#1E1A1D]'
                }`}
              >
                All
              </button>
              {finishes.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFinish(f)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                    selectedFinish === f
                      ? 'bg-[#1E1A1D] text-white border-[#1E1A1D]'
                      : 'bg-white text-[#1E1A1D] border-[#EDE4E6] hover:border-[#1E1A1D]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div className="space-y-2 pt-2 border-t border-[#EDE4E6]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E6368]">
              Occasion
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedOccasion('all')}
                className={`block w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors ${
                  selectedOccasion === 'all'
                    ? 'bg-[#F8EEF0] text-[#E85D75] font-semibold'
                    : 'text-[#1E1A1D] hover:bg-[#FAF7F5]'
                }`}
              >
                All Occasions
              </button>
              {occasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`block w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors ${
                    selectedOccasion === occ
                      ? 'bg-[#F8EEF0] text-[#E85D75] font-semibold'
                      : 'text-[#1E1A1D] hover:bg-[#FAF7F5]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-2 border-t border-[#EDE4E6]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E6368]">
              Price
            </h4>
            <div className="space-y-1">
              {priceOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-xs text-[#1E1A1D] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={priceRange === opt.value}
                    onChange={() => setPriceRange(opt.value)}
                    className="accent-[#E85D75]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area (3 cols on desktop, responsive) */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#EDE4E6] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F8EEF0] text-[#E85D75] flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif text-2xl text-[#1E1A1D]">
                No matching creations found
              </h3>
              <p className="text-xs text-[#6E6368] max-w-md mx-auto">
                We couldn't find any press-on sets or accessories matching your exact combination of filters. Try clearing some selections.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold transition-colors inline-block"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#1E1A1D]/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl z-10 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE4E6]">
              <h3 className="font-serif text-xl text-[#1E1A1D]">Filter Atelier</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-[#6E6368] hover:text-[#1E1A1D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-6 flex-1">
              {/* Category */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E6368] mb-2">
                  Category
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`block w-full text-left text-xs py-1.5 px-2 rounded-lg ${
                      selectedCategory === 'all' ? 'bg-[#F8EEF0] text-[#E85D75] font-semibold' : 'text-[#1E1A1D]'
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`block w-full text-left text-xs py-1.5 px-2 rounded-lg ${
                        selectedCategory === cat.slug ? 'bg-[#F8EEF0] text-[#E85D75] font-semibold' : 'text-[#1E1A1D]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shape */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E6368] mb-2">
                  Shape
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {shapes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedShape(selectedShape === s ? 'all' : s)}
                      className={`px-3 py-1 rounded-full text-xs border ${
                        selectedShape === s ? 'bg-[#1E1A1D] text-white border-[#1E1A1D]' : 'border-[#EDE4E6]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finish */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E6368] mb-2">
                  Finish
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {finishes.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFinish(selectedFinish === f ? 'all' : f)}
                      className={`px-3 py-1 rounded-full text-xs border ${
                        selectedFinish === f ? 'bg-[#1E1A1D] text-white border-[#1E1A1D]' : 'border-[#EDE4E6]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE4E6] flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-full border border-[#EDE4E6] text-xs font-semibold text-[#6E6368]"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-[#1E1A1D] text-white text-xs font-semibold"
              >
                View ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
