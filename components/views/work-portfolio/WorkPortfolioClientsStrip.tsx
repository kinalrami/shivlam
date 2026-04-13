import { Marquee } from "@/components/shared/Marquee";
import { WORK_PORTFOLIO_CLIENT_NAMES } from "@/lib/work-portfolio/clients";

export function WorkPortfolioClientsStrip() {
  return (
    <section className="border-t-2 border-orange-400 py-7" aria-label="Clients">
      <p className="mb-7 text-center font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
        Clients who trust us · 3+ continents
      </p>
      <Marquee items={[...WORK_PORTFOLIO_CLIENT_NAMES]} repeat={2} className="border-t-0 bg-transparent py-0" />
    </section>
  );
}
