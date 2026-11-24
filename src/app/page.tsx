import HeroSection from '@/components/HeroSection';
import AboutSkillsSection from '@/components/AboutSkillsSection';
import ServicesSection from '@/components/ServicesSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="relative theme-bg min-h-screen">
      <HeroSection />
      <AboutSkillsSection />
      <ExperienceSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}


