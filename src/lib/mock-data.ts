// Mock data layer for SkillSwap prototype.
// Replace with Lovable Cloud / server functions in a follow-up.

export type Role = "learner" | "mentor" | "company";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Category =
  | "Software Engineering"
  | "Data Science"
  | "AI / Machine Learning"
  | "Product Management"
  | "UI/UX Design"
  | "Cybersecurity"
  | "Cloud Engineering";

export const CATEGORIES: Category[] = [
  "Software Engineering",
  "Data Science",
  "AI / Machine Learning",
  "Product Management",
  "UI/UX Design",
  "Cybersecurity",
  "Cloud Engineering",
];

export const DIFFICULTIES: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

export interface Challenge {
  id: string;
  title: string;
  summary: string;
  description: string;
  requirements: string[];
  deliverables: string[];
  technologies: string[];
  outcomes: string[];
  evaluation: string[];
  category: Category;
  difficulty: Difficulty;
  price: number; // 0 for free
  estimatedHours: number;
  rewardPoints: number;
  mentorName: string;
  mentorOrg: string;
  completedCount: number;
  isCompanyChallenge?: boolean;
  companyName?: string;
}

export const CHALLENGES: Challenge[] = [
  {
    id: "c-001",
    title: "Architect a Scalable Message Broker in Go",
    summary: "Build a production-ready pub/sub engine with zero message loss guarantee.",
    description:
      "Design and implement a distributed message broker capable of handling 50k messages/sec with at-least-once delivery, persistence to disk, and dynamic topic partitioning. Your design should justify trade-offs between throughput, durability, and ordering.",
    requirements: [
      "Use Go 1.21+ with no third-party broker libraries",
      "Persist to local disk with WAL semantics",
      "Expose a gRPC API for publish/subscribe",
      "Provide benchmark script demonstrating throughput",
    ],
    deliverables: [
      "GitHub repository with full source",
      "README with architecture diagram",
      "Benchmark report (markdown + chart)",
      "Docker-compose for a 3-node cluster demo",
    ],
    technologies: ["Go", "gRPC", "Protocol Buffers", "Docker"],
    outcomes: [
      "Distributed-systems design fluency",
      "Disk-backed persistence patterns",
      "Performance benchmarking discipline",
    ],
    evaluation: [
      "Correctness under packet loss (40%)",
      "Throughput vs durability trade-off rationale (30%)",
      "Code quality & test coverage (20%)",
      "Documentation clarity (10%)",
    ],
    category: "Software Engineering",
    difficulty: "Advanced",
    price: 10,
    estimatedHours: 14,
    rewardPoints: 45,
    mentorName: "Priya Raman",
    mentorOrg: "Ex-Confluent",
    completedCount: 124,
  },
  {
    id: "c-002",
    title: "Predictive Churn Model for SaaS",
    summary: "Clean a real dataset and ship a random-forest classifier with calibration analysis.",
    description:
      "Given an anonymized SaaS subscription dataset, engineer features, train a classifier, and deliver a calibration analysis. Your write-up should make the trade-off between recall and precision actionable for a Customer Success team.",
    requirements: [
      "Use Python + scikit-learn or PyTorch",
      "No deep-learning required",
      "Include calibration curve and confusion matrix",
    ],
    deliverables: [
      "Jupyter notebook end-to-end",
      "1-page executive summary PDF",
      "Trained model artifact",
    ],
    technologies: ["Python", "scikit-learn", "pandas", "matplotlib"],
    outcomes: [
      "End-to-end ML workflow",
      "Model calibration intuition",
      "Stakeholder-grade reporting",
    ],
    evaluation: [
      "Feature engineering rigor (30%)",
      "Calibration quality (25%)",
      "Executive summary clarity (25%)",
      "Reproducibility (20%)",
    ],
    category: "Data Science",
    difficulty: "Beginner",
    price: 0,
    estimatedHours: 5,
    rewardPoints: 12,
    mentorName: "Daniel Okafor",
    mentorOrg: "Ex-Stripe Risk",
    completedCount: 890,
  },
  {
    id: "c-003",
    title: "Edge-First Authentication Layer",
    summary: "Deploy globally distributed JWT validation with sub-50ms p99 latency.",
    description:
      "Build a JWT validation layer that runs at the edge with a Redis-backed revocation list. Your solution must withstand a regional outage with graceful degradation.",
    requirements: [
      "Edge-runtime compatible (Workers or Deno Deploy)",
      "Latency budget: p99 < 50ms globally",
      "Document failure modes",
    ],
    deliverables: [
      "Working public endpoint",
      "k6 load-test script + results",
      "Architecture decision record",
    ],
    technologies: ["TypeScript", "Cloudflare Workers", "Redis", "k6"],
    outcomes: [
      "Edge-runtime constraints fluency",
      "Latency-budget engineering",
      "Failure-mode documentation",
    ],
    evaluation: [
      "Latency under load (35%)",
      "Failure handling (30%)",
      "ADR quality (20%)",
      "Code clarity (15%)",
    ],
    category: "Cloud Engineering",
    difficulty: "Intermediate",
    price: 3,
    estimatedHours: 6,
    rewardPoints: 28,
    mentorName: "Sofia Marín",
    mentorOrg: "Ex-Cloudflare",
    completedCount: 312,
  },
  {
    id: "c-004",
    title: "Design a Pricing Page That Converts",
    summary: "Ship a tiered pricing page for a fictional dev-tool, justified by research.",
    description:
      "Audit three competitor pricing pages, propose an information architecture, then design a high-fidelity pricing page. Defend every decision in writing.",
    requirements: [
      "Figma file with components",
      "Mobile + desktop breakpoints",
      "Written rationale per section",
    ],
    deliverables: [
      "Figma share link",
      "Audit deck (PDF)",
      "Annotated final design",
    ],
    technologies: ["Figma", "Information Architecture"],
    outcomes: [
      "Comparative UX audit skill",
      "Pricing-page conventions",
      "Design-decision documentation",
    ],
    evaluation: [
      "Audit depth (30%)",
      "Visual craft (30%)",
      "Rationale clarity (25%)",
      "Cross-breakpoint coherence (15%)",
    ],
    category: "UI/UX Design",
    difficulty: "Intermediate",
    price: 2,
    estimatedHours: 4,
    rewardPoints: 22,
    mentorName: "Yuki Tanaka",
    mentorOrg: "Ex-Linear",
    completedCount: 467,
  },
  {
    id: "c-005",
    title: "Detect Prompt Injection in an LLM App",
    summary: "Build a defensive layer for a customer-support chatbot built on top of an LLM.",
    description:
      "Given a sample chatbot, design and implement a layered defense against prompt injection. Document the threat model and demonstrate detection on a labeled adversarial dataset.",
    requirements: [
      "Python or TypeScript",
      "Use the provided adversarial corpus",
      "Report precision / recall",
    ],
    deliverables: [
      "GitHub repo",
      "Threat-model document",
      "Evaluation notebook",
    ],
    technologies: ["Python", "LLMs", "Security"],
    outcomes: [
      "LLM-security threat modeling",
      "Layered defense design",
      "Adversarial evaluation rigor",
    ],
    evaluation: [
      "Threat-model completeness (30%)",
      "Detection precision/recall (35%)",
      "Defense layering (25%)",
      "Documentation (10%)",
    ],
    category: "Cybersecurity",
    difficulty: "Advanced",
    price: 8,
    estimatedHours: 10,
    rewardPoints: 40,
    mentorName: "Marcus Reilly",
    mentorOrg: "Ex-Anthropic",
    completedCount: 88,
  },
  {
    id: "c-006",
    title: "Stripe Engineering — Global Ledger Performance",
    summary: "Optimize transaction throughput on a simulated distributed ledger. Top performers interview with Stripe.",
    description:
      "Stripe's payments infrastructure team is hiring. Take our simulated ledger, profile it, and ship a pull request improving throughput by at least 30% without breaking invariants.",
    requirements: [
      "Use the provided Rust ledger sandbox",
      "Preserve all transactional invariants",
      "Submit a clean PR with benchmarks",
    ],
    deliverables: [
      "Pull request to ledger sandbox repo",
      "Benchmark before/after",
      "Design note",
    ],
    technologies: ["Rust", "Distributed Systems", "Performance"],
    outcomes: [
      "Production performance engineering",
      "PR-grade engineering communication",
    ],
    evaluation: [
      "Throughput improvement (40%)",
      "Invariant preservation (30%)",
      "Code review quality (20%)",
      "Design note (10%)",
    ],
    category: "Software Engineering",
    difficulty: "Advanced",
    price: 0,
    estimatedHours: 16,
    rewardPoints: 60,
    mentorName: "Stripe Payments",
    mentorOrg: "Stripe, Inc.",
    completedCount: 41,
    isCompanyChallenge: true,
    companyName: "Stripe",
  },
  {
    id: "c-007",
    title: "Linear — Sync Engine Mini-Challenge",
    summary: "Build a CRDT-based offline-first todo sync engine. Top 5 submissions get fast-tracked.",
    description:
      "Implement a minimal sync engine that supports concurrent edits across two clients with deterministic merge.",
    requirements: [
      "TypeScript",
      "Pass the provided conformance test suite",
    ],
    deliverables: ["GitHub repo", "Architectural rationale (2 pages)"],
    technologies: ["TypeScript", "CRDT", "IndexedDB"],
    outcomes: ["Local-first architecture", "CRDT trade-offs"],
    evaluation: [
      "Conformance suite pass rate (50%)",
      "Architectural rationale (30%)",
      "Code clarity (20%)",
    ],
    category: "Software Engineering",
    difficulty: "Advanced",
    price: 0,
    estimatedHours: 12,
    rewardPoints: 55,
    mentorName: "Linear Engineering",
    mentorOrg: "Linear",
    completedCount: 19,
    isCompanyChallenge: true,
    companyName: "Linear",
  },
];

