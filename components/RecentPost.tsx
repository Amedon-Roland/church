import Image from "next/image";
import Link from "next/link";

export default function RecentPost() {
  return (
    <section className="py-12 bg-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card shadow-sm border border-transparent dark:border-border p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
             <Image
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
              alt="Recent Post"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest mb-4">
              <span>Tuesday 13 May, 2022</span>
              <span>By John HunaU Deo</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif leading-tight">
              CHURCH WAS DOING WHAT HE OFTEN DID WHEN DROPPED AN ORACLE
            </h2>
            
            <p className="text-txt-muted mb-8 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
            </p>
            
            <Link href="/blog/single-post" className="bg-[var(--primary)] text-white px-8 py-3 rounded-sm font-bold uppercase text-sm tracking-widest hover:bg-[var(--primary-hover)] transition-colors inline-block">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
