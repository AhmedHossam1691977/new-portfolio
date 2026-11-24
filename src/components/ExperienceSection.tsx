'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '@/data/portfolioData';
import { Briefcase, Calendar, MapPin, ChevronRight, Award, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ExperienceSection() {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline items entrance animation
      const items = gsap.utils.toArray<HTMLElement>('.exp-item');

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 30 },
          {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          }
        );
      });

      // Animated Glowing Central Line
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
          scaleY: 1,
          transformOrigin: 'top center',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-28 theme-bg overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-violet-500/30 text-violet-400 text-xs font-mono uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Progression</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Work Experience & <span className="text-gradient-violet">Track Record</span>
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Proven professional experience engineering backends, frontends, and mobile APIs in fast-paced production environments.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative max-w-5xl mx-auto">
          {/* Vertical Central Line */}
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-violet-500 to-emerald-500 md:-translate-x-1/2 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)]" />

          <div className="space-y-12 relative">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className={`exp-item relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className={`absolute left-4 md:left-1/2 top-6 md:-translate-x-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_#06b6d4] ${isDark ? 'bg-[#090b12]' : 'bg-white'}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0">
                    <div className={`glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl border space-y-4 relative group transition-all duration-300 ${
                      isDark ? 'border-white/10' : 'border-slate-200 bg-white/95 shadow-md'
                    }`}>
                      
                      {/* Top Role & Timeframe */}
                      <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-4 ${
                        isDark ? 'border-white/10' : 'border-slate-200'
                      }`}>
                        <div>
                          <span className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                            isDark ? 'text-cyan-400' : 'text-cyan-700'
                          }`}>
                            {exp.company}
                          </span>
                          <h3 className={`text-xl font-bold group-hover:text-cyan-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {exp.role}
                          </h3>
                        </div>

                        {exp.badge && (
                          <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                            isDark
                              ? 'bg-violet-500/20 text-violet-300 border-violet-500/30'
                              : 'bg-violet-50 text-violet-700 border-violet-300'
                          }`}>
                            {exp.badge}
                          </span>
                        )}
                      </div>

                      {/* Meta Information */}
                      <div className={`flex flex-wrap items-center gap-4 text-xs font-mono ${
                        isDark ? 'text-gray-400' : 'text-slate-500'
                      }`}>
                        <div className={`flex items-center gap-1.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600 font-semibold'}`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <ul className={`space-y-2 text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        {exp.description.map((desc, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                            <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Badges */}
                      <div className="pt-2 flex flex-wrap gap-2">
                        {exp.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-colors ${
                              isDark
                                ? 'bg-white/5 border-white/10 text-cyan-300/90'
                                : 'bg-slate-100 border-slate-200 text-cyan-700 font-medium'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

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
