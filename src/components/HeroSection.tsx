'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cinzel_Decorative } from 'next/font/google';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  ArrowDown,
  Sparkles,
  Mail,
  MapPin,
  CheckCircle2,
  Globe,
  Database,
  Bot,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';

const cinzel = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Interactive Code Snippets for IDE Tabs
const CODE_SNIPPETS = {
  stack: {
    filename: 'ahmed_stack.ts',
    code: `// Senior Full Stack Engineer & System Architect
const developer = {
  name: 'Ahmed Hossam',
  role: 'Full Stack Engineer',
  location: 'Cairo, Egypt',
  coreTech: ['Next.js 15', 'Node.js', 'NestJS', 'TypeScript'],
  realtime: ['Socket.IO', 'Redis Pub/Sub', 'WebSockets'],
  aiPipeline: ['LangChain', 'RAG Engine', 'Vector DBs'],
  status: 'Ready for High-Impact Projects'
};`,
  },
  backend: {
    filename: 'backend_api.ts',
    code: `// High-Performance Microservice Architecture
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  await app.listen(4000);
  console.log('🚀 API Running on Port 4000');
}
bootstrap();`,
  },
  ai: {
    filename: 'ai_rag_pipeline.py',
    code: `# AI & Vector Embeddings Integration
from langchain.vectorstores import PGVector
from langchain.embeddings import OpenAIEmbeddings

def query_knowledge_base(user_prompt: str):
    embeddings = OpenAIEmbeddings()
    vector_store = PGVector(embedding_function=embeddings)
    return vector_store.similarity_search(user_prompt, k=4)`,
  },
};

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'stack' | 'backend' | 'ai'>('stack');
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatCardRef = useRef<HTMLDivElement>(null);
  const codeContentRef = useRef<HTMLPreElement>(null);

  // Animate Code Terminal Content Switch
  useEffect(() => {
    if (codeContentRef.current) {
      gsap.fromTo(
        codeContentRef.current,
        { opacity: 0, y: 10, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTl
        .fromTo(
          '.hero-badge',
          { opacity: 0, y: -20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.1 }
        )
        .fromTo(
          '.hero-name-heading',
          { opacity: 0, y: 30, ...(isMobile ? {} : { filter: 'blur(12px)', scale: 0.95 }) },
          { opacity: 1, y: 0, scale: 1, ...(isMobile ? {} : { filter: 'blur(0px)' }), duration: 1, ease: 'power4.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-headline',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo(
          statsRef.current ? Array.from(statsRef.current.children) : [],
          { opacity: 0, y: 25, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
          '-=0.4'
        )
        .fromTo(
          floatCardRef.current,
          { opacity: 0, x: 50, scale: 0.9, rotateY: 15, transformPerspective: 1000 },
          { opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 1, ease: 'power4.out' },
          '-=1'
        );

      // Count-Up Stat Numbers
      const statValues = document.querySelectorAll('.stat-number');
      statValues.forEach((statEl) => {
        const targetVal = statEl.getAttribute('data-target');
        if (targetVal) {
          const num = parseInt(targetVal, 10);
          if (!isNaN(num)) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: num,
              duration: 2,
              ease: 'power2.out',
              delay: 0.8,
              onUpdate: () => {
                statEl.textContent = `${Math.floor(obj.val)}+`;
              },
            });
          }
        }
      });

      // Floating Ambient Icon Animation
      gsap.to('.hero-float-icon', {
        y: '-=12',
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.easeInOut',
        stagger: 0.35,
      });

      // Scroll Out Parallax Scale
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
        opacity: 0.15,
        scale: 0.95,
        y: 80,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3D Interactive Mouse Parallax Tilt for IDE Card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!floatCardRef.current || window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = floatCardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = (clientX - centerX) / (width / 2);
    const moveY = (clientY - centerY) / (height / 2);

    gsap.to(floatCardRef.current, {
      rotateY: moveX * 12,
      rotateX: -moveY * 12,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!floatCardRef.current) return;
    gsap.to(floatCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative min-h-screen flex items-center justify-center pt-14 sm:pt-28 md:pt-32 pb-10 sm:pb-16 overflow-hidden bg-grid-pattern radial-glow-top ${cinzel.variable}`}
    >
      {/* Ambient Glow Lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-1 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Bio */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Availability Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-mono tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">AVAILABLE FOR NEW PROJECTS</span>
              <span className="text-gray-500">•</span>
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cairo, Egypt</span>
            </div>

            {/* Main Brand Title - AHMED HOSSAM */}
            <div className="space-y-1">
              <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-2 font-bold">
                <span>HI, I AM</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>

              <h1
                style={{ fontFamily: 'var(--font-cinzel), serif' }}
                className="hero-name-heading text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none drop-shadow-[0_0_50px_rgba(6,182,212,0.35)]"
              >
                AHMED <br />
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-200 bg-clip-text text-transparent">
                  HOSSAM
                </span>
              </h1>
            </div>

            {/* Sub-Headline */}
            <h2 className="hero-headline text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-100 tracking-tight leading-snug">
              Full Stack Engineer &{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">
                Crafting Scalable Digital Architecture
              </span>
            </h2>

            {/* Brief Bio Summary */}
            <p
              ref={subtitleRef}
              className="text-sm sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-light"
            >
              {PERSONAL_INFO.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <a
                href="#projects"
                className="hero-cta group flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 hover:from-cyan-300 hover:to-emerald-300 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] hover:scale-[1.03]"
              >
                <span>View Pinned Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="hero-cta flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white glass-panel glass-panel-hover border border-white/15 hover:border-cyan-500/50 shadow-lg"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </a>

              <div className="hero-cta flex items-center gap-2.5 pl-1">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl glass-panel text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-105 transition-all shadow-md"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl glass-panel text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-105 transition-all shadow-md"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5 border-t border-white/10"
            >
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-white/10 space-y-1 hover:border-cyan-500/30 transition-all">
                  <div
                    className="stat-number text-xl sm:text-3xl font-extrabold text-cyan-400 font-mono tracking-tight"
                    data-target={stat.value.replace('+', '')}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-400 font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 3D Interactive IDE Code Terminal Window */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div
              ref={floatCardRef}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-lg glass-panel p-4 sm:p-6 rounded-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-shadow duration-300"
            >
              {/* Outer Decorative Neon Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-emerald-500/30 opacity-60 blur-2xl pointer-events-none" />

              <div className="relative space-y-4">
                {/* Code Window Header & Interactive File Switcher Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  {/* macOS Window Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-3 h-3 rounded-full bg-red-500/90 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                    <span className="w-3 h-3 rounded-full bg-green-500/90 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  </div>

                  {/* Interactive File Switcher Tabs */}
                  <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full">
                    {(['stack', 'backend', 'ai'] as const).map((tabKey) => (
                      <button
                        key={tabKey}
                        onClick={() => setActiveTab(tabKey)}
                        className={`px-2 py-1 text-[10px] sm:text-[11px] font-mono rounded-lg transition-all shrink-0 ${
                          activeTab === tabKey
                            ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-sm font-bold'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {CODE_SNIPPETS[tabKey].filename}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tech Highlights Code Snippet Window */}
                <div className="relative font-mono text-[10px] sm:text-xs text-gray-200 bg-[#07090e]/95 p-3.5 sm:p-5 rounded-2xl border border-white/10 leading-relaxed shadow-inner">
                  {/* Dedicated Status Header Bar to prevent overlap on mobile */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold truncate">
                      {CODE_SNIPPETS[activeTab].filename}
                    </span>
                    <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>SYSTEM ONLINE</span>
                    </div>
                  </div>

                  <pre ref={codeContentRef} className="whitespace-pre-wrap break-words font-mono leading-relaxed text-[10px] sm:text-xs">
                    {CODE_SNIPPETS[activeTab].code}
                  </pre>
                </div>

                {/* Interactive Floating Tech Capability Badges */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                  <div className="hero-float-icon glass-panel p-2.5 sm:p-3 rounded-2xl text-center flex flex-col items-center justify-center gap-1 border border-cyan-500/30 hover:border-cyan-400 transition-colors shadow-md">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-200 font-bold">Next.js 15</span>
                  </div>

                  <div className="hero-float-icon glass-panel p-2.5 sm:p-3 rounded-2xl text-center flex flex-col items-center justify-center gap-1 border border-violet-500/30 hover:border-violet-400 transition-colors shadow-md">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-200 font-bold">Node / Nest</span>
                  </div>

                  <div className="hero-float-icon glass-panel p-2.5 sm:p-3 rounded-2xl text-center flex flex-col items-center justify-center gap-1 border border-emerald-500/30 hover:border-emerald-400 transition-colors shadow-md">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-200 font-bold">AI / RAG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
