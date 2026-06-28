"use client";

import { useState } from "react";
import { ArrowUpRight, Film } from "lucide-react";
import { paperAssets } from "@/lib/content";

const heroWallPreviews = [
  "hero-wall-01.mp4",
  "hero-wall-02.mp4",
  "hero-wall-03.mp4"
];

export function HeroFigurePanel() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [previewIndex, setPreviewIndex] = useState(0);
  const preview = heroWallPreviews[previewIndex];

  return (
    <div className="relative overflow-hidden border border-ink/15 bg-[#efede6] p-3 shadow-hairline sm:p-4">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(17,17,17,0.055)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="relative z-10 border border-ink/15 bg-paper">
        <div className="flex items-center justify-between border-b border-ink/15 px-4 py-3">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            <Film aria-hidden="true" size={14} strokeWidth={1.7} />
            EgoEverything
          </div>
          <a
            href={paperAssets.pdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:text-warm"
          >
            Full paper
            <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.7} />
          </a>
        </div>

        <div className="relative h-[420px] overflow-hidden bg-ink p-1 sm:h-[520px] lg:h-[620px]">
          <video
            key={preview}
            className="h-full w-full object-cover"
            src={`${basePath}/paper-assets/hero-wall/${preview}`}
            poster={`${basePath}/paper-assets/hero-wall/hero-wall-poster.jpg`}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={() =>
              setPreviewIndex((current) => (current + 1) % heroWallPreviews.length)
            }
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4 pt-16 text-paper">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/60">
              Long-context Egocentric Videos
            </p>
            <h2 className="mt-2 max-w-lg font-display text-2xl font-semibold leading-tight sm:text-4xl">
              Everyday egocentric video across people, places, and tasks.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
