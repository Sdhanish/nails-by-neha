import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getCategoryBySlug, CATEGORIES } from '../data/categories';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { Search as SearchIcon, X, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function Category() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);

  // If invalid category, navigate to shop
  if (!category) {
    return <Navigate to="/shop" replace />;
  }

  const allCategoryProducts = getProductsByCategory(category.slug);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShape, setSelectedShape] = useState('all');
  const [selectedFinish, setSelectedFinish] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const shapes = ['Almond', 'Square', 'Oval', 'Coffin', 'Stiletto'];
  const finishes = ['Glossy', 'Matte', 'Chrome', 'Glitter', 'French', 'Nude'];

  const filteredProducts = useMemo(() => {
    let result = [...allCategoryProducts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedShape !== 'all') {
      result = result.filter(
        (p) =>
          p.shape === selectedShape ||
          (p.availableShapes && p.availableShapes.includes(selectedShape))
      );
    }

    if (selectedFinish !== 'all') {
      result = result.filter(
        (p) =>
          p.finish === selectedFinish ||
          (p.availableFinishes && p.availableFinishes.includes(selectedFinish))
      );
    }

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
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [allCategoryProducts, searchQuery, selectedShape, selectedFinish, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop All', path: '/shop' },
          { label: category.name, path: `/category/${category.slug}` },
        ]}
      />

      {/* Editorial Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#EDE4E6] bg-[#F8EEF0]">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[260px] sm:min-h-[320px]">
          {/* Left Text */}
          <div className="md:col-span-7 p-6 sm:p-12 flex flex-col justify-center space-y-3 z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E85D75]">
              Atelier Category • {category.itemCount} Items
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1A1D]">
              {category.editorialTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6368] max-w-lg leading-relaxed">
              {category.description}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] font-medium text-[#1E1A1D] border border-[#EDE4E6]">
                <Sparkles className="w-3.5 h-3.5 text-[#E85D75]" />
                {category.highlight}
              </span>
            </div>
          </div>

          {/* Right Image Banner */}
          <div className="md:col-span-5 relative h-48 md:h-auto overflow-hidden">
            <ImageWithFallback
              src={category.bannerImage}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8EEF0] via-transparent to-transparent hidden md:block" />
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs no-scrollbar">
        <Link
          to="/shop"
          className="px-4 py-2 rounded-full border border-[#EDE4E6] text-[#1E1A1D] hover:bg-[#FAF7F5] shrink-0 font-medium"
        >
          All Items
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className={`px-4 py-2 rounded-full border shrink-0 font-medium transition-colors ${
              cat.slug === category.slug
                ? 'bg-[#1E1A1D] text-white border-[#1E1A1D]'
                : 'bg-white border-[#EDE4E6] text-[#1E1A1D] hover:bg-[#FAF7F5]'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EDE4E6]">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6368]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search in ${category.name}...`}
            className="w-full pl-9 pr-8 py-2 rounded-full text-xs bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden text-[#1E1A1D]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6368]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Shape & Finish Filters if Press-ons */}
        {category.slug === 'press-on-nails' && (
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <span className="text-[#6E6368] font-medium text-[11px]">Shape:</span>
            <select
              value={selectedShape}
              onChange={(e) => setSelectedShape(e.target.value)}
              className="py-1.5 px-3 rounded-full text-xs bg-[#FAF7F5] border border-[#EDE4E6] text-[#1E1A1D] cursor-pointer"
            >
              <option value="all">All Shapes</option>
              {shapes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <span className="text-[#6E6368] font-medium text-[11px] ml-2">Finish:</span>
            <select
              value={selectedFinish}
              onChange={(e) => setSelectedFinish(e.target.value)}
              className="py-1.5 px-3 rounded-full text-xs bg-[#FAF7F5] border border-[#EDE4E6] text-[#1E1A1D] cursor-pointer"
            >
              <option value="all">All Finishes</option>
              {finishes.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-[#6E6368] hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2 px-3 rounded-full text-xs font-medium bg-[#FAF7F5] border border-[#EDE4E6] focus:outline-hidden text-[#1E1A1D] cursor-pointer"
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

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#EDE4E6] p-12 text-center space-y-3">
          <h3 className="font-serif text-2xl text-[#1E1A1D]">
            No products found matching filters
          </h3>
          <p className="text-xs text-[#6E6368]">
            Try clearing your search query or shape filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedShape('all');
              setSelectedFinish('all');
            }}
            className="px-6 py-2 rounded-full bg-[#1E1A1D] text-white text-xs font-semibold hover:bg-[#E85D75]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
