'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Cinzel_Decorative, Great_Vibes } from 'next/font/google';

const cinzel = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
});

const FULL_NAME = 'AHMED HOSSAM';

export default function Preloader() {
  const [typedLength, setTypedLength] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling during preloader animation
    document.body.style.overflow = 'hidden';

    // 1. Typing effect: Increment character count step by step (letter by letter)
    let currentLen = 0;
    const totalChars = FULL_NAME.length;

    const interval = setInterval(() => {
      currentLen += 1;
      setTypedLength(currentLen);

      if (currentLen >= totalChars) {
        clearInterval(interval);

        // Show ornament and subtitle once typing is finished
        setShowSubtitle(true);

        // Trigger GSAP exit sequence after typing completes
        setTimeout(() => {
          triggerExitSequence();
        }, 500);
      }
    }, 110); // ~110ms per letter

    const triggerExitSequence = () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Expand ornamental glowing divider
      if (ornamentRef.current) {
        tl.fromTo(
          ornamentRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5 }
        );
      }

      // Fade in subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );
      }

      // Fade & scale out the entire content layer
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.95,
          filter: 'blur(8px)',
          duration: 0.6,
          ease: 'power3.in',
        },
        '+=0.4'
      );

      // Split curtains slide up and down
      tl.to(
        topCurtainRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'expo.inOut',
        },
        '-=0.1'
      );

      tl.to(
        bottomCurtainRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: 'expo.inOut',
          onComplete: () => {
            setIsCompleted(true);
            document.body.style.overflow = '';
          },
        },
        '<'
      );
    };

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  if (isCompleted) return null;

  // Calculate percentage based on typed length
  const progressPercent = Math.min(
    100,
    Math.round((typedLength / FULL_NAME.length) * 100)
  );

  // Split typed string into AHMED and HOSSAM parts
  const currentTypedText = FULL_NAME.slice(0, typedLength);
  const firstNamePart = currentTypedText.slice(0, 5); // "AHMED"
  const lastNamePart = currentTypedText.length > 5 ? currentTypedText.slice(6) : ''; // "HOSSAM"

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden ${cinzel.variable} ${greatVibes.variable}`}
    >
      {/* Top Split Curtain */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#050609] border-b border-cyan-500/20 shadow-2xl z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />
      </div>

      {/* Bottom Split Curtain */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050609] border-t border-violet-500/20 shadow-2xl z-10 overflow-hidden"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-violet-500/10 blur-[150px] pointer-events-none rounded-full" />
      </div>

      {/* Central Content Layer */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4"
      >
        {/* Futuristic Corner Accent */}
        <div className="absolute inset-6 sm:inset-10 border border-white/[0.04] pointer-events-none rounded-2xl hidden md:block">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/60 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/60 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-violet-500/60 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-violet-500/60 rounded-br-2xl" />
        </div>

        {/* Cursive Welcome Header */}
        <div
          style={{ fontFamily: 'var(--font-great-vibes), cursive' }}
          className="text-cyan-400 text-3xl sm:text-4xl md:text-5xl mb-3 font-normal drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]"
        >
          Welcome to the portfolio of
        </div>

        {/* Main Large Decorative Typing Name: AHMED HOSSAM */}
        <div className="min-h-[90px] sm:min-h-[120px] md:min-h-[140px] flex items-center justify-center">
          <h1
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-center tracking-[0.12em] sm:tracking-[0.18em] uppercase leading-none py-2"
          >
            {/* AHMED */}
            {firstNamePart && (
              <span className="inline-block mr-3 sm:mr-6 lg:mr-8 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.6)]">
                {firstNamePart}
              </span>
            )}

            {/* HOSSAM */}
            {lastNamePart && (
              <span className="inline-block bg-gradient-to-r from-cyan-400 via-violet-300 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.6)]">
                {lastNamePart}
              </span>
            )}

            {/* Glowing Neon Typing Cursor */}
            {typedLength < FULL_NAME.length && (
              <span className="inline-block w-[4px] sm:w-[8px] h-[0.75em] bg-cyan-400 align-middle ml-2 animate-pulse shadow-[0_0_15px_#06b6d4]" />
            )}
          </h1>
        </div>

        {/* Glowing Decorative Divider */}
        <div
          ref={ornamentRef}
          className={`w-48 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-4 relative flex items-center justify-center transition-opacity duration-300 ${
            showSubtitle ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-3 h-3 bg-cyan-400 rotate-45 border border-white/80 shadow-[0_0_15px_#06b6d4]" />
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className={`text-xs sm:text-sm md:text-base text-gray-300 tracking-[0.25em] uppercase font-mono text-center max-w-md transition-opacity duration-300 ${
            showSubtitle ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Full Stack Engineer <span className="text-cyan-400">&</span> Creative Developer
        </div>

        {/* Progress Bar & Percentage Counter synced with typing */}
        <div className="mt-8 sm:mt-10 w-64 sm:w-80 flex flex-col items-center gap-3">
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/5 relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-violet-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_18px_rgba(6,182,212,0.9)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between w-full text-xs font-mono text-gray-400">
            <span className="text-cyan-400/80 tracking-widest">TYPING EXPERIENCE</span>
            <span className="text-cyan-300 font-bold tracking-wider">{progressPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
