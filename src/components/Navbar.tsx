'use client';

import { useState, useEffect } from 'react';
import { Cinzel_Decorative } from 'next/font/google';
import { Home, UserCheck, Briefcase, Layers, Mail, Sparkles } from 'lucide-react';

const cinzel = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 350 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero', id: 'hero', icon: Home, shortName: 'Home' },
    { name: 'About & Skills', href: '#about', id: 'about', icon: UserCheck, shortName: 'About' },
    { name: 'Experience', href: '#experience', id: 'experience', icon: Briefcase, shortName: 'Exp' },
    { name: 'Projects', href: '#projects', id: 'projects', icon: Layers, shortName: 'Projects' },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail, shortName: 'Contact' },
  ];

  return (
    <>
      {/* 💻 DESKTOP FLOATING NAVBAR (TOP) */}
      <header
        className={`hidden md:block fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 transition-all duration-500 ${cinzel.variable}`}
      >
        <div
          className={`relative flex items-center justify-center px-6 py-2 transition-all duration-500 rounded-full ${
            scrolled
              ? 'bg-[#050609]/40 backdrop-blur-md border border-white/5 shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
              : 'bg-transparent'
          }`}
        >
          <nav className="flex items-center justify-center gap-2.5 w-full">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;

              return (
                <div key={link.id} className="flex items-center">
                  {idx > 0 && (
                    <span className="text-cyan-500/30 text-[10px] px-1 select-none">◆</span>
                  )}
                  <a
                    href={link.href}
                    style={{ fontFamily: 'var(--font-cinzel), serif' }}
                    className={`relative px-3.5 py-1 text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 rounded-full group ${
                      isActive
                        ? 'text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {/* Active Route Indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 rounded-full shadow-[0_0_10px_#06b6d4]" />
                    )}

                    <span
                      className={`relative z-10 transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent font-extrabold'
                          : 'group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 group-hover:bg-clip-text group-hover:text-transparent'
                      }`}
                    >
                      {link.name}
                    </span>
                  </a>
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 📱 MOBILE NATIVE APP DOCK NAVBAR (BOTTOM) */}
      <nav
        className={`md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-[9990] w-[94vw] max-w-md px-2 py-2 glass-panel rounded-3xl border border-cyan-500/30 bg-[#070a14]/95 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl ${cinzel.variable}`}
      >
        <div className="flex items-center justify-around w-full">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const Icon = link.icon;

            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'text-cyan-300 scale-105'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {/* Active Top Glowing Pill */}
                {isActive && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full shadow-[0_0_12px_#06b6d4]" />
                )}

                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'bg-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-gray-400'}`} />
                </div>

                <span
                  style={{ fontFamily: 'var(--font-cinzel), serif' }}
                  className={`text-[9px] font-bold tracking-wider uppercase ${
                    isActive
                      ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] font-black'
                      : 'text-gray-400'
                  }`}
                >
                  {link.shortName}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
