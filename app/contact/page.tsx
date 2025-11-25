import ContactForm from "@/components/ContactForm";
import ContactHero from "@/components/ContactHero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Contact() {
  return (
    <main className="min-h-screen bg-white dark:bg-background">
      <Navbar />
      <ContactHero />
      <ContactForm />
      <Footer />
    </main>
  );
}
