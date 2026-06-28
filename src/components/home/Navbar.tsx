"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { navItems, paperAssets } from "@/lib/content";

export function Navbar() {
  const internalItems = useMemo(
    () => navItems.filter((item) => item.href.startsWith("#")),
    []
  );
  const [activeHref, setActiveHref] = useState(internalItems[0]?.href ?? "");

  useEffect(() => {
    const updateActiveSection = () => {
      const current = internalItems
        .map((item) => {
          const section = document.querySelector(item.href);
          return section
            ? { href: item.href, top: section.getBoundingClientRect().top }
            : null;
        })
        .filter((item): item is { href: string; top: number } => item !== null)
        .reverse()
        .find((item) => item.top <= 96);

      setActiveHref(current?.href ?? internalItems[0]?.href ?? "");
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [internalItems]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/88 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a href="#overview" className="group flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-ink bg-ink text-[10px] font-semibold text-paper">
            EE
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-ink">
              EgoEverything
            </span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              ECCV 2026
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isExternal = item.href.startsWith("http");
            const isActive = activeHref === item.href;

            return (
              <a
                key={item.label}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className={`relative px-3 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition hover:text-ink ${
                  isActive ? "text-ink" : "text-muted"
                }`}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute inset-x-3 bottom-0 h-px bg-ink" />
                ) : null}
              </a>
            );
          })}
        </div>

        <a
          href={paperAssets.pdf}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-2 border border-ink bg-ink px-4 text-xs font-semibold uppercase tracking-[0.13em] text-paper transition hover:bg-transparent hover:text-ink"
        >
          View PDF
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
        </a>
      </nav>
    </header>
  );
}

