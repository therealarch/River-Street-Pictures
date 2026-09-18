export type ProjectType = 'video' | 'graphic' | 'web';

export type VideoCategory =
  | 'Real Estate'
  | 'Documentary'
  | 'Social Media Reels'
  | 'Brand Films'
  | 'Commercials'
  | 'Event Coverage'
  | 'Corporate Event';

export type GraphicCategory =
  | 'Branding'
  | 'Print'
  | 'Packaging'
  | 'Social Graphics'
  | 'Editorial'
  | 'Visual Identity';

export type WebCategory =
  | 'Healthcare'
  | 'Hospitality'
  | 'Services'
  | 'Portfolio'
  | 'CV';

export type ProjectCategory = VideoCategory | GraphicCategory | WebCategory | string;

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  type: ProjectType;
  category: ProjectCategory;
  thumbnail: string;
  summary: string;
  description: string;
  featured?: boolean;
  year: string;
  tags?: string[];
  
  // Video specific fields
  videoProvider?: 'youtube' | 'gumlet';
  videoId?: string; // YouTube ID or URL
  gumletAssetId?: string; // Gumlet Asset ID
  duration?: string;
  credits?: ProjectCredit[];
  
  // Graphic specific fields
  gallery?: string[];
  deliverables?: string[];
  
  // Web specific fields
  websiteUrl?: string;
  techStack?: string[];
  previewGif?: string;
  liveUrl?: string;
}

export type PageView = 'home' | 'video' | 'graphic' | 'web' | 'detail';

export interface RouteState {
  page: PageView;
  projectId?: string;
  categoryFilter?: string;
}
