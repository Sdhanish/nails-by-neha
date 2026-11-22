import React, { useState } from 'react';

export default function ImageWithFallback({
  src,
  alt = 'Nail Art',
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
  ...props
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#F8EEF0] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#F8EEF0] animate-pulse" />
      )}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error) setError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
