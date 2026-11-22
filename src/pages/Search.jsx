import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { Search as SearchIcon, X, Sparkles } from 'lucide-react';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search') || '';
    setQuery(q);
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.finish && p.finish.toLowerCase().includes(q)) ||
        (p.shape && p.shape.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Search Results', path: '/search' }]} />

      <div className="bg-[#F8EEF0] rounded-3xl p-6 sm:p-10 border border-[#EDE4E6] space-y-4 max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#E85D75]">
          Atelier Search
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1A1D]">
          Search Our Collection
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative max-w-lg mx-auto">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6368]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Almond, Chrome, French tips, Cuticle oil..."
            className="w-full pl-11 pr-10 py-3.5 rounded-full text-xs bg-white border border-[#EDE4E6] focus:outline-hidden focus:border-[#E85D75] text-[#1E1A1D] shadow-xs"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSearchParams({});
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6E6368] hover:text-[#1E1A1D]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>

      {query ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#EDE4E6]">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-[#6E6368]">
              Found {results.length} result(s) for "{query}"
            </h2>
          </div>

          {results.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#EDE4E6] p-12 text-center space-y-3">
              <h3 className="font-serif text-2xl text-[#1E1A1D]">
                No matching creations found
              </h3>
              <p className="text-xs text-[#6E6368] max-w-md mx-auto">
                We couldn't find any press-on nail sets or accessories matching "{query}". Try checking your spelling or searching for popular styles like "Almond", "Nude", or "Chrome".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-xs text-[#6E6368]">
          Enter a search keyword above to explore handcrafted sets, cuticle oils, and tools.
        </div>
      )}
    </div>
  );
}
