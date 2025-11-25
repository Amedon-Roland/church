import AboutHero from "@/components/AboutHero";
import BenefitsList from "@/components/BenefitsList";
import Footer from "@/components/Footer";
import MissionSection from "@/components/MissionSection";
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import TeamSection from "@/components/TeamSection";

export default function About() {
  return (
    <main className="min-h-screen bg-white dark:bg-background">
      <Navbar />
      <AboutHero />
      <MissionSection />
      <BenefitsList />
      <TeamSection />
      <NewsSection />
      <Footer />
    </main>
  );
}
