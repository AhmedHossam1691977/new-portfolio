'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  Layout,
  Server,
  Database,
  Cpu,
  Terminal,
  Zap,
  Code2,
  Layers,
  Sparkles,
  CheckCircle2,
  Globe,
  Bot,
  Cloud,
  Radio,
  ShieldCheck,
  Workflow,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Technical Marquee Strip Data
const MARQUEE_ROW_1 = [
  { name: 'Next.js 15', category: 'FRONTEND', icon: Globe, color: 'text-cyan-400', border: 'border-cyan-500/30' },
  { name: 'React.js', category: 'FRONTEND', icon: Code2, color: 'text-cyan-300', border: 'border-cyan-400/30' },
  { name: 'TypeScript', category: 'LANGUAGE', icon: Terminal, color: 'text-blue-400', border: 'border-blue-500/30' },
  { name: 'Tailwind CSS', category: 'STYLING', icon: Layout, color: 'text-teal-400', border: 'border-teal-500/30' },
  { name: 'GSAP Animations', category: 'ANIMATIONS', icon: Sparkles, color: 'text-emerald-400', border: 'border-emerald-500/30' },
  { name: 'Angular', category: 'FRONTEND', icon: Layers, color: 'text-red-400', border: 'border-red-500/30' },
  { name: 'State Management', category: 'ARCH', icon: Workflow, color: 'text-violet-400', border: 'border-violet-500/30' },
  { name: 'SSR & SSG', category: 'PERFORMANCE', icon: Zap, color: 'text-amber-400', border: 'border-amber-500/30' },
];

const MARQUEE_ROW_2 = [
  { name: 'Node.js', category: 'BACKEND', icon: Server, color: 'text-emerald-400', border: 'border-emerald-500/30' },
  { name: 'NestJS', category: 'FRAMEWORK', icon: Layers, color: 'text-red-400', border: 'border-red-500/30' },
  { name: 'Socket.IO (Real-Time)', category: 'TELEMETRY', icon: Radio, color: 'text-cyan-400', border: 'border-cyan-500/30' },
  { name: 'Express.js', category: 'BACKEND', icon: Code2, color: 'text-gray-300', border: 'border-white/20' },
  { name: 'PostgreSQL', category: 'DATABASE', icon: Database, color: 'text-blue-400', border: 'border-blue-500/30' },
  { name: 'MongoDB', category: 'DATABASE', icon: Database, color: 'text-emerald-400', border: 'border-emerald-500/30' },
  { name: 'MySQL & Prisma', category: 'ORM', icon: Database, color: 'text-cyan-300', border: 'border-cyan-500/30' },
  { name: 'JWT & RBAC', category: 'SECURITY', icon: ShieldCheck, color: 'text-amber-400', border: 'border-amber-500/30' },
];

const MARQUEE_ROW_3 = [
  { name: 'LLMs & RAG Pipeline', category: 'AI TECH', icon: Bot, color: 'text-violet-400', border: 'border-violet-500/30' },
  { name: 'LangChain & Agents', category: 'AI AGENTS', icon: Cpu, color: 'text-cyan-400', border: 'border-cyan-500/30' },
  { name: 'Vector DBs (PGVector)', category: 'AI STORE', icon: Database, color: 'text-emerald-400', border: 'border-emerald-500/30' },
  { name: 'Multi-Tenant Architecture', category: 'SYSTEMS', icon: Workflow, color: 'text-indigo-400', border: 'border-indigo-500/30' },
  { name: 'Microservices', category: 'ARCH', icon: Server, color: 'text-rose-400', border: 'border-rose-500/30' },
  { name: 'Docker Containers', category: 'DEVOPS', icon: Cloud, color: 'text-sky-400', border: 'border-sky-500/30' },
  { name: 'AWS Services', category: 'CLOUD', icon: Cloud, color: 'text-amber-400', border: 'border-amber-500/30' },
  { name: 'Git & CI/CD Pipelines', category: 'DEVOPS', icon: Terminal, color: 'text-gray-300', border: 'border-white/20' },
];

