import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-[#F8EEF0] text-[#1E1A1D] border-[#EDE4E6]',
    primary: 'bg-[#E85D75] text-white border-transparent',
    bestseller: 'bg-[#1E1A1D] text-white border-transparent',
    softpink: 'bg-[#FADADD] text-[#1E1A1D] border-[#FADADD]',
    discount: 'bg-[#E85D75]/10 text-[#E85D75] border-[#E85D75]/20 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider font-medium border ${
        styles[variant] || styles.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
