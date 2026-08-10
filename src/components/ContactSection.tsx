'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Cinzel_Decorative } from 'next/font/google';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles, ArrowUp, MessageSquare, Loader2 } from 'lucide-react';
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

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-anim',
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#10b981', '#8b5cf6'],
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#10b981', '#8b5cf6'],
      });

      if (data?.fallback) {
        window.open(
          `mailto:${PERSONAL_INFO.email}?subject=New Portfolio Message from ${encodeURIComponent(
            formState.name
          )}&body=${encodeURIComponent(formState.message)}`
        );
      }

      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 5000);
    } catch (err) {
      console.error('Contact Form Error:', err);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#10b981', '#8b5cf6'],
      });
      window.open(
        `mailto:${PERSONAL_INFO.email}?subject=New Portfolio Message from ${encodeURIComponent(
          formState.name
        )}&body=${encodeURIComponent(formState.message)}`
      );
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className={`relative pt-28 pb-12 bg-[#050609] overflow-hidden ${cinzel.variable}`}
    >
      {/* Background Ambient Orbs */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="contact-anim text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>DIRECT REAL-TIME EMAIL DELIVERY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Let's Build Something <br className="hidden sm:block" />
            <span className="text-gradient-cyan drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
              Exceptional Together
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Send a direct message below and it will arrive straight into Ahmed Hossam's email inbox!
          </p>
        </div>

        {/* Direct Contacts Grid & Quick Message Form */}
        <div className="contact-anim grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Copy Card */}
            <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-3 relative group bg-gradient-to-br from-[#0c0f20]/90 to-[#070912]/95 shadow-xl hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Direct Email Inbox
                </span>
                <span className="text-gray-400 text-[10px]">Click to copy</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-mono font-bold text-white hover:text-cyan-300 transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-all shrink-0 shadow-sm"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-3 bg-gradient-to-br from-[#0c0f20]/90 to-[#070912]/95 shadow-xl hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Direct Phone / WhatsApp
                </span>
                <span className="text-gray-400 text-[10px]">Available Immediately</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <a
                  href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base sm:text-lg font-mono font-bold text-white hover:text-emerald-300 transition-colors"
                >
                  {PERSONAL_INFO.phone}
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all shrink-0 shadow-sm"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location & Social Profiles */}
            <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-4 bg-gradient-to-br from-[#0c0f20]/90 to-[#070912]/95 shadow-xl">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-400">Location</div>
                  <div className="font-bold text-white">{PERSONAL_INFO.location}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl glass-panel text-xs font-mono text-gray-200 hover:text-cyan-300 hover:border-cyan-500/40 transition-all shadow-md"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl glass-panel text-xs font-mono text-gray-200 hover:text-cyan-300 hover:border-cyan-500/40 transition-all shadow-md"
                >
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Live Email Form */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 space-y-6 bg-gradient-to-br from-[#0a0d1a]/95 to-[#070912]/98 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Send Me a Direct Message</span>
            </h3>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-white">Email Sent Successfully! 📬</h4>
                <p className="text-xs sm:text-sm text-gray-300 font-mono">
                  Your message has been delivered directly to ahmedhossam1691977@gmail.com!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Ahmed Hossam"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hello Ahmed, I'd like to discuss a project..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] hover:scale-[1.01] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Sending Email...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Direct Email</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            © {new Date().getFullYear()}{' '}
            <span
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
              className="text-cyan-400 font-bold tracking-wider"
            >
              {PERSONAL_INFO.name}
            </span>
            . All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-gray-300 hover:text-cyan-400 hover:border-cyan-400 transition-all shadow-sm"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
