import React from 'react';
import { PageView } from '../types';
import { ArrowRight, Video, Palette, Globe } from 'lucide-react';

interface HomeCategoryCardsProps {
  onSelectCategory: (page: PageView) => void;
}

export const HomeCategoryCards: React.FC<HomeCategoryCardsProps> = ({
  onSelectCategory,
}) => {
  const categories = [
    {
      page: 'video' as PageView,
      title: 'Video',
      subtitle: 'Real estate walkthroughs, brand films, commercials, and event coverage that move.',
      icon: Video,
      count: '7 Projects',
      tags: ['Real Estate', 'Documentary', 'Brand Films', 'Commercials'],
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
    {
      page: 'graphic' as PageView,
      title: 'Graphic Design',
      subtitle: 'Branding, print, and social graphics built to get noticed.',
      icon: Palette,
      count: '6 Projects',
      tags: ['Branding', 'Print & Books', 'Packaging', 'Social Suites'],
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    },
    {
      page: 'web' as PageView,
      title: 'Web',
      subtitle: 'Clean, fast websites for healthcare, hospitality, services, and portfolios.',
      icon: Globe,
      count: '6 Projects',
      tags: ['Healthcare', 'Hospitality', 'Services', 'Portfolios'],
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-[1000px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#262626] tracking-tight">
            Explore by Discipline
          </h2>
        </div>
        <p className="text-[14px] text-[#5C5C5C] max-w-sm">
          Select any discipline below to view our comprehensive production catalogs and case studies.
        </p>
      </div>

      {/* 3 Category Cards per Site Spec Section 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.page}
              onClick={() => onSelectCategory(cat.page)}
              className="group cursor-pointer bg-[#FFFFFF] border border-[#E5E5E5] rounded-[12px] overflow-hidden transition-all duration-300 hover:border-[#FF4C00]/60 hover:shadow-card-hover flex flex-col justify-between"
            >
              {/* Thumbnail Container (16:9 fixed aspect) */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#EFEFEF]">
                <img
                  src={cat.thumbnail}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#262626]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Count badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-[6px] bg-[#262626]/80 backdrop-blur-sm text-[#FFFFFF] text-[11px] font-medium tracking-wide">
                  {cat.count}
                </div>

                <div className="absolute bottom-3 left-3 p-2 rounded-[6px] bg-[#FFFFFF] text-[#262626] shadow-sm transition-colors group-hover:bg-[#FF4C00] group-hover:text-[#FFFFFF]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Text / Copy Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[20px] font-bold text-[#262626] tracking-tight group-hover:text-[#FF4C00] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-[14px] text-[#5C5C5C] leading-relaxed mb-4">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E5E5]/70 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-[4px] bg-[#EFEFEF] text-[#5C5C5C]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-[13px] font-semibold text-[#FF4C00] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
