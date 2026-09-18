import React from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedWorkProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onViewAll: () => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({
  projects,
  onSelectProject,
  onViewAll,
}) => {
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-[1000px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#262626] tracking-tight">
            Featured Projects
          </h2>
        </div>

        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#FF4C00] hover:translate-x-0.5 transition-transform"
        >
          <span>View All Work</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {featured.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
};
