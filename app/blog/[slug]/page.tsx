import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function SingleBlogPost() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] dark:bg-background">
      <Navbar />
      
      <article className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#F3D5B5] uppercase tracking-widest text-xs font-bold mb-4">Relationship</p>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-black dark:text-white mb-6 leading-tight">
              HOW TO SHOW COMPASSION
            </h1>
            <div className="flex justify-center gap-8 text-xs text-gray-500 uppercase tracking-widest">
              <span>13 May, 2018</span>
              <span>By Mathew Johnson</span>
            </div>
          </div>

          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-16">
            <Image
              src="https://images.unsplash.com/photo-1544427920-24e832256f72?q=80&w=1974&auto=format&fit=crop"
              alt="Blog Post"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg mx-auto text-gray-600 dark:text-gray-300 dark:prose-invert">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6 uppercase font-serif">Lorem ipsum dolor sit amet</h2>
            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p className="mb-8 leading-relaxed">
              Aenean vel elit scelerisque mauris. Imperdiet sed euismod nisi porta lorem mollis aliquam. Quis vel eros donec ac odio tempor orci dapibus ultrices. Elementum eu facilisis sed odio morbi. Nam at lectus urna duis convallis convallis tellus id. Feugiat pretium nibh ipsum consequat nisl vel. Elementum pulvinar etiam non quam lacus. Sit amet porttitor eget.
            </p>

            <div className="relative h-[300px] w-full rounded-xl overflow-hidden mb-12">
               <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                alt="Blog Content"
                fill
                className="object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-black dark:text-white mb-6 uppercase font-serif">Lorem ipsum dolor sit amet</h2>
            <p className="mb-8 leading-relaxed">
              Aenean vel elit scelerisque mauris. Imperdiet sed euismod nisi porta lorem mollis aliquam. Quis vel eros donec ac odio tempor orci dapibus ultrices. Elementum eu facilisis sed odio morbi. Nam at lectus urna duis convallis convallis tellus id. Feugiat pretium nibh ipsum consequat nisl vel. Elementum pulvinar etiam non quam lacus. Sit amet porttitor eget.
            </p>

            <blockquote className="border-l-4 border-[#F3D5B5] pl-6 py-4 my-12 bg-white dark:bg-white/5 p-8 rounded-r-lg shadow-sm">
              <p className="text-xl font-serif italic text-black dark:text-white mb-4">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis faucibus in ornare quam viverra orci sagittis eu volutpat."
              </p>
            </blockquote>

            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6 uppercase font-serif">Lorem ipsum dolor sit amet consectetur</h2>
             <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
                <li>Purus sit amet luctus venenatis lectus magna</li>
                <li>Aenean vel elit scelerisque mauris. Imperdiet sed euismod</li>
             </ul>
             
             <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
