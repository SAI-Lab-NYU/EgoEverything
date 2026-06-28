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

export const selectedExamples: SelectedExample[] = [
  {
    index: 1,
    category: "Item Presence",
    categorySlug: "item_presence",
    question: "Was there a red and white chevron blanket on the sofa in the living room?",
    answer: "Yes, it was on the armrest of the sofa.",
    options: [
      "Yes, it was on the armrest of the sofa.",
      "No, there was a plain red blanket on the sofa.",
      "No, an orange and blue striped blanket was on the sofa.",
      "Yes, but it was on the floor next to the sofa.",
      "Yes, but it was folded neatly on the cushion of the sofa."
    ],
    correctAnswer: 0,
    timestampSec: 88.9,
    objectName: "striped blanket",
    rationale: "Asks whether a specific item appears in a specified place.",
    videoSrc: `${selectedQuestionsDir}/01_item_presence_loc3_script3_seq2_rec1.mp4`
  },
  {
    index: 2,
    category: "Appearance",
    categorySlug: "appearance",
    question: "What color was the balloon in the living room when someone entered?",
    answer: "Purple",
    options: ["Blue", "Purple", "Green", "Red", "Yellow"],
    correctAnswer: 1,
    timestampSec: 12.3,
    objectName: "balloon",
    rationale: "Asks for a visual attribute of an item.",
    videoSrc: `${selectedQuestionsDir}/02_appearance_loc1_script3_seq1_rec1.mp4`
  },
  {
    index: 3,
    category: "Event Verification",
    categorySlug: "event_verification",
    question: "Did I put the brown fabric in while doing the laundry?",
    answer:
      "Yes, you picked it up with a pile of clothes from on top of the washing machine and then placed them inside.",
    options: [
      "Yes, you picked it up with a pile of clothes from on top of the washing machine and then placed them inside.",
      "No, the brown fabric remained on the washing machine with other clothes.",
      "Yes, you placed the brown fabric into the top loader of the washing machine separately.",
      "No, you only put in white clothes, and the brown fabric was not among them.",
      "Yes, you put in the brown fabric first before setting up the machine."
    ],
    correctAnswer: 0,
    timestampSec: 44.45,
    objectName: "brown fabric",
    rationale: "Asks whether a specific action occurred.",
    videoSrc: `${selectedQuestionsDir}/03_event_verification_loc3_script5_seq2_rec1.mp4`
  },
  {
    index: 4,
    category: "State Verification",
    categorySlug: "state_verification",
    question: "Was the dark door in the living room open or closed when I was watching TV earlier?",
    answer: "The dark door in the living room was closed when you were watching TV earlier.",
    options: [
      "The dark door in the living room was unlatched but shut when you were watching TV earlier.",
      "The dark door in the living room was propped wide open when you were watching TV earlier.",
      "The dark door in the living room was slightly ajar when you were watching TV earlier.",
      "The dark door in the living room was locked when you were watching TV earlier.",
      "The dark door in the living room was closed when you were watching TV earlier."
    ],
    correctAnswer: 4,
    timestampSec: 432.0,
    objectName: "door",
    rationale: "Asks for the state of an object.",
    videoSrc: `${selectedQuestionsDir}/04_state_verification_20230607_s1_barbara_wheeler_act1_nkg6zo.mp4`
  },
  {
    index: 5,
    category: "Spatial-Spatial",
    categorySlug: "spatial_spatial",
    question:
      "When I was looking at the salt stones by the humidifier, where was the blue bucket positioned relative to the trash can?",
    answer: "The blue bucket was on the floor, to the right of the silver trash can and under the dark cabinet.",
    options: [
      "The blue bucket was on the floor, to the right of the silver trash can and under the dark cabinet.",
      "The blue bucket was on the floor, to the left of the silver trash can and by the living room couch.",
      "The blue bucket was on the floor, behind the silver trash can and near the white wall.",
      "The blue bucket was on the floor, in front of the silver trash can and next to the humidifier.",
      "The blue bucket was on the floor, between the silver trash can and the large plant."
    ],
    correctAnswer: 0,
    timestampSec: 265.0,
    objectName: "blue bucket",
    rationale: "Asks about the relative location between two objects.",
    videoSrc: `${selectedQuestionsDir}/05_spatial_spatial_20230929_s0_samuel_campos_act2_uxt33r.mp4`
  },
  {
    index: 6,
    category: "Direct Location",
    categorySlug: "direct_location",
    question: "Where did I leave my black headphone case in the living room earlier?",
    answer: "It was on the corner of the white dining table.",
    options: [
      "It was on the shelf of the metal TV stand.",
      "It was in the center of the white dining table.",
      "It was on the corner of the white dining table.",
      "It was on the white windowsill.",
      "It was on the corner of the wooden coffee table."
    ],
    correctAnswer: 2,
    timestampSec: 26.6,
    objectName: "headphone case",
    rationale: "Asks for the absolute location of an item.",
    videoSrc: `${selectedQuestionsDir}/06_direct_location_loc3_script3_seq1_rec1.mp4`
  },
  {
    index: 7,
    category: "Temporal-Spatial",
    categorySlug: "temporal_spatial",
    question:
      "After I used the fork to poke the food in the bowl while heating my meal, where did I put it?",
    answer: "on the white plate on the kitchen countertop in front of the microwave",
    options: [
      "on the paper towel on the kitchen countertop in front of the microwave",
      "on the black plate on the dining table near the microwave",
      "in the bowl on the kitchen countertop behind the microwave",
      "on the white plate on the kitchen countertop in front of the microwave",
      "in the sink on the kitchen countertop next to the microwave"
    ],
    correctAnswer: 3,
    timestampSec: 358.7,
    objectName: "a fork",
    rationale: "Asks where an item is after another event occurs.",
    videoSrc: `${selectedQuestionsDir}/07_temporal_spatial_20230808_s0_timothy_taylor_act0_3cgk3y.mp4`
  },
  {
    index: 8,
    category: "Others",
    categorySlug: "others",
    question:
      "I'm in the kitchen, by the microwave above the counter, needing to reheat dinner. What was the microwave's last timer setting?",
    answer: "The timer displayed '9:47'.",
    options: [
      "The timer displayed '10:15'.",
      "The timer displayed '7:18'.",
      "The timer displayed '2:05'.",
      "The timer displayed '5:32'.",
      "The timer displayed '9:47'."
    ],
    correctAnswer: 4,
    timestampSec: 592.0,
    objectName: "microwave panel",
    rationale: "Asks for displayed numeric/text information, outside the main spatial, event, state, and appearance classes.",
    videoSrc: `${selectedQuestionsDir}/08_others_20230808_s0_timothy_taylor_act0_3cgk3y.mp4`
  }
];

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
