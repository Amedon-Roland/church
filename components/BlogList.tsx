import Link from "next/link";

export default function BlogList() {
  const posts = [
    {
      category: "RELATIONSHIP",
      title: "THE BEST WAY TO INSPIRE PEOPLE",
      author: "Mathew Johnson",
      date: "Tuesday 13 May, 2018",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      category: "RELATIONSHIP",
      title: "HOW TO SHOW COMPASSION",
      author: "Mathew Johnson",
      date: "Tuesday 13 May, 2018",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      category: "RELATIONSHIP",
      title: "THE BIBLICAL PURPOSE OF MONEY",
      author: "Mathew Johnson",
      date: "Tuesday 13 May, 2018",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      category: "RELATIONSHIP",
      title: "THE BEST WAY TO INSPIRE PEOPLE",
      author: "Mathew Johnson",
      date: "Tuesday 13 May, 2018",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      category: "RELATIONSHIP",
      title: "WHAT IT MEANS TO BE A DISCIPLE",
      author: "Mathew Johnson",
      date: "Tuesday 13 May, 2018",
      description: "We both celebrate and challenge the culture around us as we orient our lives around Jesus. We want",
    },
    {
      category: "RELATIONSHIP",
      title: "WHAT IT MEANS TO BELIEVE",
      author: "Mathew Johnson",
      date: "Tuesday 13 May, 2018",
      description: "We both celebrate and challenge the culture around us as we orient our lives around Jesus. We want",
    },
    {
      category: "RELATIONSHIP",
      title: "THE MODERN CHURCH IN 2022",
      author: "Mathew Johnson",
      date: "Tuesday 13 May, 2018",
      description: "We both celebrate and challenge the culture around us as we orient our lives around Jesus. We want",
    },
  ];

  return (
    <section className="py-24 bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--tertiary)] uppercase">
            ALL BLOG POSTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-card p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-transparent dark:border-border">
              <p className="text-[var(--primary)] uppercase tracking-widest text-[10px] font-bold mb-4">{post.category}</p>
              <Link href="/blog/single-post">
                <h3 className="text-lg font-bold mb-4 uppercase leading-tight hover:text-[var(--primary)] transition-colors cursor-pointer">
                  {post.title}
                </h3>
              </Link>
              <p className="text-txt-muted text-sm leading-relaxed mb-6 flex-grow">
                {post.description}
              </p>
              
              <div className="mt-auto">
                <p className="text-[var(--tertiary)] font-bold text-xs mb-1">By {post.author}</p>
                <p className="text-gray-500 text-[10px]">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
