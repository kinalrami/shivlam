import Link from "next/link";

export default function Hero() {
  return (
    <main className="relative z-10 min-h-0 flex-1">
      <section
        className="flex max-w-225 flex-col justify-center font-sans md:min-h-[75vh] px-5 pt-8 pb-12 text-sm sm:min-h-[70vh] sm:px-8 sm:pt-10 sm:text-base lg:px-12"
      >
        {/* <div
          className="font-mono mb-6 flex items-center gap-3 text-xs font-medium uppercase text-sl-saffron"
        >
          Spatial Computing Studio
        </div> */}

        <h1
          className="mb-6 max-w-225 font-sans text-[clamp(2rem,5vw,4.2rem)] font-light leading-[1.1] text-sl-text"
        >
          Engineering the Future
          <br />
          <span className="font-normal text-sl-saffron">
            of Immersive Tech.
          </span>
        </h1>

        <p className="mb-10 max-w-135 font-sans font-light leading-[1.75] text-gray-400">
          From high-performance AR solutions to scalable web ecosystems, we build the complex tech that moves industries forward.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/#work"
            className="rounded-sm border border-sl-saffron px-7 py-3 font-mono text-sm font-bold text-sl-saffron transition-[filter] hover:brightness-110"
          >
            Explore Our Solutions
          </Link>
          {/* <Link
            href="/#services"
            className="font-mono text-[0.78rem] tracking-[0.05em] text-gray-400 transition-colors hover:text-sl-saffron"
          >
            ↓ Explore services
          </Link> */}
        </div>
      </section>
    </main>
  );
}
