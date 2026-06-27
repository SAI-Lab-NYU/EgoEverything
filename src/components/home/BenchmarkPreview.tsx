import { benchmarkResults } from "@/lib/content";

export function BenchmarkPreview() {
  return (
    <section className="bg-paper px-4 pb-16 pt-0 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="pt-5 lg:grid lg:grid-cols-[minmax(0,0.99fr)_minmax(0,0.88fr)]">
          <div>
            <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
              Current VLMs remain well below human performance
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              The homepage preview surfaces the headline gap: strong models
              improve over text-only baselines, but still struggle with
              long-horizon visual memory, small details, and
              attention-conditioned evidence.
            </p>
          </div>
        </div>

        <div id="leaderboard" className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border border-ink bg-ink p-5 text-paper sm:p-7">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/55">
                  Leaderboard Snapshot
                </p>
                <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
                  A 20.4 point gap from best VLM to human review.
                </h3>
              </div>
              <span className="hidden border border-paper/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/70 sm:block">
                ECCV 2026
              </span>
            </div>

            <div className="mt-8 space-y-5">
              {benchmarkResults.map((result) => {
                const Icon = result.icon;

                return (
                  <div key={result.label}>
                    <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                      <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.13em] text-paper/75">
                        <Icon aria-hidden="true" size={16} strokeWidth={1.7} />
                        {result.label}
                      </span>
                      <span className="font-display text-2xl font-semibold text-paper">
                        {result.value.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 border border-paper/18 bg-paper/8">
                      <div
                        className={`h-full ${
                          result.label === "Human"
                            ? "bg-paper"
                            : result.label === "Best VLM"
                              ? "bg-cool"
                              : "bg-warm"
                        }`}
                        style={{ width: `${result.value}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-paper/55">
                      {result.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {benchmarkResults.map((result) => {
              const Icon = result.icon;

              return (
                <article
                  key={result.label}
                  className="border border-ink/15 bg-paper p-5"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <Icon aria-hidden="true" size={20} strokeWidth={1.7} />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      Accuracy
                    </span>
                  </div>
                  <p className="font-display text-5xl font-black text-ink">
                    {result.value.toFixed(1)}%
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-ink">
                    {result.label}
                  </h3>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