// Core Competency Cards
const COMPETENCY_CARDS = [
  {
    title: 'Frontend Engineering',
    tag: 'CLIENT ARCHITECTURE',
    icon: Layout,
    color: 'from-cyan-500/20 to-teal-500/10',
    borderColor: 'border-cyan-500/30',
    description: 'Crafting ultra-responsive, accessible, and high-performance Web apps with Next.js 15, React, TypeScript, and fluid GSAP animations.',
    skills: ['Next.js 15 (App Router)', 'React.js & Hooks', 'TypeScript', 'Tailwind CSS', 'GSAP & Micro-Animations', 'SEO & Web Vitals'],
  },
  {
    title: 'Backend & Realtime Systems',
    tag: 'SERVER ARCHITECTURE',
    icon: Server,
    color: 'from-violet-500/20 to-indigo-500/10',
    borderColor: 'border-violet-500/30',
    description: 'Building resilient microservices, RESTful & GraphQL APIs, and instant low-latency Socket.IO telemetry engines.',
    skills: ['Node.js & Express', 'NestJS Architecture', 'Socket.IO (Real-Time)', 'REST APIs & GraphQL', 'JWT & RBAC Security', 'Redis Caching'],
  },
  {
    title: 'Databases & Cloud DevOps',
    tag: 'DATA & INFRASTRUCTURE',
    icon: Database,
    color: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-500/30',
    description: 'Designing scalable Relational & NoSQL database schemas, ORM data pipelines, Docker containers, and AWS deployments.',
    skills: ['PostgreSQL & MySQL', 'MongoDB NoSQL', 'Prisma ORM', 'Docker Containers', 'AWS (S3 & EC2)', 'Database Indexing'],
  },
  {
    title: 'AI & Advanced Systems',
    tag: 'LLM & RAG PIPELINES',
    icon: Bot,
    color: 'from-amber-500/20 to-rose-500/10',
    borderColor: 'border-amber-500/30',
    description: 'Integrating custom AI Agent pipelines, Retrieval-Augmented Generation (RAG) vector search, and multi-tenant SaaS architectures.',
    skills: ['LLM & RAG Integration', 'LangChain Framework', 'Vector Embeddings', 'Multi-Tenant SaaS', 'Microservices Design', 'API Gateway Systems'],
  },
];

