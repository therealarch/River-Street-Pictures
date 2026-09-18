import React from 'react';
import { PageView } from '../types';
import { Film, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-[#E5E5E5] bg-[#FFFFFF] transition-colors">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#E5E5E5]">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[6px] bg-[#262626] text-[#FFFFFF] flex items-center justify-center">
                <Film className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-[#262626] tracking-tight">
                River Street Pictures
              </span>
            </div>

            <p className="text-[14px] text-[#5C5C5C] max-w-sm leading-relaxed">
              Creative Marketing &amp; Digital Solutions for your business. We shoot, design, and build the video, graphics, and websites that help brands show up and stand out.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenContact}
                className="px-4 py-2 text-[13px] font-semibold text-[#FFFFFF] bg-[#FF4C00] rounded-[8px] shadow-btn-primary hover:opacity-95 transition-opacity inline-flex items-center gap-1.5"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[12px] uppercase font-mono tracking-widest text-[#262626] font-bold">
              Portfolio Index
            </h4>
            <ul className="space-y-2 text-[14px]">
              <li>
                <button
                  onClick={() => onNavigate('video')}
                  className="text-[#5C5C5C] hover:text-[#FF4C00] transition-colors"
                >
                  Video Production (7)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('graphic')}
                  className="text-[#5C5C5C] hover:text-[#FF4C00] transition-colors"
                >
                  Graphic Design &amp; Brand (6)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('web')}
                  className="text-[#5C5C5C] hover:text-[#FF4C00] transition-colors"
                >
                  Web Development (6)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-[#5C5C5C] hover:text-[#FF4C00] transition-colors"
                >
                  Home &amp; Capabilities
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Studio (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[12px] uppercase font-mono tracking-widest text-[#262626] font-bold">
              Studio Direct
            </h4>
            <div className="space-y-2 text-[14px] text-[#5C5C5C]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF4C00] flex-shrink-0" />
                <a
                  href="mailto:hello@riverstreetpictures.com"
                  className="hover:text-[#FF4C00] transition-colors"
                >
                  hello@riverstreetpictures.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF4C00] flex-shrink-0" />
                <a
                  href="tel:+15552487389"
                  className="hover:text-[#FF4C00] transition-colors"
                >
                  +1 (555) 248-7389
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF4C00] flex-shrink-0" />
                <span>Los Angeles · New York</span>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#5C5C5C] block mb-2">
                Social Broadcasts
              </span>
              <div className="flex items-center gap-3 text-[13px] text-[#262626]">
                <a
                  href="https://vimeo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4C00] transition-colors"
                >
                  Vimeo
                </a>
                <span className="text-[#E5E5E5]">•</span>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4C00] transition-colors"
                >
                  YouTube
                </a>
                <span className="text-[#E5E5E5]">•</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4C00] transition-colors"
                >
                  Instagram
                </a>
                <span className="text-[#E5E5E5]">•</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4C00] transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & micro-meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#5C5C5C]">
          <p>© {new Date().getFullYear()} River Street Pictures. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">1000PX DESKTOP GRID SYSTEM</span>
            <span>•</span>
            <span>Made with Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
