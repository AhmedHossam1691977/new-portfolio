import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Preloader from '@/components/Preloader';
import AIChatWidget from '@/components/AIChatWidget';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Ahmed Hossam — Full Stack Developer & System Architect',
  description: 'Full Stack Engineer specializing in modern Next.js, Node.js, NestJS, Socket.IO, and AI integrations. Based in Cairo, Egypt.',
  keywords: [
    'Ahmed Hossam',
    'Full Stack Developer',
    'Next.js Developer',
    'Node.js Engineer',
    'GSAP Portfolio',
    'Cairo Egypt Developer',
    'React.js',
    'TypeScript',
    'NestJS',
    'Socket.IO',
  ],
  authors: [{ name: 'Ahmed Hossam' }],
  openGraph: {
    title: 'Ahmed Hossam — Full Stack Developer & System Architect',
    description: 'Ultra-modern interactive portfolio showcasing full stack web systems, mobile backends, and AI applications.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="antialiased transition-colors duration-400">
        <AppProvider>
          <Preloader />
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <AIChatWidget />
          </SmoothScroll>
        </AppProvider>
      </body>
    </html>
  );
}
