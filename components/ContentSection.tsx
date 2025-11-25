import Image from "next/image";

export default function ContentSection() {
  return (
    <section className="py-24 bg-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gray-500 uppercase tracking-widest text-xs font-medium mb-2">Au Quotidien</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-txt-main mb-6">
            AMOUR ET COMPASSION
          </h2>
          <p className="text-txt-muted leading-relaxed mb-8">
            Nous sommes une communauté qui croit en l'amour de Dieu et la compassion envers tous. Notre mission est de partager l'évangile, de servir notre communauté et de faire grandir la foi de chacun dans un environnement accueillant et bienveillant.
          </p>
          <button className="bg-[var(--primary)] text-white px-8 py-3 rounded-sm font-bold uppercase text-sm tracking-widest hover:bg-[var(--primary-hover)] transition-colors">
            Lire Plus
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1544427920-24e832256f72?q=80&w=1974&auto=format&fit=crop"
              alt="Community"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden mt-0 md:mt-12">
             <Image
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
              alt="Prayer"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
             <Image
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
              alt="Worship"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
