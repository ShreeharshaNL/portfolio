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
  headline: "Building software for real-world impact and utility.",
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
    resumeUrl: "https://resume.shreeharsha.online",
  },
};

export const projectsData: ProjectItem[] = [
  {
    id: "legallens",
    title: "LegalLens",
    subdomain: "legallens.shreeharsha.online",
    category: "AI & Legal Technology",
    description: "AI legal document analysis and clause breakdown assistant. Maps natural-language legal queries to relevant legal domains, issues, and statutory sections using deterministic classification and similarity retrieval.",
    highlights: [
      "Deterministic domain classification paired with cosine similarity matching",
      "Multilingual query pipeline evaluated across English, Hindi, and Kannada",
      "Structured statutory clause breakdown and legal awareness guidance",
    ],
    technologies: ["Python", "FastAPI", "NLP", "Cosine Similarity", "React"],
    projectUrl: "https://legallens.shreeharsha.online",
    demoUrl: "https://legallens.shreeharsha.online",
    githubUrl: "https://github.com/yogeshs1717/hybrid-ai-powered-legal-awareness-system",
    image: "/images/projects/legallens.png",
  },
  {
    id: "labelwise",
    title: "LabelWise",
    subdomain: "labelwise.shreeharsha.online",
    category: "Computer Vision & Health Tech",
    description: "OCR-powered food ingredient analyzer built with team Code4Care (NeoNexus 36.1 Winner). Analyzes packaged food ingredient labels using Google Vision OCR to flag harmful additives and simplify complex nutritional data.",
    highlights: [
      "Optical character recognition pipeline utilizing Google Vision OCR",
      "Automated food additive, allergen, and chemical risk classification",
      "Won NeoNexus 36.1 Hackathon at BITM Ballari with team Code4Care",
    ],
    achievement: "Winner — NeoNexus 36.1 (BITM Ballari)",
    technologies: ["Google Vision OCR", "Python", "React", "Node.js", "REST APIs"],
    projectUrl: "https://labelwise.shreeharsha.online",
    demoUrl: "https://labelwise.shreeharsha.online",
    githubUrl: "https://github.com/ShreeharshaNL",
    image: "/images/projects/labelwise.png",
  },
  {
    id: "scfp",
    title: "Student-Centric Freelancing Platform",
    subdomain: "scfp.shreeharsha.online",
    category: "Full-Stack Web Marketplace",
    description: "Full-stack marketplace connecting students with freelance gigs using JWT authentication. Features campus gig discovery, verified student developer portfolios, and role-based matchmaking.",
    highlights: [
      "Role-based access control and secure JWT authentication pipeline",
      "Campus gig discovery, matchmaking directory, and proposal submissions",
      "Student portfolio showcase and project milestone tracking",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "JWT", "Tailwind CSS"],
    projectUrl: "https://scfp.shreeharsha.online",
    demoUrl: "https://scfp.shreeharsha.online",
    githubUrl: "https://github.com/ShreeharshaNL",
    image: "/images/projects/freelance.png",
  },
  {
    id: "post-your-cat",
    title: "Post Your Cat",
    subdomain: "post-your-cat.shreeharsha.online",
    category: "Community Web Application",
    description: "Community web application for sharing and browsing cat photos. Provides a responsive social photo feed, image upload handling, and interactive community engagement.",
    highlights: [
      "Community-driven photo sharing feed with dynamic responsive layouts",
      "Optimized client-side image preview and upload workflows",
      "Lightweight interactive reactions and browsing interface",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    projectUrl: "https://post-your-cat.shreeharsha.online",
    demoUrl: "https://post-your-cat.shreeharsha.online",
    githubUrl: "https://github.com/ShreeharshaNL",
    image: "/images/projects/post-your-cat.jpg",
  },
  {
    id: "blog",
    title: "Blog",
    subdomain: "blog.shreeharsha.online",
    category: "Technical Writing & Engineering",
    description: "Technical writing, engineering notes, and project logs. Covers software architecture, serverless systems, full-stack development patterns, and hackathon retrospectives.",
    highlights: [
      "Articles on full-stack web development and Cloudflare edge systems",
      "Architectural deep dives into applied OCR and NLP pipelines",
      "Project devlogs, implementation retrospectives, and technical notes",
    ],
    technologies: ["Markdown", "Technical Writing", "Web Architecture"],
    projectUrl: "https://blog.shreeharsha.online",
    demoUrl: "https://blog.shreeharsha.online",
    githubUrl: "https://github.com/ShreeharshaNL",
    image: "/images/projects/blog.jpg",
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
    "Consistent academic standing with a cumulative GPA of 8.65 / 10.0",
    "Focus on data structures, algorithms, operating systems, and database systems",
    "Active hackathon competitor and technical team collaborator",
  ],
};

export const achievementData: AchievementItem = {
  title: "Hackathon Winner — NeoNexus 36.1",
  event: "NeoNexus 36.1 Hackathon at BITM Ballari",
  project: "LabelWise",
  team: "Team Code4Care",
  year: "2026",
  description: "Led development of LabelWise with Team Code4Care at BITM Ballari, building the optical character recognition pipeline with Google Vision API to evaluate food additive safety under strict 36-hour hackathon constraints.",
};

export const crossLinkConfig = {
  minecraftUrl: "https://minecraft.shreeharsha.online",
  label: "Minecraft Interactive Edition",
  description: "Looking for an interactive version? Explore my Minecraft-themed pixel-art portfolio with biome atmospheres, sound effects, and diamond mining.",
};
