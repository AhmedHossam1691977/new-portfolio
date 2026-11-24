'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
  Code2,
  Braces,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';
import { useApp } from '@/context/AppContext';

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
  const { theme } = useApp();
  const isDark = theme === 'dark';
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

      // Scroll Out Parallax Scale (Desktop only - never on mobile so it stays 100% crisp and bright)
      if (!isMobile) {
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
      }
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
      className={`relative min-h-screen flex items-center justify-center pt-14 sm:pt-28 md:pt-32 pb-24 sm:pb-16 md:pb-20 overflow-hidden bg-grid-pattern radial-glow-top theme-bg ${cinzel.variable}`}
    >
      {/* Ambient Glow Lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-1 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Bio */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Availability Badge */}
            <div className={`hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full glass-panel border shadow-[0_0_20px_rgba(6,182,212,0.15)] text-[11px] sm:text-xs font-mono tracking-wide ${
              isDark ? 'border-cyan-500/30 text-cyan-300' : 'border-cyan-600/30 text-cyan-700 bg-white/80'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">AVAILABLE FOR NEW PROJECTS</span>
              <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>•</span>
              <MapPin className="w-3.5 h-3.5 text-cyan-500" />
              <span className={isDark ? 'text-gray-200' : 'text-slate-700'}>Cairo, Egypt</span>
            </div>

            {/* Main Brand Title - AHMED HOSSAM */}
            <div className="space-y-1">
              <div className={`text-xs font-mono tracking-widest uppercase flex items-center gap-2 font-bold ${
                isDark ? 'text-cyan-400' : 'text-cyan-600'
              }`}>
                <span>HI, I AM</span>
                <Sparkles className="w-4 h-4 text-cyan-500" />
              </div>

              <h1
                style={{ fontFamily: 'var(--font-cinzel), serif' }}
                className={`hero-name-heading text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none drop-shadow-[0_0_50px_rgba(6,182,212,0.35)] ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                AHMED <br />
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-200 bg-clip-text text-transparent">
                  HOSSAM
                </span>
              </h1>
            </div>

            {/* Sub-Headline */}
            <h2 className={`hero-headline text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Full Stack Engineer &{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">
                Crafting Scalable Digital Architecture
              </span>
            </h2>

            {/* Brief Bio Summary */}
            <p
              ref={subtitleRef}
              className={`text-sm sm:text-lg max-w-2xl leading-relaxed font-light ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
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
                className={`hero-cta flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm glass-panel glass-panel-hover border transition-all shadow-lg ${
                  isDark
                    ? 'text-white border-white/15 hover:border-cyan-500/50'
                    : 'text-slate-800 border-slate-300 hover:border-cyan-600 bg-white'
                }`}
              >
                <Mail className="w-4 h-4 text-cyan-500" />
                <span>Contact Me</span>
              </a>

              <div className="hero-cta flex items-center gap-2.5 pl-1">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-xl glass-panel hover:scale-105 transition-all shadow-md ${
                    isDark
                      ? 'text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50'
                      : 'text-slate-700 hover:text-cyan-600 hover:border-cyan-600/50 bg-white'
                  }`}
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-xl glass-panel hover:scale-105 transition-all shadow-md ${
                    isDark
                      ? 'text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50'
                      : 'text-slate-700 hover:text-cyan-600 hover:border-cyan-600/50 bg-white'
                  }`}
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div
              ref={statsRef}
              className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5 border-t ${
                isDark ? 'border-white/10' : 'border-slate-200'
              }`}
            >
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`glass-panel p-3.5 sm:p-4 rounded-2xl border space-y-1 transition-all ${
                    isDark
                      ? 'border-white/10 hover:border-cyan-500/30'
                      : 'border-slate-200 hover:border-cyan-600/40 bg-white/90 shadow-sm'
                  }`}
                >
                  <div
                    className={`stat-number text-xl sm:text-3xl font-extrabold font-mono tracking-tight ${
                      isDark ? 'text-cyan-400' : 'text-cyan-600'
                    }`}
                    data-target={stat.value.replace('+', '')}
                  >
                    {stat.value}
                  </div>
                  <div className={`text-[11px] sm:text-xs font-medium leading-snug ${
                    isDark ? 'text-gray-400' : 'text-slate-600'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Photo + Floating Tech Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div
              ref={floatCardRef}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-md flex flex-col items-center"
            >
              {/* Hero Photo Container */}
              <div className="hero-photo-wrapper relative w-full">
                {/* Ambient glow blobs behind photo */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 ${
                  isDark
                    ? 'bg-gradient-to-br from-cyan-500/25 via-violet-500/20 to-emerald-500/20'
                    : 'bg-gradient-to-br from-cyan-400/20 via-sky-300/20 to-emerald-300/15'
                }`} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-gradient-to-t from-cyan-500/20 to-transparent blur-2xl pointer-events-none" />

                {/* Outer animated gradient ring */}
                <div className={`absolute -inset-1 rounded-3xl hero-photo-ring pointer-events-none ${
                  isDark ? 'opacity-70' : 'opacity-40'
                }`} />

                {/* Photo with glass card frame */}
                <div className={`relative glass-panel rounded-3xl border overflow-hidden p-1 transition-all duration-500 ${
                  isDark
                    ? 'border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)]'
                    : 'border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12)] bg-white/80'
                }`}>
                  <div className="relative rounded-[20px] overflow-hidden min-h-[460px] sm:min-h-[520px] flex items-end justify-center">
                    
                    {/* Rich Studio Backdrop with Cyber & Radial Lighting */}
                    <div className={`absolute inset-0 transition-colors duration-500 ${
                      isDark
                        ? 'bg-gradient-to-b from-[#0b1022] via-[#0e162c] to-[#070b16]'
                        : 'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#f1f5f9]'
                    }`}>
                      {/* Luminous Studio Spotlight right behind head/torso (Crisp, clean, no murky fog) */}
                      <div
                        className={`absolute top-[12%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[340px] h-[300px] sm:h-[340px] rounded-full pointer-events-none transition-opacity duration-500 ${
                          isDark
                            ? 'bg-gradient-to-tr from-cyan-500/30 via-violet-500/25 to-emerald-400/20 blur-[50px] opacity-90'
                            : 'bg-gradient-to-tr from-cyan-200/40 via-sky-100/50 to-indigo-100/30 blur-[40px] opacity-80'
                        }`}
                      />

                      {/* Concentric Cyber Rings (Crisp on desktop, subtle on mobile) */}
                      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                        <div className={`w-64 sm:w-72 h-64 sm:h-72 rounded-full border border-dashed transition-colors duration-500 ${
                          isDark ? 'border-cyan-400/20' : 'border-cyan-500/20'
                        } animate-[spin_60s_linear_infinite]`} />
                        <div className={`absolute w-48 sm:w-52 h-48 sm:h-52 rounded-full border transition-colors duration-500 ${
                          isDark ? 'border-violet-400/20' : 'border-violet-400/15'
                        }`} />
                      </div>

                      {/* Subtle Architectural Dot Grid Pattern */}
                      <div className={`absolute inset-0 bg-grid-pattern transition-opacity duration-500 ${
                        isDark ? 'opacity-35' : 'opacity-15'
                      }`} />
                    </div>

                    {/* Top status bar */}
                    <div className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2.5 bg-gradient-to-b ${
                      isDark ? 'from-black/60 to-transparent' : 'from-white/90 to-transparent'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/90" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/90" />
                      </div>
                      <div className={`flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border ${
                        isDark
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                          : 'text-emerald-700 bg-emerald-50 border-emerald-300 font-bold shadow-sm'
                      }`}>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>AVAILABLE</span>
                      </div>
                    </div>

                    {/* The actual photo - 100% sharp, vivid & crystal clear */}
                    <Image
                      src="/images/ahmed-hero.png"
                      alt="Ahmed Hossam — Full Stack Engineer"
                      width={500}
                      height={600}
                      quality={100}
                      priority
                      className="w-full h-auto object-cover relative z-[1] drop-shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                      style={{ objectPosition: 'top center' }}
                    />

                    {/* Minimal bottom edge blend only (never cover the suit or create fog) */}
                    <div className={`absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t z-[2] pointer-events-none transition-colors duration-500 ${
                      isDark
                        ? 'from-[#070b16]/90 to-transparent'
                        : 'from-white/70 to-transparent'
                    }`} />

                    {/* Bottom info bar over gradient */}
                    <div className="absolute bottom-0 left-0 right-0 z-[3] px-4 pb-4 pt-2">
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md ${
                          isDark
                            ? 'bg-black/50 border-cyan-500/30'
                            : 'bg-white/85 border-slate-200 shadow-sm'
                        }`}>
                          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                          <span className={`text-[11px] font-mono font-bold tracking-wide ${
                            isDark ? 'text-cyan-300' : 'text-slate-800'
                          }`}>
                            ahmed_hossam.dev
                          </span>
                        </div>
                        <div className={`flex items-center gap-1 text-[10px] font-mono px-3 py-1 rounded-full border backdrop-blur-md ${
                          isDark
                            ? 'bg-black/50 border-white/10 text-gray-300'
                            : 'bg-white/85 border-slate-200 text-slate-700 shadow-sm'
                        }`}>
                          <Code2 className="w-3 h-3 text-cyan-500" />
                          <span>Cairo, EG</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Capability Badges around the photo */}
                <div className={`hero-float-icon absolute -left-3 sm:-left-6 top-[20%] p-2 sm:p-2.5 rounded-xl border z-10 transition-all ${
                  isDark
                    ? 'glass-panel border-cyan-500/30 shadow-[0_8px_30px_rgba(6,182,212,0.2)]'
                    : 'bg-white border-cyan-500/40 shadow-lg text-cyan-600'
                }`}>
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                </div>

                <div className={`hero-float-icon absolute -right-3 sm:-right-6 top-[35%] p-2 sm:p-2.5 rounded-xl border z-10 transition-all ${
                  isDark
                    ? 'glass-panel border-violet-500/30 shadow-[0_8px_30px_rgba(139,92,246,0.2)]'
                    : 'bg-white border-violet-500/40 shadow-lg text-violet-600'
                }`}>
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
                </div>

                <div className={`hero-float-icon absolute -left-2 sm:-left-4 bottom-[25%] p-2 sm:p-2.5 rounded-xl border z-10 transition-all ${
                  isDark
                    ? 'glass-panel border-emerald-500/30 shadow-[0_8px_30px_rgba(16,185,129,0.2)]'
                    : 'bg-white border-emerald-500/40 shadow-lg text-emerald-600'
                }`}>
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                </div>

                <div className={`hero-float-icon absolute -right-2 sm:-right-5 bottom-[15%] p-2 sm:p-2.5 rounded-xl border z-10 transition-all ${
                  isDark
                    ? 'glass-panel border-cyan-500/30 shadow-[0_8px_30px_rgba(6,182,212,0.15)]'
                    : 'bg-white border-cyan-500/40 shadow-lg text-cyan-600'
                }`}>
                  <Braces className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                </div>
              </div>

              {/* Mini Code Snippet Bar below photo */}
              <div className={`w-full mt-4 rounded-2xl border p-3 shadow-lg transition-all ${
                isDark
                  ? 'glass-panel border-white/10'
                  : 'bg-white/95 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {(['stack', 'backend', 'ai'] as const).map((tabKey) => (
                      <button
                        key={tabKey}
                        onClick={() => setActiveTab(tabKey)}
                        className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-md transition-all ${
                          activeTab === tabKey
                            ? isDark
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold'
                              : 'bg-cyan-100 text-cyan-800 border border-cyan-300 font-bold'
                            : isDark
                            ? 'text-gray-400 hover:text-gray-200'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {CODE_SNIPPETS[tabKey].filename.replace('.ts', '').replace('.py', '')}
                      </button>
                    ))}
                  </div>
                </div>
                <pre
                  ref={codeContentRef}
                  className={`font-mono text-[9px] sm:text-[10px] leading-relaxed whitespace-pre-wrap break-words max-h-16 overflow-hidden ${
                    isDark ? 'text-gray-300' : 'text-slate-700'
                  }`}
                >
                  {CODE_SNIPPETS[activeTab].code.split('\n').slice(0, 3).join('\n')}
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
