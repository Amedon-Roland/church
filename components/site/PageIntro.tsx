import { Weave } from "@/components/ui/Weave";

/** En-tête des pages intérieures : sur-titre, grand titre, chapeau, puis la bande tissée. */
export function PageIntro({ kicker, title, lead, children }: { kicker: string; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="relative">
      <div className="container-x pb-14 pt-12 sm:pb-20 sm:pt-16 lg:pt-24">
        <p className="kicker" data-reveal>
          {kicker}
        </p>
        <h1 data-split="now" className="t-1 mt-6 max-w-5xl text-ink">
          {title}
        </h1>
        {lead && (
          <p data-reveal className="lead mt-7 max-w-2xl">
            {lead}
          </p>
        )}
        {children}
      </div>
      <Weave height={10} />
    </section>
  );
}
