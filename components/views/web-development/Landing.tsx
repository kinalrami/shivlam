"use client";

import { Marquee } from "@/components/shared/Marquee";
import ContactForm from "@/components/views/home/ContactForm";
import { WEB_DEVELOPMENT_CONTENT } from "./content";
import { Hero } from "./Hero";
import { StatsStrip } from "./StatsStrip";
import { Services } from "./Services";
import { MidCta } from "./MidCta";
import { TechStack } from "./TechStack";
import { Design } from "./Design";
import { WhyUs } from "./WhyUs";
import { Portfolio } from "./Portfolio";
import { PortfolioCta } from "./PortfolioCta";
import { Process } from "./Process";
import { ClientsStrip } from "./ClientsStrip";
// import { Ethos } from "./Ethos";
import { MoreServices } from "./MoreServices";
import { FinalCta } from "./FinalCta";

export default function Landing() {
  const c = WEB_DEVELOPMENT_CONTENT;

  return (
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <Hero content={c.hero} />
      <Marquee items={c.marquee} />
      <StatsStrip items={c.stats} />
      <Services content={c.services} />
      <MidCta content={c.midCta} />
      <TechStack content={c.tech} />
      <Design content={c.design} />
      <WhyUs content={c.why} />
      <Portfolio content={c.portfolio} />
      <PortfolioCta content={c.portfolioCta} />
      <Process content={c.process} />
      <ClientsStrip content={c.clients} />
      {/* <Ethos content={c.ethos} /> */}
      <MoreServices content={c.more} />
      <FinalCta content={c.finalCta} />
      <ContactForm />
    </div>
  );
}

