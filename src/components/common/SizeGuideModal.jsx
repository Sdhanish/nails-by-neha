import React, { useEffect } from 'react';
import { X, CheckCircle, Ruler } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeTable = [
    { size: 'XS', thumb: '14mm', index: '11mm', middle: '12mm', ring: '10mm', pinky: '8mm' },
    { size: 'S', thumb: '15mm', index: '12mm', middle: '13mm', ring: '11mm', pinky: '8.5mm' },
    { size: 'M', thumb: '16mm', index: '12.5mm', middle: '13.5mm', ring: '11.5mm', pinky: '9mm' },
    { size: 'L', thumb: '17mm', index: '13.5mm', middle: '14.5mm', ring: '12.5mm', pinky: '10mm' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1E1A1D]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFFFFF] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#EDE4E6] z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#EDE4E6]">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-[#E85D75] uppercase">
              Atelier Sizing Guide
            </span>
            <h3 className="font-serif text-2xl text-[#1E1A1D]">Find Your Flawless Fit</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6E6368] hover:text-[#1E1A1D] hover:bg-[#F8EEF0] rounded-full transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm text-[#1E1A1D]">
          {/* Note */}
          <div className="p-4 bg-[#F8EEF0] rounded-xl border border-[#EDE4E6] flex items-start gap-3">
            <Ruler className="w-5 h-5 text-[#E85D75] shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-[#6E6368]">
              Each <strong className="text-[#1E1A1D]">Nails & Lashes by Neha</strong> 30-piece press-on box comes with 15 universal graduated widths, ensuring a guaranteed fit right out of the box without measuring. If selecting custom sets, use the chart below.
            </p>
          </div>

          {/* Size Chart Table */}
          <div>
            <h4 className="font-medium text-xs uppercase tracking-wider text-[#6E6368] mb-3">
              Standard Sizing Matrix (Curvature Width)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-[#EDE4E6]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F5] border-b border-[#EDE4E6] text-[#6E6368]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Size</th>
                    <th className="py-2.5 px-3 font-semibold">Thumb</th>
                    <th className="py-2.5 px-3 font-semibold">Index</th>
                    <th className="py-2.5 px-3 font-semibold">Middle</th>
                    <th className="py-2.5 px-3 font-semibold">Ring</th>
                    <th className="py-2.5 px-3 font-semibold">Pinky</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE4E6]">
                  {sizeTable.map((row) => (
                    <tr key={row.size} className="hover:bg-[#FAF7F5]/50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-[#E85D75]">{row.size}</td>
                      <td className="py-2.5 px-3">{row.thumb}</td>
                      <td className="py-2.5 px-3">{row.index}</td>
                      <td className="py-2.5 px-3">{row.middle}</td>
                      <td className="py-2.5 px-3">{row.ring}</td>
                      <td className="py-2.5 px-3">{row.pinky}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure Step-by-Step */}
          <div className="space-y-3">
            <h4 className="font-medium text-xs uppercase tracking-wider text-[#6E6368]">
              How to Measure in 2 Minutes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-[#EDE4E6] bg-[#FAF7F5]">
                <div className="w-6 h-6 rounded-full bg-[#E85D75] text-white text-xs font-bold flex items-center justify-center mb-2">
                  1
                </div>
                <h5 className="font-medium text-xs mb-1">Place Clear Tape</h5>
                <p className="text-[11px] text-[#6E6368] leading-normal">
                  Press a piece of transparent adhesive tape horizontally across the widest point of your natural nail bed.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#EDE4E6] bg-[#FAF7F5]">
                <div className="w-6 h-6 rounded-full bg-[#E85D75] text-white text-xs font-bold flex items-center justify-center mb-2">
                  2
                </div>
                <h5 className="font-medium text-xs mb-1">Mark Sidewalls</h5>
                <p className="text-[11px] text-[#6E6368] leading-normal">
                  Use a fine pen to mark both outer edges where your nail meets the skin fold on either side.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#EDE4E6] bg-[#FAF7F5]">
                <div className="w-6 h-6 rounded-full bg-[#E85D75] text-white text-xs font-bold flex items-center justify-center mb-2">
                  3
                </div>
                <h5 className="font-medium text-xs mb-1">Measure with Ruler</h5>
                <p className="text-[11px] text-[#6E6368] leading-normal">
                  Remove the tape and place it flat against a metric ruler. Count the millimeters between your two marks.
                </p>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="p-3 rounded-lg bg-[#FAF7F5] border border-[#EDE4E6] text-xs space-y-1.5">
            <p className="font-medium text-[#1E1A1D] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#E85D75]" />
              In Between Sizes?
            </p>
            <p className="text-[#6E6368] pl-5 text-[11px]">
              Always size down slightly or gently file the sides of a larger press-on using the included Czech glass file for a bespoke fit.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#EDE4E6] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1E1A1D] text-white rounded-full text-xs font-semibold hover:bg-[#E85D75] transition-colors"
          >
            Got It, Thanks
          </button>
        </div>
      </div>
    </div>
  );
}
