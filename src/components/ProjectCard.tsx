import React from 'react';
import { Project } from '../types';
import { Play, ArrowUpRight, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const isVideo = project.type === 'video';
  const isWeb = project.type === 'web';
  const isGraphic = project.type === 'graphic';

  return (
    <div
      onClick={() => onClick(project)}
      className="group cursor-pointer bg-[#FFFFFF] border border-[#E5E5E5] rounded-[10px] overflow-hidden transition-all duration-300 hover:border-[#FF4C00]/50 hover:shadow-card-hover flex flex-col justify-between"
    >
      {/* Media Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#EFEFEF]">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-[#262626]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {isVideo && (
            <div className="w-11 h-11 rounded-full bg-[#FF4C00] text-[#FFFFFF] shadow-btn-primary flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
          )}
          {isWeb && (
            <div className="w-10 h-10 rounded-full bg-[#FFFFFF] text-[#262626] shadow-sm flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
              <ExternalLink className="w-4 h-4 text-[#FF4C00]" />
            </div>
          )}
          {isGraphic && (
            <div className="w-10 h-10 rounded-full bg-[#FFFFFF] text-[#262626] shadow-sm flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
              <ImageIcon className="w-4 h-4 text-[#FF4C00]" />
            </div>
          )}
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-[4px] bg-[#262626]/80 backdrop-blur-sm text-[#FFFFFF] text-[11px] font-medium tracking-wide">
            {project.category}
          </span>
          {isVideo && project.duration && (
            <span className="px-2 py-0.5 rounded-[4px] bg-[#262626]/80 backdrop-blur-sm text-[#FFFFFF] text-[11px] font-mono">
              {project.duration}
            </span>
          )}
        </div>

        {project.featured && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-[4px] bg-[#FF4C00] text-[#FFFFFF] text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Featured
          </div>
        )}
      </div>

      {/* Caption & Metadata Row (per Site Spec §6) */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="text-[15px] font-bold text-[#262626] leading-snug group-hover:text-[#FF4C00] transition-colors line-clamp-2">
              {project.title}
            </h4>
            <ArrowUpRight className="w-4 h-4 text-[#5C5C5C] opacity-0 group-hover:opacity-100 group-hover:text-[#FF4C00] transition-all flex-shrink-0 mt-0.5" />
          </div>

          <p className="text-[13px] text-[#5C5C5C] line-clamp-2 mb-3 leading-relaxed">
            {project.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E5E5E5]/70 flex items-center justify-between text-[12px]">
          <span className="font-semibold text-[#262626] truncate max-w-[170px]">
            {project.client}
          </span>
          <span className="text-[#5C5C5C] font-mono text-[11px]">
            {project.year}
          </span>
        </div>
      </div>
    </div>
  );
};
