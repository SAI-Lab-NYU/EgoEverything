"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Film } from "lucide-react";
import { paperAssets } from "@/lib/content";

const videoWall = [
  "01_aria_everyday_loc3_script3_seq1_rec1_56.3s.mp4",
  "02_nymeria_20230718_s0_timothy_velasquez_act4_1njxtx_139.5s.mp4",
  "03_nymeria_20230607_s1_barbara_wheeler_act2_ig1oym_357.8s.mp4",
  "04_nymeria_20230908_s0_joel_anderson_act2_cfyj2k_9.5s.mp4",
  "05_nymeria_20230620_s1_alison_carter_act1_2s9yqg_329.0s.mp4",
  "06_aria_everyday_loc3_script4_seq7_rec1_13.8s.mp4",
  "07_nymeria_20230724_s1_justin_heath_act4_zdlau3_579.3s.mp4",
  "08_aria_everyday_loc3_script2_seq5_rec1_100.2s.mp4",
  "09_nymeria_20230621_s1_kevin_davis_act0_b3fcsx_444.0s.mp4",
  "10_aria_everyday_loc2_script3_seq4_rec2_151.2s.mp4",
  "11_aria_everyday_loc3_script2_seq3_rec1_36.3s.mp4",
  "12_nymeria_20230929_s0_samuel_campos_act2_uxt33r_397.8s.mp4",
  "13_aria_everyday_loc1_script1_seq7_rec1_129.2s.mp4",
  "14_nymeria_20230607_s0_james_johnson_act3_ifj2gc_4.2s.mp4",
  "15_nymeria_20230908_s1_danielle_pierce_act1_y2zcso_315.2s.mp4",
  "16_aria_everyday_loc3_script5_seq6_rec1_113.8s.mp4",
  "17_aria_everyday_loc2_script3_seq2_rec2_40.0s.mp4",
  "18_aria_everyday_loc3_script4_seq2_rec1_16.0s.mp4",
  "19_aria_everyday_loc2_script5_seq2_rec1_67.4s.mp4",
  "20_aria_everyday_loc3_script3_seq5_rec1_123.9s.mp4",
  "21_aria_everyday_loc4_script5_seq1_rec1_48.8s.mp4",
  "22_nymeria_20230621_s1_kevin_davis_act4_tvkm35_341.9s.mp4",
  "23_nymeria_20230607_s0_james_johnson_act1_7xwm28_380.4s.mp4",
  "24_aria_everyday_loc4_script5_seq3_rec1_118.7s.mp4",
  "25_aria_everyday_loc3_script5_seq3_rec1_22.3s.mp4",
  "26_aria_everyday_loc2_script2_seq2_rec1_50.7s.mp4",
  "27_nymeria_20230607_s0_james_johnson_act2_yhbvpa_19.8s.mp4"
];

export function HeroFigurePanel() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [offset, setOffset] = useState(0);
  const visibleClips = Array.from(
    { length: 9 },
    (_, index) => videoWall[(offset + index) % videoWall.length]
  );

  useEffect(() => {
    const timer = window.setInterval(
      () => setOffset((current) => (current + 9) % videoWall.length),
      5000
    );

    return () => window.clearInterval(timer);
  }, []);

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

        <div className="relative grid h-[420px] grid-cols-3 gap-1 overflow-hidden bg-ink p-1 sm:h-[520px] lg:h-[620px]">
          {visibleClips.map((clip) => (
            <video
              key={`${offset}-${clip}`}
              className="h-full w-full object-cover"
              src={`${basePath}/paper-assets/processed_egoeverything/${clip}`}
              autoPlay
              muted
              loop
              playsInline
            />
          ))}
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