export interface Submission {
  id: string;
  challengeId: string;
  learnerName: string;
  submittedAt: string;
  status: "Pending" | "AI-Reviewed" | "Verified";
  score: number; // 0–100
  feedback: string;
  githubUrl?: string;
}

export const SUBMISSIONS: Submission[] = [
  {
    id: "s-001",
    challengeId: "c-002",
    learnerName: "You",
    submittedAt: "2 days ago",
    status: "Verified",
    score: 88,
    feedback:
      "Strong feature engineering and clear calibration curve. Improve recall for early-life cohorts by oversampling. Reproducibility is excellent.",
    githubUrl: "https://github.com/example/churn-model",
  },
  {
    id: "s-002",
    challengeId: "c-003",
    learnerName: "You",
    submittedAt: "5 days ago",
    status: "AI-Reviewed",
    score: 74,
    feedback:
      "Edge cold-start latency is acceptable but failure-mode docs are thin. Add a regional-outage runbook to push this past verification.",
    githubUrl: "https://github.com/example/edge-auth",
  },
];

export interface Badge {
  id: string;
  name: string;
  tier: "Bronze" | "Silver" | "Gold";
  earnedFor: string;
}

export const BADGES: Badge[] = [
  { id: "b-1", name: "Distributed Systems I", tier: "Silver", earnedFor: "3 advanced challenges in Software Engineering" },
  { id: "b-2", name: "API Security Pass", tier: "Gold", earnedFor: "Cybersecurity verified" },
  { id: "b-3", name: "ML Foundations", tier: "Bronze", earnedFor: "Data Science beginner verified" },
];

