import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SermonEvents from "@/components/SermonEvents";
import SermonHero from "@/components/SermonHero";
import UpcomingSermon from "@/components/UpcomingSermon";

export default function Sermon() {
  return (
    <main className="min-h-screen bg-white dark:bg-background">
      <Navbar />
      <SermonHero />
      <UpcomingSermon />
      <SermonEvents />
      <Footer />
    </main>
  );
}