export default function AboutSkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const competencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Entrance
      gsap.fromTo(
        '.about-header-el',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );

      // 2. Marquee Tickers Fade & Slide Entrance
      gsap.fromTo(
        '.marquee-row',
        { opacity: 0, scale: 0.96, y: 30 },
        {
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top 85%',
          },
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );

      // 3. Competency Cards Scroll Entrance
      gsap.fromTo(
        '.competency-card',
        { opacity: 0, y: 50, scale: 0.94 },
        {
          scrollTrigger: {
            trigger: competencyRef.current,
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.4)',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 sm:py-36 bg-[#050609] overflow-hidden"
    >
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="about-header-el inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL MASTERY & ARCHITECTURE</span>
          </div>

          <h2 className="about-header-el text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Engineering & <br className="hidden sm:block" />
            <span className="text-gradient-cyan drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
              Core Competencies
            </span>
          </h2>

          <p className="about-header-el text-gray-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A comprehensive interactive ecosystem of my technical stack, microservice architectures, and modern development capabilities.
          </p>
        </div>

        {/* Bio Spotlight & Terminal Contact Snapshot Card */}
        <div className="about-header-el glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 relative overflow-hidden bg-gradient-to-br from-[#0a0e1c]/90 via-[#0a0d18]/80 to-[#101426]/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Bio Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Full Stack Engineer & Tech Lead
                </h3>
                <span className="px-3.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                  {PERSONAL_INFO.location}
                </span>
              </div>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
                Specializing in high-availability web systems bridging modern Next.js/React frontends with high-throughput Node.js & NestJS microservices. Expert in real-time Socket.IO telemetry, optimized PostgreSQL/MongoDB databases, and cutting-edge LLM/RAG AI implementations.
              </p>
            </div>

            {/* Right Terminal Contact Snapshot */}
            <div className="lg:col-span-4 glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 space-y-3 bg-[#070911]/95 shadow-inner">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>CONTACT SNAPSHOT</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-2 text-xs font-mono text-gray-300">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-white truncate max-w-[180px] font-bold" title={PERSONAL_INFO.email}>
                    {PERSONAL_INFO.email}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-gray-500">Phone:</span>
                  <span className="text-cyan-300 font-bold">{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-emerald-400 font-bold">Ready for Production</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 INFINITE MARQUEE TICKERS (شريط إعلانات التكنولوجيا التفاعلي بالعرض) */}
        <div ref={marqueeRef} className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>LIVE TECH STACK TICKERS</span>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-mono">
              Hover over any tech strip to pause & explore
            </p>
          </div>

          {/* Marquee Row 1: Frontend & Client (Left Scrolling) */}
          <div className="marquee-row marquee-container overflow-hidden relative py-2 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="animate-marquee-left gap-4 pr-4">
              {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className={`glass-panel px-5 py-3 rounded-2xl border ${item.border} flex items-center gap-3 hover:scale-105 hover:border-cyan-400 transition-all shadow-md group cursor-pointer`}
                  >
                    <IconComponent className={`w-5 h-5 ${item.color} group-hover:rotate-12 transition-transform`} />
                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-gray-400 text-[10px] tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-sm font-extrabold text-white tracking-wide whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Marquee Row 2: Backend & Realtime (Right Scrolling) */}
          <div className="marquee-row marquee-container overflow-hidden relative py-2 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="animate-marquee-right gap-4 pr-4">
              {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className={`glass-panel px-5 py-3 rounded-2xl border ${item.border} flex items-center gap-3 hover:scale-105 hover:border-violet-400 transition-all shadow-md group cursor-pointer`}
                  >
                    <IconComponent className={`w-5 h-5 ${item.color} group-hover:rotate-12 transition-transform`} />
                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-gray-400 text-[10px] tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-sm font-extrabold text-white tracking-wide whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Marquee Row 3: AI & DevOps Architecture (Left Scrolling) */}
          <div className="marquee-row marquee-container overflow-hidden relative py-2 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="animate-marquee-left gap-4 pr-4">
              {[...MARQUEE_ROW_3, ...MARQUEE_ROW_3].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className={`glass-panel px-5 py-3 rounded-2xl border ${item.border} flex items-center gap-3 hover:scale-105 hover:border-emerald-400 transition-all shadow-md group cursor-pointer`}
                  >
                    <IconComponent className={`w-5 h-5 ${item.color} group-hover:rotate-12 transition-transform`} />
                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-gray-400 text-[10px] tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-sm font-extrabold text-white tracking-wide whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 🌟 4 CORE ARCHITECTURE COMPETENCY CARDS */}
        <div ref={competencyRef} className="space-y-8 pt-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Architecture Pillars & Capabilities
            </h3>
            <p className="text-sm text-gray-400 font-mono">
              Deep technical specialization across modern software layers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMPETENCY_CARDS.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={idx}
                  className={`competency-card glass-panel glass-panel-hover p-8 rounded-3xl border ${card.borderColor} space-y-6 relative overflow-hidden bg-gradient-to-br ${card.color} shadow-xl group`}
                >
                  {/* Outer Ambient Glow Effect */}
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500" />

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 shadow-inner">
                        <IconComponent className="w-6 h-6 text-cyan-300" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 tracking-widest font-bold">
                          {card.tag}
                        </span>
                        <h4 className="text-xl font-extrabold text-white">{card.title}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {card.description}
                  </p>

                  {/* Skill Badges Matrix */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider block">
                      Core Specializations:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {card.skills.map((skillName, sIdx) => (
                        <div
                          key={sIdx}
                          className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-gray-200 flex items-center gap-1.5 hover:border-cyan-400/60 hover:text-cyan-300 transition-all shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{skillName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

