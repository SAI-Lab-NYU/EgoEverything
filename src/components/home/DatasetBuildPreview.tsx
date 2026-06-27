import Image from "next/image";
import { ArrowUpRight, ClipboardCheck, Crosshair, Video } from "lucide-react";

import { paperAssets } from "@/lib/content";
import { SectionHeader } from "@/components/home/SectionHeader";

const buildSteps = [
  {
    title: "Long egocentric video + gaze",
    body: "Start from long AR recordings with gaze traces aligned to what the wearer attended to.",
    icon: Video
  },
  {
    title: "Gaze-oriented target sampling",
    body: "Sample meaningful targets around attention patterns instead of asking generic video questions.",
    icon: Crosshair
  },
  {
    title: "Reviewed MCQ",
    body: "Turn sampled targets into multiple-choice questions and keep the benchmark human reviewed.",
    icon: ClipboardCheck
  }
];

export function DatasetBuildPreview() {
  return (
    <section id="dataset-build" className="bg-paper px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          eyebrow="03 / How the dataset is built"
          title="From attention traces to reviewed AR memory questions"
          description="EgoEverything turns long first-person video and gaze into compact, reviewed MCQs through a gaze-oriented target sampling pipeline."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="grid border-l border-t border-ink/15 md:grid-cols-3">
            {buildSteps.map(({ title, body, icon: Icon }, index) => (
              <article
                key={title}
                className="border-b border-r border-ink/15 bg-paper p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-11 items-center justify-center border border-ink/20 text-ink">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-4xl font-black text-ink/15">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-base font-semibold uppercase tracking-[0.12em] text-ink">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">{body}</p>
              </article>
            ))}
          </div>

          <a
            href={paperAssets.pipelinePdf}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col border border-ink/15 bg-[#f9f7f1] p-3 transition hover:border-ink"
          >
            <div className="overflow-hidden border border-ink/10 bg-white">
              <Image
                src={paperAssets.pipeline}
                alt="Small preview of the EgoEverything data generation pipeline"
                width={520}
                height={320}
                className="h-40 w-full object-cover object-left-top"
              />
            </div>
            <span className="mt-4 inline-flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
              View pipeline
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