export interface SkillProgress {
  skill: string;
  percent: number;
}

export const SKILL_PROGRESS: SkillProgress[] = [
  { skill: "Backend Architecture", percent: 82 },
  { skill: "Distributed Computing", percent: 64 },
  { skill: "API Security", percent: 91 },
  { skill: "Frontend Engineering", percent: 76 },
  { skill: "Data Modeling", percent: 58 },
];

export interface TalentProfile {
  id: string;
  name: string;
  headline: string;
  talentScore: number;
  rank: string;
  verifiedSkills: string[];
  completedChallenges: number;
  topCategory: Category;
  availableFor: string;
}

export const TALENT_POOL: TalentProfile[] = [
  {
    id: "t-1",
    name: "Alex Rivera",
    headline: "Backend / Distributed Systems",
    talentScore: 1240,
    rank: "Top 2.4%",
    verifiedSkills: ["Go", "gRPC", "Postgres", "Kafka"],
    completedChallenges: 42,
    topCategory: "Software Engineering",
    availableFor: "Full-time, Freelance",
  },
  {
    id: "t-2",
    name: "Mei Chen",
    headline: "ML Engineer — calibration & retention",
    talentScore: 1180,
    rank: "Top 3.8%",
    verifiedSkills: ["Python", "scikit-learn", "Airflow", "dbt"],
    completedChallenges: 31,
    topCategory: "Data Science",
    availableFor: "Internship, Full-time",
  },
  {
    id: "t-3",
    name: "Jorge Núñez",
    headline: "Edge & Cloud Engineer",
    talentScore: 1060,
    rank: "Top 7.1%",
    verifiedSkills: ["TypeScript", "Cloudflare", "Redis", "Terraform"],
    completedChallenges: 24,
    topCategory: "Cloud Engineering",
    availableFor: "Freelance",
  },
  {
    id: "t-4",
    name: "Amara Singh",
    headline: "Product Designer",
    talentScore: 980,
    rank: "Top 9.2%",
    verifiedSkills: ["Figma", "Design Systems", "UX Research"],
    completedChallenges: 18,
    topCategory: "UI/UX Design",
    availableFor: "Contract, Full-time",
  },
  {
    id: "t-5",
    name: "Tomás Iglesias",
    headline: "AppSec & LLM safety",
    talentScore: 940,
    rank: "Top 11%",
    verifiedSkills: ["Python", "LLM Security", "Threat Modeling"],
    completedChallenges: 15,
    topCategory: "Cybersecurity",
    availableFor: "Full-time",
  },
];

export const LEARNER_STATS = {
  talentScore: 1240,
  rank: "Top 2.4%",
  rankDelta: "+0.8% this week",
  verifiedSkills: 12,
  pendingReview: 3,
  completedChallenges: 42,
  globalRank: "#1,842",
  totalLearners: "1.2M",
};

export const MENTOR_STATS = {
  publishedChallenges: 9,
  activeChallenges: 4,
  totalLearners: 1287,
  revenueMTD: 4280,
  rating: 4.8,
  reviews: 312,
};

export const COMPANY_STATS = {
  verifiedTalent: 18420,
  openChallenges: 3,
  applications: 124,
  shortlisted: 11,
};

export function getChallenge(id: string): Challenge | undefined {
  return CHALLENGES.find((c) => c.id === id);
}
