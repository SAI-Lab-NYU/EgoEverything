import {
  ArrowUpRight,
  CircleCheckBig,
  Clock,
  Crosshair,
  Ellipsis,
  Eye,
  MapPin,
  PackageSearch,
  Palette,
  ClipboardCheck,
  type LucideIcon
} from "lucide-react";
import Image from "next/image";

import { paperAssets, stats } from "@/lib/content";

const questionDistribution = [
  { label: "Temporal-Spatial", value: 23.0 },
  { label: "Spatial-Spatial", value: 16.3 },
  { label: "Appearance", value: 14.6 },
  { label: "Item Presence", value: 13.7 },
  { label: "State Verify", value: 11.7 },
  { label: "Event Verify", value: 8.6 },
  { label: "Direct Location", value: 6.1 },
  { label: "Others", value: 5.9 }
];

const maxQuestionShare = Math.max(
  ...questionDistribution.map((item) => item.value)
);

const questionCategories: {
  label: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Temporal-Spatial",
    detail: "when + where",
    icon: Clock
  },
  {
    label: "Spatial-Spatial",
    detail: "relative layout",
    icon: Crosshair
  },
  {
    label: "Appearance",
    detail: "visual attribute",
    icon: Palette
  },
  {
    label: "Item Presence",
    detail: "object exists",
    icon: PackageSearch
  },
  {
    label: "State Verify",
    detail: "state check",
    icon: ClipboardCheck
  },
  {
    label: "Event Verify",
    detail: "event happened",
    icon: CircleCheckBig
  },
  {
    label: "Direct Location",
    detail: "absolute place",
    icon: MapPin
  },
  {
    label: "Others",
    detail: "miscellaneous",
    icon: Ellipsis
  }
];

const objectCoverageLegend = [
  { label: "Temporal-Spatial", color: "#96a8c2" },
  { label: "Spatial-Spatial", color: "#6b85b0" },
  { label: "Appearance", color: "#96c44c" },
  { label: "Item Presence", color: "#5aac95" },
  { label: "State Verify", color: "#d381ab" },
  { label: "Event Verify", color: "#e68155" },
  { label: "Direct Location", color: "#7b95b8" },
  { label: "Others", color: "#f5c928" }
];

export function StatsGrid() {
  return (
    <section id="dataset" className="bg-paper px-4 pb-0 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="border-t border-ink/15 pt-5 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(480px,0.88fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              02 / Dataset
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
              INTRODUCE EGOEVERYTHING
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              EgoEverything is a benchmark for long-context egocentric video
              understanding in AR environments. It leverages human attention
              signals abstracted from gaze data to generate natural
              multiple-choice questions, covering over 5,000 QA pairs across
              more than 100 hours of video.
            </p>
          </div>
        </div>

        <div className="mt-10 grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={`${stat.value}-${stat.label}`}
              className="min-h-56 border-b border-r border-ink/15 bg-paper p-5 transition hover:bg-white/55"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="font-display text-6xl font-black uppercase leading-none text-ink sm:text-7xl">
                    {stat.value}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-ink">
                    {stat.label}
                  </h3>
                </div>
                <p className="mt-8 max-w-xs text-sm leading-6 text-muted">
                  {stat.detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(480px,0.88fr)]">
          <div>
            <h3 className="font-display text-3xl font-black uppercase leading-none text-ink sm:text-4xl">
              Why <span className="text-muted">EgoEverything?</span>
            </h3>
            <p className="mt-4 text-base leading-7 text-muted">
              Existing long-context egocentric benchmarks often ask generic,
              template-like video questions and overlook how AR users naturally
              query what they attended to during interaction. EgoEverything
              fills this gap with gaze-grounded, human-reviewed MCQs that better
              reflect real AR memory and reasoning needs.
            </p>
          </div>
        </div>

        <div className="mt-12 grid border border-ink/15 bg-paper lg:grid-cols-[minmax(0,0.99fr)_minmax(0,0.88fr)]">
          <div className="border-b border-ink/15 p-5 lg:border-b-0 lg:border-r lg:p-7">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Question type distribution
                </p>
                <h3 className="mt-2 font-display text-3xl font-black uppercase leading-none text-ink sm:text-4xl">
                  What the benchmark asks
                </h3>
              </div>
              <p className="hidden max-w-44 text-right text-xs leading-5 text-muted sm:block">
                Percent share across EgoEverything MCQs.
              </p>
            </div>

            <div className="space-y-4">
              {questionDistribution.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em]">
                    <span className="text-ink">{item.label}</span>
                    <span className="text-muted">{item.value.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 border border-ink/12 bg-white">
                    <div
                      className="h-full bg-ink"
                      style={{
                        width: `${(item.value / maxQuestionShare) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between p-5 lg:p-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Target object coverage
              </p>
              <h3 className="mt-2 max-w-xl font-display text-3xl font-black uppercase leading-none text-ink sm:text-4xl">
                What the questions are grounded in
              </h3>
              <div className="mt-5 grid grid-cols-3 gap-x-3 gap-y-2">
                {objectCoverageLegend.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="size-2.5 shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-4 overflow-hidden border border-ink/10 bg-[#f6f4ef]">
              <a
                href={paperAssets.objectDistributionSvg}
                target="_blank"
                rel="noreferrer"
                className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 border border-ink/15 bg-paper/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
              >
                Full size
                <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.8} />
              </a>
              <Image
                src={paperAssets.objectDistributionSvg}
                alt="Stacked bar chart of EgoEverything target object categories by question type"
                width={1180}
                height={620}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 border border-ink/15 bg-paper p-5 lg:p-7">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Question coverage
              </p>
              <h3 className="mt-2 font-display text-3xl font-black uppercase leading-none text-ink sm:text-4xl">
                8 categories for AR memory
              </h3>
            </div>
            <a
              href="#examples"
              className="inline-flex w-fit items-center gap-3 border border-ink/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
            >
              <Eye aria-hidden className="size-4" strokeWidth={1.8} />
              See examples
            </a>
          </div>

          <div className="grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {questionCategories.map(({ label, detail, icon: Icon }) => (
              <article
                key={label}
                className="flex items-center gap-4 border-b border-r border-ink/15 p-4"
              >
                <span className="flex size-10 shrink-0 items-center justify-center border border-ink/20 text-ink">
                  <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
