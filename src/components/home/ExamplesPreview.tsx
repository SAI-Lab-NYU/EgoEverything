import { examples } from "@/lib/content";
import { SectionHeader } from "@/components/home/SectionHeader";

export function ExamplesPreview() {
  return (
    <section id="examples" className="bg-paper px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          eyebrow="04 / Examples"
          title="Questions look like lived AR memory, not static image QA"
          description="Example previews combine category labels, temporal cues, and compact visual traces so researchers can quickly understand the benchmark's evaluation surface."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {examples.map((example, index) => {
            const Icon = example.icon;

            return (
              <article
                key={example.label}
                className="group min-h-[360px] border border-ink/15 bg-[#f9f7f1] p-4 transition hover:-translate-y-1 hover:border-ink"
              >
                <div className="flex h-full flex-col">
                  <div className="relative h-36 overflow-hidden border border-ink/15 bg-ink">
                    <div className="absolute inset-0 opacity-35 [background:linear-gradient(135deg,transparent_0_44%,rgba(255,255,255,.42)_44%_46%,transparent_46%),radial-gradient(circle_at_70%_34%,#e6502f_0_4px,transparent_5px),radial-gradient(circle_at_28%_66%,#3858ff_0_18px,transparent_19px)]" />
                    <div className="absolute left-3 top-3 grid h-8 w-8 place-items-center border border-paper/30 text-paper">
                      <Icon aria-hidden="true" size={17} strokeWidth={1.7} />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="mb-2 flex items-center gap-1">
                        {[0, 1, 2, 3].map((tick) => (
                          <span
                            key={tick}
                            className={`h-1.5 flex-1 ${
                              tick === index % 4 ? "bg-warm" : "bg-paper/28"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-paper/70">
                        Preview trace {index + 1}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-b border-ink/15 pb-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-warm">
                      {example.label}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {example.meta}
                    </span>
                  </div>

                  <p className="mt-5 font-display text-2xl font-semibold leading-tight text-ink">
                    {example.question}
                  </p>

                  <div className="mt-auto pt-8">
                    <span className="inline-flex border border-ink/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition group-hover:border-ink group-hover:text-ink">
                      View example
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
