import React, { useState } from 'react';
import { PageView } from '../types';
import { Menu, X, ArrowUpRight, Film } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, filter?: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Video', page: 'video' },
    { label: 'Graphic Design', page: 'graphic' },
    { label: 'Web', page: 'web' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F9F9F9]/90 backdrop-blur-md border-b border-[#E5E5E5]/80 transition-colors">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-[6px] bg-[#262626] text-[#FFFFFF] flex items-center justify-center transition-all duration-300 group-hover:bg-[#FF4C00]">
            <Film className="w-4 h-4 transition-transform group-hover:scale-110" />
          </div>
          <div>
            <span className="font-semibold text-base sm:text-lg tracking-tight text-[#262626] block leading-none">
              River Street Pictures
            </span>
            <span className="text-[11px] text-[#5C5C5C] tracking-wide block mt-1 hidden sm:block">
              Creative Marketing &amp; Digital Solutions
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.page ||
              (currentPage === 'detail' && item.page !== 'home');
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-3.5 py-1.5 text-[14px] font-medium transition-all duration-150 rounded-[6px] ${
                  currentPage === item.page
                    ? 'text-[#FF4C00] bg-[#FF4C00]/10 font-semibold'
                    : 'text-[#262626] hover:text-[#FF4C00] hover:bg-[#EFEFEF]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button: Get in Touch */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenContact}
            className="px-4 py-2 text-[14px] font-medium text-[#FFFFFF] bg-[#FF4C00] rounded-[10px] shadow-btn-primary hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenContact}
            className="px-3 py-1.5 text-[13px] font-medium text-[#FFFFFF] bg-[#FF4C00] rounded-[8px] shadow-btn-primary"
          >
            Contact
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#262626] hover:bg-[#EFEFEF] rounded-[8px] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E5E5] bg-[#FFFFFF] px-4 py-4 space-y-2 shadow-card-subtle animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`w-full text-left px-4 py-3 rounded-[8px] text-[15px] font-medium transition-colors ${
                currentPage === item.page
                  ? 'text-[#FF4C00] bg-[#FF4C00]/10 font-semibold'
                  : 'text-[#262626] hover:bg-[#EFEFEF]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#E5E5E5]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full text-center px-4 py-3 text-[14px] font-medium text-[#FFFFFF] bg-[#FF4C00] rounded-[10px] shadow-btn-primary"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
