import { PersonalInfo, ProjectItem, SkillGroup, EducationData } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Shreeharsha N. L.",
  role: "Information Science & Engineering Student",
  location: "Mysuru, India",
  institution: "The National Institute of Engineering (NIE), Mysuru",
  eyebrow: "Information Science & Engineering · NIE Mysuru",
  headline: "Building practical web applications and exploring AI solutions.",
  bio: "Undergraduate engineer at NIE Mysuru focused on full-stack development, applied machine learning, and clean software architecture.",
  aboutText: [
    "I'm an Information Science and Engineering student at NIE Mysuru. I enjoy building functional applications that solve real-world problems, ranging from legal awareness tools to consumer health analysis.",
    "My focus is on writing clean, maintainable code and understanding software systems end-to-end — from intuitive, responsive user interfaces to backend APIs and relational databases.",
  ],
  social: {
    github: "https://github.com/ShreeharshaNL",
    linkedin: "https://www.linkedin.com/in/shreeharsha-n-l-273101239",
    email: "shreeharsha2027@gmail.com",
    resumeUrl: null, // Place resume.pdf in public/ and set to "/resume.pdf"
  },
};

export const projectsData: ProjectItem[] = [
  {
    id: "legallens",
    title: "LegalLens",
    category: "AI & Legal Technology",
    description: "A hybrid AI system that maps plain-English legal queries to relevant legal domains, issues, and statutory sections using a curated knowledge pipeline.",
    highlights: [
      "Rule-based classification & cosine similarity matching",
      "Multilingual query pipeline tested in English, Hindi & Kannada",
    ],
    technologies: ["Python", "Cosine Similarity", "NLP", "React", "FastAPI"],
    projectUrl: "https://github.com/yogeshs1717/hybrid-ai-powered-legal-awareness-system",
    githubUrl: "https://github.com/yogeshs1717/hybrid-ai-powered-legal-awareness-system",
    accentColor: "amber",
    image: "/images/projects/legallens.png",
  },
  {
    id: "labelwise",
    title: "LabelWise",
    category: "Computer Vision & Health",
    description: "An AI-powered web app that analyzes packaged food ingredient labels using Google Vision OCR to flag harmful additives and simplify nutritional details.",
    highlights: [
      "Google Vision OCR ingredient detection",
      "Automated health and additive risk analysis",
    ],
    achievement: "Winner — NeoNexus 36.1 Hackathon at NIE Mysuru (Team Code4Care)",
    technologies: ["Google Vision OCR", "Python", "React", "Node.js", "REST APIs"],
    projectUrl: "https://code4-care-8zc2.vercel.app/",
    demoUrl: "https://code4-care-8zc2.vercel.app/",
    githubUrl: "https://github.com/ShreeharshaNL",
    accentColor: "emerald",
    image: "/images/projects/labelwise.png",
  },
  {
    id: "freelance-platform",
    title: "Student Freelancing Platform",
    category: "Full-Stack Web Application",
    description: "A platform concept designed to connect student developers and designers with campus freelance projects, client gigs, and portfolio showcases.",
    highlights: [
      "Peer skill matching & project discovery",
      "Role-based authentication & profile architecture",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS"],
    projectUrl: "https://student-freelance-platform.vercel.app/",
    demoUrl: "https://student-freelance-platform.vercel.app/",
    githubUrl: "https://github.com/ShreeharshaNL",
    accentColor: "sky",
    image: "/images/projects/freelance.png",
  },
];

export const skillsGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    category: "Frontend",
    items: ["React", "HTML5", "CSS3 / Tailwind", "Responsive UI"],
  },
  {
    category: "Backend & APIs",
    items: ["Node.js", "Express", "Flask", "RESTful APIs"],
  },
  {
    category: "Databases",
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "AI & Core Concepts",
    items: ["Google Vision OCR", "Cosine Similarity", "Data Structures", "Algorithms"],
  },
  {
    category: "Developer Tools",
    items: ["Git", "GitHub", "VS Code", "Postman"],
  },
];

export const educationData: EducationData = {
  institution: "The National Institute of Engineering (NIE), Mysuru",
  degree: "Bachelor of Engineering (B.E.)",
  field: "Information Science and Engineering",
  expectedGraduation: "2027",
  cgpa: "8.66",
  achievement: {
    title: "Winner — NeoNexus 36.1",
    event: "NeoNexus 36.1 Hackathon at NIE Mysuru",
    project: "LabelWise",
    team: "Team Code4Care",
    year: "2024",
  },
};
