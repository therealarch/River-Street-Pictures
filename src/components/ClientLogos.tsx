import React from 'react';
import { CLIENT_LOGOS } from '../data/projects';
import { Building2, Compass, Layers, Coffee, HeartPulse, BookOpen, Radio, Landmark } from 'lucide-react';

export const ClientLogos: React.FC = () => {
  const logoIcons: Record<string, React.ReactNode> = {
    'Acme Realty': <Building2 className="w-4 h-4" />,
    'Forma Studio': <Compass className="w-4 h-4" />,
    'Strata Athletics': <Layers className="w-4 h-4" />,
    'Solstice Coffee': <Coffee className="w-4 h-4" />,
    'Lumina Health': <HeartPulse className="w-4 h-4" />,
    'Vesper Press': <BookOpen className="w-4 h-4" />,
    'Horizon Global': <Radio className="w-4 h-4" />,
    'Vanguard Ventures': <Landmark className="w-4 h-4" />,
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-[1000px] mx-auto text-center">
      <p className="text-[12px] uppercase font-mono tracking-widest text-[#5C5C5C] mb-6">
        Trusted by brands across real estate, hospitality, architecture, and tech
      </p>

      {/* Grayscale with hover-to-color strip per design.md §7 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {CLIENT_LOGOS.map((client) => {
          return (
            <div
              key={client.name}
              className="group p-3.5 rounded-[8px] border border-[#E5E5E5] bg-[#FFFFFF] transition-all duration-200 hover:border-[#FF4C00]/40 hover:shadow-sm flex items-center justify-center gap-2.5 cursor-default"
            >
              <div className="text-[#5C5C5C] group-hover:text-[#FF4C00] transition-colors">
                {logoIcons[client.name] || <Building2 className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <span className="text-[13px] font-semibold text-[#262626] group-hover:text-[#FF4C00] transition-colors block leading-tight">
                  {client.name}
                </span>
                <span className="text-[10px] text-[#5C5C5C] block">
                  {client.sector}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
