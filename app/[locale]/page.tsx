import AboutHero from "@/components/AboutHero";
import BenefitsSection from "@/components/BenefitsSection";
import BlogHero from "@/components/BlogHero";
import BlogList from "@/components/BlogList";
import ContactForm from "@/components/ContactForm";
import ContactHero from "@/components/ContactHero";
import ContentSection from "@/components/ContentSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import JoinSection from "@/components/JoinSection";
import MissionSection from "@/components/MissionSection";
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import QuoteSection from "@/components/QuoteSection";
import RecentPost from "@/components/RecentPost";
import SermonEvents from "@/components/SermonEvents";
import SermonHero from "@/components/SermonHero";
import TeamSection from "@/components/TeamSection";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import UpcomingSermon from "@/components/UpcomingSermon";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-background">
      <Navbar />
      <ScrollToTop />
      
      {/* Home Section */}
      <section id="home">
        <Hero />
        <FeaturesSection />
        <ContentSection />
        <BenefitsSection />
        <JoinSection />
        <QuoteSection />
        <NewsSection />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutHero />
        <MissionSection />
        <TeamSection />
      </section>

      {/* Sermon Section */}
      <section id="sermon">
        <SermonHero />
        <UpcomingSermon />
        <SermonEvents />
      </section>

      {/* Blog Section */}
      <section id="blog">
        <BlogHero />
        <RecentPost />
        <BlogList />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactHero />
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}
