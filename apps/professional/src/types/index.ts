export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  resumeUrl: string | null;
}

export interface PersonalInfo {
  name: string;
  role: string;
  institution: string;
  degree: string;
  expectedGraduation: string;
  cgpa: string;
  location: string;
  eyebrow: string;
  headline: string;
  bio: string;
  aboutText: string[];
  social: SocialLinks;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  achievement?: string;
  technologies: string[];
  projectUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  image: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  expectedGraduation: string;
  cgpa: string;
  location: string;
  highlights: string[];
}

export interface AchievementItem {
  title: string;
  event: string;
  project: string;
  team: string;
  year: string;
  description: string;
}
