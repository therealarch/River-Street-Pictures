import React, { useState, useMemo } from 'react';
import { Project, ProjectType } from '../types';
import { ProjectCard } from './ProjectCard';
import { Filter, Search } from 'lucide-react';

interface ProjectGridProps {
  projects: Project[];
  type?: ProjectType | 'all';
  title?: string;
  subtitle?: string;
  categories: string[];
  initialCategory?: string;
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  type = 'all',
  title,
  subtitle,
  categories,
  initialCategory = 'All',
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Type match if specified
      if (type !== 'all' && p.type !== type) {
        return false;
      }
      // Category filter match
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesClient = p.client.toLowerCase().includes(q);
        const matchesSummary = p.summary.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesTags = p.tags?.some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesClient || matchesSummary || matchesCategory || matchesTags;
      }
      return true;
    });
  }, [projects, type, selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6">
      {/* Header if provided */}
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h1 className="text-[32px] sm:text-[44px] font-bold text-[#262626] tracking-tight mb-2">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-[16px] text-[#5C5C5C] max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E5E5E5]/80">
        {/* Category Filter Pills (per Site Spec §6) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#FF4C00] text-[#FFFFFF] shadow-sm'
                : 'bg-[#EFEFEF] text-[#262626] hover:bg-[#E5E5E5]'
            }`}
          >
            All ({projects.filter((p) => type === 'all' || p.type === type).length})
          </button>
          {categories.map((cat) => {
            const count = projects.filter(
              (p) => (type === 'all' || p.type === type) && p.category === cat
            ).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FF4C00] text-[#FFFFFF] shadow-sm'
                    : 'bg-[#EFEFEF] text-[#262626] hover:bg-[#E5E5E5]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Quick Filter Search Input (Sharp minimal style, design.md §4) */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-[#5C5C5C] absolute left-1 top-2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-minimal w-full pl-7 pr-3 py-1.5 text-[13px] placeholder:text-[#5C5C5C]/60"
          />
        </div>
      </div>

      {/* Grid Layout: 3 cols desktop, 2 cols tablet, 1 col mobile, 24px-32px gutter */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onSelectProject}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-[#FFFFFF] border border-[#E5E5E5] rounded-[12px]">
          <Filter className="w-8 h-8 text-[#5C5C5C] mx-auto mb-3" />
          <h3 className="text-[16px] font-bold text-[#262626] mb-1">
            No projects found
          </h3>
          <p className="text-[14px] text-[#5C5C5C] mb-4">
            Try selecting another category or clearing your search.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-[13px] font-medium text-[#262626] bg-[#EFEFEF] rounded-[8px] hover:bg-[#E5E5E5]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
