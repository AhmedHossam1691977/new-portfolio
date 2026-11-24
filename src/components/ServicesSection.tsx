'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Search,
  X,
  Code2,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Layers,
  Wrench,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { servicesData, ServiceItem } from '@/data/servicesData';
import { useApp } from '@/context/AppContext';

export default function ServicesSection() {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'tech' | 'marketing'>('tech');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
      }
    };
    if (selectedService) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedService]);

  // Filter services
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory = service.category === activeTab;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        service.title.toLowerCase().includes(q) ||
        service.shortDesc.toLowerCase().includes(q) ||
        service.technologies.some((t) => t.toLowerCase().includes(q)) ||
        service.businessProblems.some((p) => p.toLowerCase().includes(q)) ||
        service.deliverables.some((d) => d.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const techCount = servicesData.filter((s) => s.category === 'tech').length;
  const marketingCount = servicesData.filter((s) => s.category === 'marketing').length;

  return (
    <section
      id="services"
      className={`relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#060a12]' : 'bg-[#f8fafc]'
      }`}
    >
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-20 ${
            isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/30'
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-10 w-[500px] h-[350px] rounded-full blur-[150px] opacity-20 ${
            isDark ? 'bg-purple-500/20' : 'bg-purple-400/25'
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 border ${
              isDark
                ? 'bg-cyan-950/40 text-cyan-400 border-cyan-800/40'
                : 'bg-cyan-50 text-cyan-700 border-cyan-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>End-to-End Solutions</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Specialized Services &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Deliverables
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Every service is backed by rigorous execution, clear deliverables, transparent toolchains, and real-world business problem solving — spanning high-performance software engineering and high-impact digital marketing.
          </p>
        </div>

        {/* ========================================================= */}
        {/* CONTROLS: CATEGORY TABS & SEARCH INPUT (CENTERED)         */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center justify-center gap-4 mb-12">
          {/* Category Tabs */}
          <div
            className={`inline-flex items-center p-1.5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-slate-900/80 border-slate-800/90 shadow-inner'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <button
              onClick={() => setActiveTab('tech')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === 'tech'
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'bg-cyan-600 text-white shadow'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>Tech & Dev</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full ${
                  activeTab === 'tech'
                    ? isDark
                      ? 'bg-cyan-500/30 text-cyan-200'
                      : 'bg-white/20 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {techCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('marketing')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === 'marketing'
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'bg-cyan-600 text-white shadow'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fuchsia-400" />
              <span>Media & Marketing</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full ${
                  activeTab === 'marketing'
                    ? isDark
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-white/20 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {marketingCount}
              </span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-md">
            <Search
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, tech, deliverables..."
              className={`w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border outline-none transition-all ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20'
                  : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/10 shadow-sm'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results summary if searching */}
        {searchQuery && (
          <p
            className={`text-sm mb-6 text-center ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Showing {filteredServices.length} result
            {filteredServices.length === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
          </p>
        )}

        {/* Empty state */}
        {filteredServices.length === 0 && (
          <div
            className={`text-center py-16 px-4 rounded-3xl border ${
              isDark
                ? 'bg-slate-900/40 border-slate-800/80'
                : 'bg-white border-slate-200'
            }`}
          >
            <HelpCircle className="w-12 h-12 mx-auto mb-3 text-cyan-400 opacity-60" />
            <h3
              className={`text-lg font-bold mb-1 ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              No matching services found
            </h3>
            <p
              className={`text-sm max-w-md mx-auto mb-5 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Try tweaking your search term or switch to another category tab to view all services.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('tech');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* SERVICES CARD GRID                                        */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`group relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer hover:-translate-y-1.5 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800/90 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/30'
                  : 'bg-white border-slate-200/90 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-slate-200'
              }`}
            >
              {/* 16:9 Image Container */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-950">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
                {/* Category Badge overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-md bg-black/60 text-white border border-white/10 shadow-sm">
                  {service.category === 'tech' ? (
                    <Code2 className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <TrendingUp className="w-3 h-3 text-fuchsia-400" />
                  )}
                  <span>{service.badge}</span>
                </div>

                {/* Subcategory Label */}
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-md bg-black/40 text-slate-300 border border-white/5">
                  {service.category === 'tech' ? 'Dev' : 'Marketing'}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-grow p-6">
                <h3
                  className={`text-xl font-bold tracking-tight mb-2.5 group-hover:text-cyan-400 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-5 line-clamp-2 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {service.shortDesc}
                </p>

                {/* Technologies Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border ${
                        isDark
                          ? 'bg-slate-800/80 text-slate-300 border-slate-700/60'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 3 && (
                    <span
                      className={`text-[11px] font-medium px-2 py-1 rounded-lg ${
                        isDark
                          ? 'bg-slate-800/40 text-slate-400'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      +{service.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Footer Action */}
                <div
                  className={`mt-auto pt-4 flex items-center justify-between border-t ${
                    isDark ? 'border-slate-800/80' : 'border-slate-100'
                  }`}
                >
                  <span className="text-xs font-semibold text-cyan-400 group-hover:underline flex items-center gap-1.5">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  <span
                    className={`text-[11px] ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {service.deliverables.length} Deliverables
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* DETAILED INTERACTIVE SERVICE MODAL                        */}
      {/* ========================================================= */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 ${
              isDark
                ? 'bg-[#0b1220] border-slate-800 text-slate-200'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            {/* Modal Header with Visual Banner */}
            <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] bg-slate-950 overflow-hidden flex-shrink-0">
              <Image
                src={selectedService.image}
                alt={selectedService.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-black/30" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white backdrop-blur-md border border-white/20 transition-all z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Title info inside banner */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500 text-slate-950">
                    {selectedService.categoryLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/20 text-white backdrop-blur-sm">
                    {selectedService.badge}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 space-y-6">
              {/* Short Intro */}
              <p
                className={`text-base leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {selectedService.shortDesc}
              </p>

              {/* Section 1: What I Do */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-3.5">
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  <h4
                    className={`text-sm font-bold tracking-wider uppercase ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    What I Do
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {selectedService.whatIDo.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 2: Client Deliverables */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-3.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h4
                    className={`text-sm font-bold tracking-wider uppercase ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    What You Receive (Client Deliverables)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl text-xs sm:text-sm font-medium ${
                        isDark
                          ? 'bg-slate-800/60 text-slate-200'
                          : 'bg-white text-slate-800 border border-slate-200/60'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Technologies, Platforms & Tools */}
              <div>
                <h4
                  className={`text-xs font-bold tracking-wider uppercase mb-3 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Technologies, Platforms & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border ${
                        isDark
                          ? 'bg-slate-800/80 text-cyan-300 border-cyan-500/30'
                          : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Section 4: Business Problems Solved */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark
                    ? 'bg-amber-950/20 border-amber-900/40 text-amber-200/90'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold tracking-wider uppercase">
                    Business Problems This Solves
                  </h4>
                </div>
                <ul className="space-y-2">
                  {selectedService.businessProblems.map((prob, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer / CTAs */}
            <div
              className={`flex-shrink-0 p-4 sm:p-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="text-xs text-slate-500 text-center sm:text-left">
                Ready to initiate this service or need a custom proposal?
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedService(null)}
                  className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition ${
                    isDark
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request a Quote</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
