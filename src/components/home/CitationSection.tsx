import { Copy, ExternalLink } from "lucide-react";
import { footerLinks } from "@/lib/content";

const citation = `@inproceedings{egoeverything2026,
  title     = {EgoEverything: A Benchmark for Human Behavior-Inspired Long-Context Egocentric Video Understanding in AR Environment},
  author    = {Author Names},
  booktitle = {European Conference on Computer Vision (ECCV)},
  year      = {2026}
}`;

export function CitationSection() {
  return (
    <section
      id="citation"
      className="border-t border-ink/15 bg-[#f6f4ef] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.7fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            06 / Citation
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Cite the benchmark.
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-muted">
            Placeholder BibTeX for the official EgoEverything website. Replace
            author metadata and links when the camera-ready release is public.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-2 sm:max-w-lg">
            {footerLinks.map((link) => {
              const Icon = link.icon;
              const isExternal = !link.href.startsWith("#");

              return (
                <a
                  key={link.label}
                  id={link.label === "Code" ? "code" : undefined}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="flex items-center justify-between border border-ink/15 bg-paper px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <span className="flex items-center gap-2">
                    <Icon aria-hidden="true" size={15} strokeWidth={1.7} />
                    {link.label}
                  </span>
                  <ExternalLink aria-hidden="true" size={14} strokeWidth={1.7} />
                </a>
              );
            })}
          </div>
        </div>

        <div id="paper" className="border border-ink bg-ink p-4 text-paper sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4 border-b border-paper/18 pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
              BibTeX
            </p>
            <span className="inline-flex items-center gap-2 border border-paper/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/70">
              <Copy aria-hidden="true" size={14} strokeWidth={1.7} />
              Placeholder
            </span>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm leading-7 text-paper/82">
            {citation}
          </pre>
        </div>
      </div>
    </section>
  );
}

