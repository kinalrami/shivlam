import Link from "next/link";

export default function Hero() {
  return (
    <main className="relative z-10 min-h-0 flex-1">
      <section
        className="flex max-w-[900px] flex-col justify-center font-sans md:min-h-[75vh] px-[1.2rem] pt-8 pb-12 text-[0.95rem] sm:min-h-[70vh] sm:px-8 sm:pt-10 sm:text-[1.05rem] lg:px-12"
      >
        <div
          className="font-mono mb-6 flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-sl-saffron"
        >
          Spatial Computing Studio
        </div>

        <h1
          className="mb-6 max-w-[900px] font-sans text-[clamp(2rem,5vw,4.2rem)] font-light leading-[1.1] tracking-[-0.02em] text-sl-text"
        >
          We build in
          <br />
          <span className="font-normal text-sl-saffron">
            three dimensions.
          </span>
        </h1>

        <p className="mb-10 max-w-[540px] font-sans font-light leading-[1.75] text-gray-400">
          AR/BIM overlays on iPad. LiDAR-driven 3D reconstruction. Immersive
          AR/VR experiences. We turn spatial data into production-ready
          software.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/#work"
            className="rounded-sm border border-sl-saffron px-7 py-3 font-mono text-[0.78rem] font-bold tracking-[0.05em] text-sl-saffron transition-[filter] hover:brightness-110"
          >
            See our work
          </Link>
          <Link
            href="/#services"
            className="font-mono text-[0.78rem] tracking-[0.05em] text-gray-400 transition-colors hover:text-sl-saffron"
          >
            ↓ Explore services
          </Link>
        </div>
      </section>
    </main>
  );
}
