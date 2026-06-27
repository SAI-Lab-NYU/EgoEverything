import { ArrowUpRight } from "lucide-react";

import { SectionHeader } from "@/components/home/SectionHeader";
import { paperAssets } from "@/lib/content";

const mcqPreviews = [
  {
    label: "MCQ example 01",
    src: paperAssets.mcqExample1Pdf
  },
  {
    label: "MCQ example 02",
    src: paperAssets.mcqExample2Pdf
  }
];

const exampleNotes = [
  {
    label: "Question type",
    body: "Generated MCQs are manually classified into eight categories, including temporal-spatial, spatial-spatial, appearance, item presence, state verify, event verify, direct location, and others."
  },
  {
    label: "Question text",
    body: "The synthesizer drafts daily-life questions around a selected target object, then gathers additional video evidence before finalizing the multiple-choice item."
  },
  {
    label: "Evidence and labels",
    body: "Figure 4 links frames and keywords with color highlights: target objects, contextual entities, missing target regions, ground-truth labels, and VLM predictions."
  }
];

export function ExamplesPreview() {
  return (
    <section id="examples" className="bg-paper px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          eyebrow="04 / Examples"
          title="MCQs are grounded in target objects, visual evidence, and reviewed answer choices"
          description="EgoEverything examples show how a gaze-sampled target object becomes a natural multiple-choice question with supporting frames, colored evidence, and model-versus-ground-truth labels."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.42fr)]">
          <article className="border border-ink/15 bg-[#f9f7f1] p-3">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Figure 4 / MCQ evidence examples
              </p>
              <div className="flex flex-wrap gap-3">
                {mcqPreviews.map((preview) => (
                  <a
                    key={preview.label}
                    href={preview.src}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink hover:text-warm"
                  >
                    Open PDF
                    <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {mcqPreviews.map((preview) => (
                <div key={preview.label}>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {preview.label}
                  </p>
                  <iframe
                    title={preview.label}
                    src={`${preview.src}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="h-[380px] w-full border border-ink/10 bg-white sm:h-[500px] xl:h-[560px]"
                  />
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4">
            {exampleNotes.map((note, index) => (
              <article key={note.label} className="border border-ink/15 bg-paper p-5">
                <div className="flex items-center justify-between border-b border-ink/15 pb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-warm">
                    {note.label}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-6 text-muted">
                  {note.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
