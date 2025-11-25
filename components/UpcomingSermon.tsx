import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function UpcomingSermon() {
  return (
    <section className="py-24 bg-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gray-500 uppercase tracking-widest text-xs font-medium mb-2">Prochains Sermons</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--tertiary)] uppercase max-w-2xl mx-auto">
            Rejoignez-nous et faites partie de quelque chose de grand
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row bg-subtle overflow-hidden border border-transparent dark:border-border">
          <div className="w-full lg:w-1/3 p-12 flex flex-col justify-center relative">
            <div className="absolute top-12 right-12 text-right">
               <span className="block text-2xl font-bold">20</span>
               <span className="block text-xs uppercase tracking-widest">Juillet</span>
            </div>
            
            <p className="text-[var(--primary)] uppercase tracking-widest text-xs font-bold mb-4">Événement à Venir</p>
            <h3 className="text-2xl font-bold mb-6 uppercase leading-tight">Regardez et écoutez nos sermons</h3>
            <p className="text-txt-muted mb-8 text-sm leading-relaxed">
              Rejoignez-nous pour des messages puissants qui transforment les vies et renforcent la foi.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-txt-muted">
                <Clock className="w-5 h-5 text-[var(--tertiary)]" />
                <div>
                    <p>Dimanche 10h00</p>
                    <p>Mercredi 19h00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-txt-muted">
                <MapPin className="w-5 h-5 text-[var(--tertiary)]" />
                <div>
                    <p>Lomé, Togo</p>
                </div>
              </div>
            </div>

            <button className="bg-[var(--secondary)] text-white px-8 py-3 rounded-sm font-bold uppercase text-sm tracking-widest hover:bg-black transition-colors w-fit">
              S'inscrire
            </button>
          </div>

          <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
              alt="Upcoming Sermon"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="text-center mt-16">
            <a href="#" className="inline-flex items-center gap-2 text-[var(--tertiary)] font-bold uppercase tracking-widest text-sm hover:text-[var(--primary)] transition-colors">
                Voir tous les Sermons <span className="text-xl">→</span>
            </a>
        </div>
      </div>
    </section>
  );
}
