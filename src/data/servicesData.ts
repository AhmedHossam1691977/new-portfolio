export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'tech' | 'marketing';
  categoryLabel: string;
  badge: string;
  shortDesc: string;
  image: string;
  whatIDo: string[];
  deliverables: string[];
  technologies: string[];
  businessProblems: string[];
}

export const servicesData: ServiceItem[] = [
  // ==========================================
  // CATEGORY A: TECHNOLOGY & DEVELOPMENT (8)
  // ==========================================
  {
    id: 'full-stack-web-development',
    slug: 'full-stack-web-development',
    title: 'Full Stack Web Development',
    category: 'tech',
    categoryLabel: 'Technology & Development',
    badge: 'Core Service',
    shortDesc: 'End-to-end web applications built from scratch, combining robust backend architecture with responsive, reactive frontends.',
    image: '/images/services/full-stack-web-development.svg',
    whatIDo: [
      'Develop modern, responsive user interfaces using React.js and Next.js.',
      'Build scalable backend systems and microservices using Node.js and Express.js.',
      'Connect frontend applications with RESTful APIs and real-time sockets.',
      'Design, integrate, and optimize relational and NoSQL databases.',
      'Implement industry-grade authentication, authorization, and session security.',
      'Deliver battle-tested, high-performance web applications ready for production.'
    ],
    deliverables: [
      'Complete, production-ready full stack web application',
      'Clean, componentized and mobile-responsive frontend',
      'High-throughput backend service with REST API endpoints',
      'Configured database schema with automated migrations',
      'Secure JWT/Session authentication & role-based permissions',
      'Deployment pipeline setup with comprehensive documentation'
    ],
    technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'],
    businessProblems: [
      'Disjointed development teams causing friction between frontend and backend delivery.',
      'Legacy websites lacking responsiveness, mobile adaptability, or modern interactivity.',
      'Slow time-to-market when launching new web products or client portals.'
    ]
  },
  {
    id: 'frontend-development',
    slug: 'frontend-development',
    title: 'Frontend Development',
    category: 'tech',
    categoryLabel: 'Technology & Development',
    badge: 'UI / UX Focused',
    shortDesc: 'Pixel-perfect, fluid user interfaces converted from design prototypes into accessible, lightning-fast web experiences.',
    image: '/images/services/frontend-development.svg',
    whatIDo: [
      'Convert Figma and Adobe XD designs into pixel-perfect responsive web interfaces.',
      'Build modular, reusable React component systems with clean atomic architecture.',
      'Develop interactive, fluid user experiences with GSAP and Framer Motion.',
      'Optimize Core Web Vitals, asset loading speeds, and client-side rendering.',
      'Ensure strict cross-browser and cross-device compatibility (desktop, tablet, mobile).',
      'Integrate frontend state seamlessly with backend REST and GraphQL APIs.'
    ],
    deliverables: [
      'Fully responsive, interactive web pages and dashboards',
      'Reusable, well-documented UI component library',
      'Optimized asset pipeline with sub-second page loads',
      'Complete API client integration with caching and error boundaries',
      'Maintainable, clean TypeScript and Tailwind CSS code'
    ],
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'GSAP', 'HTML5/CSS3', 'Redux / Zustand'],
    businessProblems: [
      'Design prototypes that fail to look or behave identically in actual browsers.',
      'Sluggish interfaces causing bounce rates and poor customer conversion.',
      'Codebases with duplicate UI elements that are difficult to update or maintain.'
    ]
  },
  {
    id: 'backend-api-development',
    slug: 'backend-api-development',
    title: 'Backend & API Development',
    category: 'tech',
    categoryLabel: 'Technology & Development',
    badge: 'High Performance',
    shortDesc: 'Robust RESTful APIs and microservice architectures built for high concurrency, rock-solid security, and data integrity.',
    image: '/images/services/backend-api-development.svg',
    whatIDo: [
      'Design, architect, and deploy clean, predictable RESTful APIs.',
      'Build scalable backend services using Node.js, Express.js, and NestJS.',
      'Implement JWT authentication, refresh tokens, and Role-Based Access Control (RBAC).',
      'Engineer complex business logic, background queues, and data processing workflows.',
      'Integrate third-party APIs, webhooks, and external cloud services.',
      'Enforce input validation, rate limiting, error handling, and OWASP security standards.'
    ],
    deliverables: [
      'Functional, stress-tested backend service repository',
      'Standardized REST endpoints with OpenAPI / Swagger documentation',
      'Robust JWT & RBAC authentication middleware',
      'Relational or NoSQL database connection layer with indexing',
      'Automated error handling, structured logging, and healthcheck monitors'
    ],
    technologies: ['Node.js', 'Express.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'Swagger / Postman'],
    businessProblems: [
      'Fragile backend endpoints that crash or bottleneck under peak traffic.',
      'Unstructured API responses causing confusion across frontend or mobile teams.',
      'Vulnerabilities in data validation, authorization bypasses, or lack of rate limits.'
    ]
  },
  {
    id: 'saas-development',
    slug: 'saas-development',
    title: 'SaaS Development',
    category: 'tech',
    categoryLabel: 'Technology & Development',
    badge: 'Scale Ready',
    shortDesc: 'Multi-tenant Software-as-a-Service platforms engineered for tenant isolation, recurring billing, and scalable growth.',
    image: '/images/services/saas-development.svg',
    whatIDo: [
      'Architect full multi-tenant SaaS platforms from ground up to deployment.',
      'Engineer isolated tenant data partitions and shared database models.',
      'Create comprehensive administrative dashboards and customer management portals.',
      'Implement tiered subscription plans, billing logic, and usage quotas.',
      'Develop granular team permissions and role-based access control.',
      'Integrate real-time notification systems, analytics hooks, and third-party APIs.'
    ],
    deliverables: [
      'Scalable, multi-tenant Software-as-a-Service web platform',
      'Administrative control panel for user, tenant, and billing management',
      'Self-service customer onboarding, workspace switcher, and team invites',
      'Automated subscription tier and license management',
      'Resilient backend infrastructure designed for horizontal scaling'
    ],
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe API', 'Tailwind CSS', 'Docker'],
    businessProblems: [
      'Difficulty monetizing software ideas with secure multi-tenant isolation.',
      'Complex subscription handling, user invitations, and workspace switching.',
      'Lack of clear administrative visibility into platform usage and tenant activity.'
    ]
  },
  {
    id: 'ecommerce-development',
    slug: 'ecommerce-development',
    title: 'E-Commerce Development',
    category: 'tech',
    categoryLabel: 'Technology & Development',
    badge: 'Conversion Focused',
    shortDesc: 'Fast, secure online stores with intuitive catalogs, frictionless checkout funnels, and integrated payment gateways.',
    image: '/images/services/ecommerce-development.svg',
    whatIDo: [
      'Build tailored online storefronts with rich, responsive product experiences.',
      'Develop dynamic product catalogs with multi-level filtering, search, and variants.',
      'Implement frictionless shopping carts, voucher systems, and checkout funnels.',
      'Integrate secure payment gateways (Stripe, PayPal, Paymob, or local providers).',
      'Build complete order management, inventory tracking, and invoice generation systems.',
      'Develop customer account dashboards with order history and tracking updates.'
    ],
    deliverables: [
      'Complete, high-conversion online store with mobile-first checkout',
      'Merchant admin dashboard for products, inventory, and order fulfillment',
      'Integrated payment gateway with webhook verification for completed orders',
      'Customer portal with saved addresses, order status, and digital receipts',
      'Search engine optimized (SEO) product schema and structured metadata'
    ],
    technologies: ['Next.js', 'React.js', 'Node.js', 'MongoDB / PostgreSQL', 'Stripe / Paymob', 'Tailwind CSS', 'Cloudinary'],
    businessProblems: [
      'High shopping cart abandonment rates caused by slow or complex checkout flows.',
      'Inflexible pre-built store templates that limit brand uniqueness and custom workflows.',
      'Stock synchronization issues and lack of real-time order notifications.'
    ]
  },
  {
    id: 'database-design',
    slug: 'database-design',
    title: 'Database Design & Integration',
    category: 'tech',
    categoryLabel: 'Technology & Development',
    badge: 'Data Integrity',
    shortDesc: 'Normalized schemas, indexing strategies, and ORM integrations for reliable data persistence and rapid query performance.',
    image: '/images/services/database-design.svg',
    whatIDo: [
      'Architect robust relational and document database schemas from business requirements.',
      'Model intricate entities, one-to-many, and many-to-many relationships.',
      'Integrate MongoDB, PostgreSQL, and MySQL into Node.js/Next.js backends.',
      'Configure industry-standard ORMs/ODMs including Prisma, Sequelize, and Mongoose.',
      'Optimize query execution plans, design indexes, and resolve slow queries.',
      'Implement data validation, sanitization constraints, and transaction safety.'
    ],
    deliverables: [
      'Normalized Entity Relationship Diagrams (ERD) and architecture blueprints',
      'Production-ready migration scripts and database seeders',
      'Configured Prisma / Mongoose models with strict TypeScript types',
      'Indexed queries with verified execution performance under load',
      'Automated backup guidelines and security connection configurations'
    ],
    technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM', 'Mongoose', 'Redis', 'SQL', 'Database Indexing'],
    businessProblems: [
      'Slow response times caused by unindexed queries and inefficient database joins.',
      'Data corruption or orphaned records stemming from poorly designed relationships.',
      'Rigid database structures that make adding new application features painful.'
    ]
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    title: 'Cloud Deployment & DevOps',
    category: 'tech',
    categoryLabel: 'Technology & Development',
    badge: 'Reliability & Uptime',
    shortDesc: 'Production cloud deployments, containerization, automated CI/CD pipelines, and proactive infrastructure monitoring.',
    image: '/images/services/cloud-devops.svg',
    whatIDo: [
      'Prepare monolithic and microservice web applications for rock-solid production runs.',
      'Deploy applications using AWS services (EC2, S3, RDS, CloudFront), Vercel, or VPS.',
      'Configure secure runtime environments, reverse proxies (Nginx), and SSL certificates.',
      'Containerize applications using Docker and Docker Compose for consistent environments.',
      'Set up automated Continuous Integration / Continuous Deployment (CI/CD) with GitHub Actions.',
      'Monitor application health, server resources, and configure automated log rotation.'
    ],
    deliverables: [
      'Live deployed application operating under custom domain with SSL (HTTPS)',
      'Optimized Dockerfile and docker-compose.yml configuration files',
      'Automated GitHub Actions CI/CD pipeline for instant zero-downtime deployment',
      'Cloud environment variable setup with secret management guidelines',
      'Deployment runbook and troubleshooting operations documentation'
    ],
    technologies: ['Docker', 'AWS (EC2, S3)', 'GitHub Actions', 'Nginx', 'Vercel / VPS', 'Linux / Bash', 'PM2', 'SSL / Let\'s Encrypt'],
    businessProblems: [
      '“Works on my machine” discrepancies between local development and production servers.',
      'Manual, risky deployments that cause downtime or broken user sessions.',
      'Unconfigured servers vulnerable to security breaches or unmonitored crashes.'
    ]
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI Integration & Automation',
    category: 'tech',
    categoryLabel: 'Technology & Development',
    badge: 'Intelligent Systems',
    shortDesc: 'Smart AI capabilities, LLM-powered interfaces, and automated workflow orchestrations that save hours of manual work.',
    image: '/images/services/ai-automation.svg',
    whatIDo: [
      'Integrate AI APIs (OpenAI GPT, Google Gemini, Anthropic Claude) into web applications.',
      'Build domain-specific conversational assistants and AI copilot features.',
      'Develop Retrieval-Augmented Generation (RAG) pipelines for private knowledge bases.',
      'Implement intelligent document processing, text summarization, and data extraction.',
      'Automate repetitive operational business workflows using n8n and custom webhooks.',
      'Design reliable fallback mechanisms, token budgeting, and response caching.'
    ],
    deliverables: [
      'Working AI feature integration within your web application',
      'Domain-adapted chatbot interface with contextual system prompts',
      'End-to-end automated business workflows orchestrated via n8n',
      'Secure API key handling and rate-limiting proxy middleware',
      'User-friendly AI prompt management and testing documentation'
    ],
    technologies: ['OpenAI API', 'Google Gemini API', 'n8n Automation', 'LangChain', 'Vector DBs', 'Node.js', 'REST APIs', 'Python Scripts'],
    businessProblems: [
      'Teams spending hundreds of manual hours on repetitive data entry and customer queries.',
      'Inability to harness private company documentation for instant answers.',
      'Underutilized AI opportunities that competitors are using to deliver faster services.'
    ]
  },

  // ==========================================
  // CATEGORY B: MEDIA, CREATIVE & DIGITAL MARKETING (12)
  // ==========================================
  {
    id: 'media-buying',
    slug: 'media-buying',
    title: 'Media Buying',
    category: 'marketing',
    categoryLabel: 'Media & Marketing',
    badge: 'Data-Driven ROI',
    shortDesc: 'Strategic paid advertising campaigns engineered across Meta, Google, and TikTok to maximize qualified traffic and ROAS.',
    image: '/images/services/media-buying.svg',
    whatIDo: [
      'Plan, architect, and execute paid advertising campaigns across major digital channels.',
      'Define precise target audiences using demographic, interest, and behavioral segmentation.',
      'Research competitor ad strategies, messaging hooks, and market positioning.',
      'Structure campaign hierarchies (Prospecting, Consideration, Retargeting).',
      'Continuously monitor live campaign delivery, budget pacing, and bidding efficiency.',
      'Analyze performance metrics to uncover high-converting ad variations and scale winners.'
    ],
    deliverables: [
      'Full campaign architecture document with structured ad sets and targeting parameters',
      'Audience segmentation matrix and custom/lookalike audience setup',
      'Weekly & monthly campaign performance dashboards with actionable insights',
      'Detailed budget allocation and optimization recommendation reports'
    ],
    technologies: ['Meta Ads Manager', 'Google Ads', 'TikTok Ads Manager', 'Meta Pixel & CAPI', 'Google Analytics 4', 'Looker Studio'],
    businessProblems: [
      'Burning ad budgets on broad audiences without generating tangible leads or sales.',
      'Lack of clear attribution between advertising spend and revenue generated.',
      'Inability to scale winning ad sets without causing ad fatigue or cost spikes.'
    ]
  },
  {
    id: 'content-creation',
    slug: 'content-creation',
    title: 'Content Creation',
    category: 'marketing',
    categoryLabel: 'Media & Marketing',
    badge: 'Engaging & Visual',
    shortDesc: 'Compelling visual and written content designed to stop thumbs, spark conversations, and build loyal brand followings.',
    image: '/images/services/content-creation.svg',
    whatIDo: [
      'Brainstorm and develop high-converting creative content ideas tailored to your niche.',
      'Produce eye-catching social media concepts across carousels, reels, and graphic posts.',
      'Plan balanced content mixes: educational authority, entertaining hooks, and promotional CTAs.',
      'Format and adapt content for platform-specific dynamics (Instagram, LinkedIn, TikTok, X).',
      'Provide creative art direction, visual moodboards, and script frameworks.',
      'Ensure brand identity, tone of voice, and visual aesthetics remain consistent across all posts.'
    ],
    deliverables: [
      'Ready-to-publish creative concepts and formatted social media posts',
      'Content ideation briefs with hooks, body captions, and specific calls-to-action',
      'Organized monthly content calendar with asset delivery dates',
      'Short-form video script outlines (Reels/TikTok) with visual cues'
    ],
    technologies: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva Pro', 'Figma', 'CapCut', 'Notion'],
    businessProblems: [
      'Running out of fresh post ideas and facing creator burnout.',
      'Inconsistent visual presentation that makes the brand look amateurish.',
      'Low audience engagement rates on organic social media channels.'
    ]
  },
  {
    id: 'content-strategy',
    slug: 'content-strategy',
    title: 'Content Strategy',
    category: 'marketing',
    categoryLabel: 'Media & Marketing',
    badge: 'Strategic Vision',
    shortDesc: 'Actionable content frameworks and publishing roadmaps that align daily social output with tangible business objectives.',
    image: '/images/services/content-strategy.svg',
    whatIDo: [
      'Conduct in-depth research on your target audience, their pain points, and consumption habits.',
      'Establish clear, measurable content goals (awareness, community, lead generation, sales).',
      'Develop focused content pillars that position your brand as a recognized industry authority.',
      'Design strategic publishing schedules optimized for peak audience activity.',
      'Analyze trending topics, industry conversations, and content gaps left by competitors.',
      'Map content pieces across the customer journey from discovery to conversion.'
    ],
    deliverables: [
      'Comprehensive brand Content Strategy Document',
      'Defined Content Pillars & Topic Distribution Guidelines',
      'Structured 30-to-90 Day Master Content Calendar',
      'Platform-specific publishing cadence and distribution plan'
    ],
    technologies: ['Notion', 'Google Sheets', 'Miro', 'SEMrush', 'AnswerThePublic', 'Meta Business Suite'],
    businessProblems: [
      'Posting randomly without a clear roadmap or understanding of why content is created.',
      'Disconnect between the marketing team’s posts and the company’s revenue goals.',
      'Inability to sustain long-term publishing momentum.'
    ]
  },
  {
    id: 'social-media-management',
    slug: 'social-media-management',
    title: 'Social Media Management',
    category: 'marketing',
    categoryLabel: 'Media & Marketing',
    badge: 'Reliable Execution',
    shortDesc: 'End-to-end channel operations: scheduling, community moderation, and performance tracking to keep your brand active 24/7.',
    image: '/images/services/social-media-management.svg',
    whatIDo: [
      'Organize and curate all social media assets into structured publishing pipelines.',
      'Schedule and publish posts at optimal times across all active company profiles.',
      'Maintain an active, credible presence with regular updates and story highlights.',
      'Coordinate community engagement by monitoring comments, direct messages, and brand mentions.',
      'Track account health, follower growth, reach trends, and interaction rates.',
      'Prepare comprehensive monthly performance reports with growth recommendations.'
    ],
    deliverables: [
      'Monthly social media management schedule and execution log',
      'Fully scheduled and published content pipeline across platforms',
      'Community moderation protocol and response guidelines',
      'Monthly analytical performance report detailing reach, engagement, and follower growth'
    ],
    technologies: ['Meta Business Suite', 'Buffer', 'Hootsuite', 'Metricool', 'Notion', 'Google Workspace'],
    businessProblems: [
      'Inconsistent posting schedules leading to dead social channels and declining reach.',
      'Customer inquiries and comments going unanswered for days.',
      'Business owners wasting valuable time trying to manage daily social administrative tasks.'
    ]
  },
  {
    id: 'social-media-specialist',
    slug: 'social-media-specialist',
    title: 'Social Media Specialist',
    category: 'marketing',
    categoryLabel: 'Media & Marketing',
    badge: 'Audience Growth',
    shortDesc: 'In-depth platform optimization, algorithm navigation, and growth mechanics to elevate your profiles above competitors.',
    image: '/images/services/social-media-specialist.svg',
    whatIDo: [
      'Analyze specific platform algorithms (Instagram, LinkedIn, TikTok, Facebook) to maximize distribution.',
      'Conduct thorough audits of existing social accounts to identify bottlenecks.',
      'Optimize profile architecture: bios, highlight covers, pinned posts, and conversion links.',
      'Develop platform-native strategies taking advantage of emerging features (e.g., audio trends, collaborative posts).',
      'Monitor audience sentiment, feedback, and emerging micro-communities.',
      'Identify organic growth partnerships, influencer shoutouts, and collaboration opportunities.'
    ],
    deliverables: [
      'Comprehensive Social Media Account Audit & Optimization Plan',
      'Optimized profile copy, bio structuring, and link-in-bio funnel',
      'Platform-specific growth playbook with algorithm best practices',
      'Actionable monthly account growth and engagement review'
    ],
    technologies: ['Instagram Insights', 'LinkedIn Analytics', 'TikTok Analytics', 'SocialBlade', 'CapCut', 'Canva'],
    businessProblems: [
      'Stagnant follower count despite posting consistently.',
      'Social profiles that look unorganized and fail to communicate what the business sells.',
      'Confusion regarding how platform algorithm updates impact organic reach.'
    ]
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'marketing',
    categoryLabel: 'Media & Marketing',
    badge: 'Holistic Growth',
    shortDesc: 'Integrated cross-channel marketing strategies uniting organic content, paid acquisition, and funnel optimization.',
    image: '/images/services/digital-marketing.svg',
    whatIDo: [
      'Develop unified digital marketing roadmaps aligned with business milestones.',
      'Conduct competitor analysis and identify market positioning differentiators.',
      'Plan multi-channel marketing campaigns spanning search, social, and email touchpoints.',
      'Coordinate marketing communications across all digital customer touchpoints.',
      'Analyze omnichannel marketing performance data to identify high-yield conversion paths.',
      'Recommend iterative marketing improvements based on empirical empirical metrics.'
    ],
    deliverables: [
      'Holistic Digital Marketing Strategy Document',
      'Comprehensive Competitor & Market Positioning Breakdown',
      'Integrated Multi-Channel Campaign Execution Plan',
      'Consolidated monthly performance report with strategic adjustments'
    ],
    technologies: ['Google Analytics 4', 'Meta Business Suite', 'Google Ads', 'Mailchimp / Klaviyo', 'SEMrush', 'Notion'],
    businessProblems: [
      'Fragmented marketing efforts where channels operate in silos without synergy.',
      'Lack of a clear overarching strategy leading to wasted time and resources.',
      'Difficulty understanding which digital channel actually drives paying customers.'
    ]
  },
  {
    id: 'performance-marketing',
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    category: 'marketing',
    categoryLabel: 'Media & Marketing',
    badge: 'CPA & ROAS Focused',
    shortDesc: 'Laser-focused, measurable campaigns evaluated on strict financial metrics: CPA, CAC, conversion rates, and ROAS.',
    image: '/images/services/performance-marketing.svg',
    whatIDo: [
      'Plan and engineer measurable performance advertising campaigns with concrete KPIs.',
      'Set up conversion tracking, custom events, and attribution models.',
      'Rigorously track and analyze Cost Per Click (CPC), Click-Through Rate (CTR), CPA, and ROAS.',
      'Execute continuous A/B split testing on ad creatives, hooks, and landing page variants.',
      'Detect underperforming ad variations early and reallocate budget to profitable segments.',
      'Align ad spend directly with customer acquisition cost (CAC) and customer lifetime value (LTV).'
    ],
    deliverables: [
      'Performance Marketing Campaign Plan with defined KPI benchmarks',
      'Conversion tracking implementation audit (Pixel, GTM, CAPI)',
      'A/B Creative & Headline Testing Framework and results log',
      'Performance audit with data-driven budget scaling recommendations'
    ],
    technologies: ['Google Tag Manager', 'Meta Conversions API', 'Google Analytics 4', 'Looker Studio', 'PostHog / Hotjar', 'Meta Ads'],
    businessProblems: [
      'Unclear return on advertising investment (ROI) and inability to calculate true CPA.',
      'Money wasted on poor-converting landing pages and weak creative hooks.',
      'Difficulty justifying marketing expenditures to stakeholders without hard numbers.'
    ]
  },
  {
    id: 'brand-strategy',
    slug: 'brand-strategy',
    title: 'Brand Strategy',
    category: 'marketing',
    categoryLabel: 'Media & Marketing',
    badge: 'Market Identity',
    shortDesc: 'Distinct brand positioning, value propositions, and messaging frameworks that make you memorable and hard to replace.',
    image: '/images/services/brand-strategy.svg',
    whatIDo: [
      'Research industry dynamics and uncover unique brand positioning opportunities.',
      'Define ideal customer personas (ICPs) and map their emotional buying triggers.',
      'Articulate clear brand purpose, core values, mission, and distinct brand voice.',
      'Develop core brand messaging frameworks (taglines, elevator pitches, value propositions).',
      'Establish brand communication guidelines to maintain consistency across customer interactions.',
      'Differentiate your brand narrative from competitors to justify premium pricing.'
    ],
    deliverables: [
      'Brand Strategy & Positioning Blueprint',
      'Target Audience & Buyer Persona Profiles',
      'Comprehensive Brand Messaging Framework (Pitch, Value Props, Tone Guidelines)',
      'Brand Communication Guidelines for internal and external stakeholders'
    ],
    technologies: ['Brand Archetype Frameworks', 'Miro', 'Notion', 'Figma', 'Competitive Matrix Analysis'],
    businessProblems: [
      'Being viewed as a generic commodity forced to compete solely on low prices.',
      'Inconsistent voice and mixed messages across different team members or channels.',
      'Difficulty explaining the company’s unique value proposition concisely.'
    ]
  },
  {
    id: 'copywriting',
    slug: 'copywriting',
    title: 'Copywriting',
    category: 'marketing',
    categoryLabel: 'Media & Marketing',
    badge: 'Words That Sell',
    shortDesc: 'Persuasive, psychologically backed sales copy for landing pages, ad creatives, email sequences, and social media.',
    image: '/images/services/copywriting.svg',
    whatIDo: [
      'Write persuasive, attention-grabbing ad copy tailored for social feeds and search snippets.',
      'Craft high-converting landing page copy, value propositions, and calls-to-action.',
      'Develop engaging social media captions designed to generate comments and shares.',
      'Write targeted email sequences (welcome drips, abandoned cart reminders, sales announcements).',
      'Utilize established direct response frameworks (AIDA, PAS, BAB) to drive action.',
      'Refine tone of voice to sound authentic, authoritative, and relatable to your audience.'
    ],
    deliverables: [
      'Complete Ad Copy Deck with multiple hooks, body angles, and CTA variations',
      'Full Landing Page Copy Wireframe (Hero headline, benefits, proof, FAQ, CTA)',
      'Social Media Caption Bank formatted with relevant hashtags and engagement prompts',
      'Email Marketing Sequence copy ready for implementation'
    ],
    technologies: ['Notion', 'Google Docs', 'Grammarly', 'Hemingway Editor', 'Direct Response Frameworks'],
    businessProblems: [
      'Landing pages with high traffic but dismal conversion rates due to weak copy.',
      'Ad creatives ignored because headlines fail to grab attention within the first 2 seconds.',
      'Corporate, dry text that alienates prospective buyers instead of building trust.'
    ]
  },
  {
    id: 'marketing-analytics',
    slug: 'marketing-analytics',
    title: 'Marketing Analytics',
    category: 'marketing',
    categoryLabel: 'Media & Marketing',
    badge: 'Actionable Data',
    shortDesc: 'Clear visual dashboards, user journey tracking, and data-driven insights that eliminate marketing guesswork.',
    image: '/images/services/marketing-analytics.svg',
    whatIDo: [
      'Audit and configure end-to-end web analytics, event tracking, and conversion funnels.',
      'Build custom real-time dashboards that translate raw data into executive insights.',
      'Track user journey drop-offs, click heatmaps, and on-page engagement behavior.',
      'Analyze traffic sources, channel attribution, and customer acquisition costs.',
      'Synthesize complex metrics into clear, straightforward business recommendations.',
      'Ensure data compliance and accurate server-side event tracking.'
    ],
    deliverables: [
      'Interactive, real-time Marketing Performance Dashboard (Looker Studio / GA4)',
      'Complete Google Analytics 4 & Google Tag Manager configuration',
      'Customer Funnel Drop-off & Conversion Rate Optimization (CRO) Analysis',
      'Monthly Executive Performance Summary with concrete action items'
    ],
    technologies: ['Google Analytics 4', 'Google Tag Manager', 'Looker Studio', 'PostHog / Hotjar', 'Excel / Sheets', 'Meta Pixel & CAPI'],
    businessProblems: [
      'Flying blind without reliable data on what drives sales and what loses money.',
      'Messy analytics setups with double-counted conversions or missing tracking tags.',
      'Drowning in raw numbers without knowing which actions to take next.'
    ]
  }
];
