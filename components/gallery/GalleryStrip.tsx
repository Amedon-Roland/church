import Image from "next/image";

export type StripItem = { src: string; alt: string; caption?: string; remote?: boolean };

// Une alternance de formats donne le rythme d'un mur de photos de famille.
const SHAPES = [
  "aspect-[4/5] w-[70vw] sm:w-[40vw] lg:w-[24vw]",
  "aspect-[3/2] w-[84vw] sm:w-[56vw] lg:w-[38vw] lg:mt-16",
  "aspect-square w-[70vw] sm:w-[40vw] lg:w-[26vw]",
  "aspect-[3/2] w-[84vw] sm:w-[56vw] lg:w-[36vw] lg:mt-10",
];

/**
 * Bande de photos. Au doigt ou au clavier : un carrousel à faire glisser.
 * À la souris sur grand écran : la bande s'épingle et avance avec la molette.
 */
export function GalleryStrip({ items, children }: { items: StripItem[]; children: React.ReactNode }) {
  return (
    <section data-hscroll className="group/strip overflow-hidden py-20 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:pb-16 lg:pt-28">
      <div className="container-x">{children}</div>
      <div
        data-hscroll-track
        tabIndex={0}
        role="group"
        aria-label="Photos de la vie de l'église — faites défiler horizontalement"
        className="mt-10 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] group-[.is-pinned]/strip:snap-none group-[.is-pinned]/strip:overflow-visible sm:gap-6 sm:px-8 lg:mt-14 lg:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <figure key={item.src} className={`relative shrink-0 snap-center ${SHAPES[i % SHAPES.length]}`}>
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-linen">
              <div data-hscroll-item className="absolute inset-y-0 -left-[8%] w-[116%]">
                <Image src={item.src} alt={item.alt} fill unoptimized={item.src.startsWith("/media/")} sizes="(min-width: 1024px) 40vw, 85vw" className="object-cover" />
              </div>
            </div>
            {item.caption && <figcaption className="mt-3 text-sm text-ink-mute">{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
