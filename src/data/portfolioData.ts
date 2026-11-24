export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlight: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
  badge?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; featured?: boolean }[];
}

export const PERSONAL_INFO = {
  name: 'Ahmed Hossam',
  title: 'Full Stack Developer',
  subtitle: 'Crafting High-Performance Scalable Web Applications & Real-Time AI Systems',
  email: 'ahmedhossam1691977@gmail.com',
  phone: '+20 01003241993',
  location: 'Cairo, Egypt',
  linkedin: 'https://linkedin.com/in/ahmed-hossam-32346a251',
  github: 'https://github.com/AhmedHossam1691977',
  bio: 'Full Stack Engineer specializing in modern Next.js frontends, scalable Node.js/NestJS backends, real-time Socket.IO architectures, and cutting-edge LLM/RAG AI integrations. Dedicated to building smooth, robust, and impactful digital experiences.',
  stats: [
    { label: 'Years Experience', value: '2+' },
    { label: 'Production Projects', value: '6+' },
    { label: 'Published App', value: 'Google Play' },
    { label: 'Tech Stack Mastery', value: '15+' },
  ],
};

export const EDUCATION = {
  degree: 'Bachelor’s Degree in Computer Science',
  institution: 'Al-Obour Higher Institute',
  period: '2020 – 2024',
};

export const INTERNSHIP = {
  title: 'Full Stack Developer Using MEARN Stack',
  institution: 'Information Technology Institute (ITI), Zagazig Branch',
  period: 'July 2025 – December 2025',
  program: 'Intensive Training Program',
  points: [
    'React.js, Angular, Node.js, Express.js, and MongoDB.',
    'Building Full Stack Web Applications.',
    'RESTful APIs and Authentication.',
    'Git, Postman, and Agile Methodologies.',
  ],
};

