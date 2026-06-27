import { failureFactors } from "@/lib/content";

function FailureSvg({ index }: { index: number }) {
  const className = "mt-6 h-24 w-full text-paper";

  if (index === 0) {
    return (
      <svg className={className} viewBox="0 0 260 96" aria-hidden="true">
        <path d="M24 52H236" stroke="currentColor" strokeOpacity=".18" />
        {[44, 92, 140, 188, 236].map((x) => (
          <path key={x} d={`M${x} 42v20`} stroke="currentColor" strokeOpacity=".24" />
        ))}
        <circle r="8" fill="#e6502f">
          <animate attributeName="cx" values="44;236;44" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="cy" values="52" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <path d="M36 22h46v18H36z" fill="none" stroke="currentColor" strokeOpacity=".32" />
        <text x="43" y="35" fill="currentColor" fillOpacity=".58" fontSize="10" fontWeight="700">
          t - 10m
        </text>
        <path d="M222 22h22v18h-22z" fill="none" stroke="currentColor" strokeOpacity=".32" />
        <text x="230" y="35" fill="currentColor" fillOpacity=".58" fontSize="10" fontWeight="700">
          t
        </text>
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg className={className} viewBox="0 0 260 96" aria-hidden="true">
        <circle cx="130" cy="48" r="18" fill="none" stroke="currentColor" strokeOpacity=".24" />
        <circle cx="130" cy="48" r="4" fill="#e6502f" />
        {[42, 218, 64, 202].map((x, i) => (
          <rect
            key={x}
            x={x}
            y={i < 2 ? 30 : 62}
            width="18"
            height="14"
            fill="currentColor"
            fillOpacity=".2"
          >
            <animate attributeName="fill-opacity" values=".12;.42;.12" dur="2.8s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
          </rect>
        ))}
        <path d="M130 48L51 37M130 48l97-11M130 48L73 69M130 48l81 21" stroke="currentColor" strokeOpacity=".16" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg className={className} viewBox="0 0 260 96" aria-hidden="true">
        <path d="M86 25h58v44H86z" fill="none" stroke="currentColor" strokeOpacity=".28" />
        <circle cx="124" cy="43" r="14" fill="none" stroke="#e6502f" strokeWidth="2">
          <animate attributeName="r" values="10;18;10" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <path d="M136 55l28 24" stroke="#e6502f" strokeWidth="2" strokeLinecap="square" />
        <rect x="111" y="39" width="7" height="7" fill="currentColor" fillOpacity=".7" />
        <rect x="190" y="28" width="10" height="10" fill="currentColor" fillOpacity=".2" />
        <rect x="56" y="64" width="8" height="8" fill="currentColor" fillOpacity=".2" />
      </svg>
    );
  }

  return null;
}

export function FailureAnalysisPreview() {
  return (
    <section className="bg-ink px-4 py-16 text-paper sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-4 border-t border-paper/20 pt-5 lg:grid-cols-[minmax(0,0.99fr)_minmax(0,0.88fr)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/55">
            05 / Analysis
          </p>
          <div className="lg:col-start-1">
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">
              Why current models struggle
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-paper/62">
              EgoEverything exposes systematic limitations in current VLMs:
              longer recall intervals, targets farther from gaze, and smaller
              target objects.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-paper/18 bg-paper/18 md:grid-cols-3">
          {failureFactors.map((factor, index) => (
            <article key={factor.title} className="bg-ink p-5">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center border border-paper/20 text-xs font-semibold text-paper/65">
                  0{index + 1}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-warm">
                  {factor.marker}
                </span>
              </div>
              <FailureSvg index={index} />
              <h3 className="mt-6 font-display text-2xl font-semibold leading-tight">
                {factor.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-paper/58">
                {factor.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
