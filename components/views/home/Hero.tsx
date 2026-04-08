import Link from "next/link";

export default function Hero() {
  return (
    <main className="relative z-10 flex-1">
      <section className="font-sans text-sm sm:text-base">
        <div className="mx-auto flex w-full max-w-325 flex-col items-start justify-start px-5 pt-8 pb-8 sm:pt-12 sm:pb-20 md:px-12">
          <div className="flex max-w-225 w-full flex-col items-start justify-start">
            {/* <div
          className="font-mono mb-6 flex items-center gap-3 text-xs font-medium uppercase text-sl-saffron"
        >
          Spatial Computing Studio
        </div> */}
            <h1
              className="mb-4 max-w-225 font-sans text-4xl font-light leading-tight text-sl-text sm:text-5xl md:text-6xl"
            >
              Sustainable Retrofitting
              <br />
              <span className="font-normal text-sl-saffron">
                Engineering the Future.
              </span>
            </h1>

            <p className="mb-6 max-w-2xl font-sans font-light leading-relaxed text-gray-400">
              Re-creating the current infrastructure with Retrofit BIM and AI-controlled accuracy. To the sophisticated District Cooling optimisation, to the AR solution that can make cities smarter and greener, we develop the technology to make things work.
            </p>

            <div className="flex flex-wrap items-center justify-start gap-4">
              <Link
                href="https://deltaarbim.tech/"
                target="_blank"
                className="rounded-sm border border-sl-saffron px-7 py-3 font-mono text-sm font-bold text-sl-saffron transition-[filter] hover:brightness-110"
              >
                See BIM in Action
              </Link>
              {/* <Link
            href="/#services"
            className="font-mono text-[0.78rem] tracking-[0.05em] text-gray-400 transition-colors hover:text-sl-saffron"
          >
            ↓ Explore services
          </Link> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
