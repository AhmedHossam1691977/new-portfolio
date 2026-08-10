import HeroSection from '@/components/HeroSection';
import AboutSkillsSection from '@/components/AboutSkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="relative bg-[#050609] min-h-screen">
      <HeroSection />
      <AboutSkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

