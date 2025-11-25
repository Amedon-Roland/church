import { Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export default function TeamSection() {
  const team = [
    {
      name: "Kim Bowen",
      role: "Pasteur",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Danielle Watkins",
      role: "Pasteur",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    },
    {
      name: "Naomi Craig",
      role: "Pasteur",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Santos Payne",
      role: "Pasteur",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 bg-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gray-500 uppercase tracking-widest text-xs font-medium mb-2">Membres de l'Église</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary uppercase">
            Rencontrez notre équipe inspirante
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-card p-8 text-center group hover:bg-card-hover hover:shadow-xl transition-all duration-300 rounded-lg border border-transparent dark:border-border">
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[var(--primary)] transition-colors">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 uppercase">{member.name}</h3>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">{member.role}</p>
              
              <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href="#" className="text-txt-main hover:text-[var(--primary)] transition-colors"><Facebook size={18} /></a>
                <a href="#" className="text-txt-main hover:text-[var(--primary)] transition-colors"><Twitter size={18} /></a>
                <a href="#" className="text-txt-main hover:text-[var(--primary)] transition-colors"><Linkedin size={18} /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
