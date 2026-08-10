'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/data/portfolioData';
import {
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projectsCount = PROJECTS.length;

      // GSAP ScrollTrigger Pinned Timeline with Labels & Snap
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'projects-pinned-st',
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: `+=${projectsCount * 550}`,
          scrub: 1,
          snap: {
            snapTo: 'labels',
            duration: { min: 0.2, max: 1.5 },
            delay: 0.15,
            ease: 'power1.inOut',
          },
          onUpdate: (self) => {
            const idx = Math.min(
              projectsCount - 1,
              Math.floor(self.progress * projectsCount)
            );
            setActiveIndex(idx);
          },
        },
      });

      // Add labels and timeline animations for stacked card layers
      PROJECTS.forEach((_, idx) => {
        tl.addLabel(`project-${idx}`);

        if (idx < projectsCount - 1) {
          // Diverse exit directions: Card 0 -> Right, Card 1 -> Left, Card 2 -> Up, Card 3 -> Right, Card 4 -> Left
          let exitVars = {};
          if (idx % 3 === 0) {
            exitVars = { xPercent: 125, rotate: 8, opacity: 0, filter: 'blur(8px)' };
          } else if (idx % 3 === 1) {
            exitVars = { xPercent: -125, rotate: -8, opacity: 0, filter: 'blur(8px)' };
          } else {
            exitVars = { yPercent: -125, scale: 0.85, opacity: 0, filter: 'blur(8px)' };
          }

          tl.to(
            `.project-card-stack-${idx}`,
            {
              ...exitVars,
              duration: 1,
              ease: 'power2.inOut',
            },
            `project-${idx}`
          );

          tl.fromTo(
            `.project-card-stack-${idx + 1}`,
            { scale: 0.92, y: 25, opacity: 0.4, filter: 'blur(6px)' },
            {
              scale: 1,
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1,
              ease: 'power2.out',
            },
            `project-${idx}`
          );
        }
      });

      tl.addLabel(`project-${projectsCount - 1}`);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleJumpToProject = (idx: number) => {
    const st = ScrollTrigger.getById('projects-pinned-st');
    if (st) {
      const start = st.start;
      const end = st.end;
      const progress = idx / (PROJECTS.length - 1);
      const targetY = start + progress * (end - start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else {
      setActiveIndex(idx);
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center bg-[#050609] overflow-hidden pt-6 pb-24 sm:pb-32"
    >
      {/* Background Lighting Orbs */}
      <div className="absolute top-1/4 left-10 w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[650px] h-[650px] bg-violet-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col h-full justify-between py-4 space-y-4 sm:space-y-6">
        
        {/* Header & Progress Counter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-2 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>GSAP PINNED STACKING TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Featured <span className="text-gradient-cyan drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">Projects</span>
            </h2>
          </div>

          {/* Counter & Indicator Dots */}
          <div className="flex items-center gap-4 glass-panel px-5 py-2.5 rounded-2xl border border-white/15 backdrop-blur-xl shadow-lg">
            <div className="text-xs font-mono text-gray-300">
              <span className="text-cyan-400 font-bold text-base">{PROJECTS[activeIndex].number}</span>
              <span className="text-gray-500"> / </span>
              <span>{String(PROJECTS.length).padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-2">
              {PROJECTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => handleJumpToProject(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-7 bg-cyan-400 shadow-[0_0_12px_#06b6d4]'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to project ${p.title}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 🌟 GSAP PINNED STACKING CARDS CONTAINER */}
        <div className="relative w-full h-[600px] sm:h-[620px] lg:h-[550px] flex items-center justify-center">
          {PROJECTS.map((project, idx) => {
            const zIndex = PROJECTS.length - idx; // Layer 0 is on top
            const isImageLeft = idx % 2 === 0;

            return (
              <div
                key={project.id}
                style={{ zIndex: zIndex }}
                className={`project-card-stack-${idx} absolute inset-0 w-full h-full glass-panel p-4 sm:p-6 lg:p-7 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c0f20]/95 via-[#080a14]/98 to-[#050609]/98 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-y-auto lg:overflow-hidden flex flex-col justify-between`}
              >
                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-400 to-violet-500 opacity-90" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center h-full">
                  
                  {/* Left/Right Mockup Image Column */}
                  <div
                    className={`lg:col-span-7 relative group ${
                      isImageLeft ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="relative w-full aspect-[16/8] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-[#080a14] shadow-2xl group-hover:border-cyan-500/50 transition-colors">
                      {/* Browser Window Header */}
                      <div className="flex items-center justify-between px-4 py-2 bg-[#0e1220] border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="text-[11px] font-mono text-gray-400 truncate max-w-[240px]">
                          {project.liveUrl || `https://${project.id}.ahmedhossam.dev`}
                        </div>
                        <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          PROJECT {project.number}
                        </div>
                      </div>

                      {/* Project Screenshot Image */}
                      <div className="relative w-full h-[calc(100%-33px)]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070912] via-transparent to-transparent opacity-50" />
                      </div>
                    </div>

                    {/* Floating Highlight Badge */}
                    <div className="absolute -bottom-3 left-6 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-panel border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{project.highlight}</span>
                    </div>
                  </div>

                  {/* Left/Right Text Info Column */}
                  <div
                    className={`lg:col-span-5 space-y-3 sm:space-y-4 text-left ${
                      isImageLeft ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="px-3.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs font-mono font-bold">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-gray-400">
                          Project {project.number} of {String(PROJECTS.length).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                      {project.longDescription}
                    </p>

                    {/* Key Specs */}
                    <div className="space-y-1 pt-1 border-t border-white/10">
                      <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                        Key Specs & Deliverables:
                      </span>
                      <div className="grid grid-cols-1 gap-1 text-[11px] sm:text-xs text-gray-300 font-mono">
                        {project.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-cyan-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/15">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 hover:from-cyan-300 hover:to-emerald-200 transition-all shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 shrink-0"
                        >
                          <Sparkles className="w-4 h-4 text-black animate-pulse" />
                          <span>Live Demo</span>
                          <ExternalLink className="w-4 h-4 text-black ml-0.5" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white glass-panel border border-white/20 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:scale-105 transition-all shrink-0"
                        >
                          <GithubIcon className="w-4 h-4 text-cyan-400" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
