import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { HeroFigurePanel } from "@/components/home/HeroFigurePanel";
import { paperAssets, primaryLinks } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden border-b border-ink/12 pt-16"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10 bg-paper" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,17,17,.055)_1px,transparent_1px),linear-gradient(180deg,rgba(17,17,17,.055)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 lg:min-h-[calc(100vh-14rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(480px,0.88fr)] lg:px-8 lg:py-12">
        <div className="flex flex-col">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="border border-ink/18 bg-paper px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
                ECCV 2026 Accepted Paper
              </span>
              <span className="border border-cool/24 bg-cool/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cool">
                Academic Benchmark Portal
              </span>
            </div>

            <h1
              id="hero-title"
              className="mt-5 font-display text-[clamp(3.05rem,14vw,3.3rem)] font-black uppercase leading-[0.82] text-ink sm:text-[clamp(3.9rem,7vw,7.25rem)]"
            >
              Ego
              <br />
              Everything
            </h1>

            <div className="mt-7 grid max-w-[44rem] gap-5 border-y border-ink/15 py-6 md:grid-cols-[1.08fr_0.72fr]">
              <p className="text-xl leading-snug text-ink [text-wrap:balance] sm:text-2xl">
                A Benchmark for Human Behavior–Inspired Long-Context
                Egocentric Video Understanding in AR Environment
              </p>
              <p className="text-sm leading-6 text-muted">
                Grounded in gaze traces, long-context egocentric video, and
                carefully reviewed multiple-choice QA for evaluating practical
                AR assistants.
              </p>
            </div>

            <div className="mt-6 max-w-[44rem] text-center text-sm font-semibold uppercase leading-relaxed tracking-[0.2em]">
              <p className="text-base text-ink sm:text-lg">
                Qiance Tang<sup>1†</sup>, Ziqi Wang<sup>1†</sup>, Jieyu Lin
                <sup>2</sup>, Ziyun Li<sup>2</sup>,
                <br />
                Barbara De Salvo<sup>2</sup>, and Sai Qian Zhang
                <sup>1‡</sup>
              </p>
              <p className="mt-3 text-ink/70">
                <sup>1</sup>New York University&nbsp;&nbsp;&nbsp;
                <sup>2</sup>Meta Reality Labs
              </p>
              <p className="mt-1.5 text-xs text-muted sm:text-sm">
                <sup className="text-sm sm:text-base">†</sup> Equal
                contribution.&nbsp;&nbsp;
                <sup className="text-sm sm:text-base">‡</sup> Corresponding
                author.
              </p>
            </div>
          </div>

          <div className="mt-8 flex max-w-[44rem] justify-center">
            <div className="inline-flex items-center gap-2 border border-ink/12 bg-paper/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span>In collaboration with</span>
              <Image
                src={paperAssets.metaIcon}
                alt="Meta"
                width={62}
                height={16}
                className="h-4 w-auto"
              />
            </div>
          </div>

          <div className="mt-8 max-w-[44rem]">
            <div className="grid grid-cols-1 gap-2 min-[460px]:grid-cols-2 sm:grid-cols-4">
              {primaryLinks.map((link) => {
                const Icon = link.icon;
                const isExternal = !link.href.startsWith("#");
                const isDataset = link.href.includes("huggingface.co");

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="group relative flex min-h-16 min-w-0 items-center border border-ink/18 bg-paper px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <span className="flex min-w-0 items-center gap-2 whitespace-nowrap">
                      {isDataset ? (
                        <Image
                          src={paperAssets.huggingFaceIcon}
                          alt=""
                          width={17}
                          height={17}
                          className="h-[17px] w-[17px] shrink-0"
                        />
                      ) : (
                        <Icon
                          aria-hidden="true"
                          size={17}
                          strokeWidth={1.7}
                          className="shrink-0"
                        />
                      )}
                      {link.label}
                    </span>
                    <ArrowDownRight
                      aria-hidden="true"
                      size={14}
                      strokeWidth={1.7}
                      className="absolute bottom-0.5 right-0.5 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="self-center lg:pt-8">
          <HeroFigurePanel />
        </div>
      </div>
    </section>
  );
}
