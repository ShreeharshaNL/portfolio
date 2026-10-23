import { PersonalInfo, ProjectItem, SkillGroup, EducationItem, AchievementItem } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Shreeharsha N. L.",
  role: "Software Engineering Student & Full-Stack Developer",
  institution: "The National Institute of Engineering (NIE), Mysuru",
  degree: "Bachelor of Engineering (B.E.) in Information Science and Engineering",
  expectedGraduation: "2027",
  cgpa: "8.65",
  location: "Mysuru, Karnataka, India",
  eyebrow: "Information Science & Engineering · NIE Mysuru",
  headline: "I build software that solves real problems.",
  bio: "Undergraduate engineer at NIE Mysuru focused on full-stack web development, applied machine learning, and clean software architecture.",
  aboutText: [
    "I am an Information Science and Engineering undergraduate at The National Institute of Engineering (NIE), Mysuru (Graduation: 2027). I enjoy building software that solves concrete problems — from natural-language legal query systems to computer-vision food analysis.",
    "My focus is on understanding software systems end-to-end: building fast, accessible user interfaces, architecting resilient REST APIs, and leveraging modern serverless and edge cloud infrastructure.",
    "I believe in learning through practical implementation, writing maintainable code, and exploring how modern AI and computer vision can be integrated thoughtfully into daily applications.",
  ],
  social: {
    github: "https://github.com/ShreeharshaNL",
    linkedin: "https://www.linkedin.com/in/shreeharsha-n-l-273101239",
    email: "shreeharsha2027@gmail.com",
    resumeUrl: null, // Place resume.pdf in apps/professional/public/ and set to "/resume.pdf"
  },
};

export const projectsData: ProjectItem[] = [
  {
    id: "legallens",
    title: "LegalLens",
    category: "AI & Legal Technology",
    description: "A hybrid legal-awareness system that maps natural-language legal queries to relevant legal domains, issues, and Indian statutory sections using curated knowledge and deterministic matching logic.",
    highlights: [
      "Hybrid cosine similarity pipeline with rule-based domain classification",
      "Multilingual query pipeline evaluated across English, Hindi, and Kannada",
      "Structured legal awareness recommendations separating information from formal legal counsel",
    ],
    technologies: ["Python", "Cosine Similarity", "NLP", "FastAPI", "React"],
    projectUrl: "https://github.com/yogeshs1717/hybrid-ai-powered-legal-awareness-system",
    githubUrl: "https://github.com/yogeshs1717/hybrid-ai-powered-legal-awareness-system",
    image: "/images/projects/legallens.png",
  },
  {
    id: "labelwise",
    title: "LabelWise",
    category: "Computer Vision & Health Tech",
    description: "An AI-powered web application that analyzes packaged food ingredient labels using Google Vision OCR to flag harmful additives and simplify complex nutritional data for consumers.",
    highlights: [
      "Automated optical character recognition via Google Vision OCR",
      "Rule-based additive and allergen health risk classification",
      "Won NeoNexus 36.1 Hackathon at BITM Ballari (Team Code4Care)",
    ],
    achievement: "Winner — NeoNexus 36.1 Hackathon (Team Code4Care)",
    technologies: ["Google Vision OCR", "Python", "React", "Node.js", "REST APIs"],
    projectUrl: "https://code4-care-8zc2.vercel.app/",
    demoUrl: "https://code4-care-8zc2.vercel.app/",
    githubUrl: "https://github.com/ShreeharshaNL",
    image: "/images/projects/labelwise.png",
  },
  {
    id: "freelance-platform",
    title: "Student Freelancing Platform",
    category: "Full-Stack Web Application",
    description: "A collaborative web platform connecting student developers and designers with campus freelance projects, gig postings, and verified student portfolios.",
    highlights: [
      "Role-based authentication and peer skill matching directory",
      "Project application workflow and student portfolio showcase",
      "Responsive interface engineered for desktop and mobile devices",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS"],
    projectUrl: "https://student-freelance-platform.vercel.app/",
    demoUrl: "https://student-freelance-platform.vercel.app/",
    githubUrl: "https://github.com/ShreeharshaNL",
    image: "/images/projects/freelance.png",
  },
];

export const skillsGroups: SkillGroup[] = [
  {
    category: "Programming Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Frontend Development",
    items: ["React", "HTML5", "CSS3 / Tailwind CSS", "Responsive Design", "Vite"],
  },
  {
    category: "Backend & APIs",
    items: ["Node.js", "Express", "Flask", "FastAPI", "RESTful APIs"],
  },
  {
    category: "Databases & Storage",
    items: ["MySQL", "MongoDB", "Cloudflare D1 (SQLite)"],
  },
  {
    category: "AI & Core Engineering",
    items: ["Google Vision OCR", "Cosine Similarity", "NLP Pipelines", "Data Structures", "Algorithms"],
  },
  {
    category: "Tools & Cloud Systems",
    items: ["Git", "GitHub", "Cloudflare Pages", "VS Code", "Postman", "Linux"],
  },
];

export const educationData: EducationItem = {
  institution: "The National Institute of Engineering (NIE), Mysuru",
  degree: "Bachelor of Engineering (B.E.)",
  field: "Information Science and Engineering",
  expectedGraduation: "2027",
  cgpa: "8.65",
  location: "Mysuru, Karnataka, India",
  highlights: [
    "Consistent academic record with a cumulative GPA of 8.65/10.0",
    "Focus on data structures, algorithms, operating systems, and database management",
    "Active hackathon participant and technical team collaborator",
  ],
};

export const achievementData: AchievementItem = {
  title: "Hackathon Winner — NeoNexus 36.1",
  event: "NeoNexus 36.1 Hackathon",
  project: "LabelWise",
  team: "Team Code4Care",
  year: "2026",
  description: "Led development of LabelWise, building the optical character recognition pipeline with Google Vision API to evaluate food additive safety under strict 36-hour hackathon constraints at NIE Mysuru.",
};

export const crossLinkConfig = {
  minecraftUrl: "https://minecraft.shreeharsha.online",
  label: "Minecraft Interactive Edition",
  description: "Looking for an interactive experience? Explore my Minecraft-themed pixel-art portfolio with biome switching, sound effects, and diamond mining.",
};
