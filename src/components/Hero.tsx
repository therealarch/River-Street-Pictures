import React from 'react';
import { ArrowRight, Sparkles, Video, Palette, Globe } from 'lucide-react';

interface HeroProps {
  onSeeWork: () => void;
  onGetInTouch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSeeWork, onGetInTouch }) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 text-center max-w-[1000px] mx-auto">
      {/* Decorative hairline sparkle markers (design.md §5) */}
      <div className="hidden lg:block absolute left-4 top-12 text-[#E5E5E5] select-none" aria-hidden="true">
        <div className="w-2 h-2 border border-[#E5E5E5] bg-[#FFFFFF] rotate-45" />
      </div>
      <div className="hidden lg:block absolute right-4 top-12 text-[#E5E5E5] select-none" aria-hidden="true">
        <div className="w-2 h-2 border border-[#E5E5E5] bg-[#FFFFFF] rotate-45" />
      </div>

      {/* Pill Badge (design.md §6) */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEFEF] border border-[#E5E5E5] text-[#262626] text-[13px] font-medium mb-6 sm:mb-8 transition-all hover:border-[#FF4C00]/40">
        <span className="w-2 h-2 rounded-full bg-[#FF4C00] animate-pulse" />
        <span>Video · Design · Web · All under one roof</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#5C5C5C]" />
      </div>

      {/* Two-Line Headline with second line in accent color (design.md §6) */}
      <h1 className="text-[38px] sm:text-[52px] md:text-[60px] font-bold tracking-tight text-[#262626] leading-[1.08] max-w-[850px] mx-auto mb-6">
        Creative Marketing &amp; Digital Solutions{' '}
        <span className="text-[#FF4C00] block sm:inline">for your business.</span>
      </h1>

      {/* Subhead short supporting sentence */}
      <p className="text-[16px] sm:text-[18px] text-[#5C5C5C] max-w-[640px] mx-auto mb-10 leading-relaxed font-normal">
        We shoot, design, and build the video, graphics, and websites that help brands show up and stand out.
      </p>

      {/* Dual CTA Row (design.md §6 & §4) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
        {/* Primary CTA: Colored + soft glow shadow */}
        <button
          onClick={onSeeWork}
          className="w-full sm:w-auto px-6 py-3.5 text-[15px] font-semibold text-[#FFFFFF] bg-[#FF4C00] rounded-[10px] shadow-btn-primary hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>See Our Work</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary CTA: Flat gray, neutral */}
        <button
          onClick={onGetInTouch}
          className="w-full sm:w-auto px-6 py-3.5 text-[15px] font-medium text-[#262626] bg-[#EFEFEF] rounded-[8px] hover:bg-[#E5E5E5] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Get in Touch</span>
        </button>
      </div>

      {/* Mini Services Indicator Strip */}
      <div className="mt-12 pt-8 border-t border-[#E5E5E5]/60 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[#5C5C5C]">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-[#FF4C00]" />
          <span>Cinematic 4K Video Production</span>
        </div>
        <span className="hidden sm:inline text-[#E5E5E5]">•</span>
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#FF4C00]" />
          <span>Brand Systems &amp; Print</span>
        </div>
        <span className="hidden sm:inline text-[#E5E5E5]">•</span>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#FF4C00]" />
          <span>High-Performance Websites</span>
        </div>
      </div>
    </section>
  );
};
