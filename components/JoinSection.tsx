import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function JoinSection() {
  return (
    <section className="py-24 bg-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gray-500 uppercase tracking-widest text-xs font-medium mb-2">Rejoignez-Nous</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--tertiary)]">
            REJOIGNEZ-NOUS ET FAITES PARTIE <br /> DE QUELQUE CHOSE DE GRAND
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/3 bg-subtle p-10 h-full min-h-[400px] flex flex-col justify-center border border-transparent dark:border-border">
            <p className="text-[var(--primary)] uppercase tracking-widest text-xs font-bold mb-4">À Venir</p>
            <h3 className="text-2xl font-bold mb-6">QUI NOUS SOMMES ET CE QUE NOUS CROYONS</h3>
            <p className="text-txt-muted mb-8 text-sm leading-relaxed">
              Nous sommes une église qui croit en la puissance transformatrice de l'évangile. Notre communauté est un lieu d'accueil, de croissance spirituelle et de service.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-txt-muted">
                <Clock className="w-5 h-5 text-[var(--primary)]" />
                <span>Dimanche 10h00</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-txt-muted">
                <MapPin className="w-5 h-5 text-[var(--primary)]" />
                <span>Lomé, Togo</span>
              </div>
            </div>

            <button className="bg-[var(--secondary)] text-white px-8 py-3 rounded-sm font-bold uppercase text-sm tracking-widest hover:bg-[var(--tertiary)] transition-colors w-fit">
              Lire Plus
            </button>
          </div>

          <div className="w-full lg:w-2/3 relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
              alt="Join Us"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
