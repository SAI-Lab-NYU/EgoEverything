import { BenchmarkPreview } from "@/components/home/BenchmarkPreview";
import { CitationSection } from "@/components/home/CitationSection";
import { ExamplesPreview } from "@/components/home/ExamplesPreview";
import { FailureAnalysisPreview } from "@/components/home/FailureAnalysisPreview";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { Navbar } from "@/components/home/Navbar";
import { PaperPreviewDock } from "@/components/home/PaperPreviewDock";
import { StatsGrid } from "@/components/home/StatsGrid";

export default function Home() {
  return (
    <main>
      <Navbar />
      <PaperPreviewDock />
      <Hero />
      <StatsGrid />
      <BenchmarkPreview />
      <ExamplesPreview />
      <FailureAnalysisPreview />
      <CitationSection />
      <Footer />
    </main>
  );
}

