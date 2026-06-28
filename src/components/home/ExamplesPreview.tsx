import { ArrowUpRight } from "lucide-react";

import { ExampleBrowser } from "@/components/home/ExampleBrowser";
import { SectionHeader } from "@/components/home/SectionHeader";
import { paperAssets } from "@/lib/content";

export function ExamplesPreview() {
  return (
    <section id="examples" className="bg-paper px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          eyebrow="04 / Examples"
          title="MCQs are grounded in target objects, visual evidence, and reviewed answer choices"
          description="EgoEverything examples show how a gaze-sampled target object becomes a natural multiple-choice question with supporting frames, colored evidence, and model-versus-ground-truth labels."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,0.99fr)_minmax(0,0.88fr)]">
          <article className="border border-ink/15 bg-[#f9f7f1] p-3">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Figure 4 / MCQ evidence examples
              </p>
              <a
                href={paperAssets.mcqExampleCombinedPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink hover:text-warm"
              >
                Open PDF
                <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.8} />
              </a>
            </div>

            <iframe
              title="Combined MCQ examples"
              src={`${paperAssets.mcqExampleCombinedPdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              className="aspect-[1.11/1] h-auto w-full border border-ink/10 bg-white"
            />
          </article>

          <ExampleBrowser />
        </div>
      </div>
    </section>
  );
}
