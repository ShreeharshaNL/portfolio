export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  institution: string;
  eyebrow: string;
  headline: string;
  bio: string;
  aboutText: string[];
  social: {
    github: string;
    linkedin: string;
    email: string;
    resumeUrl: string | null;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  achievement?: string;
  technologies: string[];
  projectUrl: string;
  githubUrl?: string | null;
  demoUrl?: string | null;
  accentColor: string;
  image: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationData {
  institution: string;
  degree: string;
  field: string;
  expectedGraduation: string;
  cgpa: string;
  achievement: {
    title: string;
    event: string;
    project: string;
    team: string;
    year: string;
  };
}
