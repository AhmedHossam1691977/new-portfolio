'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, User, RefreshCw, GripVertical } from 'lucide-react';
import { Cinzel_Decorative } from 'next/font/google';

const cinzel = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  '⚡ What is Ahmed’s tech stack?',
  '💼 Tell me about his work experience',
  '🚀 What are his top projects?',
  '🤖 Tell me about his AI & RAG skills',
  '📞 How can I hire or contact him?',
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello! I am **Ahmed Hossam's AI Assistant** 🤖 (powered by his CV & Portfolio RAG Knowledge Base).\n\nAsk me anything about Ahmed's experience, skills, projects, or how to hire him!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Draggable position state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; buttonX: number; buttonY: number } | null>(null);
  const hasDraggedRef = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Set default initial position safely on mobile and desktop
  useEffect(() => {
    if (typeof window !== 'undefined' && !position) {
      const isMobile = window.innerWidth < 640;
      setPosition({
        x: window.innerWidth - (isMobile ? 75 : 85),
        y: window.innerHeight - (isMobile ? 150 : 95),
      });
    }
  }, []);

  // Handle Dragging via Mouse & Touch
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    hasDraggedRef.current = false;
    setIsDragging(true);

    const currentX = position?.x ?? (window.innerWidth - 80);
    const currentY = position?.y ?? (window.innerHeight - 90);

    dragStartRef.current = {
      x: clientX,
      y: clientY,
      buttonX: currentX,
      buttonY: currentY,
    };
  };

  useEffect(() => {
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !dragStartRef.current) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - dragStartRef.current.x;
      const deltaY = clientY - dragStartRef.current.y;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        hasDraggedRef.current = true;
      }

      const buttonWidth = 64;
      const buttonHeight = 64;

      const newX = Math.max(10, Math.min(window.innerWidth - buttonWidth - 10, dragStartRef.current.buttonX + deltaX));
      const newY = Math.max(10, Math.min(window.innerHeight - buttonHeight - 10, dragStartRef.current.buttonY + deltaY));

      setPosition({ x: newX, y: newY });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  const handleButtonClick = () => {
    if (!hasDraggedRef.current) {
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.success ? data.answer : 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI Chat Widget Error:', err);
      const errorMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'Connection error. Please try asking again or contact Ahmed directly at ahmedhossam1691977@gmail.com',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format markdown bold/lists/links
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedLine = formattedLine.replace(
        /\[(.*?)\]\((https?:\/\/.*?)\)/g,
        '<a href="$2" target="_blank" rel="noreferrer" class="text-cyan-300 underline font-bold hover:text-cyan-200 inline-flex items-center gap-0.5">$1</a>'
      );

      if (line.startsWith('### ')) {
        return (
          <h4
            key={idx}
            className="text-cyan-300 font-extrabold text-sm sm:text-base mt-2 mb-1 border-b border-cyan-500/20 pb-1"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace('### ', '') }}
          />
        );
      }

      if (line.startsWith('- ') || line.match(/^\d+\.\s/)) {
        return (
          <p
            key={idx}
            className="pl-3 my-1 border-l-2 border-cyan-500/40 text-gray-200 text-xs sm:text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      }

      return (
        <p
          key={idx}
          className="my-1 text-gray-200 text-xs sm:text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  // Compute smart position style for button and modal (raised higher on mobile above bottom navbar)
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  const defaultBottom = isMobile ? '95px' : '28px';
  const defaultRight = isMobile ? '16px' : '28px';

  const buttonStyle = position
    ? { left: `${position.x}px`, top: `${position.y}px` }
    : { right: defaultRight, bottom: defaultBottom };

  return (
    <div className={`fixed z-[9999] select-none ${cinzel.variable}`}>
      
      {/* 🌟 FULLY DRAGGABLE CIRCULAR AI TOGGLE BUTTON */}
      <div
        style={buttonStyle}
        className="fixed z-[9999] touch-none cursor-grab active:cursor-grabbing group transition-transform duration-75"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onClick={handleButtonClick}
      >
        {/* Tooltip Hover Badge */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1.5 px-3 py-1 rounded-xl glass-panel border border-cyan-500/40 text-cyan-300 text-[11px] font-mono whitespace-nowrap shadow-lg animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
          <GripVertical className="w-3 h-3 text-cyan-400" />
          <span>Drag Anywhere / Click to Talk</span>
        </div>

        <button
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-tr from-cyan-500 via-emerald-400 to-violet-600 shadow-[0_0_35px_rgba(6,182,212,0.8)] hover:shadow-[0_0_50px_rgba(6,182,212,1)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          aria-label="Toggle AI RAG Assistant Chat"
        >
          {/* Animated Pulsing Outer Ring */}
          <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-600 opacity-60 blur-md group-hover:opacity-100 animate-pulse transition-opacity" />

          {/* Inner Circle Content */}
          <div className="relative w-full h-full rounded-full bg-[#050711] border border-white/20 flex items-center justify-center overflow-hidden">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-300 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Online Green Dot Indicator */}
            <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-black" />
            </span>
          </div>
        </button>
      </div>

      {/* 🌟 FLOATING CHAT MODAL WINDOW */}
      {isOpen && (
        <div
          data-lenis-prevent="true"
          style={{
            left: position ? Math.min(position.x, (typeof window !== 'undefined' ? window.innerWidth - 440 : 300)) : undefined,
            bottom: isMobile ? '160px' : '100px',
          }}
          className="fixed right-4 sm:right-6 bottom-20 z-[9998] w-[92vw] sm:w-[440px] h-[560px] max-h-[82vh] glass-panel rounded-3xl border border-cyan-500/40 bg-[#070a14]/98 shadow-[0_30px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
        >
          
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-cyan-950/90 via-[#0a0f24] to-violet-950/90 border-b border-cyan-500/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 shadow-sm">
                <Bot className="w-5 h-5 text-cyan-300 animate-pulse" />
              </div>
              <div>
                <h3
                  style={{ fontFamily: 'var(--font-cinzel), serif' }}
                  className="text-sm sm:text-base font-black tracking-wider text-white uppercase bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent"
                >
                  AHMED HOSSAM AI RAG
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CV KNOWLEDGE BASE ACTIVE</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div
            ref={chatContainerRef}
            data-lenis-prevent="true"
            className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-left min-h-0 custom-chat-scrollbar touch-pan-y pointer-events-auto"
            style={{ scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-cyan-300" />
                  </div>
                )}

                <div
                  className={`max-w-[84%] p-3.5 rounded-2xl space-y-1 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold rounded-tr-none shadow-md'
                      : 'glass-panel border border-white/10 bg-[#0d1226]/95 text-gray-200 rounded-tl-none shadow-lg'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="text-xs sm:text-sm font-medium">{msg.text}</p>
                  ) : (
                    <div>{renderFormattedText(msg.text)}</div>
                  )}

                  <div
                    className={`text-[9px] font-mono ${
                      msg.sender === 'user' ? 'text-black/60 text-right' : 'text-gray-500 text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-emerald-300" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-cyan-400 text-xs font-mono p-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Searching CV Knowledge Base...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompt Chips */}
          <div className="px-4 py-2 bg-[#050711] border-t border-white/5 overflow-x-auto flex items-center gap-2 no-scrollbar shrink-0">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-xl text-[11px] font-mono bg-white/5 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all whitespace-nowrap shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#070914] border-t border-cyan-500/20 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about Ahmed's CV, skills, projects..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors font-sans"
              />

              <button
                type="submit"
                disabled={!inputQuery.trim() || loading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:scale-105 transition-all disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Send Query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}

