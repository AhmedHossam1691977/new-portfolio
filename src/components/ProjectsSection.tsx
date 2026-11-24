'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/data/portfolioData';
import {
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';
import { useApp } from '@/context/AppContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards staggered reveal
      const cards = cardsContainerRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // First project gets a featured/large layout, rest are grid cards
  const [featured, ...rest] = PROJECTS;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 sm:py-28 theme-bg overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/4 -left-32 w-[700px] h-[700px] bg-cyan-600/8 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[700px] h-[700px] bg-violet-600/8 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Featured{' '}
            <span className="text-gradient-cyan drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
              Projects
            </span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-2xl font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            A curated selection of production-grade applications, real-time systems, and AI-powered platforms.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={cardsContainerRef} className="space-y-6">

          {/* Featured Project — Full Width Hero Card */}
          <div className={`project-card group relative rounded-3xl overflow-hidden border shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:border-cyan-500/30 transition-all duration-500 ${
            isDark
              ? 'border-white/10 bg-gradient-to-br from-[#0c0f1a]/90 via-[#080b14]/95 to-[#050609]'
              : 'border-gray-200 bg-white shadow-lg'
          }`}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-emerald-400 to-violet-500 opacity-80" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Featured Image */}
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080b14] hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-transparent to-transparent lg:hidden" />

                {/* Floating badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{featured.highlight}</span>
                </div>
              </div>

              {/* Featured Info */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                    FEATURED
                  </span>
                  <span className="px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono">
                    {featured.category}
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {featured.title}
                </h3>

                <p className={`text-sm sm:text-base leading-relaxed font-light ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {featured.longDescription}
                </p>

                {/* Metrics */}
                <div className={`space-y-2 pt-2 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  {featured.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-cyan-300'
                          : 'bg-slate-100 border-slate-200 text-cyan-700 font-medium'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  {featured.liveUrl && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 hover:from-cyan-300 hover:to-emerald-200 transition-all shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] hover:scale-105 active:scale-95"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {featured.githubUrl && (
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm glass-panel border hover:scale-105 transition-all ${
                        isDark
                          ? 'text-white border-white/15 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                          : 'text-slate-800 border-slate-300 hover:border-cyan-600 bg-white'
                      }`}
                    >
                      <GithubIcon className="w-4 h-4 text-cyan-500" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Rest of Projects — Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {rest.map((project) => (
              <div
                key={project.id}
                className={`project-card group relative rounded-2xl overflow-hidden border shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:border-cyan-500/30 transition-all duration-500 flex flex-col ${
                  isDark
                    ? 'border-white/10 bg-gradient-to-br from-[#0c0f1a]/80 via-[#080b14]/90 to-[#050609] hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)]'
                    : 'border-gray-200 bg-white hover:shadow-[0_20px_40px_rgba(6,182,212,0.08)]'
                }`}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/60 via-emerald-400/40 to-violet-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-[#0a0d16]/30 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-violet-300 font-bold">
                    {project.category}
                  </div>

                  {/* Number */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-xs font-mono text-cyan-400 font-bold">
                    {project.number}
                  </div>

                  {/* Hover overlay with link */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg hover:scale-110 active:scale-95 transition-transform"
                        >
                          <span>Live</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs text-white glass-panel border border-white/20 hover:scale-110 transition-transform"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 space-y-3">
                  <h3 className={`text-base sm:text-lg font-bold leading-snug group-hover:text-cyan-500 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed font-light line-clamp-2 flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  {/* Key highlight */}
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <Sparkles className="w-3 h-3" />
                    <span>{project.highlight}</span>
                  </div>

                  {/* Tags */}
                  <div className={`flex flex-wrap gap-1.5 pt-2 border-t ${
                    isDark ? 'border-white/8' : 'border-slate-200'
                  }`}>
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                          isDark
                            ? 'bg-white/5 border-white/8 text-gray-400'
                            : 'bg-slate-100 border-slate-200 text-slate-700 font-medium'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${
                        isDark ? 'text-gray-500' : 'text-slate-500'
                      }`}>
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
