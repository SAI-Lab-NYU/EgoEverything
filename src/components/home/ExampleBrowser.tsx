"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { selectedExamples } from "@/lib/content";

const optionLetters = ["A", "B", "C", "D", "E"];

const formatTimestamp = (seconds: number) => {
  const total = Math.round(seconds);
  const mm = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const ss = (total % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
};

export function ExampleBrowser() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = selectedExamples[activeIndex];

  return (
    <article className="flex flex-col border border-ink/15 bg-paper p-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          MCQ examples / 8 question types
        </p>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          {active.index.toString().padStart(2, "0")} / 08
        </span>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-1.5">
        {selectedExamples.map((example, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={example.categorySlug}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                isActive
                  ? "border-warm bg-warm text-paper"
                  : "border-ink/15 bg-[#f9f7f1] text-muted hover:border-warm/60 hover:text-ink"
              }`}
            >
              {example.category}
            </button>
          );
        })}
      </div>

      {/* Video clip */}
      <div className="mt-3 overflow-hidden border border-ink/10 bg-black">
        <video
          key={active.videoSrc}
          src={active.videoSrc}
          controls
          playsInline
          preload="metadata"
          className="aspect-video h-auto w-full"
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
        <span>~60s clip</span>
        <span>
          Target: <span className="text-ink">{active.objectName}</span>
        </span>
        <span>
          Q&nbsp;timestamp: <span className="text-warm">{formatTimestamp(active.timestampSec)}</span>
        </span>
      </div>

      {/* Question */}
      <p className="mt-3 border-t border-ink/15 pt-3 text-sm font-medium leading-6 text-ink">
        {active.question}
      </p>

      {/* Options */}
      <ul className="mt-3 grid gap-1.5">
        {active.options.map((option, index) => {
          const isCorrect = index === active.correctAnswer;
          return (
            <li
              key={option}
              className={`flex items-start gap-2 border px-2.5 py-1.5 text-xs leading-5 ${
                isCorrect
                  ? "border-warm/60 bg-warm/10 text-ink"
                  : "border-ink/10 bg-[#f9f7f1] text-muted"
              }`}
            >
              <span
                className={`mt-px inline-flex h-4 w-4 shrink-0 items-center justify-center text-[10px] font-bold ${
                  isCorrect ? "bg-warm text-paper" : "bg-ink/10 text-muted"
                }`}
              >
                {isCorrect ? <Check aria-hidden="true" size={11} strokeWidth={3} /> : optionLetters[index]}
              </span>
              <span>{option}</span>
            </li>
          );
        })}
      </ul>

      {/* Why this category */}
      <p className="mt-3 border-t border-ink/15 pt-3 text-[11px] leading-5 text-muted">
        <span className="font-semibold uppercase tracking-[0.12em] text-warm">Why {active.category}:</span>{" "}
        {active.rationale}
      </p>
    </article>
  );
}
