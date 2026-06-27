import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { paperAssets } from "@/lib/content";

export function PaperPreviewDock() {
  return (
    <a
      href={paperAssets.pdf}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-5 left-5 z-50 hidden h-[70px] w-[70px] overflow-hidden border border-ink/15 bg-paper/92 p-2 text-ink shadow-hairline backdrop-blur-xl transition-all duration-300 hover:w-[230px] hover:-translate-y-1 hover:border-ink focus-visible:w-[230px] focus-visible:border-ink sm:block"
      aria-label="Open full EgoEverything paper PDF"
    >
      <div className="grid grid-cols-[52px_154px] gap-3">
        <div className="relative h-[52px] overflow-hidden border border-ink/15 bg-white">
          <Image
            src={paperAssets.overview}
            alt=""
            width={360}
            height={160}
            className="h-full w-full object-cover object-left"
          />
        </div>
        <div className="min-w-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            <BookOpen aria-hidden="true" size={12} strokeWidth={1.7} />
            Full paper
          </p>
          <p className="mt-1 text-sm font-semibold leading-tight">
            Preview PDF
            <ArrowUpRight
              aria-hidden="true"
              size={14}
              strokeWidth={1.7}
              className="ml-1 inline transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </p>
        </div>
      </div>
    </a>
  );
}