export const COURSES = [
  {
    title: 'Front-End Developer',
    institution: 'Route Academy',
    period: 'May 2023 – September 2023',
    badge: 'Frontend Track',
  },
  {
    title: 'Back-End Developer',
    institution: 'Route Academy',
    period: 'October 2023 – March 2024',
    badge: 'Backend Track',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'anmka',
    role: 'Full Stack Developer',
    company: 'ANMKA',
    period: '4/2026 – 7/2026',
    location: 'Cairo, Egypt',
    badge: 'Latest Role',
    description: [
      'Engineered responsive web applications and robust full-stack features using Next.js and Node.js microservices.',
      'Optimized backend API performance, reducing latency and enhancing database indexing for production workloads.',
      'Collaborated on modern UI component architecture, state management, and seamless third-party integrations.',
    ],
    techStack: ['Next.js', 'React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    id: 'amb',
    role: 'Backend Developer',
    company: 'AMB / PAMB App',
    period: '9/2025 – 4/2026',
    location: 'Cairo, Egypt',
    badge: 'Mobile Backend Specialist',
    description: [
      'Architected and implemented scalable RESTful APIs and real-time backend microservices powering the AMB / PAMB ecosystem.',
      'Integrated secure JWT authentication, RBAC authorization, and high-concurrency database queries.',
      'Developed real-time push notification & alert telemetry systems serving thousands of active users.',
    ],
    techStack: ['NestJS', 'Node.js', 'Express', 'Socket.IO', 'MongoDB', 'JWT / RBAC', 'Docker'],
  },
  {
    id: 'akm',
    role: 'Full Stack Developer',
    company: 'AKM E-Commerce System',
    period: '8/2024 – 5/2025',
    location: 'Cairo, Egypt',
    badge: 'E-Commerce Architecture',
    description: [
      'Built a complete multi-vendor e-commerce platform with automated payment gateways and inventory management.',
      'Designed complex MySQL database schemas with Prisma ORM for efficient order processing and real-time stock sync.',
      'Integrated modern React frontend dashboards with real-time analytics and dynamic product search filtering.',
    ],
    techStack: ['React.js', 'Node.js', 'Express', 'MySQL', 'Prisma', 'Tailwind CSS', 'REST API'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'sphinx',
    number: '01',
    title: 'Sphinx — Beauty E-Commerce',
    category: 'Full Stack Platform',
    description: 'High-end luxury E-Commerce platform for beauty & skin care products built with Next.js, Node.js, and MySQL.',
    longDescription: 'Sphinx is a modern full-stack e-commerce ecosystem featuring server-side rendering for optimal SEO, dynamic catalog search, secure payment integration, and a rich dark glassmorphic shopping experience.',
    image: '/images/projects/sphinx.png',
    tags: ['Next.js', 'Node.js', 'MySQL', 'Prisma', 'Tailwind CSS', 'JWT'],
    metrics: ['Sub-second SSR page loads', 'Automated checkout pipeline', 'Dynamic search & filters'],
    liveUrl: 'https://sphinx-one.anmka.com/',
    githubUrl: 'https://github.com/AhmedHossam1691977',
    highlight: 'Full-Stack SSR & Order Management',
  },
  {
    id: 'mathapex',
    number: '02',
    title: 'MathApex Academy',
    category: 'E-Learning Platform',
    description: 'Interactive STEM & Mathematics learning platform offering structured video courses, interactive quizzes, and student analytics.',
    longDescription: 'MathApex Academy empowers students with interactive math problem solving, live course tracking, instructor portals, and high-concurrency quiz evaluations built with React and Node.js.',
    image: '/images/projects/mathapex.png',
    tags: ['React.js', 'Next.js', 'TypeScript', 'Express', 'MongoDB', 'Tailwind CSS'],
    metrics: ['Interactive quiz engine', 'Progress tracking dashboard', 'Instructor video portal'],
    liveUrl: 'https://mathapex-academy.e.anmka.com/',
    githubUrl: 'https://github.com/AhmedHossam1691977',
    highlight: 'Real-time Student Evaluation Dashboard',
  },
  {
    id: 'english-master',
    number: '03',
    title: 'English Master',
    category: 'Language E-Learning',
    description: 'Comprehensive language learning platform with interactive lesson modules, audio wave playback, and speech practice tools.',
    longDescription: 'Designed to deliver an immersive English learning environment with gamified lesson milestones, vocabulary flashcards, and student progress metrics.',
    image: '/images/projects/english.png',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    metrics: ['Audio streaming integration', 'Gamified learning paths', 'Multi-level course content'],
    liveUrl: 'https://english-master.anmka.com/',
    githubUrl: 'https://github.com/AhmedHossam1691977',
    highlight: 'Gamified Audio Learning System',
  },
  {
    id: 'ride-sharing',
    number: '04',
    title: 'Ride-Sharing Backend System',
    category: 'Real-Time Architecture',
    description: 'High-performance real-time backend engine for ride-hailing services using Socket.IO, geolocation indexing, and trip matching.',
    longDescription: 'Architected to handle live driver tracking, dynamic price surge calculations, real-time passenger-driver matching, and socket reconnection resilience under high concurrent loads.',
    image: '/images/projects/ridesharing.png',
    tags: ['Node.js', 'Socket.IO', 'Express', 'Redis', 'MongoDB', 'GeoJSON'],
    metrics: ['Sub-100ms Socket latency', 'Live GPS driver tracking', 'Automated route matching'],
    githubUrl: 'https://github.com/AhmedHossam1691977/ride-sharing-app',
    highlight: 'Low-Latency Socket.IO Driver Engine',
  },
  {
    id: 'ai-coach',
    number: '05',
    title: 'AI Coach (ITI Graduation Project)',
    category: 'AI / LLM Integration',
    description: 'Multi-tenant roleplay training platform utilizing LLMs and RAG pipeline for automated conversational skill coaching.',
    longDescription: 'Award-winning ITI graduation project. Built a multi-tenant AI coaching system where users participate in realistic voice/text roleplay scenarios with custom LLM personas and receive instant granular performance feedback.',
    image: '/images/projects/aicoach.png',
    tags: ['Next.js', 'Python / FastApi', 'Node.js', 'LLM / RAG', 'Multi-tenant', 'PostgreSQL'],
    metrics: ['Multi-tenant organization isolation', 'Instant LLM feedback scoring', 'Custom scenario creation'],
    liveUrl: 'https://ai-coach-lemon-six.vercel.app/#/',
    githubUrl: 'https://github.com/AhmedHossam1691977/roleplay_trainer_api',
    highlight: 'ITI Graduation Project — LLM & RAG Engine',
  },
  {
    id: 'protek-amb',
    number: '06',
    title: 'PROTEK AMB',
    category: 'Mobile & Cloud IoT',
    description: 'Real-time safety monitoring and emergency alert mobile backend application published on the Google Play Store.',
    longDescription: 'PROTEK AMB provides continuous safety tracking, real-time alert broadcasts, and emergency dispatch notifications. Built with high reliability for enterprise deployment.',
    image: '/images/projects/protek.png',
    tags: ['NestJS', 'Node.js', 'MongoDB', 'Socket.IO', 'Google Play Published', 'Docker'],
    metrics: ['Published on Google Play Store', 'Instant emergency pushes', 'Industrial safety dashboard'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.azizalbarik.company.survival',
    githubUrl: 'https://github.com/AhmedHossam1691977',
    highlight: 'Google Play Published — Live Telemetry Engine',
  },
  {
    id: 'falcor',
    number: '07',
    title: "Falcor — Men's Fashion & Accessories",
    category: 'Full Stack E-Commerce',
    description: "Luxury Men's fashion, apparel, and accessories e-commerce store with dynamic catalog, shopping cart, and seamless checkout.",
    longDescription: "Falcor is a premium full-stack men's fashion e-commerce platform offering an opulent dark glassmorphic shopping experience, real-time stock sync, multi-category filters, and responsive checkout.",
    image: '/images/projects/falcor.png',
    tags: ['Next.js', 'Node.js', 'MySQL', 'Prisma', 'Tailwind CSS', 'E-Commerce'],
    metrics: ["Luxury apparel catalog", "Sub-second search & filters", "Automated cart & checkout"],
    liveUrl: 'https://falcor.anmka.com/',
    githubUrl: 'https://github.com/AhmedHossam1691977',
    highlight: "Men's Fashion & Accessories E-Commerce",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Mastery',
    iconName: 'Layout',
    skills: [
      { name: 'React.js', level: 95, featured: true },
      { name: 'Next.js (App Router)', level: 92, featured: true },
      { name: 'Angular', level: 85 },
      { name: 'TypeScript', level: 90, featured: true },
      { name: 'Tailwind CSS', level: 95, featured: true },
      { name: 'GSAP & Animations', level: 88, featured: true },
    ],
  },
  {
    title: 'Backend & Systems',
    iconName: 'Server',
    skills: [
      { name: 'Node.js', level: 95, featured: true },
      { name: 'Express.js', level: 92, featured: true },
      { name: 'NestJS', level: 88, featured: true },
      { name: 'Socket.io (Real-Time)', level: 90, featured: true },
      { name: 'RESTful APIs & GraphQL', level: 92 },
      { name: 'JWT & RBAC Security', level: 90 },
    ],
  },
  {
    title: 'Databases & DevOps',
    iconName: 'Database',
    skills: [
      { name: 'MongoDB', level: 90, featured: true },
      { name: 'PostgreSQL', level: 88, featured: true },
      { name: 'MySQL', level: 90, featured: true },
      { name: 'Prisma ORM', level: 90, featured: true },
      { name: 'Docker', level: 85, featured: true },
      { name: 'AWS (S3, EC2)', level: 82 },
    ],
  },
  {
    title: 'AI & Advanced Arch',
    iconName: 'Cpu',
    skills: [
      { name: 'AI Integration (LLMs & RAG)', level: 88, featured: true },
      { name: 'Multi-Tenant Architecture', level: 85, featured: true },
      { name: 'System Architecture', level: 88 },
      { name: 'Microservices', level: 85 },
    ],
  },
];
