import BlogHero from "@/components/BlogHero";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RecentPost from "@/components/RecentPost";

export default function Blog() {
  return (
    <main className="min-h-screen bg-white dark:bg-background">
      <Navbar />
      <BlogHero />
      <RecentPost />
      <BlogList />
      <Footer />
    </main>
  );
}
