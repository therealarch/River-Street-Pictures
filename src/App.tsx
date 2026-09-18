import React, { useState, useEffect } from 'react';
import { PageView, Project } from './types';
import {
  PROJECTS,
  VIDEO_CATEGORIES,
  GRAPHIC_CATEGORIES,
  WEB_CATEGORIES,
} from './data/projects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClientLogos } from './components/ClientLogos';
import { HomeCategoryCards } from './components/HomeCategoryCards';
import { FeaturedWork } from './components/FeaturedWork';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectDetail } from './components/ProjectDetail';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ArrowUpRight, Film } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  // Handle URL hash routing for deep-linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash || hash === '/' || hash === 'home') {
        setCurrentPage('home');
        setSelectedProject(null);
      } else if (hash === 'video') {
        setCurrentPage('video');
        setSelectedProject(null);
      } else if (hash === 'graphic') {
        setCurrentPage('graphic');
        setSelectedProject(null);
      } else if (hash === 'web') {
        setCurrentPage('web');
        setSelectedProject(null);
      } else if (hash.startsWith('project/')) {
        const slug = hash.replace('project/', '');
        const found = PROJECTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProject(found);
          setCurrentPage('detail');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageView, filter?: string) => {
    setCurrentPage(page);
    setSelectedProject(null);
    if (filter) {
      setActiveCategoryFilter(filter);
    } else {
      setActiveCategoryFilter('All');
    }

    if (page === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage('detail');
    window.location.hash = `project/${project.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = () => {
    if (selectedProject) {
      navigateTo(selectedProject.type);
    } else {
      navigateTo('home');
    }
  };

  // Video projects subset
  const videoProjects = PROJECTS.filter((p) => p.type === 'video');
  // Graphic projects subset
  const graphicProjects = PROJECTS.filter((p) => p.type === 'graphic');
  // Web projects subset
  const webProjects = PROJECTS.filter((p) => p.type === 'web');

  // Related projects for detail view
  const relatedProjects = selectedProject
    ? PROJECTS.filter(
        (p) =>
          p.id !== selectedProject.id &&
          (p.type === selectedProject.type || p.category === selectedProject.category)
      )
    : [];

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#262626] relative flex flex-col font-sans">
      {/* Background Vertical Hairline Grid Pattern across 7 columns (design.md §5) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-grid-lines opacity-75"
        aria-hidden="true"
      />

      {/* Main Content Container with max-w-[1000px] desktop constraint */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Navigation Bar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenContact={() => setContactOpen(true)}
        />

        <main className="flex-1">
          {/* ==================== HOME PAGE ==================== */}
          {currentPage === 'home' && (
            <div>
              {/* Hero Section */}
              <Hero
                onSeeWork={() => {
                  const el = document.getElementById('featured-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onGetInTouch={() => setContactOpen(true)}
              />

              {/* Client Logos Strip */}
              <ClientLogos />

              {/* Three Category Cards (Video, Graphic Design, Web) */}
              <HomeCategoryCards onSelectCategory={navigateTo} />

              {/* Highlight Reel / Featured Projects */}
              <div id="featured-section">
                <FeaturedWork
                  projects={PROJECTS}
                  onSelectProject={handleSelectProject}
                  onViewAll={() => navigateTo('video')}
                />
              </div>

              {/* Call-to-Action Banner */}
              <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-[1000px] mx-auto text-center">
                <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[12px] p-8 sm:p-12 shadow-card-subtle relative overflow-hidden">
                  <div className="max-w-xl mx-auto space-y-4">
                    <h2 className="text-[28px] sm:text-[36px] font-bold text-[#262626] tracking-tight">
                      Ready to build something unforgettable?
                    </h2>
                    <p className="text-[15px] text-[#5C5C5C] leading-relaxed">
                      Whether you need a cinematic real estate walkthrough, a ground-up brand system, or a conversion-focused web presence, we're ready to partner with you.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => setContactOpen(true)}
                        className="w-full sm:w-auto px-6 py-3 text-[14px] font-semibold text-[#FFFFFF] bg-[#FF4C00] rounded-[10px] shadow-btn-primary hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2"
                      >
                        <span>Start a Conversation</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigateTo('video')}
                        className="w-full sm:w-auto px-6 py-3 text-[14px] font-medium text-[#262626] bg-[#EFEFEF] rounded-[8px] hover:bg-[#E5E5E5] transition-colors"
                      >
                        Browse Video Archives
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ==================== VIDEO PAGE ==================== */}
          {currentPage === 'video' && (
            <div className="py-8 sm:py-12">
              <ProjectGrid
                projects={videoProjects}
                type="video"
                title="Video that tells the story."
                subtitle="From real estate walkthroughs to full brand films, we produce video content across every format your business needs."
                categories={VIDEO_CATEGORIES}
                initialCategory={activeCategoryFilter}
                onSelectProject={handleSelectProject}
              />
            </div>
          )}

          {/* ==================== GRAPHIC DESIGN PAGE ==================== */}
          {currentPage === 'graphic' && (
            <div className="py-8 sm:py-12">
              <ProjectGrid
                projects={graphicProjects}
                type="graphic"
                title="Design that does the talking."
                subtitle="Branding, print, and social graphics crafted for clients who want to be remembered."
                categories={GRAPHIC_CATEGORIES}
                initialCategory={activeCategoryFilter}
                onSelectProject={handleSelectProject}
              />
            </div>
          )}

          {/* ==================== WEB PAGE ==================== */}
          {currentPage === 'web' && (
            <div className="py-8 sm:py-12">
              <ProjectGrid
                projects={webProjects}
                type="web"
                title="Websites built to convert."
                subtitle="From healthcare practices to hospitality brands, we design and build websites that are fast, clean, and easy to manage."
                categories={WEB_CATEGORIES}
                initialCategory={activeCategoryFilter}
                onSelectProject={handleSelectProject}
              />
            </div>
          )}

          {/* ==================== DETAIL PAGE ==================== */}
          {currentPage === 'detail' && selectedProject && (
            <ProjectDetail
              project={selectedProject}
              onBack={handleBackFromDetail}
              onSelectProject={handleSelectProject}
              relatedProjects={relatedProjects}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          onNavigate={navigateTo}
          onOpenContact={() => setContactOpen(true)}
        />
      </div>

      {/* Contact & Project Inquiry Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
