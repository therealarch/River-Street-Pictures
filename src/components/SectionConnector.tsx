import React from 'react';

interface SectionConnectorProps {
  label?: string;
  position?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * Visual section connector per design.md §5:
 * Faint hairline divider line with a small square marker centered on the vertical
 * grid line straddling the horizontal seam to visually "stitch" sections together.
 */
export const SectionConnector: React.FC<SectionConnectorProps> = ({
  label,
  position = 'center',
  className = '',
}) => {
  return (
    <div className={`relative w-full max-w-[1000px] mx-auto py-6 sm:py-8 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Horizontal hairline seam */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[#E5E5E5]" />
        </div>

        {/* Small square marker straddling the seam */}
        <div className="relative z-10 flex items-center gap-3 bg-[#F9F9F9] px-4">
          <div 
            className="w-2.5 h-2.5 border border-[#262626] bg-[#FFFFFF] rotate-45 transition-transform duration-300 hover:rotate-90 hover:border-[#FF4C00]" 
            title="Section Transition Marker"
          />
          {label && (
            <span className="text-[11px] uppercase tracking-widest text-[#5C5C5C] font-mono">
              {label}
            </span>
          )}
          <div 
            className="w-2.5 h-2.5 border border-[#262626] bg-[#FFFFFF] rotate-45 transition-transform duration-300 hover:rotate-90 hover:border-[#FF4C00]" 
          />
        </div>
      </div>
    </div>
  );
};
