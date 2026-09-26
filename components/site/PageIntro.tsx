/** En-tête des pages intérieures : sur-titre, grand titre, chapeau. */
export function PageIntro({ kicker, title, lead, children }: { kicker: string; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="paper-grain border-b border-line">
      <div className="container-x pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pt-20">
        <p className="kicker animate-rise">{kicker}</p>
        <h1 className="mt-5 max-w-4xl animate-rise text-[2.6rem] leading-[1.04] text-ink [animation-delay:80ms] sm:text-6xl lg:text-7xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl animate-rise text-lg text-ink-soft [animation-delay:160ms] sm:text-xl">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
