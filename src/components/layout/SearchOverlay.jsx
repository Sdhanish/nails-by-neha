import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, ArrowRight, Tag } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Link, useNavigate } from 'react-router-dom';
import ImageWithFallback from '../common/ImageWithFallback';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Almond',
    'French tip',
    'Chrome',
    'Bridal',
    'Blush',
  ]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const searchResults = trimmed
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          (p.finish && p.finish.toLowerCase().includes(trimmed)) ||
          (p.shape && p.shape.toLowerCase().includes(trimmed)) ||
          p.tags.some((t) => t.toLowerCase().includes(trimmed))
        );
      }).slice(0, 6)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (!recentSearches.includes(query.trim())) {
        setRecentSearches((prev) => [query.trim(), ...prev.slice(0, 4)]);
      }
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
    onClose();
    navigate(`/shop?search=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1E1A1D]/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-12">
        <div className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#EDE4E6] overflow-hidden my-8">
          {/* Search Header Form */}
          <form onSubmit={handleSearchSubmit} className="p-4 sm:p-6 border-b border-[#EDE4E6] flex items-center gap-3">
            <SearchIcon className="w-5 h-5 text-[#E85D75] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by set name, shape (Almond, Coffin), finish (Chrome, French)..."
              className="w-full text-base sm:text-lg bg-transparent focus:outline-hidden text-[#1E1A1D] placeholder:text-[#6E6368]/60 font-sans"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-[#6E6368] hover:text-[#1E1A1D] rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-[#6E6368] hover:text-[#1E1A1D] bg-[#F8EEF0] rounded-full font-medium"
            >
              ESC
            </button>
          </form>

          {/* Quick tags */}
          <div className="px-6 py-3 bg-[#FAF7F5] border-b border-[#EDE4E6] flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#6E6368] flex items-center gap-1 font-medium text-[11px]">
              <Tag className="w-3 h-3 text-[#E85D75]" /> Popular Searches:
            </span>
            {recentSearches.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FADADD] border border-[#EDE4E6] text-[#1E1A1D] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results Body */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {trimmed ? (
              searchResults.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#6E6368]">
                      Matching Atelier Pieces ({searchResults.length})
                    </span>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-xs text-[#E85D75] hover:underline flex items-center gap-1 font-medium"
                    >
                      View All Results <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-[#EDE4E6] hover:border-[#E85D75]/40 hover:bg-[#FAF7F5] transition-all group"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F8EEF0] shrink-0 border border-[#EDE4E6]">
                          <ImageWithFallback
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-[#1E1A1D] group-hover:text-[#E85D75] truncate transition-colors">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-[#6E6368] truncate">
                            {p.shape || p.categoryName} • {p.finish || 'Luxury'}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold text-[#1E1A1D]">
                              ₹{p.price}
                            </span>
                            {p.originalPrice && (
                              <span className="text-[11px] text-[#6E6368] line-through">
                                ₹{p.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <p className="font-serif text-xl text-[#1E1A1D]">
                    No matches found for "{query}"
                  </p>
                  <p className="text-xs text-[#6E6368] max-w-sm mx-auto">
                    Try searching for classic silhouettes like 'Almond', finishes like 'Chrome', or browse our complete collection.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/shop');
                    }}
                    className="px-6 py-2.5 bg-[#1E1A1D] text-white rounded-full text-xs font-semibold hover:bg-[#E85D75] transition-colors"
                  >
                    Browse All Products
                  </button>
                </div>
              )
            ) : (
              <div className="py-6 text-center text-xs text-[#6E6368]">
                Type a keyword above to search through our hand-painted sets, cuticle oils, and vanity kits.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
