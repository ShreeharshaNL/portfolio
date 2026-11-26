import { PersonalInfo, ProjectItem, SkillGroup, EducationData } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Shreeharsha N. L.",
  role: "Information Science & Engineering Student",
  location: "Mysuru, India",
  spawnOrigin: {
    place: "Karkala, Karnataka",
    dob: "06 Oct 2005",
    time: "11:50 PM",
    coordinates: "13.21°N, 74.99°E",
  },
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
    resumeUrl: "https://resume.shreeharsha.online",
  },
};

export const projectsData: ProjectItem[] = [
  {
    id: "labelwise",
    title: "LabelWise",
    subdomain: "labelwise.shreeharsha.online",
    category: "Computer Vision & Health",
    description: "An AI-powered web app that analyzes packaged food ingredient labels using Google Vision OCR to flag harmful additives and simplify nutritional details.",
    highlights: [
      "Google Vision OCR ingredient detection",
      "Automated health and additive risk analysis",
    ],
    achievement: "Winner — NeoNexus 36.1 Hackathon at BITM Ballari (Team Code4Care)",
    technologies: ["Google Vision OCR", "Python", "React", "Node.js", "REST APIs"],
    projectUrl: "https://labelwise.shreeharsha.online",
    demoUrl: "https://labelwise.shreeharsha.online",
    githubUrl: "https://github.com/ShreeharshaNL",
    accentColor: "emerald",
    image: "/images/projects/labelwise.png",
  },
  {
    id: "legallens",
    title: "LegalLens",
    subdomain: "legallens.shreeharsha.online",
    category: "AI & Legal Technology",
    description: "A hybrid AI system that maps plain-English legal queries to relevant legal domains, issues, and statutory sections using a curated knowledge pipeline.",
    highlights: [
      "Rule-based classification & cosine similarity matching",
      "Multilingual query pipeline tested in English, Hindi & Kannada",
    ],
    technologies: ["Python", "Cosine Similarity", "NLP", "React", "FastAPI"],
    projectUrl: "https://legallens.shreeharsha.online",
    githubUrl: "https://github.com/yogeshs1717/hybrid-ai-powered-legal-awareness-system",
    accentColor: "amber",
    image: "/images/projects/legallens.png",
  },
  {
    id: "scfp",
    title: "Student-Centric Freelancing Platform",
    subdomain: "scfp.shreeharsha.online",
    category: "Full-Stack Web Application",
    description: "Full-stack marketplace connecting students with freelance gigs using JWT authentication.",
    highlights: [
      "Role-based JWT authentication and access control",
      "Peer skill matching & campus project discovery",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "JWT", "Tailwind CSS"],
    projectUrl: "https://scfp.shreeharsha.online",
    demoUrl: "https://scfp.shreeharsha.online",
    githubUrl: "https://github.com/ShreeharshaNL",
    accentColor: "sky",
    image: "/images/projects/freelance.png",
  },
  {
    id: "post-your-cat",
    title: "Post Your Cat",
    subdomain: "post-your-cat.shreeharsha.online",
    category: "Community Web Application",
    description: "Community web application for sharing and browsing cat photos.",
    highlights: [
      "Community cat photo sharing feed",
      "Responsive photo gallery with interactive reactions",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    projectUrl: "https://post-your-cat.shreeharsha.online",
    demoUrl: "https://post-your-cat.shreeharsha.online",
    githubUrl: "https://github.com/ShreeharshaNL",
    accentColor: "purple",
    image: "/images/projects/freelance.png",
  },
  {
    id: "blog",
    title: "Blog",
    subdomain: "blog.shreeharsha.online",
    category: "Technical Writing",
    description: "Technical writing, engineering notes, and project logs.",
    highlights: [
      "In-depth articles on web development and architecture",
      "Notes on system design and hackathon builds",
    ],
    technologies: ["Markdown", "Technical Writing", "Web Architecture"],
    projectUrl: "https://blog.shreeharsha.online",
    demoUrl: "https://blog.shreeharsha.online",
    githubUrl: "https://github.com/ShreeharshaNL",
    accentColor: "amber",
    image: "/images/projects/legallens.png",
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
  cgpa: "8.65",
  achievement: {
    title: "Winner — NeoNexus 36.1",
    event: "NeoNexus 36.1 Hackathon at BITM Ballari",
    project: "LabelWise",
    team: "Team Code4Care",
    year: "2026",
  },
};
