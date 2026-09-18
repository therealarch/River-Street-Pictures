import React, { useState } from 'react';
import { Project } from '../types';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Layers,
  Award,
  Video,
  Globe,
  Share2,
  Check,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
  relatedProjects: Project[];
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onBack,
  onSelectProject,
  relatedProjects,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  const isVideo = project.type === 'video';
  const isGraphic = project.type === 'graphic';
  const isWeb = project.type === 'web';

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* 1. Breadcrumb / Back Link (per Site Spec §7) */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-[#262626] hover:text-[#FF4C00] transition-colors py-1.5 px-3 rounded-[6px] hover:bg-[#EFEFEF]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {project.type === 'video' ? 'Video Works' : project.type === 'graphic' ? 'Graphic Design' : 'Web Projects'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[13px] font-medium text-[#5C5C5C] hover:text-[#262626] bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#262626] transition-all"
            title="Copy project link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#FF4C00]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* 2. Media Element — The Largest Element on the Page (per Site Spec §7) */}
      <div className="mb-10">
        {isVideo && (
          <div className="relative aspect-video w-full rounded-[12px] overflow-hidden bg-[#262626] border border-[#E5E5E5] shadow-card-subtle">
            {project.videoProvider === 'gumlet' && project.gumletAssetId ? (
              /* Gumlet embed per Site Spec §3 */
              <iframe
                src={`https://play.gumlet.io/embed/${project.gumletAssetId}`}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
              />
            ) : project.videoId ? (
              /* YouTube embed per Site Spec §3 */
              <iframe
                src={`https://www.youtube.com/embed/${project.videoId}?autoplay=0&rel=0`}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}

        {isGraphic && (
          <div className="space-y-4">
            {/* Primary Hero Image */}
            <div className="relative aspect-[16/10] sm:aspect-video w-full rounded-[12px] overflow-hidden bg-[#FFFFFF] border border-[#E5E5E5] shadow-card-subtle group">
              <img
                src={selectedGalleryImg || project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-[#262626]/70 backdrop-blur-sm text-white rounded-[6px] text-[12px] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>High Resolution Proof</span>
              </div>
            </div>

            {/* Additional gallery thumbnails if available */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryImg(img)}
                    className={`relative aspect-video rounded-[8px] overflow-hidden border-2 transition-all ${
                      (selectedGalleryImg || project.thumbnail) === img
                        ? 'border-[#FF4C00] shadow-sm'
                        : 'border-[#E5E5E5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {isWeb && (
          <div className="rounded-[12px] overflow-hidden border border-[#E5E5E5] bg-[#FFFFFF] shadow-card-subtle">
            {/* Browser Frame Header */}
            <div className="px-4 py-2.5 bg-[#EFEFEF] border-b border-[#E5E5E5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <span className="ml-3 text-[12px] font-mono text-[#5C5C5C] bg-[#FFFFFF] px-3 py-0.5 rounded-[4px] border border-[#E5E5E5] hidden sm:inline-block">
                  {project.websiteUrl || 'https://riverstreetpictures.preview'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#5C5C5C] font-mono">1440 × 900 Retina</span>
              </div>
            </div>

            {/* Site Preview Graphic / Mockup */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#262626]/5">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Metadata Row + Title & Actions (per Site Spec §7) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 pb-12 border-b border-[#E5E5E5]">
        {/* Left 2 Cols: Title, Client, Category, Description */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-[#FF4C00]/10 text-[#FF4C00]">
                {project.category}
              </span>
              <span className="text-[13px] text-[#5C5C5C] font-mono">
                {project.year}
              </span>
              {project.duration && (
                <span className="text-[13px] text-[#5C5C5C] font-mono">
                  • {project.duration}
                </span>
              )}
            </div>

            <h1 className="text-[28px] sm:text-[38px] font-bold text-[#262626] tracking-tight leading-tight mb-3">
              {project.title}
            </h1>

            <p className="text-[16px] sm:text-[17px] text-[#262626] font-medium leading-relaxed mb-6">
              Client: <span className="font-semibold">{project.client}</span>
            </p>

            <div className="prose text-[#5C5C5C] text-[15px] sm:text-[16px] leading-relaxed space-y-4">
              <p>{project.description}</p>
            </div>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-medium text-[#262626] mr-1">Tags:</span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-[6px] bg-[#EFEFEF] text-[#5C5C5C] text-[12px]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Deliverables / Scope for Graphic Design */}
          {project.deliverables && (
            <div className="pt-6 border-t border-[#E5E5E5]/80">
              <h4 className="text-[15px] font-bold text-[#262626] mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF4C00]" />
                <span>Delivered Assets &amp; Specifications</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14px] text-[#5C5C5C]">
                {project.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 bg-[#FFFFFF] p-2.5 rounded-[6px] border border-[#E5E5E5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4C00] mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right 1 Col: Metadata Card & Outbound Action */}
        <div className="space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[10px] p-6 shadow-card-subtle space-y-5">
            <h3 className="text-[16px] font-bold text-[#262626] pb-3 border-b border-[#E5E5E5]">
              Project Specifications
            </h3>

            <div className="space-y-3.5 text-[14px]">
              <div>
                <span className="text-[#5C5C5C] text-[12px] uppercase tracking-wider block font-mono">
                  Client
                </span>
                <span className="font-semibold text-[#262626]">{project.client}</span>
              </div>

              <div>
                <span className="text-[#5C5C5C] text-[12px] uppercase tracking-wider block font-mono">
                  Discipline &amp; Format
                </span>
                <span className="font-semibold text-[#262626]">
                  {project.type.toUpperCase()} · {project.category}
                </span>
              </div>

              <div>
                <span className="text-[#5C5C5C] text-[12px] uppercase tracking-wider block font-mono">
                  Production Year
                </span>
                <span className="font-semibold text-[#262626]">{project.year}</span>
              </div>

              {/* Credits if video */}
              {project.credits && project.credits.length > 0 && (
                <div className="pt-2">
                  <span className="text-[#5C5C5C] text-[12px] uppercase tracking-wider block font-mono mb-2">
                    Production Credits
                  </span>
                  <div className="space-y-1.5">
                    {project.credits.map((credit, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[13px]">
                        <span className="text-[#5C5C5C]">{credit.role}:</span>
                        <span className="font-medium text-[#262626]">{credit.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech stack if web */}
              {project.techStack && (
                <div className="pt-2">
                  <span className="text-[#5C5C5C] text-[12px] uppercase tracking-wider block font-mono mb-2">
                    Technology &amp; Standards
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-[4px] bg-[#EFEFEF] text-[#262626] text-[12px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Outbound Links (Visit site or Watch on external provider, Site Spec §7) */}
            <div className="pt-4 border-t border-[#E5E5E5] space-y-2.5">
              {isWeb && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 text-[14px] font-semibold text-[#FFFFFF] bg-[#FF4C00] rounded-[10px] shadow-btn-primary hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {isVideo && project.videoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${project.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 text-[14px] font-semibold text-[#FFFFFF] bg-[#FF4C00] rounded-[10px] shadow-btn-primary hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={onBack}
                className="w-full px-4 py-2.5 text-[13px] font-medium text-[#262626] bg-[#EFEFEF] rounded-[8px] hover:bg-[#E5E5E5] transition-colors"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <div className="pt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[20px] font-bold text-[#262626] tracking-tight">
              More {project.category} Work
            </h3>
            <button
              onClick={onBack}
              className="text-[13px] font-semibold text-[#FF4C00] flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.slice(0, 3).map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProject(rel)}
                className="group cursor-pointer bg-[#FFFFFF] border border-[#E5E5E5] rounded-[8px] overflow-hidden hover:border-[#FF4C00]/50 hover:shadow-card-hover transition-all"
              >
                <div className="aspect-video w-full overflow-hidden bg-[#EFEFEF]">
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3.5">
                  <span className="text-[11px] font-mono text-[#5C5C5C] uppercase block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-[14px] font-bold text-[#262626] group-hover:text-[#FF4C00] transition-colors line-clamp-1">
                    {rel.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
