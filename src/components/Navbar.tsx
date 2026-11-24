'use client';

import { useState, useEffect } from 'react';
import { Cinzel_Decorative } from 'next/font/google';
import { Home, UserCheck, Briefcase, Layers, Mail, Sun, Moon, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const cinzel = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // If scrolled to the bottom of the page, activate contact
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection('contact');
        return;
      }

      const sections = ['hero', 'about', 'experience', 'services', 'projects', 'contact'];
      const focalPoint = Math.min(window.innerHeight * 0.35, 280);

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalPoint && rect.bottom > focalPoint) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero', id: 'hero', icon: Home, shortName: 'Home' },
    { name: 'About & Skills', href: '#about', id: 'about', icon: UserCheck, shortName: 'About' },
    { name: 'Experience', href: '#experience', id: 'experience', icon: Briefcase, shortName: 'Exp' },
    { name: 'Services', href: '#services', id: 'services', icon: Sparkles, shortName: 'Services' },
    { name: 'Projects', href: '#projects', id: 'projects', icon: Layers, shortName: 'Projects' },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail, shortName: 'Contact' },
  ];

  return (
    <>
      {/* 💻 DESKTOP FLOATING NAVBAR (TOP) */}
      <header
        className={`hidden md:block fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${cinzel.variable}`}
      >
        <div
          className={`relative flex items-center justify-center px-7 py-2.5 transition-all duration-300 rounded-full border whitespace-nowrap ${
            isDark
              ? 'bg-[#060a14]/90 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              : 'bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.1)]'
          } ${scrolled ? 'scale-[0.98]' : 'scale-100'}`}
        >
          <nav className="flex items-center justify-center gap-1.5 sm:gap-2">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;

              return (
                <div key={link.id} className="flex items-center">
                  {idx > 0 && (
                    <span
                      className={`text-[9px] px-1.5 select-none ${
                        isDark ? 'text-cyan-500/40' : 'text-cyan-600/40'
                      }`}
                    >
                      ◆
                    </span>
                  )}
                  <a
                    href={link.href}
                    onClick={() => setActiveSection(link.id)}
                    style={{ fontFamily: 'var(--font-cinzel), serif' }}
                    className={`relative px-2.5 sm:px-3 py-1 text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 rounded-full group whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-cyan-500 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                        : isDark
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {/* Active Route Indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 rounded-full shadow-[0_0_10px_#06b6d4]" />
                    )}

                    <span
                      className={`relative z-10 transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent font-extrabold'
                          : isDark
                          ? 'group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 group-hover:bg-clip-text group-hover:text-transparent'
                          : 'group-hover:text-cyan-600'
                      }`}
                    >
                      {link.name}
                    </span>
                  </a>
                </div>
              );
            })}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`ml-3 p-1.5 rounded-full transition-all duration-300 ${
                isDark
                  ? 'text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300'
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>
        </div>
      </header>

      {/* 📱 MOBILE NATIVE APP DOCK NAVBAR (BOTTOM) */}
      <nav
        className={`md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-[9990] w-[94vw] max-w-md px-2 py-2 rounded-3xl border shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl ${cinzel.variable} ${
          isDark
            ? 'glass-panel border-cyan-500/30 bg-[#070a14]/95'
            : 'bg-white/90 border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)]'
        }`}
      >
        <div className="flex items-center justify-around w-full">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const Icon = link.icon;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={`relative flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'text-cyan-500 scale-105'
                    : isDark
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
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
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''}`} />
                </div>

                <span
                  style={{ fontFamily: 'var(--font-cinzel), serif' }}
                  className={`text-[9px] font-bold tracking-wider uppercase whitespace-nowrap ${
                    isActive
                      ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] font-black'
                      : ''
                  }`}
                >
                  {link.shortName}
                </span>
              </a>
            );
          })}

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl transition-all duration-300 ${
              isDark ? 'text-yellow-400' : 'text-slate-600'
            }`}
            aria-label="Toggle theme"
          >
            <div className="p-1.5 rounded-xl">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </div>
            <span
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
              className="text-[9px] font-bold tracking-wider uppercase"
            >
              {isDark ? 'Light' : 'Dark'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
