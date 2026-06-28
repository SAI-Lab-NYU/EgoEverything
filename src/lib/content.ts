import {
  BarChart3,
  BookOpen,
  Boxes,
  Database,
  Eye,
  FileText,
  Github,
  Map,
  Target,
  Timer,
  Trophy
} from "lucide-react";

import selectedQuestionsRaw from "../../public/paper-assets/processed_egoeverything/selected_questions_videos/examples.json";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const pdfHref = assetPath("/paper-assets/ECCV_2026_EgoEverything.pdf");
export const paperHref = "https://arxiv.org/abs/2604.08342";

export const navItems = [
  { label: "EgoEverything", href: "#overview" },
  { label: "Dataset", href: "#dataset" },
  { label: "Examples", href: "#examples" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Cite", href: "#citation" }
];

export const sectionIndex = [
  { number: "01", label: "EgoEverything", href: "#overview" },
  { number: "02", label: "Dataset", href: "#dataset" },
  { number: "03", label: "Build", href: "#dataset-build" },
  { number: "04", label: "Examples", href: "#examples" },
  { number: "05", label: "Results", href: "#leaderboard" },
  { number: "06", label: "Citation", href: "#citation" }
];

export const primaryLinks = [
  { label: "Paper", href: paperHref, icon: FileText },
  { label: "Huggingface", href: "https://huggingface.co/datasets/roxqtang/EgoEverything", icon: Database },
  { label: "Github", href: "https://github.com/SAI-Lab-NYU/EgoEverything-Dataset", icon: Github },
  { label: "Leaderboard", href: "#leaderboard", icon: Trophy }
];

export const stats = [
  {
    value: "100+",
    label: "Hours",
    detail: "Long-context egocentric AR video"
  },
  {
    value: "5,000+",
    label: "MCQs",
    detail: "Multiple-choice memory and reasoning pairs"
  },
  {
    value: "Real",
    label: "Gaze Traces",
    detail: "Human attention signals aligned to video"
  },
  {
    value: "8",
    label: "Question Types",
    detail: "From recall to spatial-temporal reasoning"
  },
  {
    value: "28",
    label: "Object Categories",
    detail: "Fine-grained targets in everyday scenes"
  },
  {
    value: "400+",
    label: "Review Hours",
    detail: "Human validation and benchmark curation"
  }
];

export const paperAssets = {
  pdf: pdfHref,
  overview: assetPath("/paper-assets/overview-figure.png"),
  pipeline: assetPath("/paper-assets/pipeline-figure.png"),
  pipelinePdf: assetPath("/paper-assets/Pipeline.pdf"),
  huggingFaceIcon: assetPath("/paper-assets/huggingface.svg"),
  metaIcon: assetPath("/paper-assets/meta-icon.png"),
  mcq: assetPath("/paper-assets/mcq-example.png"),
  questionDistribution: assetPath("/paper-assets/question-distribution.png"),
  objectDistribution: assetPath("/paper-assets/object-distribution.png"),
  objectDistributionSvg: assetPath("/paper-assets/object-category-distribution.svg"),
  mcqExample1Pdf: assetPath("/paper-assets/mcq-example_1_new.pdf"),
  mcqExample2Pdf: assetPath("/paper-assets/mcq-example_2_new.pdf"),
  mcqExampleCombinedPdf: assetPath("/paper-assets/mcq-example_combined.pdf"),
  mcqExampleCombinedPreview: assetPath("/paper-assets/mcq-example_combined-preview.jpg"),
  resultsTable: assetPath("/paper-assets/results-table.png")
};

const selectedQuestionsDir = assetPath(
  "/paper-assets/processed_egoeverything/selected_questions_videos"
);

export type SelectedExample = {
  index: number;
  category: string;
  categorySlug: string;
  question: string;
  answer: string;
  options: string[];
  correctAnswer: number;
  timestampSec: number;
  objectName: string;
  rationale: string;
  videoSrc: string;
};

export const selectedExamples: SelectedExample[] = selectedQuestionsRaw.map((item) => ({
  index: item.index,
  category: item.category,
  categorySlug: item.category_slug,
  question: item.question,
  answer: item.answer,
  options: item.options,
  correctAnswer: item.correct_answer,
  timestampSec: item.timestamp_sec,
  objectName: (item.keyframes[0]?.object_name ?? "").replace(/_/g, " "),
  rationale: item.rationale,
  videoSrc: `${selectedQuestionsDir}/${item.clip_file}`
}));

export const paperVisuals = [
  {
    figure: "Fig. 3",
    title: "Data generation pipeline",
    image: paperAssets.pipeline,
    description:
      "VSSC summarizes long egocentric streams, GOTS samples target objects by gaze distance, and QGMC turns the selected targets into reviewed MCQs."
  },
  {
    figure: "Fig. 4",
    title: "MCQ evidence view",
    image: paperAssets.mcq,
    description:
      "Video frames and question keywords are color-linked so readers can see target objects, context, answer choices, and model errors at once."
  },
  {
    figure: "Fig. 5",
    title: "Question type distribution",
    image: paperAssets.questionDistribution,
    description:
      "Eight categories expose the reasoning surface, from item presence to temporal-spatial questions."
  },
  {
    figure: "Fig. 6",
    title: "Target object distribution",
    image: paperAssets.objectDistribution,
    description:
      "Object categories reveal how everyday AR memory questions spread across places, objects, clothing, storage, and tools."
  }
];

export const benchmarkResults = [
  {
    label: "Human",
    value: 83.5,
    description: "Reference performance from human review",
    icon: Eye
  },
  {
    label: "Best VLM",
    value: 63.1,
    description: "Top evaluated vision-language model",
    icon: BarChart3
  },
  {
    label: "Text-only",
    value: 35.9,
    description: "Question-only baseline without video",
    icon: FileText
  }
];

export const examples = [
  {
    label: "Memory Recall",
    question: "What was the name of the restaurant I saw 10 minutes ago?",
    meta: "Recall interval: 10m",
    icon: Timer
  },
  {
    label: "Temporal-Spatial Reasoning",
    question: "Which shelf was the red mug on before I turned left?",
    meta: "Route + object state",
    icon: Map
  },
  {
    label: "Fine-Grained Perception",
    question: "What logo appeared on the receipt near the checkout counter?",
    meta: "Small text target",
    icon: Target
  },
  {
    label: "Peripheral Attention",
    question: "Which object was outside the gaze center when the door opened?",
    meta: "Peripheral context",
    icon: Boxes
  }
];

export const failureFactors = [
  {
    title: "Longer recall interval",
    body: "Performance drops as the answer depends on events farther back in the egocentric stream.",
    marker: "time"
  },
  {
    title: "Peripheral objects",
    body: "Targets away from direct gaze are easier for humans to retain than for current VLM pipelines.",
    marker: "gaze"
  },
  {
    title: "Smaller objects",
    body: "Fine-grained, low-area visual evidence remains fragile even when the object is semantically simple.",
    marker: "scale"
  }
];

export const footerLinks = [
  { label: "Paper", href: paperHref, icon: BookOpen },
  { label: "Github", href: "https://github.com/SAI-Lab-NYU/EgoEverything-Dataset", icon: Github },
  { label: "Huggingface", href: "https://huggingface.co/datasets/roxqtang/EgoEverything", icon: Database },
  { label: "PDF", href: paperAssets.pdf, icon: FileText }
];
