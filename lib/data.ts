// Mock data for the training platform

export interface Employee {
  id: string
  name: string
  email: string
  role: string
  storeLocation: string
  avatar?: string
  completedModules: number
  totalModules: number
  averageQuizScore: number
  badges: Badge[]
  quizHistory: QuizResult[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
}

// ── Badge Definition System ────────────────────────────────────────────────────
export type BadgeTier = "bronze" | "silver" | "gold" | "platinum"
export type BadgeCategory =
  | "delta"
  | "kratom"
  | "kanna"
  | "glass"
  | "compliance"
  | "sales"
  | "milestones"
  | "quiz"

export interface BadgeDefinition {
  id: string
  name: string
  description: string
  flavor: string // short punchy tagline shown on the card
  icon: string // lucide icon name
  tier: BadgeTier
  category: BadgeCategory
  // Earn condition metadata (used for display/unlock logic)
  condition: string
  xp: number // points awarded
}

export const allBadgeDefinitions: BadgeDefinition[] = [
  // ── MILESTONE BADGES ─────────────────────────────────────────────────────────
  {
    id: "first-step",
    name: "First Step",
    description: "Complete your very first training module.",
    flavor: "Every expert was once a beginner.",
    icon: "zap",
    tier: "bronze",
    category: "milestones",
    condition: "Complete 1 module",
    xp: 50,
  },
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Complete 3 training modules.",
    flavor: "The foundation is set.",
    icon: "play",
    tier: "bronze",
    category: "milestones",
    condition: "Complete 3 modules",
    xp: 100,
  },
  {
    id: "halfway-there",
    name: "Halfway There",
    description: "Complete 50% of all assigned training modules.",
    flavor: "Keep the momentum going.",
    icon: "trending-up",
    tier: "silver",
    category: "milestones",
    condition: "Complete 50% of modules",
    xp: 200,
  },
  {
    id: "fully-certified",
    name: "Fully Certified",
    description: "Complete 100% of all assigned training modules.",
    flavor: "You are the standard.",
    icon: "shield-check",
    tier: "gold",
    category: "milestones",
    condition: "Complete all modules",
    xp: 500,
  },
  {
    id: "highlife-elite",
    name: "Highlife Elite",
    description: "Complete all modules AND score 90%+ on every quiz.",
    flavor: "The pinnacle of Highlife knowledge.",
    icon: "crown",
    tier: "platinum",
    category: "milestones",
    condition: "Complete all modules with 90%+ quiz scores",
    xp: 1000,
  },
  {
    id: "streak-5",
    name: "On a Roll",
    description: "Log in and complete training 5 days in a row.",
    flavor: "Consistency builds champions.",
    icon: "flame",
    tier: "bronze",
    category: "milestones",
    condition: "5-day training streak",
    xp: 75,
  },
  {
    id: "streak-30",
    name: "Unstoppable",
    description: "Maintain a 30-day training streak.",
    flavor: "Nothing stops the grind.",
    icon: "flame",
    tier: "gold",
    category: "milestones",
    condition: "30-day training streak",
    xp: 400,
  },

  // ── QUIZ BADGES ───────────────────────────────────────────────────────────────
  {
    id: "first-pass",
    name: "First Pass",
    description: "Pass your first quiz on the first attempt.",
    flavor: "No second chances needed.",
    icon: "check-circle-2",
    tier: "bronze",
    category: "quiz",
    condition: "Pass 1 quiz on first attempt",
    xp: 50,
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Score 100% on any quiz.",
    flavor: "Flawless execution.",
    icon: "target",
    tier: "silver",
    category: "quiz",
    condition: "Score 100% on a quiz",
    xp: 150,
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Pass 5 quizzes with a score of 90% or higher.",
    flavor: "Sharp mind, sharper answers.",
    icon: "brain",
    tier: "gold",
    category: "quiz",
    condition: "Score 90%+ on 5 quizzes",
    xp: 300,
  },
  {
    id: "clean-sweep",
    name: "Clean Sweep",
    description: "Pass all quizzes on the first attempt with no retries.",
    flavor: "One shot is all it takes.",
    icon: "award",
    tier: "platinum",
    category: "quiz",
    condition: "Pass every quiz on the first attempt",
    xp: 600,
  },
  {
    id: "comeback-kid",
    name: "Comeback Kid",
    description: "Fail a quiz and then retake it and pass with 85%+.",
    flavor: "Failure is just the first draft.",
    icon: "refresh-cw",
    tier: "bronze",
    category: "quiz",
    condition: "Retake and pass a quiz with 85%+",
    xp: 75,
  },

  // ── DELTA BADGES ─────────────────────────────────────────────────────────────
  {
    id: "delta-starter",
    name: "Delta Starter",
    description: "Complete the Delta 101 training module.",
    flavor: "The hemp frontier begins here.",
    icon: "leaf",
    tier: "bronze",
    category: "delta",
    condition: "Complete Delta 101",
    xp: 75,
  },
  {
    id: "delta-pro",
    name: "Delta Pro",
    description: "Complete all Delta product modules and pass the quizzes.",
    flavor: "HHC, THCA, Delta 8 — you know it all.",
    icon: "leaf",
    tier: "silver",
    category: "delta",
    condition: "Complete all Delta modules",
    xp: 200,
  },
  {
    id: "delta-expert",
    name: "Delta Expert",
    description: "Score 90%+ on every Delta-related quiz.",
    flavor: "The go-to Delta authority on the floor.",
    icon: "star",
    tier: "gold",
    category: "delta",
    condition: "90%+ on all Delta quizzes",
    xp: 350,
  },

  // ── KRATOM BADGES ─────────────────────────────────────────────────────────────
  {
    id: "kratom-starter",
    name: "Kratom Starter",
    description: "Complete the Kratom Fundamentals training module.",
    flavor: "Ancient plant, modern knowledge.",
    icon: "sprout",
    tier: "bronze",
    category: "kratom",
    condition: "Complete Kratom Fundamentals",
    xp: 75,
  },
  {
    id: "kratom-guide",
    name: "Kratom Guide",
    description: "Complete all Kratom training modules.",
    flavor: "Red, green, or white — you know the difference.",
    icon: "sprout",
    tier: "silver",
    category: "kratom",
    condition: "Complete all Kratom modules",
    xp: 200,
  },
  {
    id: "kratom-authority",
    name: "Kratom Authority",
    description: "Score 90%+ on all Kratom quizzes.",
    flavor: "Strain, vein, and dose — flawlessly explained.",
    icon: "star",
    tier: "gold",
    category: "kratom",
    condition: "90%+ on all Kratom quizzes",
    xp: 350,
  },

  // ── KANNA BADGES ─────────────────────────────────────────────────────────────
  {
    id: "kanna-curious",
    name: "Kanna Curious",
    description: "Complete the Kanna & Alternative Wellness module.",
    flavor: "Wellness through botanical wisdom.",
    icon: "heart",
    tier: "bronze",
    category: "kanna",
    condition: "Complete Kanna module",
    xp: 75,
  },
  {
    id: "kanna-specialist",
    name: "Kanna Specialist",
    description: "Score 85%+ on the Kanna quiz.",
    flavor: "The wellness whisperer.",
    icon: "heart",
    tier: "silver",
    category: "kanna",
    condition: "Score 85%+ on Kanna quiz",
    xp: 175,
  },

  // ── GLASS BADGES ─────────────────────────────────────────────────────────────
  {
    id: "glass-101",
    name: "Glass 101",
    description: "Complete the Glass & Accessories module.",
    flavor: "Function meets art.",
    icon: "gem",
    tier: "bronze",
    category: "glass",
    condition: "Complete Glass module",
    xp: 75,
  },
  {
    id: "glass-curator",
    name: "Glass Curator",
    description: "Score 85%+ on the Glass & Accessories quiz.",
    flavor: "You can spot quality from across the floor.",
    icon: "gem",
    tier: "silver",
    category: "glass",
    condition: "Score 85%+ on Glass quiz",
    xp: 175,
  },

  // ── COMPLIANCE BADGES ────────────────────────────────────────────────────────
  {
    id: "compliance-ready",
    name: "Compliance Ready",
    description: "Complete the Compliance & Legal Language module.",
    flavor: "Say it right. Every time.",
    icon: "scale",
    tier: "bronze",
    category: "compliance",
    condition: "Complete Compliance module",
    xp: 100,
  },
  {
    id: "by-the-book",
    name: "By the Book",
    description: "Score 90%+ on the Compliance quiz.",
    flavor: "Zero gray areas. All green lights.",
    icon: "scale",
    tier: "silver",
    category: "compliance",
    condition: "Score 90%+ on Compliance quiz",
    xp: 225,
  },
  {
    id: "loss-prevention-ace",
    name: "Loss Prevention Ace",
    description: "Complete the Loss Prevention module and score 85%+ on the quiz.",
    flavor: "Protecting the store is everyone's job.",
    icon: "shield",
    tier: "silver",
    category: "compliance",
    condition: "Complete LP module with 85%+",
    xp: 200,
  },

  // ── SALES BADGES ─────────────────────────────────────────────────────────────
  {
    id: "floor-ready",
    name: "Floor Ready",
    description: "Complete the Sales Techniques module.",
    flavor: "Confidence starts with preparation.",
    icon: "briefcase",
    tier: "bronze",
    category: "sales",
    condition: "Complete Sales Techniques module",
    xp: 75,
  },
  {
    id: "closer",
    name: "The Closer",
    description: "Score 90%+ on the Sales Techniques quiz.",
    flavor: "You don't pitch — you solve.",
    icon: "trending-up",
    tier: "silver",
    category: "sales",
    condition: "Score 90%+ on Sales quiz",
    xp: 225,
  },
  {
    id: "people-person",
    name: "People Person",
    description: "Complete the Customer Service Fundamentals module and score 85%+.",
    flavor: "Every customer leaves smiling.",
    icon: "users",
    tier: "silver",
    category: "sales",
    condition: "Complete CS module with 85%+",
    xp: 200,
  },
  {
    id: "top-seller",
    name: "Top Seller",
    description: "Complete all Sales & Customer Service modules with 90%+ quiz scores.",
    flavor: "Numbers don't lie. Neither do you.",
    icon: "trophy",
    tier: "gold",
    category: "sales",
    condition: "All sales modules with 90%+",
    xp: 400,
  },
]

// Tier metadata for display
export const badgeTierMeta: Record<BadgeTier, { label: string; color: string; border: string; bg: string; ring: string }> = {
  bronze: {
    label: "Bronze",
    color: "text-orange-400",
    border: "border-orange-400/40",
    bg: "bg-orange-400/10",
    ring: "ring-orange-400/30",
  },
  silver: {
    label: "Silver",
    color: "text-slate-300",
    border: "border-slate-300/40",
    bg: "bg-slate-300/10",
    ring: "ring-slate-300/30",
  },
  gold: {
    label: "Gold",
    color: "text-amber-400",
    border: "border-amber-400/40",
    bg: "bg-amber-400/10",
    ring: "ring-amber-400/30",
  },
  platinum: {
    label: "Platinum",
    color: "text-cyan-300",
    border: "border-cyan-300/40",
    bg: "bg-cyan-300/10",
    ring: "ring-cyan-300/30",
  },
}

export const badgeCategoryMeta: Record<BadgeCategory, { label: string; color: string; bg: string }> = {
  delta: { label: "Delta", color: "text-blue-400", bg: "bg-blue-400/10" },
  kratom: { label: "Kratom", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  kanna: { label: "Kanna", color: "text-purple-400", bg: "bg-purple-400/10" },
  glass: { label: "Glass", color: "text-amber-400", bg: "bg-amber-400/10" },
  compliance: { label: "Compliance", color: "text-red-400", bg: "bg-red-400/10" },
  sales: { label: "Sales", color: "text-primary", bg: "bg-primary/10" },
  milestones: { label: "Milestones", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  quiz: { label: "Quiz", color: "text-violet-400", bg: "bg-violet-400/10" },
}

// Which badge IDs the mock employee has already earned
export const mockEarnedBadgeIds: string[] = [
  "first-step",
  "getting-started",
  "first-pass",
  "delta-starter",
  "kratom-starter",
  "compliance-ready",
  "floor-ready",
  "comeback-kid",
  "kanna-curious",
  "glass-101",
]

export interface DosageGuide {
  level: string
  amount: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  category: "delta" | "kratom" | "glass" | "accessories" | "kanna"
  image?: string
  tagline: string
  description: string
  longDescription: string
  effects: string[]
  talkingPoints: string[]
  complianceNotes: string[]
  relatedProducts: string[]
  // Extended fields
  specs?: ProductSpec[]
  dosageGuide?: DosageGuide[]
  onsetTime?: string
  duration?: string
  bestFor?: string[]
  warnings?: string[]
  faqs?: FAQ[]
  pairings?: string[]
  proTips?: string[]
}

export interface TrainingModule {
  id: string
  title: string
  description: string
  estimatedTime: string
  completed: boolean
  progress: number
  lessons: Lesson[]
  quizId: string
}

export interface Lesson {
  id: string
  title: string
  content: string
  keyPoints: string[]
  videoUrl?: string
  completed: boolean
}

export interface Quiz {
  id: string
  title: string
  moduleId: string
  questions: Question[]
  passingScore: number
}

export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
}

export interface QuizResult {
  quizId: string
  quizTitle: string
  score: number
  totalQuestions: number
  completedAt: string
  answers: { questionId: string; selectedAnswer: number; correct: boolean }[]
}

export interface SalesTip {
  id: string
  category: "opening" | "recommendations" | "objections" | "upselling"
  title: string
  content: string
}

// ── Role-Play Conversations ──────────────────────────────────────────────────
export type ConversationSpeaker = "customer" | "employee"

export interface ConversationLine {
  speaker: ConversationSpeaker
  text: string
  note?: string // coaching note shown on employee lines
}

export interface RolePlayScenario {
  id: string
  title: string
  category: "first-timer" | "upsell" | "objection" | "compliance" | "kanna" | "kratom" | "delta"
  difficulty: "beginner" | "intermediate" | "advanced"
  scenario: string // brief setup
  goal: string // what the employee should achieve
  lines: ConversationLine[]
  keyTakeaways: string[]
}

// ── Objection Handling ───────────────────────────────────────────────────────
export interface ObjectionCard {
  id: string
  objection: string
  wrongResponse: string
  rightResponse: string
  whyItWorks: string
  category: "price" | "hesitation" | "product" | "compliance" | "competitor"
}

// ── Compliance Language ──────────────────────────────────────────────────────
export interface LanguageSwap {
  id: string
  context: string
  neverSay: string
  alwaysSay: string
  reason: string
  severity: "critical" | "important" | "note"
}

// ── Sales Techniques ─────────────────────────────────────────────────────────
export interface SalesTechnique {
  id: string
  name: string
  category: "opening" | "discovery" | "recommendation" | "upsell" | "close"
  tagline: string
  description: string
  exactWords: string
  whyItWorks: string
  whenToUse: string
  avoidWhen: string
}

// Mock Data
export const mockEmployee: Employee = {
  id: "EMP001",
  name: "Alex Johnson",
  email: "alex.johnson@highlife.com",
  role: "Sales Associate",
  storeLocation: "Downtown Location",
  completedModules: 3,
  totalModules: 13,
  averageQuizScore: 87,
  badges: [
    { id: "b1", name: "Quick Learner", description: "Completed first module", icon: "zap", earnedAt: "2024-01-15" },
    {
      id: "b2",
      name: "Product Expert",
      description: "Scored 90%+ on product quiz",
      icon: "award",
      earnedAt: "2024-01-20",
    },
  ],
  quizHistory: [
    { quizId: "q1", quizTitle: "Delta 101 Quiz", score: 9, totalQuestions: 10, completedAt: "2024-01-15", answers: [] },
    {
      quizId: "q2",
      quizTitle: "Kratom Basics Quiz",
      score: 8,
      totalQuestions: 10,
      completedAt: "2024-01-18",
      answers: [],
    },
    {
      quizId: "q3",
      quizTitle: "Customer Service Quiz",
      score: 10,
      totalQuestions: 10,
      completedAt: "2024-01-22",
      answers: [],
    },
  ],
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Delta-8 THC Gummies",
    category: "delta",
    image: "/delta-8-thc-gummy-bears-colorful-edibles-cannabis-.jpg",
    tagline: "The perfect starting point for Delta beginners",
    description: "Premium delta-8 THC gummies with natural fruit flavors. Each gummy contains 25mg of delta-8 THC.",
    longDescription: `Delta-8 THC gummies are one of the most popular introductory products in our delta lineup — and for good reason. They deliver a smooth, consistent experience that's significantly more approachable than Delta-9 for customers who want to explore cannabinoids without the intensity.

Each gummy is precisely dosed at 25mg of Delta-8 THC extracted from federally compliant hemp and infused (not sprayed) into the gummy matrix for even distribution in every bite. The natural fruit flavors come from real fruit-derived terpenes, giving a clean taste without artificial aftertaste.

Delta-8 is often described by customers as "Delta-9 with the volume turned down" — you get the relaxation and mild euphoria, but with far less likelihood of anxiety or paranoia. This makes it ideal for first-timers, casual users, and anyone who's had a negative experience with traditional cannabis edibles.

The edible format also means effects are longer-lasting than vaping — typically 4 to 8 hours — making it great for sustained relief throughout an evening. The tradeoff is a slower onset (45 minutes to 2 hours), so it's critical to coach customers to wait before redosing.`,
    effects: ["Deep relaxation", "Mild euphoria", "Stress and anxiety relief", "Improved sleep quality", "Appetite stimulation", "Body tension relief"],
    onsetTime: "45 min – 2 hours",
    duration: "4 – 8 hours",
    bestFor: ["First-time delta users", "Evening relaxation", "Customers sensitive to Delta-9", "Sleep support", "Consistent dosing"],
    specs: [
      { label: "Delta-8 per gummy", value: "25mg" },
      { label: "Count per pack", value: "20 gummies" },
      { label: "Total Delta-8", value: "500mg" },
      { label: "Delta-9 THC", value: "< 0.3% (federal limit)" },
      { label: "Extraction", value: "Hemp-derived distillate" },
      { label: "Infusion type", value: "Infused (not sprayed)" },
      { label: "Lab tested", value: "Third-party COA available" },
    ],
    dosageGuide: [
      { level: "Beginner", amount: "1/2 gummy (12.5mg)", description: "No prior delta experience. Wait at least 2 hours before considering a second dose." },
      { level: "Light", amount: "1 gummy (25mg)", description: "Occasional users comfortable with mild effects. Good for relaxation without heavy sedation." },
      { level: "Moderate", amount: "1–2 gummies (25–50mg)", description: "Regular users with established tolerance seeking deeper relaxation or sleep support." },
      { level: "Experienced", amount: "2+ gummies (50mg+)", description: "High-tolerance users only. Not recommended without established tolerance." },
    ],
    talkingPoints: [
      "Perfect entry point — milder and smoother than Delta-9 THC",
      "Effects last 4–8 hours, much longer than vaping",
      "Infused, not sprayed — consistent dose in every bite",
      "Natural fruit flavors from real fruit-derived terpenes",
      "Every batch third-party lab tested with COA available on request",
      "Great for customers who've had anxiety from regular cannabis edibles",
    ],
    complianceNotes: [
      "Must verify 21+ age — ID check required",
      "Cannot make medical claims of any kind",
      "Hemp-derived with <0.3% Delta-9 THC by dry weight — federally compliant",
      "Always warn about delayed onset — customers must wait before redosing",
      "Do not sell to visibly intoxicated customers",
      "Advise against driving or operating machinery after use",
    ],
    warnings: [
      "Do not drive or operate machinery",
      "Keep out of reach of children",
      "Not for use during pregnancy or nursing",
      "May cause failed drug test",
      "Do not combine with alcohol or other depressants",
    ],
    faqs: [
      { question: "How is Delta-8 different from Delta-9?", answer: "Delta-8 THC has a slightly different molecular structure than Delta-9, resulting in milder psychoactive effects. Most users report feeling relaxed and euphoric without the anxiety or paranoia that can come with Delta-9." },
      { question: "How long until I feel the effects?", answer: "Edibles typically take 45 minutes to 2 hours to kick in, depending on metabolism, body weight, and whether you've eaten recently. Always advise customers to wait at least 2 hours before taking more." },
      { question: "Will this show up on a drug test?", answer: "Yes — Delta-8 THC can cause a positive result on standard drug tests, as these tests typically detect THC metabolites regardless of the source. Always disclose this to customers." },
      { question: "Is it legal?", answer: "Delta-8 THC derived from hemp containing less than 0.3% Delta-9 THC is federally legal under the 2018 Farm Bill. However, some states have enacted restrictions. Always verify current local regulations." },
      { question: "Can I take too much?", answer: "While not medically dangerous, taking too much Delta-8 can cause discomfort including rapid heartbeat, anxiety, and disorientation. Always start low and go slow, especially with edibles." },
    ],
    proTips: [
      "If a customer is nervous about trying edibles, suggest cutting a gummy in half and trying it at home first — never on their first outing.",
      "Pair with our Delta-9 vape cart for customers who want fast onset plus long-lasting effects.",
      "If a customer says 'they don't feel anything' — always ask when they took it before suggesting more. Edible overconsumption is the #1 customer complaint.",
    ],
    pairings: ["p2", "p9"],
    relatedProducts: ["p2", "p3", "p11"],
  },
  {
    id: "p2",
    name: "Delta-9 THC Vape Cartridge",
    category: "delta",
    image: "/premium-vape-cartridge-gold-oil-cannabis-product-s.jpg",
    tagline: "Fast-acting, strain-specific Delta-9 in a portable format",
    description: "High-quality delta-9 THC vape cartridge with ceramic coil technology for smooth, flavorful hits.",
    longDescription: `Our Delta-9 THC Vape Cartridge is designed for customers who want fast, reliable effects with strain-specific flavor profiles. Using premium ceramic coil technology, the cart delivers clean vapor without the metallic taste or burnt notes associated with standard cotton-wick cartridges.

The oil inside is hemp-derived Delta-9 THC distillate that meets federal legal requirements (<0.3% by dry weight). Despite that constraint, modern extraction techniques allow us to deliver genuinely potent, effective products. Each cart is 510-thread compatible and fits the vast majority of standard batteries.

We carry several strain variants — each with different terpene profiles that influence the experience. Sativa-leaning terpenes like limonene and pinene tend to promote energy and creativity, while indica-leaning terpenes like myrcene and linalool lean more relaxing. Understanding this helps you guide customers to the right variant for their intended use.

The fast onset (1–5 minutes) makes vapes ideal for dose-testing and for customers who need quick relief. The shorter duration (1–3 hours) means customers who need all-day effects should also consider our edibles.`,
    effects: ["Fast-acting euphoria", "Creativity and focus boost", "Mild relaxation", "Mood elevation", "Appetite stimulation"],
    onsetTime: "1 – 5 minutes",
    duration: "1 – 3 hours",
    bestFor: ["Fast onset seekers", "On-the-go use", "Experienced delta users", "Dose testing before trying edibles", "Daytime (sativa strains) or evening (indica strains)"],
    specs: [
      { label: "Capacity", value: "1g (1000mg)" },
      { label: "Delta-9 THC", value: "Hemp-derived, <0.3% by dry weight" },
      { label: "Coil type", value: "Ceramic — no cotton wick" },
      { label: "Thread", value: "510 universal thread" },
      { label: "Oil type", value: "Distillate + live resin terpenes" },
      { label: "Strains available", value: "Sativa, Indica, Hybrid variants" },
      { label: "Lab tested", value: "Third-party COA available" },
    ],
    dosageGuide: [
      { level: "Beginner", amount: "1–2 small puffs", description: "Wait 5–10 minutes between puffs to gauge effects before continuing." },
      { level: "Light", amount: "3–5 puffs", description: "Good for casual users seeking mild to moderate effects." },
      { level: "Moderate", amount: "5–10 puffs", description: "Experienced users. Allow time between sessions." },
      { level: "Experienced", amount: "As needed", description: "Tolerance-established users. Self-regulated dosing." },
    ],
    talkingPoints: [
      "Ceramic coil = no burnt taste, cleaner flavor from the first hit to the last",
      "510-thread fits 99% of standard batteries — works with what they already own",
      "Live resin terpenes give true strain-specific effects and aroma",
      "Fastest way to feel Delta effects — ideal for quick relief or dose testing",
      "Multiple strain options — match the customer to the right vibe",
    ],
    complianceNotes: [
      "Must verify 21+ age — ID check required",
      "Cannot make medical claims",
      "Hemp-derived — federally compliant under the 2018 Farm Bill",
      "Advise against driving or operating machinery after use",
      "Do not sell to visibly intoxicated customers",
    ],
    warnings: [
      "Do not drive or operate machinery",
      "Keep out of reach of children",
      "Not for use during pregnancy or nursing",
      "May cause failed drug test",
    ],
    faqs: [
      { question: "What battery do I need?", answer: "Any standard 510-thread battery works. We sell compatible batteries at the counter. If a customer already has a battery, confirm it's 510-thread and adjustable voltage for best results." },
      { question: "What is the difference between distillate and live resin?", answer: "Distillate is a highly purified extract with minimal flavor. Live resin uses fresh-frozen plant material, preserving the full terpene profile for a more authentic, flavorful experience. Our carts use a blend for the best of both." },
      { question: "Sativa vs. Indica — which should I recommend?", answer: "Sativa-leaning strains (pinene, limonene terpenes) are better for daytime, creativity, and energy. Indica-leaning (myrcene, linalool) are better for evening, relaxation, and sleep. Hybrids offer a balance of both." },
      { question: "How long does a 1g cart last?", answer: "Usage varies by puff duration and frequency. Casual users may get 200–300 puffs; heavy users significantly less. On average, daily moderate users report 2–4 weeks per cart." },
    ],
    proTips: [
      "Always upsell a battery if the customer doesn't have one — it's an easy add-on and ensures they have a good experience.",
      "For customers nervous about Delta-9, recommend starting with a Delta-8 gummy for their first experience.",
      "If a customer asks about 'live resin' vs. 'distillate' carts — live resin carts have stronger, more complex flavor and effects. Great upsell for returning customers.",
    ],
    pairings: ["p1", "p7"],
    relatedProducts: ["p1", "p11"],
  },
  {
    id: "p3",
    name: "Green Maeng Da Kratom",
    category: "kratom",
    image: "/green-kratom-powder-in-white-bowl-with-kratom-leav.jpg",
    tagline: "Our best-selling balanced strain — energy meets calm",
    description: "Premium green vein Maeng Da kratom powder sourced from mature, hand-harvested leaves in Indonesia.",
    longDescription: `Green Maeng Da is arguably our most versatile kratom product and consistently one of our top sellers. "Maeng Da" translates from Thai as "Pimp Grade," and it lives up to the name — Maeng Da strains are bred for potency and effect consistency, making them a reliable choice for both new and experienced kratom users.

Green vein kratom sits in the sweet spot between white vein (energizing) and red vein (sedating). This balanced profile makes Green Maeng Da an ideal daytime strain — customers can expect a noticeable mood lift and focus boost without the overstimulation of white veins, and without the sedation of reds that would interfere with daily activities.

The alkaloid profile in Maeng Da strains is typically higher than most other origins, meaning customers often need slightly less to achieve the desired effect. This is worth communicating at the counter — it helps set accurate expectations and prevents overconsumption.

Our Green Maeng Da is sourced directly from mature, sun-dried leaves in Borneo and Sumatra, then milled to a fine powder and batch-tested for alkaloid content and the absence of heavy metals, pesticides, and microbial contaminants.`,
    effects: ["Clean energy boost", "Sharper mental focus", "Mood elevation and positivity", "Mild physical comfort", "Motivation enhancement", "Social ease"],
    onsetTime: "15 – 30 minutes",
    duration: "3 – 5 hours",
    bestFor: ["Daytime use", "Work or study sessions", "Customers switching from coffee", "Social situations", "First-time kratom users wanting a balanced intro"],
    specs: [
      { label: "Vein color", value: "Green" },
      { label: "Origin", value: "Borneo / Sumatra, Indonesia" },
      { label: "Strain", value: "Maeng Da" },
      { label: "Form", value: "Finely milled powder" },
      { label: "Alkaloid profile", value: "High mitragynine, moderate 7-OH" },
      { label: "Sizes available", value: "25g, 100g, 250g, 1kg" },
      { label: "Testing", value: "Heavy metals, pesticides, microbial" },
    ],
    dosageGuide: [
      { level: "Beginner", amount: "1 – 2 grams", description: "Start here. Effects should be noticeable. Wait 30 minutes before considering more." },
      { level: "Light", amount: "2 – 4 grams", description: "Good energy, focus, and mood lift. The sweet spot for most daytime users." },
      { level: "Moderate", amount: "4 – 6 grams", description: "Stronger effects. May begin to shift from stimulating to more sedating at this range." },
      { level: "High", amount: "6+ grams", description: "Experienced users only. Effects become more sedating. Not recommended for beginners." },
    ],
    talkingPoints: [
      "Our #1 most recommended kratom for first-time customers — it's beginner-friendly but satisfying for regulars",
      "Maeng Da means 'Pimp Grade' — bred for potency and consistency, not just marketing",
      "Green vein is the sweet spot — energy of white without stimulation overdrive, relaxation of red without sedation",
      "Typically more potent per gram than other strains — advise starting at 1–2g",
      "Every batch third-party tested — COA available for customers who ask",
    ],
    complianceNotes: [
      "Not FDA approved — cannot make medical claims",
      "Ask if customer takes any medications — kratom can interact with some drugs",
      "Always recommend starting with a low dose, especially for new users",
      "Advise against mixing with alcohol or other substances",
      "Not recommended for pregnant or nursing women",
    ],
    warnings: [
      "Not intended to diagnose, treat, cure, or prevent any disease",
      "Not for use under 18 years of age",
      "Do not use if pregnant or nursing",
      "Do not operate heavy machinery immediately after use at higher doses",
      "Potential for dependence with daily high-dose use",
    ],
    faqs: [
      { question: "What does 'Green' mean in Green Maeng Da?", answer: "The color refers to the vein color of the kratom leaf when harvested. Green vein leaves are harvested at mid-maturity, producing a balanced alkaloid profile between the stimulating whites and the sedating reds." },
      { question: "How should I take the powder?", answer: "The most popular methods are 'toss and wash' (measure powder, put in mouth, wash down with water), mixing into juice or a smoothie, or making a tea. We also carry capsules for customers who dislike the taste." },
      { question: "How long until effects kick in?", answer: "On an empty stomach, most people feel effects within 15–20 minutes. After a meal, it can take 30–45 minutes. Taking on an empty stomach is generally recommended for best absorption." },
      { question: "Will kratom show up on a drug test?", answer: "Standard drug tests do not test for kratom alkaloids. However, specialized kratom-specific tests do exist. Always be transparent with customers if asked." },
    ],
    proTips: [
      "For customers comparing kratom to coffee: Green Maeng Da is a great analog — it's energizing and focusing without the jitteriness or crash.",
      "If a customer has tried kratom before and says 'it didn't work,' find out how much they took. Underdosing (under 1g) is common first-time error.",
      "Pair with the Red Bali capsules for customers who want one strain for daytime and one for evening.",
    ],
    pairings: ["p4", "p8"],
    relatedProducts: ["p4", "p10"],
  },
  {
    id: "p4",
    name: "Red Bali Kratom Capsules",
    category: "kratom",
    image: "/kratom-capsules-in-amber-bottle-supplement-product.jpg",
    tagline: "Classic evening relaxation in a clean, convenient capsule",
    description: "Red vein Bali kratom in convenient pre-measured capsules — precise dosing with none of the powder taste.",
    longDescription: `Red Bali Kratom is one of the most beloved classic strains in kratom culture, and for good reason. Bali strains are known for their well-rounded, smooth alkaloid profile — they deliver the sedating, comfort-supporting characteristics of red vein kratom without being overpowering. It's reliable, consistent, and rarely polarizing.

Our capsule format makes Red Bali accessible to the widest possible customer base. Many people are interested in kratom but put off by the taste and texture of raw powder. Capsules solve that entirely — each capsule contains a pre-measured dose, making it easy to track intake and avoid the guesswork that can lead to overconsumption.

Each capsule contains 500mg (0.5g) of premium red vein Bali powder sourced from mature leaves, and the amber bottle protects the alkaloid content from light degradation. The bottles come in 60-count and 120-count options for different needs and budgets.

Red Bali is the strain most commonly reported to support evening relaxation, physical comfort, and restful sleep. It's a strong repurchase product — customers who find their dosage sweet spot often become regulars.`,
    effects: ["Deep physical relaxation", "Stress and tension relief", "Improved sleep onset", "Physical comfort and ease", "Calm, peaceful mental state", "Mood support"],
    onsetTime: "20 – 40 minutes",
    duration: "4 – 6 hours",
    bestFor: ["Evening and nighttime use", "Customers sensitive to powder taste", "Precise dosing needs", "Sleep support", "Physical tension relief", "Kratom beginners who prefer capsules"],
    specs: [
      { label: "Vein color", value: "Red" },
      { label: "Origin", value: "Bali, Indonesia" },
      { label: "Per capsule", value: "500mg (0.5g)" },
      { label: "Counts available", value: "60ct / 120ct" },
      { label: "Capsule type", value: "Gelatin (standard)" },
      { label: "Packaging", value: "Amber UV-protective bottle" },
      { label: "Testing", value: "Heavy metals, pesticides, microbial" },
    ],
    dosageGuide: [
      { level: "Beginner", amount: "2 – 3 capsules (1–1.5g)", description: "Start conservatively. Red vein effects can feel strong to new users. Take 30–40 minutes to assess." },
      { level: "Light", amount: "4 – 6 capsules (2–3g)", description: "Mild relaxation and comfort. Good for unwinding after work without heavy sedation." },
      { level: "Moderate", amount: "6 – 10 capsules (3–5g)", description: "Stronger relaxation, physical comfort, and sleep support. Most effective dosage range for regular users." },
      { level: "High", amount: "10+ capsules (5g+)", description: "Experienced users with established tolerance only. Effects become highly sedating at this range." },
    ],
    talkingPoints: [
      "Pre-measured capsules eliminate the guesswork — every dose is exactly 500mg",
      "No taste, no mess — perfect for customers who've been hesitant about kratom powder",
      "Red Bali is our smoothest, most consistent red — rarely harsh or overwhelming",
      "Amber bottle extends shelf life by protecting alkaloids from light degradation",
      "Strong repurchase strain — customers who find their dose love coming back for it",
    ],
    complianceNotes: [
      "Not FDA approved — cannot make medical claims",
      "Ask about current medications — kratom may interact",
      "Not for use under 18 years of age",
      "Not for use during pregnancy or nursing",
      "Advise customers to track their dose and start low",
    ],
    warnings: [
      "Not intended to diagnose, treat, cure, or prevent any disease",
      "Not for use under 18",
      "Do not operate heavy machinery — Red Bali can cause significant drowsiness at moderate-high doses",
      "Potential for dependence with daily high-dose use",
    ],
    faqs: [
      { question: "Why capsules instead of powder?", answer: "Capsules eliminate the strong bitter taste of kratom powder and make dosing more precise and consistent. They're slightly slower to absorb (capsule must dissolve first) but otherwise equivalent in effect." },
      { question: "How many capsules is the right dose?", answer: "Each capsule is 500mg (0.5g). We recommend beginners start with 2–3 capsules (1–1.5g) and wait 40 minutes before assessing. Most regular users find their sweet spot between 4–8 capsules depending on body weight and sensitivity." },
      { question: "Can I take these with food?", answer: "Yes, but effects will be slower and potentially less strong on a full stomach. For best absorption, take on an empty stomach or 1–2 hours after a meal." },
      { question: "Red vs. Green — which should I recommend?", answer: "Red Bali is best for evening, relaxation, and sleep support. Green Maeng Da is better for daytime use, energy, and focus. Many regulars keep both on hand." },
    ],
    proTips: [
      "Red Bali and Green Maeng Da are a natural upsell pair — day strain and night strain. Many customers buy both at the same time once you explain the difference.",
      "Customers who say 'kratom makes me too tired' have usually tried a red vein during the day. Redirect them to Green Maeng Da.",
      "Capsule customers tend to have higher average order values and better brand loyalty — they appreciate the convenience and are willing to pay for it.",
    ],
    pairings: ["p3", "p9"],
    relatedProducts: ["p3", "p10"],
  },
  {
    id: "p5",
    name: "Heady Glass Water Pipe",
    category: "glass",
    image: "/artistic-heady-glass-water-pipe-colorful-blown-gla.jpg",
    tagline: "Functional art for the serious collector",
    description: "Handcrafted American-made heady glass water pipe — a one-of-a-kind piece where no two are ever exactly alike.",
    longDescription: `Heady glass represents the highest tier of functional glass art, and our Heady Water Pipes are prime examples of what makes this craft special. Unlike mass-produced scientific glass, each heady piece is individually hand-blown by a skilled American glassblower using borosilicate glass and a variety of specialized techniques: fuming, millie work, UV-reactive glass, dichroic accents, and more.

The term "heady" comes from the glass art community and refers to pieces that prioritize aesthetics and artistic expression alongside function. These aren't just smoking devices — they're collectible art objects that appreciate in value for popular artists.

For customers, the pitch is simple: this is something no one else will have. Every heady piece in our display case is unique. The swirling colors, the impeccable craftsmanship, and the knowledge that a skilled artist spent hours creating this piece makes it a conversation piece as much as a functional tool.

From a sales perspective, heady pieces are high-margin, high-emotion purchases. The customer isn't comparing prices online — they're buying a specific piece right in front of them. Focus on the story, the craftsmanship, and what resonates visually with that specific customer.`,
    effects: [],
    onsetTime: "N/A",
    duration: "N/A",
    bestFor: ["Collectors and enthusiasts", "Gift purchases", "Customers who appreciate American craftsmanship", "Display piece buyers", "Experienced smokers upgrading their setup"],
    specs: [
      { label: "Construction", value: "Hand-blown borosilicate glass" },
      { label: "Origin", value: "American-made" },
      { label: "Uniqueness", value: "One-of-a-kind (no two alike)" },
      { label: "Techniques", value: "Fuming, millie work, UV-reactive elements" },
      { label: "Intended use", value: "Tobacco use only" },
      { label: "Care", value: "Hand wash with ISO + salt, handle with care" },
    ],
    dosageGuide: [],
    talkingPoints: [
      "Truly one-of-a-kind — the exact piece in the case is the only one like it in existence",
      "Made by skilled American glassblowers — this is functional fine art, not factory glass",
      "Collectible value — popular artists' pieces can increase in value over time",
      "The perfect premium gift for someone who has everything",
      "Each piece tells a story — share the artist's technique when you know it",
    ],
    complianceNotes: [
      "Sold for tobacco use only — do not discuss other uses",
      "Handle display pieces with extreme care — breakage is a loss",
      "Do not leave unwrapped near edges or high-traffic areas",
    ],
    warnings: [
      "Glass is fragile — handle and transport with care",
      "For tobacco use only",
      "Keep out of reach of children",
    ],
    faqs: [
      { question: "Why is heady glass so expensive compared to scientific glass?", answer: "Heady glass is individually hand-blown by skilled artists, often taking hours or days per piece. The price reflects the labor, artistry, rare materials, and one-of-a-kind nature. Scientific glass is machine-assisted and mass-produced, making it functional but not collectible." },
      { question: "How do I clean heady glass without damaging it?", answer: "Use 91%+ isopropyl alcohol and coarse salt. Shake gently, rinse thoroughly with warm water, and allow to fully dry. Avoid boiling water or harsh scrubbing, especially on decorated sections." },
      { question: "Can I request a specific style or artist?", answer: "We source heady pieces as they become available. If a customer is looking for a specific artist or style, take their contact info and let them know when new inventory arrives — this builds strong customer relationships." },
    ],
    proTips: [
      "Let the customer handle the piece (with supervision) — tactile connection closes heady sales. Once they're holding it, they can picture it on their shelf.",
      "Know two or three things about each heady piece in your case: the technique, the artist if known, and one visual feature to point out. That narrative is your sales tool.",
      "Heady pieces make exceptional gift suggestions for customers who say they 'don't know what to get.' High price point + beautiful packaging = a memorable gift.",
    ],
    pairings: ["p6", "p7"],
    relatedProducts: ["p6", "p7"],
  },
  {
    id: "p6",
    name: "Scientific Glass Beaker",
    category: "glass",
    image: "/clear-scientific-glass-beaker-bong-with-ice-catche.jpg",
    tagline: "The reliable everyday workhorse — built for function and durability",
    description: "Scientific-style borosilicate glass beaker with ice catcher, diffused downstem, and removable bowl.",
    longDescription: `If heady glass is fine art, scientific glass is precision engineering. Our Scientific Glass Beaker is built to the standards of a laboratory instrument — using thick borosilicate glass that's resistant to thermal shock, designed with a stable wide base and optimized water volume, and equipped with a diffused downstem for filtered, smooth draws.

Scientific glass enthusiasts often prefer this style for its consistency and cleanability. Every feature serves a functional purpose: the beaker base holds more water than a straight tube for better filtration; the ice catcher notches hold ice cubes to cool the vapor before inhalation; and the removable diffused downstem breaks the smoke into smaller bubbles, dramatically increasing the surface area for water filtration.

This piece is an excellent gateway product for customers who want something that will last. Borosilicate glass is the same material used in laboratory glassware — it doesn't absorb residue the way soft glass does, and it's far more resistant to breaking from normal use. With proper care, a quality scientific piece can last years.

It's also a smart upsell for customers already buying accessories — grinders, rolling trays, etc. If they're spending on accessories, they likely want a quality primary piece to go with them.`,
    effects: [],
    onsetTime: "N/A",
    duration: "N/A",
    bestFor: ["Daily users", "Customers who prioritize function over aesthetics", "Ice-preferring smokers", "Easy-to-clean setup seekers", "First-time glass buyers"],
    specs: [
      { label: "Glass type", value: "Thick borosilicate (scientific grade)" },
      { label: "Height", value: "~12 inches" },
      { label: "Base style", value: "Wide beaker for stability" },
      { label: "Downstem", value: "Diffused — 6-slit percolation" },
      { label: "Ice catcher", value: "Yes — 3-pinch style" },
      { label: "Joint size", value: "14mm female" },
      { label: "Intended use", value: "Tobacco use only" },
    ],
    dosageGuide: [],
    talkingPoints: [
      "Borosilicate glass — same material as lab equipment, far more durable than soft glass",
      "Ice catcher dramatically cools smoke for a much smoother draw",
      "Diffused downstem breaks smoke into smaller bubbles for better filtration",
      "Wide beaker base is harder to knock over than straight tubes",
      "Easy to clean — removable downstem means no tight spots you can't reach",
    ],
    complianceNotes: [
      "Sold for tobacco use only — do not discuss other uses",
      "Handle display pieces carefully",
    ],
    warnings: [
      "Glass can break — do not drop or subject to sudden temperature changes",
      "For tobacco use only",
      "Keep out of reach of children",
    ],
    faqs: [
      { question: "What is borosilicate glass and why does it matter?", answer: "Borosilicate glass contains boron trioxide, making it resistant to thermal shock (sudden temperature changes) and chemical corrosion. It's the same glass used in laboratory equipment and Pyrex cookware — significantly more durable than standard soft glass, which is more prone to cracking." },
      { question: "What joint size does this use?", answer: "14mm female joint — the most common standard size in glass accessories. This means a huge range of aftermarket bowls, ash catchers, and adapters are compatible, giving the customer room to customize and expand their setup over time." },
      { question: "How do I clean it?", answer: "Fill with 91%+ isopropyl alcohol and coarse salt, seal the openings, and shake for 1–2 minutes. Rinse thoroughly with warm water. For stubborn buildup, let it soak for 30–60 minutes before shaking." },
    ],
    proTips: [
      "The 14mm joint is a natural upsell opportunity — mention that aftermarket bowls and ash catchers are all compatible, planting the seed for a future purchase.",
      "For customers deciding between a straight tube and a beaker, always recommend the beaker for beginners — the lower center of gravity means far fewer accidental tips.",
      "Pair with the Premium Grinder as a combo — customers buying glass for tobacco use almost always need a grinder.",
    ],
    pairings: ["p5", "p7"],
    relatedProducts: ["p5", "p7", "p8"],
  },
  {
    id: "p7",
    name: "Premium 4-Piece Grinder",
    category: "accessories",
    image: "/premium-aluminum-herb-grinder-4-piece-matte-black-.jpg",
    tagline: "Precision grinding with a kief catcher — the last grinder you'll buy",
    description: "CNC-machined aerospace-grade aluminum four-piece grinder with diamond-cut teeth and a 50-micron kief catcher screen.",
    longDescription: `A quality grinder is one of the highest-frequency purchases in the accessories category — customers use it daily, and once they've had a great one, they'll never go back to cheap plastic. Our Premium 4-Piece Grinder is CNC-machined from aerospace-grade aluminum to tolerances that make the smooth, butter-like rotation immediately apparent the moment a customer picks it up.

The four-chamber design is what separates it from basic 2-piece grinders. Chamber 1 grinds the herb. Chamber 2 collects the finely ground material through holes sized for optimal consistency. Chamber 3 is separated by a 50-micron stainless steel screen that allows only fine trichomes (kief) to fall through into Chamber 4 — the kief catcher. Accumulated kief is significantly more potent than regular ground herb and represents real added value for customers.

The diamond-cut teeth are sharper and more precisely angled than stamped or cast teeth, resulting in a consistent, even grind without the chunks or stems that cheaper grinders allow through. A strong neodymium magnet holds the lid securely closed without the lid ever sticking.

This grinder is available in multiple finishes and comes with a lifetime warranty — a genuine selling point that sets it apart from disposable grinders.`,
    effects: [],
    onsetTime: "N/A",
    duration: "N/A",
    bestFor: ["Tobacco users wanting consistent grind", "Glass pipe and rolling paper users", "Customers who want the kief catcher bonus", "Gift purchases", "Anyone upgrading from a cheap 2-piece"],
    specs: [
      { label: "Material", value: "Aerospace-grade aluminum" },
      { label: "Machining", value: "CNC precision machined" },
      { label: "Teeth type", value: "Diamond-cut, razor sharp" },
      { label: "Chambers", value: "4-piece (grind, collect, screen, kief)" },
      { label: "Screen mesh", value: "50-micron stainless steel" },
      { label: "Lid closure", value: "Neodymium magnet" },
      { label: "Colors available", value: "Matte black, silver, gold, rainbow" },
      { label: "Warranty", value: "Lifetime" },
    ],
    dosageGuide: [],
    talkingPoints: [
      "CNC-machined to aerospace tolerances — the difference in smoothness is immediately obvious",
      "4-piece design with kief catcher is a genuine value-add that cheap grinders can't match",
      "Diamond-cut teeth produce consistent, even grind — no stems, no chunks",
      "Lifetime warranty — this is the last grinder they'll ever need to buy",
      "Multiple color finishes available — let the customer pick their preference",
    ],
    complianceNotes: [
      "Sold for tobacco use only",
    ],
    warnings: [
      "For tobacco use only",
      "Keep out of reach of children",
      "Aluminum edges can be sharp on new units",
    ],
    faqs: [
      { question: "Why 4-piece vs. 2-piece?", answer: "A 2-piece grinder simply grinds and drops into one chamber. A 4-piece grinder separates the grind by size for consistency and has a dedicated kief catcher — a screen that collects the fine trichome powder that falls off during grinding. This accumulated kief is more potent and represents real bonus value." },
      { question: "What colors are available?", answer: "We carry matte black, silver, gold, and rainbow anodized. Matte black is consistently the most popular. Let customers browse the display models and choose their finish — personal preference matters here." },
      { question: "How do I clean a grinder?", answer: "Disassemble fully and place in freezer for 30 minutes — this makes residue brittle and easy to remove. Use a soft brush (a clean toothbrush works great) to brush out chambers and teeth. For deep cleaning, soak in isopropyl alcohol for 20–30 minutes, rinse with hot water, and dry fully before reassembling." },
    ],
    proTips: [
      "Let customers hold a display model and turn it — the smooth machined action sells itself. You don't have to say much.",
      "Kief catcher is a powerful selling point for customers who've never heard of it. Explain that it collects the most potent part of the herb automatically every time they grind.",
      "The lifetime warranty closes hesitant buyers. 'You'll never have to buy another grinder' is a genuine statement here.",
    ],
    pairings: ["p6", "p8"],
    relatedProducts: ["p6", "p8"],
  },
  {
    id: "p8",
    name: "Rolling Tray Set",
    category: "accessories",
    image: "/premium-rolling-tray-set-with-accessories-organize.jpg",
    tagline: "Everything you need to roll, organized in one premium set",
    description: "Complete premium rolling tray set with magnetic lid, integrated compartments, and a full suite of quality accessories included.",
    longDescription: `The Rolling Tray Set is one of our best gift-friendly products — it's practical, visually appealing, and solves a problem every rolling tobacco user has: having their supplies scattered everywhere. This set consolidates everything into one organized system with a satisfying magnetic lid that doubles as a storage cover and a rolling surface.

The tray itself is large enough to work comfortably without spilling, with a curved inner edge that keeps material contained during the rolling process. Integrated side compartments keep papers, filters, and a lighter within reach without cluttering the main workspace.

The set comes fully loaded with quality accessories: a pack of premium rolling papers, a pack of filter tips, a cleaning card, a packing tool, and a storage container. Each accessory is functional quality — not throwaway filler. This means the customer gets immediate, out-of-box usability rather than having to supplement the set.

Multiple design options are available — from minimalist matte finishes to artistic designs — which makes this a popular pick as a personalized gift. The magnetic lid also means the whole set can travel without spilling.`,
    effects: [],
    onsetTime: "N/A",
    duration: "N/A",
    bestFor: ["Rolling tobacco users", "Gift purchases", "Organized workspace seekers", "Customers who roll regularly", "Travel-friendly setup needs"],
    specs: [
      { label: "Tray material", value: "Tin plate with powder coat finish" },
      { label: "Lid", value: "Magnetic closure — doubles as storage cover" },
      { label: "Tray dimensions", value: "Approx. 11\" x 7\" working surface" },
      { label: "Compartments", value: "Integrated side storage for papers and filters" },
      { label: "Included accessories", value: "Rolling papers, filter tips, cleaning card, packing tool, storage jar" },
      { label: "Designs available", value: "Multiple — ask staff for current styles" },
    ],
    dosageGuide: [],
    talkingPoints: [
      "Complete out-of-box — everything needed to start rolling is included in the set",
      "Magnetic lid keeps everything contained when not in use or during travel",
      "The best gift option in accessories — practical, complete, and visually appealing",
      "Multiple design options — let the customer choose a style that matches their personality",
      "Curved inner edge contains material during rolling — no more losing herbs off the edge",
    ],
    complianceNotes: [
      "Sold for tobacco use only",
    ],
    warnings: [
      "For tobacco use only",
      "Keep out of reach of children",
    ],
    faqs: [
      { question: "What accessories come in the set?", answer: "The set includes a pack of premium rolling papers, filter tips, a cleaning card, a packing/poker tool, and a small storage container. All accessories are functional quality, not just filler." },
      { question: "Is the magnetic lid secure enough for travel?", answer: "Yes — the neodymium magnet is strong enough to keep the lid closed during normal movement. For heavy travel or backpack use, we recommend placing it flat in a bag rather than keeping it upright." },
      { question: "Can I buy just the tray without the accessories?", answer: "The set is sold as a bundle. If a customer already has accessories and just wants the tray, we can sometimes accommodate individual orders — check with the manager for current inventory." },
    ],
    proTips: [
      "When a customer is buying rolling papers or filters, mention the tray set — it's an easy upgrade and the price difference is small relative to the value added.",
      "This is the single best 'gift for someone who already has everything' in the accessories category. Keep it in mind any time a customer mentions buying a gift.",
      "Let customers flip through the design options — the longer they're engaged with the product, the more likely they are to buy.",
    ],
    pairings: ["p7", "p6"],
    relatedProducts: ["p7", "p6"],
  },
  {
    id: "p9",
    name: "Kanna Snuff",
    category: "kanna",
    image: "/kanna-snuff-botanical-powder-natural-plant-extract.jpg",
    tagline: "Ancient South African botanical — fast-acting mood and focus in minutes",
    description: "Traditional Kanna (Sceletium tortuosum) botanical snuff for nasal use. Fast-acting mood and focus support derived from a South African plant with thousands of years of traditional use.",
    longDescription: `Kanna (Sceletium tortuosum) is one of the most fascinating and underappreciated botanicals in our entire product catalog. Indigenous to South Africa, Kanna has been used by the San and Khoikhoi peoples for thousands of years as a mood enhancer, appetite suppressant, and social facilitator. It's only recently made its way into the Western wellness market — which means being knowledgeable about it is a real differentiator when helping customers.

The active compounds in Kanna are alkaloids — primarily mesembrine, mesembrenone, and mesembrenol — which are selective serotonin reuptake inhibitors (SSRIs) and PDE4 inhibitors. This mechanism of action is why Kanna produces noticeable mood-lifting and focus-enhancing effects, and also why it is critically important to screen customers for SSRI, SNRI, and MAOI use before selling it.

Our Kanna Snuff is prepared as a traditional insufflated (nasal) powder — the fastest route of absorption for Kanna alkaloids. Effects are typically felt within 5–15 minutes, making it one of the fastest-acting wellness botanicals we carry. The effects are characterized by a pleasant mood lift, sharper mental clarity, and a calm, grounded energy — not stimulating like caffeine, not sedating like red kratom.

It's a wonderful conversation piece — customers who've never heard of Kanna are often fascinated by its history and unusual mechanism, and that curiosity converts to sales.`,
    effects: ["Rapid mood lift (5–15 min onset)", "Enhanced mental clarity and focus", "Stress and anxiety reduction", "Calm natural energy without stimulation", "Social ease and warmth", "Mild appetite suppression"],
    onsetTime: "5 – 15 minutes (nasal route)",
    duration: "45 – 90 minutes",
    bestFor: ["Customers seeking fast mood support", "Social situations", "Pre-activity focus boost", "Kanna beginners wanting immediate feedback", "Customers curious about novel botanicals"],
    specs: [
      { label: "Botanical", value: "Sceletium tortuosum (Kanna)" },
      { label: "Key alkaloids", value: "Mesembrine, mesembrenone, mesembrenol" },
      { label: "Administration", value: "Nasal insufflation (snuff)" },
      { label: "Origin", value: "South Africa" },
      { label: "Processing", value: "Traditional fermented and dried" },
      { label: "Legal status", value: "Legal in all US states EXCEPT Louisiana" },
      { label: "Testing", value: "Alkaloid content + contaminants" },
    ],
    dosageGuide: [
      { level: "Beginner", amount: "A small pinch (~50mg)", description: "Use one nostril. Effects in 5–15 min. Good starting point to assess sensitivity." },
      { level: "Light", amount: "1–2 small pinches (~100–150mg)", description: "Balanced mood lift and focus. The sweet spot for most users." },
      { level: "Moderate", amount: "2–3 pinches (~200–300mg)", description: "Stronger effects. More pronounced mood elevation and social ease." },
    ],
    talkingPoints: [
      "One of the most unique botanicals we carry — thousands of years of traditional use in South Africa",
      "Fastest-acting Kanna product — effects in 5–15 minutes via nasal route",
      "No THC, no caffeine — pure plant alkaloids with a unique serotonergic mechanism",
      "The nasal format makes dosing very controllable — great for first-timers who want immediate feedback",
      "Effects last 45–90 minutes — ideal for a defined window rather than all-day commitment",
    ],
    complianceNotes: [
      "CRITICAL: Always ask about SSRIs, SNRIs, and MAOIs before selling — Kanna affects serotonin and can cause serotonin syndrome when combined",
      "If customer takes antidepressants — do not sell, refer to their doctor",
      "Not legal in Louisiana — check customer location if relevant",
      "Cannot make medical claims of any kind",
      "Dietary supplement — not FDA evaluated for any medical use",
    ],
    warnings: [
      "Contraindicated with SSRIs, SNRIs, and MAOIs — serious serotonin syndrome risk",
      "Not for use under 18",
      "Not for use during pregnancy or nursing",
      "Not legal in Louisiana",
      "Do not combine with alcohol or other CNS-active substances",
    ],
    faqs: [
      { question: "What is Kanna exactly?", answer: "Kanna (Sceletium tortuosum) is a succulent plant native to South Africa. Its alkaloids act as serotonin reuptake inhibitors and PDE4 inhibitors — producing mood-lifting, focusing, and calming effects. It has been used by indigenous South African peoples for thousands of years." },
      { question: "Why is it critical to ask about SSRIs before selling?", answer: "Kanna's alkaloids are serotonin reuptake inhibitors. Combining them with prescription SSRIs, SNRIs, or MAOIs can cause serotonin syndrome — a potentially dangerous condition involving agitation, rapid heart rate, high temperature, and in severe cases, seizures. This is our most important safety screen for Kanna products." },
      { question: "Why nasal vs. oral?", answer: "The nasal mucosa has highly efficient absorption directly into the bloodstream, bypassing first-pass metabolism in the liver. This means faster onset and potentially higher bioavailability than oral consumption. It's the traditional route of use for Kanna and the reason snuff acts so quickly." },
      { question: "Is it legal everywhere?", answer: "Kanna is federally unregulated in the United States and legal in almost all states. Louisiana is the exception — Sceletium tortuosum is classified as a controlled substance there. Always verify if selling to customers from out of state." },
    ],
    proTips: [
      "The SSRI screening question is your most important tool with Kanna. Make it natural: 'Before I tell you more, are you currently taking any antidepressants or mood medications?' — customers appreciate that you're looking out for them.",
      "Kanna Snuff is a great introduction product before selling Kanna Gummies — the fast onset means the customer gets immediate confirmation that it works for them, removing doubt before they invest in a larger gummy purchase.",
      "The history angle is a powerful opener: 'This has been used for thousands of years by indigenous hunters in South Africa — it's new to the US market but ancient everywhere else.' Customers love that story.",
    ],
    pairings: ["p10", "p11"],
    relatedProducts: ["p10", "p11"],
  },
  {
    id: "p10",
    name: "Kanna Gummies",
    category: "kanna",
    image: "/kanna-gummies-mood-wellness-supplement-natural.jpg",
    tagline: "Our flagship non-THC wellness product — all-day mood and focus support",
    description: "Premium Kanna gummies with 1.5–5mg active alkaloids per piece. Federally compliant dietary supplement for daily mood and wellness support without intoxication.",
    longDescription: `Kanna Gummies are our flagship non-psychoactive wellness product, and one of our strongest differentiators as a retailer. Most of our customers have heard of Delta and Kratom, but Kanna is relatively unknown — which means every sale is also an education, and every satisfied customer is a convert who will be back.

Each gummy contains 1.5–5mg of Kanna alkaloid extract (equivalent to a meaningful oral dose of Sceletium tortuosum), formulated in a great-tasting chewable gummy. Unlike Delta products, Kanna Gummies are a dietary supplement — there's no age restriction and no intoxication. They're appropriate for a much wider range of customers: professionals looking for natural focus support, people dealing with daily stress, those who want to reduce caffeine dependence, or anyone curious about natural mood support.

The oral onset is longer than Kanna Snuff — typically 45–90 minutes — but the effects are smoother, more sustained, and last 3–5 hours. This makes them ideal for all-day mood support or for customers who want a defined but gentle boost for a meeting, event, or workday.

A particularly compelling angle: Kanna Gummies are a genuine alternative or supplement to morning coffee. The calm focus without jitteriness is something many customers are actively looking for and have never found in a natural product before.`,
    effects: ["Elevated, positive mood", "Calm and sustained focus", "Reduced daily stress and anxiety", "Smooth, non-jittery energy", "Social confidence and ease", "Sustained effects 3–5 hours"],
    onsetTime: "45 – 90 minutes (oral route)",
    duration: "3 – 5 hours",
    bestFor: ["Daily mood and focus support", "Stress management", "Coffee replacement or companion", "Customers wanting non-intoxicating wellness", "Work, social, or creative sessions", "Wide demographic — no age restriction"],
    specs: [
      { label: "Alkaloids per gummy", value: "1.5 – 5mg (dose-dependent variant)" },
      { label: "Botanical", value: "Sceletium tortuosum extract" },
      { label: "Product type", value: "Dietary supplement" },
      { label: "Administration", value: "Oral (chewable gummy)" },
      { label: "Count per pack", value: "Varies by SKU" },
      { label: "Legal status", value: "Legal in all US states EXCEPT Louisiana" },
      { label: "Age restriction", value: "None (dietary supplement)" },
    ],
    dosageGuide: [
      { level: "New to Kanna", amount: "1/2 gummy", description: "Start with half, especially for sensitive individuals. Wait 90 minutes to fully assess effects before taking more." },
      { level: "Standard", amount: "1 gummy", description: "The typical serving for most users. Mood lift and focus support for 3–5 hours." },
      { level: "Enhanced", amount: "1–2 gummies", description: "For customers with established tolerance or who want stronger effects for a specific occasion." },
    ],
    talkingPoints: [
      "Our #1 non-THC wellness product — unique, effective, and in demand",
      "No intoxication, no age restriction — appropriate for a much wider customer base than Delta products",
      "Great coffee replacement: calm focus without the jitteriness, anxiety, or crash of caffeine",
      "Effects last 3–5 hours — ideal for full work or social event coverage",
      "Nothing else on the market quite like it — Kanna's mechanism is genuinely unique",
    ],
    complianceNotes: [
      "CRITICAL: Always screen for SSRIs, SNRIs, and MAOIs before selling",
      "If customer is on antidepressants — do not sell, refer to their doctor",
      "Dietary supplement — cannot make medical claims",
      "Not legal in Louisiana",
      "Advise on 45–90 min onset time to prevent impatient redosing",
    ],
    warnings: [
      "Contraindicated with SSRIs, SNRIs, and MAOIs",
      "Not for use during pregnancy or nursing",
      "Not legal in Louisiana",
      "Onset is 45–90 minutes — do not redose prematurely",
    ],
    faqs: [
      { question: "Is this the same as Delta gummies?", answer: "No — Kanna Gummies are not psychoactive and do not contain THC or any cannabinoid. They're a dietary supplement made from a South African botanical (Sceletium tortuosum) with a unique mood and focus mechanism through serotonin pathways. They are legal everywhere (except Louisiana) and have no age restriction." },
      { question: "How is this different from CBD?", answer: "CBD works primarily through the endocannabinoid system with generally subtle effects. Kanna works through serotonin reuptake inhibition and PDE4 inhibition — producing more noticeable mood-lifting and focus effects at meaningful doses. Many customers who found CBD underwhelming find Kanna more impactful." },
      { question: "Can I take this every day?", answer: "Many customers do use Kanna Gummies daily. It's a dietary supplement and short-term daily use is generally well-tolerated. As with any active botanical, advise customers to take occasional breaks and pay attention to how their body responds." },
      { question: "Why can't I sell this to someone on antidepressants?", answer: "Kanna alkaloids are mild serotonin reuptake inhibitors. Combining them with prescription SSRIs, SNRIs, or MAOIs can cause serotonin syndrome — a serious and potentially dangerous condition. This is a non-negotiable safety screen for all Kanna products." },
    ],
    proTips: [
      "The coffee comparison is your most powerful opener: 'Do you drink coffee for focus? This is what a lot of people use instead or alongside — smooth focus without the jitters or crash.' That lands for a huge range of customers.",
      "Kanna Gummies are a strong starter product before upselling to the Kanna + Delta 9 combo gummies — once the customer knows what Kanna feels like, the combo is an easy next step.",
      "The no-age-restriction angle opens a much wider sales window. If someone comes in with a younger colleague or family member who can't buy Delta products, Kanna Gummies are often the perfect recommendation.",
    ],
    pairings: ["p9", "p3"],
    relatedProducts: ["p9", "p11", "p1"],
  },
  {
    id: "p11",
    name: "Kanna + Delta 9 Gummies",
    category: "kanna",
    image: "/kanna-delta9-combo-gummies-thc-mood-blend.jpg",
    tagline: "The smoother, longer, anxiety-free THC experience — nothing else like it",
    description: "Premium combination gummy with 1.5–5mg Kanna alkaloids and 10mg Delta 9 THC. Kanna modulates the THC experience for dramatically reduced anxiety and a longer, more balanced effect.",
    longDescription: `The Kanna + Delta 9 Gummy is genuinely one of the most innovative products in our catalog, and arguably the best example of the synergistic potential of combining botanicals intelligently. This product was developed specifically around one of the most common complaints from cannabis users: THC-induced anxiety and paranoia.

Here's why it works: Kanna's alkaloids (primarily mesembrine) are PDE4 inhibitors in addition to being serotonin reuptake inhibitors. PDE4 inhibition reduces anxiogenic signaling — meaning Kanna actively counteracts the anxiety pathway that THC activates in sensitive users. The result is a more relaxed, social, and enjoyable experience for people who love cannabis but have struggled with the anxiety side effects.

Beyond anxiety reduction, Kanna also modulates the munchie effect — another common complaint from regular edible users. The combination delivers a more balanced, sustained euphoria that many customers describe as the best edible experience they've ever had.

For sales, this product is best positioned as an upgrade for existing cannabis/Delta users, not an entry point. The ideal customer is someone who already uses edibles but has expressed frustration with anxiety, paranoia, overeating after use, or effects that feel unpredictable. This product directly solves those problems and there is genuinely nothing else like it on the shelf.`,
    effects: ["Balanced, euphoric high", "Dramatically reduced THC anxiety and paranoia", "Longer, smoother duration (4–6 hours)", "Social enhancement and warmth", "Appetite modulation (reduced munchies)", "Improved headspace clarity"],
    onsetTime: "45 – 90 minutes",
    duration: "4 – 6 hours",
    bestFor: ["THC users who experience anxiety with regular edibles", "Cannabis users wanting a more controlled experience", "Social and creative sessions", "Customers who've tried Delta products and want to level up", "Experienced users seeking something genuinely different"],
    specs: [
      { label: "Delta 9 THC per gummy", value: "10mg (hemp-derived)" },
      { label: "Kanna alkaloids per gummy", value: "1.5 – 5mg" },
      { label: "Total Delta-9 THC", value: "<0.3% by dry weight (federally compliant)" },
      { label: "Product type", value: "Hemp-derived cannabinoid dietary supplement" },
      { label: "Count per pack", value: "Varies by SKU" },
      { label: "Legal status", value: "Federally compliant; verify state laws" },
    ],
    dosageGuide: [
      { level: "New to Delta edibles", amount: "1/2 gummy (5mg D9 + ~1–2mg Kanna)", description: "Always start here for customers new to THC edibles. Wait the full 90 minutes before assessing." },
      { level: "Occasional users", amount: "1 gummy (10mg D9 + Kanna)", description: "Standard dose for casual edible users. Should produce clear, balanced effects." },
      { level: "Regular users", amount: "1–2 gummies (10–20mg D9 + Kanna)", description: "For established tolerance. Kanna's anxiety-modulating effects scale with the dose." },
    ],
    talkingPoints: [
      "The only edible on the market that specifically targets the anxiety and paranoia problem — there is literally nothing else like this",
      "Kanna is a PDE4 inhibitor that actively counteracts the anxiety pathway THC activates — this isn't marketing, it's biochemistry",
      "Kanna also reduces the munchie effect — huge selling point for customers who hate that about regular edibles",
      "4–6 hour duration is longer than standard Delta gummies — more value per gummy",
      "Our best-reviewed product among returning customers who've tried it",
    ],
    complianceNotes: [
      "Must verify 21+ age for the Delta-9 component — ID check required",
      "CRITICAL: Ask about SSRIs, SNRIs, and MAOIs for the Kanna component",
      "Hemp-derived Delta-9 — federally compliant under 2018 Farm Bill",
      "Cannot make medical claims of any kind",
      "Always advise starting with half a gummy for first-time use",
      "Advise against driving or operating machinery after use",
    ],
    warnings: [
      "Must be 21+ to purchase",
      "Contraindicated with SSRIs, SNRIs, and MAOIs",
      "Do not drive or operate machinery",
      "Keep out of reach of children",
      "Not for use during pregnancy or nursing",
      "May cause failed drug test (Delta-9 THC)",
      "Do not redose prematurely — edible onset is 45–90 minutes",
    ],
    faqs: [
      { question: "Why does Kanna reduce THC anxiety?", answer: "Kanna's alkaloids are PDE4 inhibitors, which suppresses the cyclic AMP signaling pathway involved in anxiety responses. THC can upregulate this pathway, which is why some people experience anxiety from cannabis. Kanna directly counteracts this mechanism, producing a more relaxed, less anxious headspace even at the same THC dose." },
      { question: "Who is this product best for?", answer: "It's ideal for existing cannabis or Delta users who have experienced anxiety or paranoia from edibles, who feel like their edible experiences are unpredictable, or who are tired of the munchie effect. It's also great for experienced users who simply want the best edible experience possible." },
      { question: "Is this stronger than regular Delta-9 gummies?", answer: "It's not necessarily stronger in terms of THC content, but the experience is qualitatively different — more balanced, more social, longer-lasting, and with far less of the anxiety edge. Many customers describe it as feeling 'cleaner' or more intentional than THC alone." },
      { question: "What's the Kanna safety screen?", answer: "Before selling any Kanna product, ask if the customer takes SSRIs, SNRIs, or MAOIs (antidepressants). If they do, do not sell — Kanna's serotonergic activity can combine with these medications to cause serotonin syndrome. This is a non-negotiable check." },
    ],
    proTips: [
      "Lead with the problem: 'Have you ever gotten too anxious from an edible?' If yes, you have their attention immediately. This product was built for them.",
      "The munchie-reduction angle is a huge secondary selling point — many customers are self-conscious about overeating after cannabis use and love that this product addresses it.",
      "This is your best upsell from basic Delta gummies. When a returning Delta-8 or Delta-9 customer comes in, ask if they'd be interested in something that gives a smoother, longer experience — then introduce this product.",
    ],
    pairings: ["p9", "p10"],
    relatedProducts: ["p9", "p10", "p1"],
  },
]

export const mockModules: TrainingModule[] = [
  // MODULE 1: DELTA 101
  {
    id: "m1",
    title: "Delta 101",
    description: "Learn the fundamentals of delta products, their effects, and how to guide customers.",
    estimatedTime: "45 min",
    completed: true,
    progress: 100,
    quizId: "q1",
    lessons: [
      {
        id: "m1-l1",
        title: "What are Delta Products?",
        content: `Delta products are cannabinoids derived from the hemp plant that have become increasingly popular in the wellness and recreational market. The term "delta" refers to the position of a chemical bond in the cannabinoid's molecular structure.

**Delta-8 THC** is a naturally occurring cannabinoid found in small amounts in hemp. It's often called "diet weed" because it produces milder psychoactive effects than Delta-9 THC. Customers typically report feeling relaxed, clear-headed, and calm without intense highs or paranoia.

**Delta-9 THC** is the primary psychoactive compound in cannabis. When derived from hemp (containing less than 0.3% Delta-9 THC by dry weight), it's federally legal under the 2018 Farm Bill.

**Delta-10 THC** is typically more energizing than Delta-8. Customers often choose it for daytime use when they want mild euphoria while staying productive.

**HHC (Hexahydrocannabinol)** is a hydrogenated form of THC with effects similar to Delta-9 but with longer shelf stability.

**THCA** is the acidic precursor to THC. It's non-psychoactive until heated (decarboxylated), at which point it converts to Delta-9 THC.

All our delta products are hemp-derived and contain less than 0.3% Delta-9 THC by dry weight, making them federally compliant. Always stay informed about your state's specific regulations.`,
        keyPoints: [
          "Delta refers to the position of a chemical bond in the molecule",
          "Delta-8 produces milder effects than Delta-9",
          "All products must contain less than 0.3% Delta-9 THC by dry weight",
          "Delta-8 is relaxing, Delta-10 is more energizing",
          "Products are federally legal under the 2018 Farm Bill",
        ],
        completed: true,
      },
      {
        id: "m1-l2",
        title: "Product Types and Delivery Methods",
        content: `Understanding delivery methods is essential for helping customers find their ideal experience. Each method has unique onset times, durations, and characteristics.

**Edibles (Gummies, Chocolates, Beverages)**
- Onset: 30 minutes to 2 hours
- Duration: 4-8 hours
- Best for: Long-lasting effects and precise dosing
- Key tip: "Start low, go slow" - recommend 5-10mg for beginners

**Vape Cartridges and Disposables**
- Onset: 1-5 minutes
- Duration: 1-3 hours
- Best for: Quick effects and dosage control
- Key tip: Explain distillate vs. live resin differences

**Tinctures and Oils**
- Onset: 15-45 minutes (sublingual)
- Duration: 4-6 hours
- Best for: Smoke-free options with moderate onset
- Key tip: Hold under tongue for 60 seconds for best absorption

**Flower and Pre-rolls**
- Onset: 1-5 minutes
- Duration: 1-3 hours
- Best for: Traditional smokers who enjoy the ritual
- Key tip: Effects similar to vaping with additional plant compounds

**Concentrates (Dabs, Wax, Shatter)**
- Onset: Immediate
- Duration: 1-3 hours
- Best for: Experienced users with high tolerance only
- Key tip: NEVER recommend to beginners`,
        keyPoints: [
          "Edibles have slowest onset but longest duration",
          "Vapes provide fastest onset for quick relief",
          "Always recommend starting with low doses for new customers",
          "Tinctures offer smoke-free alternative with moderate onset",
          "Concentrates are strictly for experienced users",
        ],
        completed: true,
      },
      {
        id: "m1-l3",
        title: "Customer Guidance and Recommendations",
        content: `Successfully guiding customers requires understanding their needs, experience level, and goals.

**Assessing the Customer - Key Questions:**
- "Have you tried delta products before?"
- "What kind of experience are you looking for?"
- "When do you plan to use this - daytime or evening?"
- "Do you have any concerns about these products?"

**For First-Time Customers:**
1. Recommend Delta-8 gummies at 10-15mg
2. Emphasize "start low, go slow"
3. Warn about delayed onset with edibles
4. Suggest trying at home first, never before driving
5. Set realistic expectations - effects are subjective

**For Experienced Users:**
1. Ask about their preferred consumption method
2. Discuss strain preferences (indica vs. sativa effects)
3. Introduce higher potency options if appropriate
4. Suggest trying new product types they haven't experienced

**Matching Products to Goals:**
- Relaxation/Sleep: Delta-8, Red strain-inspired products
- Energy/Focus: Delta-10, Green strain-inspired products
- Pain management: Higher potency edibles (without making medical claims)
- Social/Creative: Balanced Delta-9 products

**Red Flags - When to Decline Sale:**
- Customer seems intoxicated
- Questions suggest underage purchase
- Mentions driving immediately after use
- Asks about mixing with medications (refer to doctor)`,
        keyPoints: [
          "Always assess experience level before recommending products",
          "First-timers should start with Delta-8 gummies at low doses",
          "Match products to customer goals without making medical claims",
          "Know when to decline a sale for safety reasons",
          "Build trust by being an educator, not just a salesperson",
        ],
        completed: true,
      },
    ],
  },

  // MODULE 2: KRATOM BASICS
  {
    id: "m2",
    title: "Kratom Basics",
    description: "Understand kratom strains, effects, and responsible customer guidance.",
    estimatedTime: "40 min",
    completed: true,
    progress: 100,
    quizId: "q2",
    lessons: [
      {
        id: "m2-l1",
        title: "Introduction to Kratom",
        content: `Kratom (Mitragyna speciosa) is a tropical tree native to Southeast Asia, primarily Thailand, Malaysia, Indonesia, and Papua New Guinea. The leaves contain compounds called alkaloids, with mitragynine and 7-hydroxymitragynine being the most significant.

**History and Traditional Use:**
Kratom has been used for centuries in Southeast Asia. Workers traditionally chewed the leaves for energy during long labor, while others used it for relaxation and wellness purposes.

**How Kratom Works:**
The alkaloids in kratom interact with opioid receptors in the brain, but kratom is NOT an opioid. At lower doses, it tends to produce stimulating effects. At higher doses, it tends to produce more sedating effects.

**Legal Status:**
Kratom is legal at the federal level but regulated or banned in some states and municipalities. Always verify your local laws and our store's specific policies.

**Important Disclaimers:**
- Kratom is NOT FDA approved for any medical use
- We cannot make any health or medical claims
- Kratom should not be mixed with other substances
- Not recommended for pregnant or nursing women

**Our Commitment to Quality:**
All our kratom products are:
- Third-party lab tested for purity and contaminants
- Sourced from reputable suppliers
- Properly labeled with strain and origin information`,
        keyPoints: [
          "Kratom comes from a tree native to Southeast Asia",
          "Contains alkaloids that interact with receptors in the brain",
          "Lower doses tend to be stimulating, higher doses more sedating",
          "NOT FDA approved - cannot make medical claims",
          "Legal federally but check state/local regulations",
        ],
        completed: true,
      },
      {
        id: "m2-l2",
        title: "Understanding Kratom Strains",
        content: `Kratom strains are typically categorized by vein color and origin. Understanding these differences helps you guide customers effectively.

**Vein Colors:**

**Red Vein Kratom**
- Characteristics: Most sedating and relaxing
- Common uses: Evening use, relaxation, unwinding
- Popular strains: Red Bali, Red Maeng Da, Red Borneo
- Best for customers seeking: Calm, relaxation, sleep support

**Green Vein Kratom**
- Characteristics: Balanced effects between energy and relaxation
- Common uses: Daytime use, focus, mild energy
- Popular strains: Green Maeng Da, Green Malay, Green Borneo
- Best for customers seeking: Balance, mild stimulation, focus

**White Vein Kratom**
- Characteristics: Most stimulating and energizing
- Common uses: Morning use, productivity, alertness
- Popular strains: White Maeng Da, White Borneo, White Thai
- Best for customers seeking: Energy, motivation, focus

**Yellow/Gold Vein Kratom**
- Characteristics: Usually fermented or blended, milder effects
- Common uses: Beginners, moderate effects
- Popular strains: Yellow Vietnam, Gold Bali
- Best for customers seeking: Gentle introduction, moderate experience

**Popular Origins:**
- **Maeng Da**: "Pimp Grade" - generally strongest of each color
- **Bali**: Smooth, well-rounded effects
- **Borneo**: Potent, long-lasting
- **Malay**: Balanced, good for extended duration
- **Thai**: Traditional, energizing characteristics`,
        keyPoints: [
          "Red vein = relaxing/sedating, best for evening",
          "Green vein = balanced, good for daytime",
          "White vein = energizing/stimulating, best for morning",
          "Maeng Da strains are typically the strongest",
          "Bali strains offer smooth, well-rounded effects",
        ],
        completed: true,
      },
      {
        id: "m2-l3",
        title: "Dosing and Product Forms",
        content: `Proper dosing guidance is crucial for customer satisfaction and safety. Remember: we provide general information only, not medical advice.

**General Dosing Guidelines:**
- Beginner: 1-2 grams
- Low dose: 2-4 grams (more stimulating effects)
- Moderate dose: 4-6 grams (balanced effects)
- High dose: 6-8 grams (more sedating effects)
- Very high: 8+ grams (experienced users only)

**Factors Affecting Dose:**
- Body weight
- Tolerance level
- Strain potency
- Individual sensitivity
- Whether taken with food

**Product Forms:**

**Powder**
- Most economical option
- Flexible dosing
- Faster onset than capsules
- Can be mixed with juice or made into tea
- Taste can be bitter (warn customers)

**Capsules**
- Convenient and portable
- No bitter taste
- Pre-measured doses
- Slower onset than powder
- Higher cost per dose

**Extracts**
- Concentrated form
- Much more potent
- For experienced users only
- Risk of tolerance buildup
- Use sparingly

**Crushed Leaf**
- Traditional form
- Good for making tea
- Milder than powder
- Natural experience

**Dosing Tips to Share:**
- Always start with the lowest effective dose
- Wait 30-45 minutes before taking more
- Take on empty stomach for stronger effects
- Stay hydrated
- Keep a dose journal to track what works`,
        keyPoints: [
          "Beginners should start with 1-2 grams",
          "Lower doses are more stimulating, higher doses more sedating",
          "Capsules are convenient but have slower onset than powder",
          "Extracts are very potent - experienced users only",
          "Always recommend starting low and staying hydrated",
        ],
        completed: true,
      },
      {
        id: "m2-l4",
        title: "Customer Conversations and Safety",
        content: `Having informed, responsible conversations with kratom customers builds trust and ensures safety.

**Opening the Conversation:**
- "Are you familiar with kratom, or is this your first time?"
- "What are you hoping to get from kratom?"
- "Have you used any strains before that you liked?"

**For First-Time Buyers:**
1. Explain the basics of vein colors
2. Recommend starting with Green Maeng Da or Red Bali (popular, balanced)
3. Suggest capsules if they're concerned about taste
4. Emphasize starting with 1-2 grams
5. Explain onset time (20-40 minutes)

**Questions to Handle:**

"Will this help with my pain/anxiety/depression?"
- "I can't make any medical claims, but I can tell you what effects customers commonly report. Many people find red strains relaxing. Have you talked to your doctor about kratom?"

"Can I take this with my medication?"
- "I'm not qualified to answer that. Please consult with your doctor or pharmacist before combining kratom with any medications."

"How much should I take?"
- "General guidance is to start with 1-2 grams and see how you feel. Everyone responds differently, so finding your personal dose takes some experimentation."

**Safety Warnings to Always Mention:**
- Do not drive or operate machinery
- Do not mix with alcohol or other substances
- Not for use during pregnancy or nursing
- Stay hydrated
- Do not use daily to avoid tolerance

**When to Suggest They NOT Buy:**
- They mention taking MAOIs or opioids
- They seem to be seeking extremely high doses
- They're purchasing for someone underage
- They mention serious health conditions`,
        keyPoints: [
          "Never make medical claims about kratom",
          "First-timers: recommend capsules and 1-2 gram starting dose",
          "Always refer medication questions to healthcare providers",
          "Warn about not mixing with alcohol or other substances",
          "Know when it's appropriate to decline a sale",
        ],
        completed: true,
      },
    ],
  },

  // MODULE 3: CUSTOMER SERVICE EXCELLENCE
  {
    id: "m3",
    title: "Customer Service Excellence",
    description: "Master the art of providing exceptional customer experiences.",
    estimatedTime: "35 min",
    completed: true,
    progress: 100,
    quizId: "q3",
    lessons: [
      {
        id: "m3-l1",
        title: "The Highlife Customer Experience",
        content: `At Highlife, we're not just selling products - we're creating experiences and building relationships. Our customers choose us because of HOW we make them feel, not just what we sell.

**Our Service Philosophy:**
Every interaction should leave the customer feeling:
- Welcomed and respected
- Educated and informed
- Confident in their purchase
- Eager to return

**The First 10 Seconds:**
First impressions are made in seconds. When a customer enters:
1. Make eye contact and smile genuinely
2. Offer a warm greeting within 10 seconds
3. Let them know you're available without being pushy
4. Read their body language - some want help immediately, others want to browse

**Greeting Examples:**
- "Hey, welcome to Highlife! Let me know if you have any questions."
- "Good afternoon! First time here? Happy to show you around."
- "Welcome back! Looking for your usual or trying something new today?"

**The Power of Names:**
- Ask for their name during conversation
- Use it naturally (not excessively)
- Remember regulars' names and preferences
- Introduce yourself: "I'm [Name], by the way"

**Creating a Comfortable Environment:**
- Maintain a clean, organized store
- Play appropriate music at reasonable volume
- Be aware of wait times
- Never make customers feel judged for their questions`,
        keyPoints: [
          "Greet every customer within 10 seconds of entry",
          "First impressions determine the entire experience",
          "Use customers' names to build personal connections",
          "Read body language to gauge how much assistance they want",
          "Create an environment free of judgment",
        ],
        completed: true,
      },
      {
        id: "m3-l2",
        title: "Active Listening and Needs Assessment",
        content: `The best salespeople talk less and listen more. Active listening helps you understand what customers really need.

**The LISTEN Framework:**

**L - Look** at the customer (appropriate eye contact)
**I - Inquire** with open-ended questions
**S - Silence** - give them space to respond fully
**T - Take notes** mentally on key details
**E - Echo** back what you heard to confirm
**N - Navigate** to the right solution

**Open-Ended Questions:**
Instead of yes/no questions, ask questions that invite explanation:
- "What brings you in today?"
- "Tell me about your experience with [product type]"
- "What would an ideal outcome look like for you?"
- "How did that product work for you last time?"

**Reading Between the Lines:**
Customers don't always say exactly what they need. Listen for:
- Hesitation (may need more information)
- Budget concerns (guide to value options)
- Overwhelm (simplify choices)
- Embarrassment (create private space, normalize questions)

**Echoing and Confirming:**
"So if I'm hearing you right, you're looking for something that helps you relax in the evening, but you're worried about feeling too out of it. Is that right?"

This shows you listened and allows them to clarify.

**Avoid These Mistakes:**
- Interrupting the customer
- Assuming you know what they want
- Jumping to product recommendations too quickly
- Looking at your phone or other distractions
- Finishing their sentences`,
        keyPoints: [
          "Use the LISTEN framework for active listening",
          "Ask open-ended questions that invite detailed responses",
          "Echo back what you heard to confirm understanding",
          "Pay attention to hesitation and unspoken concerns",
          "Never interrupt or assume you know what they need",
        ],
        completed: true,
      },
      {
        id: "m3-l3",
        title: "Handling Difficult Situations",
        content: `Difficult situations are opportunities to demonstrate exceptional service. How you handle problems determines whether customers return.

**The HEAT Method for Complaints:**

**H - Hear them out**
Let them express frustration without interruption. Sometimes people just need to vent.

**E - Empathize**
"I completely understand why you're frustrated. That's not the experience we want for you."

**A - Apologize**
Even if it's not your fault: "I'm sorry you had this experience."

**T - Take action**
"Here's what I can do to make this right..."

**Common Difficult Scenarios:**

**Unhappy with a Product:**
- Listen to their complaint fully
- Ask what specifically didn't meet expectations
- Offer exchange, store credit, or refund per policy
- Thank them for the feedback

**Long Wait Times:**
- Acknowledge the wait: "Thanks so much for your patience"
- Explain if possible: "We're a bit slammed but I'm with you now"
- Make the interaction worth the wait with excellent service

**Intoxicated Customers:**
- Remain calm and non-confrontational
- Politely decline service if necessary
- Offer water and suggest they return another time
- Never argue or escalate

**Angry/Aggressive Customers:**
- Stay calm and don't take it personally
- Keep your voice low and steady
- Don't argue or get defensive
- Know when to involve a manager
- If you feel unsafe, prioritize your safety

**The Recovery Opportunity:**
Research shows customers who have a complaint resolved well are MORE loyal than customers who never had a problem. A handled complaint = a loyal customer.`,
        keyPoints: [
          "Use the HEAT method: Hear, Empathize, Apologize, Take action",
          "Let frustrated customers express themselves fully",
          "A well-handled complaint creates more loyalty than no problem at all",
          "Stay calm with aggressive customers and involve management if needed",
          "Always prioritize safety if a situation feels dangerous",
        ],
        completed: true,
      },
      {
        id: "m3-l4",
        title: "Building Long-Term Relationships",
        content: `Regular customers are the lifeblood of our business. Building genuine relationships turns one-time buyers into lifelong customers.

**Remember the Details:**
- Keep mental notes of regulars' preferences
- "Your usual Green Maeng Da?" shows you remember
- Ask about things they mentioned: "How was that concert?"
- Note significant purchases to follow up next visit

**Creating Regulars:**

**First Visit:**
- Make it memorable
- Educate without overwhelming
- Give them your name
- "Ask for me next time if you have questions"

**Second Visit:**
- Recognize them: "Hey, welcome back!"
- Ask how their first purchase worked
- Build on what you learned last time

**Ongoing Relationship:**
- Greet by name
- Know their preferences
- Alert them to new products they'd like
- Treat them like friends, not transactions

**Going Above and Beyond:**
- Throwing in a small sample
- Writing a thank-you note
- Remembering their birthday
- Texting when something they wanted comes in (with permission)
- Genuine compliments

**The Community Aspect:**
Our store is a community hub. Customers connect with each other, attend events, and feel part of something. Foster this by:
- Introducing regulars to each other when appropriate
- Creating a welcoming atmosphere for all
- Hosting or promoting community events
- Being a knowledgeable, trustworthy resource

**The Lifetime Value:**
A regular customer who visits weekly and spends $30 represents over $1,500 per year. Over 5 years, that's $7,500+ from ONE relationship. Every interaction matters.`,
        keyPoints: [
          "Remember regulars' names and preferences",
          "Follow up on previous purchases and conversations",
          "The second visit is crucial - recognize returning customers",
          "Small gestures like samples create big loyalty",
          "A weekly regular represents thousands in annual revenue",
        ],
        completed: true,
      },
    ],
  },

  // MODULE 4: COMPLIANCE & AGE VERIFICATION
  {
    id: "m4",
    title: "Compliance & Age Verification",
    description: "Learn legal requirements and proper verification procedures.",
    estimatedTime: "30 min",
    completed: false,
    progress: 0,
    quizId: "q4",
    lessons: [
      {
        id: "m4-l1",
        title: "Legal Framework Overview",
        content: `Understanding the legal landscape is essential for protecting yourself, the store, and our customers. Compliance isn't optional - it's the foundation of our business.

**Federal Law - The 2018 Farm Bill:**
The Agriculture Improvement Act of 2018 (Farm Bill) legalized hemp and hemp-derived products containing less than 0.3% Delta-9 THC by dry weight. This is why we can legally sell delta products.

**Key Federal Points:**
- Hemp is legally defined as cannabis with <0.3% Delta-9 THC
- Hemp-derived cannabinoids (Delta-8, Delta-10, HHC, etc.) are federally legal
- CBD products are legal if derived from hemp
- The DEA cannot regulate compliant hemp products

**State Law Variations:**
Despite federal legality, STATES CAN RESTRICT OR BAN these products. Currently:
- Some states have banned Delta-8 specifically
- Some states regulate all hemp cannabinoids as cannabis
- Kratom is banned in several states
- Age requirements vary by state (18 vs 21)

**ALWAYS know and follow YOUR state's specific laws.**

**Our Store's Compliance:**
- All products are lab-tested for potency and compliance
- We maintain Certificates of Analysis (COAs) for all products
- We follow all state and local regulations
- We enforce strict age verification

**What Non-Compliance Means:**
- Personal fines up to thousands of dollars
- Criminal charges possible
- Store loses license
- You lose your job
- Potential jail time for serious violations

**Your Role:**
You are the last line of defense. Every sale YOU make must be compliant. No exceptions, no shortcuts, no "just this once."`,
        keyPoints: [
          "2018 Farm Bill legalized hemp with <0.3% Delta-9 THC",
          "State laws vary - some states ban delta products or kratom",
          "Non-compliance can result in personal fines and criminal charges",
          "All our products have lab testing and COAs",
          "You are personally responsible for every sale you make",
        ],
        completed: false,
      },
      {
        id: "m4-l2",
        title: "Age Verification Procedures",
        content: `Age verification is non-negotiable. Every customer, every time, no exceptions.

**The Age Requirement:**
- Delta products: 21+ in most states
- Kratom: 18+ or 21+ depending on state
- Glass/Accessories: 18+ or 21+ depending on state
- KNOW YOUR LOCAL REQUIREMENTS

**Acceptable Forms of ID:**
1. State-issued Driver's License
2. State-issued ID Card
3. U.S. Passport
4. U.S. Military ID
5. Passport Card

**NOT Acceptable:**
- Expired IDs
- School IDs
- Work badges
- Photos of IDs on phones
- Foreign IDs (unless passport)
- Temporary paper IDs (varies by policy)

**How to Check an ID:**

**Step 1: Request the ID**
"Can I see your ID please?" - ask EVERYONE, even if they're clearly over 21. This creates consistent habits.

**Step 2: Verify it's Real**
Check for:
- Holographic elements
- Proper thickness and feel
- Clear photo
- No signs of tampering
- Consistent fonts and formatting

**Step 3: Verify the Person**
- Photo matches the person
- Physical description matches (height, eye color)
- Ask them to remove sunglasses and hats if needed

**Step 4: Calculate the Age**
- Check birth date carefully
- Do the math - don't just glance
- Use our point-of-sale calculator if available
- When in doubt, decline

**Step 5: Check Expiration**
- Expired IDs are NOT valid
- No exceptions

**The "But They Look Old" Trap:**
NEVER skip ID verification because someone looks old enough. This is the #1 compliance failure. Professional sting operations deliberately send young-looking legal buyers to see if you'll check.`,
        keyPoints: [
          "ID every customer, every time, no exceptions",
          "Acceptable: state ID, driver's license, passport, military ID",
          "Check for tampering, holographics, and matching photos",
          "Always calculate the birth date - don't just glance",
          "Expired IDs are never acceptable",
        ],
        completed: false,
      },
      {
        id: "m4-l3",
        title: "Refusing Sales and Documentation",
        content: `Knowing when and how to refuse a sale protects everyone involved.

**When to Refuse a Sale:**

**No Valid ID:**
"I'm sorry, I can't complete this sale without a valid ID. It's not personal - it's the law and our policy."

**Fake or Altered ID:**
- Calmly return the ID
- "I can't accept this ID"
- Don't accuse them of having a fake (could escalate)
- Document the incident after they leave
- Alert your manager

**Suspicious Behavior:**
- Third-party purchases ("My friend's outside")
- Purchasing for someone who was denied
- Unable to answer basic questions about the ID
- Multiple people "sharing" an ID

**Intoxicated Customers:**
- Visibly impaired
- Slurred speech
- Difficulty standing
- Offer water, suggest returning another time

**Angry/Aggressive Customers:**
- Stay calm and don't take it personally
- Keep your voice low and steady
- Don't argue or get defensive
- Know when to involve a manager
- If you feel unsafe, prioritize your safety

**The Recovery Opportunity:**
Research shows customers who have a complaint resolved well are MORE loyal than customers who never had a problem. A handled complaint = a loyal customer.`,
        keyPoints: [
          "Refuse firmly but politely - blame policy, not personal judgment",
          "Never debate or negotiate a refusal",
          "Document every refused sale with details",
          "Watch for third-party purchase attempts",
          "Get manager support if customers become aggressive",
        ],
        completed: false,
      },
      {
        id: "m4-l4",
        title: "Product Claims and Advertising",
        content: `What we say about our products matters legally. Making improper claims can result in serious consequences.

**Claims We CANNOT Make:**

**Medical Claims (NEVER):**
- "This will cure your anxiety"
- "Kratom treats chronic pain"
- "Delta-8 is medicine for sleep"
- "This cures/treats/heals anything"

**Drug Comparison Claims:**
- "This is legal weed"
- "It's just like marijuana but legal"
- "You'll get high like real THC"

**Safety/Approval Claims:**
- "It's FDA approved"
- "Completely safe for everyone"
- "No side effects"

**Claims We CAN Make:**

**Customer Experience Claims:**
- "Many customers report feeling relaxed"
- "Some people find this helpful for unwinding"
- "This strain is popular among people who..."

**Product Information:**
- "This contains 25mg of Delta-8"
- "This is a red vein kratom from Bali"
- "Lab tested for purity"
- "Third-party tested"

**General Effects:**
- "Delta-8 is known for milder effects than Delta-9"
- "Red strains tend to be more relaxing"
- "Faster onset with vaping vs edibles"

**Safe Phrasing:**
Instead of: "This will help your insomnia"
Say: "Some customers choose this for evening use because they find red strains relaxing"

Instead of: "Kratom treats pain"
Say: "I can't make medical claims, but this is a popular strain. What effects are you hoping for?"

**The Consequences:**
- FTC violations for false advertising
- FDA warning letters
- Lawsuits from customers
- Loss of ability to sell products
- Personal liability

**When Asked Medical Questions:**
"I'm not a doctor and can't give medical advice. I can share general information about our products, but please talk to your healthcare provider about medical concerns."`,
        keyPoints: [
          "NEVER make medical claims (cure, treat, heal)",
          "Don't compare products to illegal drugs",
          "Use 'customers report' language instead of definitive claims",
          "Always refer medical questions to healthcare providers",
          "Improper claims can result in fines and lawsuits",
        ],
        completed: false,
      },
    ],
  },

  // MODULE 5: GLASS PRODUCT KNOWLEDGE
  {
    id: "m5",
    title: "Glass Product Knowledge",
    description: "Become an expert in glass products, their features, and care.",
    estimatedTime: "35 min",
    completed: false,
    progress: 0,
    quizId: "q5",
    lessons: [
      {
        id: "m5-l1",
        title: "Types of Glass and Materials",
        content: `Understanding glass quality and types helps you guide customers to the right products and justify price differences.

**Borosilicate Glass (Scientific Glass)**
The gold standard for quality glass products.
- Contains boron trioxide, making it heat-resistant
- Withstands temperature changes without cracking
- More durable and longer-lasting
- Preferred by serious enthusiasts
- Higher price point, but worth it

**Soft Glass (Soda-Lime Glass)**
Standard glass used in less expensive pieces.
- Less heat resistant
- More prone to cracking from temperature changes
- Lower price point
- Acceptable for occasional use
- More common in imported pieces

**Quartz**
Premium material for specific components.
- Extremely heat resistant
- Used primarily in bangers for concentrates
- Crystal clear appearance
- Superior heat retention
- Premium price point

**Silicone**
Growing in popularity for practical reasons.
- Virtually unbreakable
- Easy to clean
- Travel-friendly
- Often combined with glass components
- Great for clumsy or active customers

**How to Identify Quality:**
1. **Thickness**: Hold pieces up to light - even thickness indicates quality
2. **Weight**: Heavier usually means better quality glass
3. **Clarity**: Clear, bubble-free glass is higher quality
4. **Welds**: Joint connections should be smooth, not lumpy
5. **Price**: Very cheap pieces are usually lower quality

**Talking to Customers About Quality:**
"This piece is borosilicate glass, which means it can handle heat changes without cracking. It costs more upfront but will last much longer than a cheaper piece."`,
        keyPoints: [
          "Borosilicate glass is heat-resistant and most durable",
          "Soft glass is cheaper but less durable",
          "Quartz is premium for concentrate use",
          "Silicone is unbreakable and travel-friendly",
          "Quality indicators: thickness, weight, clarity, smooth welds",
        ],
        completed: false,
      },
      {
        id: "m5-l2",
        title: "Product Categories and Features",
        content: `Knowing the different categories and their features helps you match customers with the right piece.

**Water Pipes (Bongs)**
Main categories:
- **Beakers**: Wide base, stable, easy to clean, good for beginners
- **Straight tubes**: Classic design, direct hits, various percolation options
- **Recyclers**: Continuous water cycle, smooth hits, popular for concentrates
- **Mini/Travel**: Compact size, portable, good secondary piece

**Key Features to Explain:**
- **Ice catchers**: Notches that hold ice for cooler hits
- **Percolators**: Filter smoke through water for smoothness
- **Splash guards**: Prevent water from reaching mouth
- **Thick base**: More stability, less tipping risk

**Percolator Types:**
- **Diffused downstem**: Basic filtration, easy to clean
- **Tree perc**: Multiple arms, good filtration
- **Honeycomb**: Disc with holes, excellent diffusion
- **Showerhead**: Wide diffusion coverage
- **Turbine**: Creates spinning effect, visual appeal
- **Matrix**: Cylinder with slits, superior filtration

**Hand Pipes**
- **Spoons**: Classic design, portable, various sizes
- **Sherlocks**: Curved stem, comfortable hold, artistic
- **Chillums**: One-hitter style, very portable
- **Steamrollers**: Powerful hits, not for beginners

**Dab Rigs**
Specialized for concentrates:
- Smaller than water pipes
- Require banger or nail
- Often feature recycler function
- Need torch or e-nail for heating

**Accessories**
- **Bowls**: Different sizes, colors, features
- **Downstems**: Various lengths and diffusion
- **Ash catchers**: Pre-filter for cleaner piece
- **Bangers**: Different styles (bucket, terp slurp, etc.)
- **Carb caps**: Control airflow for concentrates`,
        keyPoints: [
          "Beakers are stable and easy to clean - great for beginners",
          "Percolators filter smoke for smoother hits",
          "Ice catchers allow adding ice for cooler hits",
          "Dab rigs are smaller and designed for concentrates",
          "Know common accessories: bowls, downstems, ash catchers",
        ],
        completed: false,
      },
      {
        id: "m5-l3",
        title: "Heady Glass and Artisan Pieces",
        content: `Heady glass represents functional art. Understanding this category helps you sell premium pieces.

**What is Heady Glass?**
Heady glass refers to unique, artistically designed pieces created by skilled glass artists. Each piece is one-of-a-kind or limited edition.

**Heady vs. Production Glass:**
**Production Glass:**
- Mass manufactured
- Consistent designs
- Lower price points
- Widely available
- Good quality but common

**Heady Glass:**
- Handmade by artists
- Unique designs
- Higher price points
- Limited availability
- Collectible value

**Common Heady Techniques:**

**Fuming**: Silver or gold vaporized onto glass, creates color-changing effects

**Millie (Millefiori)**: Cross-section images created from layered glass canes

**Wig Wag**: Alternating colored glass pulled into patterns

**Sandblasting**: Frosted designs etched into glass

**Sculpting**: 3D elements like characters, animals, or abstract forms

**Implosions**: Designs that appear to go into the glass

**Why Customers Buy Heady:**
1. **Artistic appreciation**: Owning functional art
2. **Collectibility**: Value can increase over time
3. **Conversation pieces**: Unique talking points
4. **Quality**: Superior craftsmanship
5. **Support artists**: Direct support to creators

**Selling Heady Glass:**
- Learn the artists we carry
- Know their techniques and style
- Explain what makes each piece special
- Point out specific details and craftsmanship
- Frame as investment/collectible, not just functional

**Caring for Heady Pieces:**
- Extra careful handling
- Display when not in use
- Appropriate cleaning methods
- Storage recommendations`,
        keyPoints: [
          "Heady glass is one-of-a-kind functional art",
          "Techniques include fuming, millie, wig wag, sandblasting",
          "Heady pieces can be collectible and increase in value",
          "Learn the artists and techniques we carry",
          "Position as art investment, not just functional piece",
        ],
        completed: false,
      },
      {
        id: "m5-l4",
        title: "Glass Care and Customer Education",
        content: `Proper care education increases customer satisfaction and builds trust. Well-maintained pieces last longer.

**Basic Cleaning:**

**Daily Maintenance:**
- Empty and rinse with warm water after each use
- Don't let water sit for days
- Use screens to reduce residue

**Regular Cleaning:**
Materials needed:
- Isopropyl alcohol (91% or higher)
- Coarse salt (rock salt or sea salt)
- Pipe cleaners or brushes
- Rubber stoppers or plastic bags

Steps:
1. Rinse with warm water
2. Add salt and alcohol
3. Cover openings and shake vigorously
4. Let soak for stubborn buildup
5. Rinse thoroughly with warm water
6. Air dry completely

**What NOT to Do:**
- Never use boiling water (thermal shock)
- Don't use harsh chemical cleaners
- Avoid abrasive scrubbing on delicate pieces
- Don't use rubbing alcohol under 70%

**Specialty Cleaning Products:**
- Formula 420 / 710
- Resolution Cleaning Gel
- Randy's Black Label
- Grunge Off

Benefits of specialty products:
- Often reusable
- No salt needed
- Can be gentler on delicate pieces
- Some are eco-friendly

**Handling Best Practices:**
- Always grip securely
- Set down gently on flat surfaces
- Store upright when possible
- Use cases for transport
- Keep away from edges/ledges

**Customer Education Talking Points:**
"Clean pieces perform better and taste better. I recommend rinsing daily and doing a deep clean weekly. Here's what we use..."

**Common Issues and Solutions:**

**Water stains:** Soak in mixture of white vinegar and water

**Stubborn resin:** Extended alcohol soak, use pipe cleaners

**Cloudy glass:** Usually hard water buildup, use CLR or vinegar

**Broken downstem:** Replace with correct size (measure joint)`,
        keyPoints: [
          "Use 91%+ isopropyl alcohol and coarse salt for cleaning",
          "Never use boiling water - causes thermal shock and cracks",
          "Recommend daily rinse and weekly deep clean",
          "Specialty cleaners are good for delicate pieces",
          "Proper handling: grip securely, set down gently, store upright",
        ],
        completed: false,
      },
    ],
  },

  // MODULE 6: ADVANCED SALES TECHNIQUES
  {
    id: "m6",
    title: "Advanced Sales Techniques",
    description: "Elevate your sales skills with advanced strategies and techniques.",
    estimatedTime: "40 min",
    completed: false,
    progress: 0,
    quizId: "q6",
    lessons: [
      {
        id: "m6-l1",
        title: "Understanding the Sales Process",
        content: `Every successful sale follows a process. Understanding these stages helps you guide customers naturally.

**The Five Stages of a Sale:**

**1. Approach (30 seconds)**
Goal: Make a positive first impression and open communication
- Warm, genuine greeting
- Read body language
- Offer assistance without pressure
- "Welcome in! Looking for anything specific today?"

**2. Discovery (2-5 minutes)**
Goal: Understand the customer's needs and wants
- Ask open-ended questions
- Listen actively
- Identify stated AND unstated needs
- Build rapport through conversation

**3. Presentation (3-10 minutes)**
Goal: Match products to their needs
- Show products that fit their criteria
- Explain features AND benefits
- Let them handle products
- Answer questions thoroughly

**4. Handling Objections (varies)**
Goal: Address concerns and remove barriers
- Listen without interrupting
- Acknowledge their concern
- Respond with information
- Confirm the issue is resolved

**5. Close (1-2 minutes)**
Goal: Complete the sale smoothly
- Recognize buying signals
- Ask for the sale confidently
- Make checkout easy
- Thank them and invite return

**Why Process Matters:**
Skipping stages creates problems:
- Skip discovery → recommend wrong products
- Skip presentation → customer doesn't see value
- Skip objection handling → sale lost at register

**The Non-Linear Reality:**
Real conversations aren't perfectly linear. Customers may:
- Jump between stages
- Need to go back to discovery
- Raise objections during presentation
- Close quickly or need more time

Be flexible while keeping the framework in mind.`,
        keyPoints: [
          "Five stages: Approach, Discovery, Presentation, Objections, Close",
          "Discovery is the most important stage - understand needs first",
          "Skipping stages leads to wrong recommendations or lost sales",
          "Real sales aren't perfectly linear - stay flexible",
          "Each stage has a specific goal to accomplish",
        ],
        completed: false,
      },
      {
        id: "m6-l2",
        title: "Consultative Selling",
        content: `Consultative selling positions you as a trusted advisor, not a pushy salesperson. This approach builds loyalty and increases sales.

**The Consultant Mindset:**
Your goal is to help customers make the BEST decision for THEM, even if it's not the most expensive option. This counterintuitive approach builds trust that pays off long-term.

**Key Principles:**

**1. Ask Before You Tell**
Wrong: "Let me show you our best seller!"
Right: "What's your experience with delta products?" → then recommend

**2. Prescribe Based on Diagnosis**
A doctor doesn't prescribe before examining. Get full information before recommending.

**3. Offer Options, Not Orders**
Present 2-3 choices: "Based on what you've told me, I'd suggest either X or Y. Here's the difference..."

**4. Be Honest About Limitations**
"This product is great for energy, but if sleep is your main goal, you might prefer this one instead."

**5. Educate Throughout**
Share knowledge freely. Educated customers trust you more and buy more confidently.

**The SPIN Technique:**
A proven framework for consultative conversations:

**S - Situation Questions**
"What have you tried before?"
"How often do you use kratom?"

**P - Problem Questions**
"What wasn't working with your last product?"
"What challenges are you having?"

**I - Implication Questions**
"How does that affect your evenings?"
"What happens when you can't unwind?"

**N - Need-Payoff Questions**
"Would it help if you had something longer-lasting?"
"What would it mean if we found something that worked better?"

**Benefits of Consultative Selling:**
- Higher customer satisfaction
- Fewer returns and complaints
- Stronger customer loyalty
- More referrals
- Higher average transaction over time`,
        keyPoints: [
          "Position yourself as a trusted advisor, not a pushy salesperson",
          "Ask questions before making recommendations",
          "Be honest about product limitations - builds trust",
          "Use SPIN: Situation, Problem, Implication, Need-Payoff questions",
          "Educated customers buy more confidently and return more often",
        ],
        completed: false,
      },
      {
        id: "m6-l3",
        title: "Overcoming Objections",
        content: `Objections aren't rejections - they're requests for more information. Learning to handle them turns "no" into "yes."

**The LAER Framework:**

**L - Listen Fully**
Let them complete their objection without interrupting. Understand the REAL concern behind their words.

**A - Acknowledge**
Show you understand: "That's a totally valid concern..." This reduces defensiveness.

**E - Explore**
Ask questions to understand the full objection: "Tell me more about that..." or "What specifically concerns you?"

**R - Respond**
Address the actual concern with relevant information or solutions.

**Common Objections and Responses:**

**"It's too expensive"**
Explore: "Compared to what?" or "What's your budget?"
Respond:
- Break down cost per use
- Explain quality/value difference
- Show more economical option
- "It's an investment in quality that lasts longer"

**"I need to think about it"**
Explore: "Of course! What questions can I answer to help you decide?"
Respond:
- Provide additional information
- Offer to hold the item
- "I'm here when you're ready"

**"I'm not sure which one"**
Explore: "What's making the decision difficult?"
Respond:
- Simplify to two options
- Make a clear recommendation
- Share what other similar customers chose

**"I've never tried this before"**
Explore: "What's holding you back from trying?"
Respond:
- Start with mild/beginner option
- Provide thorough education
- Share customer experiences
- Offer small size first

**"My friend said it didn't work"**
Explore: "What did they try? Everyone responds differently..."
Respond:
- Explain individual variation
- Suggest different product/dose
- Manage expectations

**What NOT to Do:**
- Don't argue or get defensive
- Don't dismiss their concern
- Don't pressure aggressively
- Don't give up after one objection`,
        keyPoints: [
          "LAER: Listen, Acknowledge, Explore, Respond",
          "Objections are requests for information, not rejections",
          "For price objections: show value and break down cost per use",
          "For uncertainty: simplify choices and make clear recommendations",
          "Never argue, dismiss, or pressure - stay patient and helpful",
        ],
        completed: false,
      },
      {
        id: "m6-l4",
        title: "Upselling and Cross-Selling",
        content: `Upselling and cross-selling, done right, help customers and increase revenue. Done wrong, they annoy customers and damage trust.

**Upselling vs Cross-Selling:**
- **Upselling**: Encouraging purchase of a better/premium version
- **Cross-selling**: Suggesting complementary additional products

**The Golden Rule:**
Only upsell/cross-sell when it genuinely benefits the customer. If it doesn't make their experience better, don't push it.

**When to Upsell:**

Good opportunity:
- Customer is buying entry-level but seems serious about the hobby
- They mention frustration with cheap products breaking
- They express wanting the "best" or "most effective"

How to upsell:
"For just $15 more, you could get the borosilicate version which lasts much longer. Most serious users find it's worth the investment."

**When to Cross-Sell:**

Good opportunity:
- They're buying something that needs accessories
- They mention another need during conversation
- Natural complementary products exist

How to cross-sell:
"By the way, you'll need a torch for that banger. Did you want to grab one while you're here?"

**Natural Cross-Selling Combinations:**
- Water pipe → cleaning supplies, screens, ash catcher
- Delta edibles → different strain for different time of day
- Kratom powder → measuring spoon, storage container
- Dab rig → banger, carb cap, torch, concentrate container
- Rolling tray → papers, tips, grinder

**The "Complete Solution" Approach:**
Instead of item-by-item upselling, present a complete solution:
"Everything you need to get started would be the rig, banger, carb cap, torch, and some cleaning supplies. Want me to put together a starter kit at a good price?"

**Reading the Customer:**
STOP upselling if:
- They mention budget constraints
- They seem annoyed or pressured
- They've already declined once
- Body language closes off

**After the Sale:**
Checkout is a great time for small add-ons:
"Did you need any papers or lighters while you're here?"

Keep it light and pressure-free.`,
        keyPoints: [
          "Only upsell/cross-sell when it genuinely benefits the customer",
          "Upselling = better version, Cross-selling = complementary products",
          "Read customer signals - stop if they show budget concern or annoyance",
          "Present complete solutions instead of multiple separate suggestions",
          "Checkout is good for small, pressure-free add-on suggestions",
        ],
        completed: false,
      },
    ],
  },

  // MODULE 7: DAY 1 ESSENTIALS
  {
    id: "m7",
    title: "Day 1 Essentials",
    description: "Everything new employees need to know on their first day at High Life.",
    estimatedTime: "35 min",
    completed: false,
    progress: 0,
    quizId: "q7",
    lessons: [
      {
        id: "m7-l1",
        title: "Clocking In & Out",
        content: `Proper time tracking is essential for accurate payroll and maintaining professional standards at High Life.

**Clocking In**
- Use VelaPOS to clock in at the start of your shift
- You must be in uniform and ready to work BEFORE clocking in
- Clock in no more than 5 minutes before your scheduled shift
- Never clock in for another employee - this is grounds for immediate termination

**Clocking Out**
- Clock out immediately after your shift ends
- Never clock out for another employee
- If you forget to clock in or out, notify your manager immediately
- Time adjustments require manager approval and documentation

**Understanding Breaks**
- Shifts 6+ hours: One 30-minute UNPAID break (you must clock out)
- Breaks under 20 minutes: PAID (do not clock out)
- Always clock out for unpaid breaks
- Return from breaks on time - late returns count as tardiness

**Important Reminders**
- Check your timecard weekly for accuracy
- Report discrepancies to your manager right away
- Repeated time violations result in disciplinary action`,
        keyPoints: [
          "Clock in no more than 5 minutes before your shift starts",
          "You must be in uniform and ready to work before clocking in",
          "Never clock in or out for another employee",
          "Shifts 6+ hours get a 30-minute unpaid break",
          "Report forgotten punches to your manager immediately",
        ],
        completed: false,
      },
      {
        id: "m7-l2",
        title: "Dress Code & Appearance",
        content: `High Life maintains professional appearance standards to represent our brand and ensure safety.

**Required Attire**
- Company-provided black shirt (must be worn at all times during shift)
- Black pants or jeans (no rips, tears, holes, or fraying)
- Closed-toe shoes required (no sandals, flip-flops, or open-back shoes)
- Name badge must be visible at all times

**Prohibited Items**
- Hats or head coverings (unless for documented religious reasons)
- Visible offensive tattoos must be covered
- Excessive jewelry that poses safety hazards (large hoops, long necklaces)
- Strong perfumes or colognes (many customers are sensitive)
- Athletic wear, shorts, or leggings (unless approved black leggings)

**Clear Bag Policy**
This is a STRICT security policy with no exceptions:
- ALL bags brought into the store must be clear/transparent
- This includes purses, backpacks, lunch bags, and tote bags
- Small wallets may be solid-colored but subject to inspection
- Bags are subject to search upon entering and leaving

**Personal Grooming**
- Hair must be clean and neat
- Nails should be reasonable length for safe product handling
- Maintain good personal hygiene`,
        keyPoints: [
          "Black company shirt and black pants/jeans are required",
          "Closed-toe shoes only - no exceptions",
          "All bags must be clear/transparent",
          "Name badge must be visible at all times",
          "Cover offensive tattoos and limit strong fragrances",
        ],
        completed: false,
      },
      {
        id: "m7-l3",
        title: "Store Keys & Alarm System",
        content: `Security is paramount at High Life. Understanding the alarm system and key procedures is critical.

**Key Holders**
- Only Store Managers and Assistant Managers are authorized key holders
- Keys must NEVER be duplicated, even for personal backup
- Keys must NEVER be loaned to anyone, including other employees
- Lost keys must be reported IMMEDIATELY to your District Manager
- Lost keys may require store re-keying at significant cost

**Alarm System Basics**
- Each key holder has a unique personal alarm code
- NEVER share your alarm code with anyone
- You have 45 seconds to disarm after entering - move quickly!
- If the alarm triggers accidentally, call the alarm company immediately
- False alarms may result in fines to the store

**Opening the Store - Step by Step**
1. Approach the door and check for signs of break-in
2. Unlock the door and enter quickly
3. Proceed DIRECTLY to the alarm panel (know its location!)
4. Enter your unique code to disarm within 45 seconds
5. Lock the door behind you until official opening time
6. Turn on lights and begin opening procedures

**Closing the Store**
1. Ensure all customers and non-key-holders have exited
2. Complete all closing procedures
3. Turn off lights and secure all areas
4. Exit through the designated door
5. Set the alarm using your unique code
6. Lock the door and verify it's secure
7. Check windows and other entry points from outside`,
        keyPoints: [
          "Only Managers and Assistant Managers can have keys",
          "Never share or duplicate your keys or alarm code",
          "You have 45 seconds to disarm the alarm after entering",
          "Lost keys must be reported to District Manager immediately",
          "Always verify the door is locked after closing",
        ],
        completed: false,
      },
      {
        id: "m7-l4",
        title: "Store Layout & Safety Equipment",
        content: `Knowing your store layout ensures efficient operations and quick response in emergencies.

**Key Store Areas**
- **Front Counter**: Main register area and primary customer service point
- **Display Cases**: Glass products and high-value items (ALWAYS keep locked when not assisting customers)
- **Back Stock Room**: Inventory storage and receiving area
- **Break Area**: Employee breaks only - keep clean for everyone
- **Office**: Manager workspace, safe location, and paperwork storage

**Critical Safety Equipment - KNOW THESE LOCATIONS**

**Panic Button**
- Located under EACH register
- Know the EXACT location - feel for it without looking
- Press and hold for 3 seconds to activate
- Use for: robberies, violent customers, medical emergencies
- Police are dispatched automatically - remain calm

**Fire Extinguisher**
- Located near the back exit
- Know how to use: PASS (Pull, Aim, Squeeze, Sweep)
- Only use for small, contained fires
- Evacuate if fire is larger than a trash can

**First Aid Kit**
- Located in the office or break room
- Contains basic supplies for minor injuries
- Report all injuries to your manager
- Serious injuries require calling 911

**Restricted Areas**
- Only authorized personnel in the office
- Back stock access requires manager approval for non-managers
- Safe access is manager-only - NEVER attempt to open
- Security camera room is off-limits to all non-management`,
        keyPoints: [
          "Know the EXACT location of the panic button under your register",
          "Fire extinguisher is near the back exit - know PASS method",
          "First aid kit is in the office or break room",
          "Display cases must stay locked when not assisting customers",
          "Safe access is manager-only - never attempt to open it",
        ],
        completed: false,
      },
    ],
  },

  // MODULE 8: STORE OPERATIONS
  {
    id: "m8",
    title: "Store Operations",
    description: "Master opening, closing, register operations, and daily procedures.",
    estimatedTime: "50 min",
    completed: false,
    progress: 0,
    quizId: "q8",
    lessons: [
      {
        id: "m8-l1",
        title: "Opening Procedures",
        content: `A consistent opening routine ensures the store is ready for customers and sets up a successful day.

**Before Opening (Arrive 15-30 minutes early)**
1. Disarm the alarm system immediately upon entry
2. Lock the door behind you - no customers until opening time
3. Turn on all lights, music, and display lighting
4. Walk the floor - check for anything unusual or out of place
5. Check the safe and review previous night's paperwork

**Register Preparation**
- Each drawer starts with EXACTLY $200 (the "bank")
- Count your drawer BEFORE signing for it
- Count out loud or use a consistent counting method
- Verify: 4 twenties, 6 tens, 8 fives, 20 ones, $10 in coins (standard)
- If the count is wrong, report to manager BEFORE signing

**Store Readiness Checklist**
- All products stocked and "faced" (labels forward)
- Display cases are locked
- Floors are clean and free of hazards
- Trash cans are empty
- Bathrooms are stocked and clean
- All signage is in place

**Opening Time**
- Turn on the "OPEN" sign at exactly opening time
- Unlock the front door
- Greet your first customers warmly
- You're ready for a great day!`,
        keyPoints: [
          "Arrive 15-30 minutes before opening time",
          "Count your drawer before signing - report discrepancies",
          "Each register starts with exactly $200",
          "Walk the floor to check for anything unusual",
          "Turn on OPEN sign at exactly opening time",
        ],
        completed: false,
      },
      {
        id: "m8-l2",
        title: "Closing Procedures & ENR",
        content: `Proper closing protects store assets and ensures a smooth opening the next day.

**At Closing Time**
1. Lock the front door at exactly closing time
2. Allow any remaining customers to finish shopping (don't rush them)
3. Turn off the "OPEN" sign
4. Do not let anyone else enter

**Register Closing**
1. Run end-of-day report in VelaPOS
2. Count your entire drawer carefully
3. Calculate: Drawer total minus $200 bank = cash sales
4. This should match your VelaPOS report
5. Bundle and band large bills separately

**End of Night Report (ENR)**
The ENR documents all financial activity for the day:
- **Header**: Date, store number, manager on duty
- **Register Counts**: Opening and closing amounts for each drawer
- **Sales Summary**: From POS system reports
- **Deposit Calculation**: Cash to be deposited
- **Discrepancies**: Any over/short amounts (be honest!)
- **Notes**: Unusual events, incidents, customer issues

**Final Closing Steps**
1. Secure deposit in the safe
2. File all paperwork properly
3. Take out trash if required
4. Turn off all lights, music, and displays
5. Do a final walk-through of the entire store
6. Set the alarm
7. Lock all doors and check them
8. Check windows from outside

**NEVER leave without:**
- All registers counted and balanced
- ENR completed and filed
- Deposit secured in safe
- All doors locked and alarm set`,
        keyPoints: [
          "Lock the door at exactly closing time",
          "Count drawer and match to VelaPOS report",
          "Complete the ENR accurately and honestly",
          "Always report discrepancies - never hide them",
          "Double-check all doors are locked and alarm is set",
        ],
        completed: false,
      },
      {
        id: "m8-l3",
        title: "Register Operations & Transactions",
        content: `Proper register operation ensures accurate sales, prevents loss, and provides great customer service.

**Drawer Balance**
- Each register maintains a $200 float at all times
- Never remove money except for authorized deposits
- ALL sales must be rung through the register - no exceptions
- Making sales "off the books" is theft and grounds for termination

**Processing Every Transaction**
1. Greet the customer with a smile
2. Ask for ID - EVERY customer, EVERY time (no exceptions!)
3. Verify ID is valid and customer is 21+
4. Scan or manually enter items
5. Verify the total with the customer
6. Accept payment
7. Count back change (for cash) or wait for card approval
8. Provide receipt
9. Thank the customer and invite them back

**ID Verification in VelaPOS**
- Enter the customer's birth date when prompted
- The system will verify they are 21+
- If the system blocks the sale, do NOT override
- When in doubt, refuse the sale

**Payment Types**
- **Cash**: Always count back change to the customer
- **Debit/Credit**: Follow terminal prompts, wait for approval
- **Gift Cards**: Process through VelaPOS gift card function
- **No personal checks**: We do not accept checks

**Voids and Returns**
- Voids require manager approval
- Same-day returns: process as void
- Previous-day returns: process as return in VelaPOS
- Document reason for all voids`,
        keyPoints: [
          "Check ID for EVERY customer - no exceptions",
          "All sales must go through the register",
          "Count back change to cash customers",
          "Voids and returns require manager approval",
          "Never override age verification blocks",
        ],
        completed: false,
      },
      {
        id: "m8-l4",
        title: "Money Handling & Petty Cash",
        content: `Accurate money handling protects you and the store. Follow these procedures exactly.

**Cash Handling Best Practices**
- Count cash out of the customer's sight (below counter level)
- Keep large bills on top of the drawer until change is given
- Never leave your register drawer open unattended
- If you must step away, close and lock your drawer
- Report counterfeit-looking bills to your manager immediately

**Petty Cash**
Each register has access to $100 petty cash for small store expenses:
- Used for store supplies, emergency purchases only
- EVERY expense requires a receipt
- Log all petty cash use in the petty cash log immediately
- Manager approval required for purchases over $20
- Never use petty cash for personal items

**Payouts**
Payouts remove money from the register for specific purposes:
- Bank deposits
- Authorized refunds (manager approved)
- Store supplies (with receipt)

**Payout Process**
1. Get manager approval (verbal is okay, written for large amounts)
2. Process payout in VelaPOS
3. Attach receipt to the payout slip
4. File in daily paperwork

**Discrepancy Policy**
- Overages: Report and document - do not pocket
- Shortages: Report and document - do not cover personally
- Pattern of shortages leads to investigation
- Honesty is always the best policy

**Cash Drops**
When your drawer has too much cash:
- Get manager to do a cash drop
- Manager counts and verifies
- Money goes to the safe
- Document on your shift paperwork`,
        keyPoints: [
          "Count cash below counter level, out of customer sight",
          "Every petty cash expense needs a receipt",
          "Payouts require manager approval and documentation",
          "Report all discrepancies honestly - never hide or cover",
          "Request cash drops when drawer gets too full",
        ],
        completed: false,
      },
      {
        id: "m8-l5",
        title: "Bank Runs & Deposits",
        content: `Secure handling of deposits protects store revenue. Follow these procedures exactly for safety.

**Bank Run Schedule**
- Bank runs are completed Monday, Wednesday, and Friday
- Additional runs when deposits exceed safe limits
- Only managers or designated key holders do bank runs
- Never do bank runs alone if possible

**Preparing the Deposit**
1. Count and verify the deposit amount twice
2. Have a second person verify your count
3. Complete the deposit slip accurately:
   - Date and store number
   - Cash total broken down by denomination
   - Grand total
   - Preparer and verifier signatures
4. Seal deposit in the tamper-evident bank bag
5. Record bag number in the deposit log

**During the Bank Run - SAFETY FIRST**
- Go DIRECTLY to the bank - no stops
- Do not make the deposit obvious (no bank bags visible)
- Stay aware of your surroundings
- Park close to the bank entrance
- If you feel unsafe, return to the store and try later

**At the Bank**
- Use the commercial teller or night drop as instructed
- Get a receipt for EVERY transaction
- Verify your change order is correct before leaving
- Count change at the bank, not in your car
- Return directly to the store

**After Returning**
- Secure change in the safe immediately
- File the bank receipt with daily paperwork
- Update the deposit log
- Report any issues to your manager`,
        keyPoints: [
          "Bank runs happen Monday, Wednesday, Friday",
          "Two people should verify the deposit count",
          "Go directly to the bank - no stops",
          "Get and keep receipts for every transaction",
          "Count change at the bank before leaving",
        ],
        completed: false,
      },
    ],
  },
  // MODULE 9: POLICIES & CONDUCT
  {
    id: "m9",
    title: "Policies & Conduct",
    description: "Company policies, employee conduct expectations, and workplace rules",
    estimatedTime: "30 min",
    completed: false,
    progress: 0,
    quizId: "q9",
    lessons: [
      {
        id: "m9-l1",
        title: "Drug & Substance Policy",
        content: `High Life maintains a strict drug-free workplace policy. Understanding these rules protects your employment and ensures a safe environment for everyone.

**Prohibited Substances at Work:**
- CBD, Delta, THC, and Kratom products are NOT allowed to be used at work - even though we sell them
- Alcohol consumption during work hours is strictly prohibited
- Being under the influence of any substance during your shift is grounds for termination

**Why This Matters:**
You represent the company to every customer. Being impaired affects your judgment, customer service quality, and creates liability issues. Even "just a little" is too much.

**Nicotine & Tobacco Policy:**
- You must be 21+ to use any nicotine/tobacco products
- Smoke breaks are limited and must be approved by management
- Never smoke in view of customers or near the store entrance

**Testing:**
High Life reserves the right to conduct drug testing at any time. Refusal to submit to testing is treated the same as a positive result.`,
        keyPoints: [
          "No CBD, Delta, THC, or Kratom use during work hours",
          "No alcohol during shifts - zero tolerance",
          "Must be 21+ for nicotine/tobacco products",
          "Company can drug test at any time",
          "Being impaired at work = immediate termination",
        ],
        completed: false,
      },
      {
        id: "m9-l2",
        title: "Dress Code & Appearance",
        content: `Your appearance represents the High Life brand. We want you to look professional while still being comfortable.

**Required:**
- High Life branded shirt (provided by the company)
- Clean, wrinkle-free clothing
- Closed-toe shoes (safety requirement)
- Name badge visible at all times

**Prohibited:**
- Ripped or torn clothing
- Offensive graphics or text on any visible clothing
- Open-toe shoes or sandals
- Excessively baggy or revealing clothing

**Clear Bag Policy:**
All employees must use a clear bag when bringing personal items to work. This policy:
- Applies to all bags, purses, backpacks
- Helps prevent theft accusations
- Protects you from false claims
- Is non-negotiable for all staff

**Grooming:**
- Maintain good personal hygiene
- Hair should be clean and neat
- Excessive perfume/cologne should be avoided (some customers are sensitive)`,
        keyPoints: [
          "Always wear your High Life branded shirt",
          "Closed-toe shoes required for safety",
          "Clear bags only - no exceptions",
          "Name badge must be visible at all times",
          "Keep appearance clean and professional",
        ],
        completed: false,
      },
      {
        id: "m9-l3",
        title: "Attendance & Scheduling",
        content: `Reliable attendance is essential for team success. Your coworkers depend on you to show up as scheduled.

**Calling In Sick:**
- Call at least 2 HOURS before your shift starts
- Text messages are NOT acceptable - you must call
- Speak directly to the manager on duty
- Provide expected return date if possible

**No Call/No Show:**
- First offense: Written warning
- Second offense: Final warning
- Third offense: Termination
A no-call/no-show is one of the fastest ways to lose your job.

**Schedule Changes:**
- Requests must be submitted at least 2 weeks in advance
- Shift swaps must be approved by management
- You're responsible for finding coverage if you need time off last-minute

**Tardiness:**
- Arriving late affects the entire team
- Chronic tardiness will result in disciplinary action
- If you're running late, call ahead immediately

**Breaks:**
- 6+ hour shift: One 30-minute unpaid break
- 8+ hour shift: One 30-minute unpaid break + one 15-minute paid break
- Breaks must be approved and timed appropriately`,
        keyPoints: [
          "Call (don't text) at least 2 hours before shift if sick",
          "No-call/no-show = serious disciplinary action",
          "Schedule requests need 2 weeks advance notice",
          "If running late, call immediately",
          "Know your break entitlements based on shift length",
        ],
        completed: false,
      },
      {
        id: "m9-l4",
        title: "Personal Electronics & Social Media",
        content: `Personal devices and social media can be distractions and create liability issues. Here's what you need to know.

**Personal Phone Policy:**
- Phones should be kept in your locker or clear bag during shifts
- No personal calls on the sales floor
- Emergency calls only - step to the back and keep it brief
- No texting while customers are in the store

**Social Media Policy:**
- Never post photos or videos from inside the store
- Don't discuss work issues on social media
- Never post about specific customers or transactions
- Don't identify yourself as a High Life employee in controversial posts
- Company has the right to monitor public social media

**Why This Matters:**
- Photos could reveal security measures or inventory
- Posts could violate customer privacy
- Negative posts reflect poorly on the company
- Could create legal liability

**Music & Entertainment:**
- Store music is controlled by management
- No personal headphones/earbuds while on duty
- You need to hear customers and alarms`,
        keyPoints: [
          "Keep phones in locker or clear bag during shifts",
          "No photos or videos from inside the store",
          "Never discuss work issues on social media",
          "No headphones/earbuds while on duty",
          "Emergency calls only - keep them brief",
        ],
        completed: false,
      },
      {
        id: "m9-l5",
        title: "Code of Conduct",
        content: `The High Life Code of Conduct defines how we treat each other, customers, and represent the company.

**Respect & Professionalism:**
- Treat all customers and coworkers with respect
- No discrimination based on race, gender, age, religion, or any protected class
- Harassment of any kind is not tolerated
- Keep conversations appropriate for a professional environment

**Honesty & Integrity:**
- Never steal from the company or coworkers
- Be truthful in all reporting (time, inventory, incidents)
- Report any suspicious activity immediately
- Don't share proprietary information

**Conflicts of Interest:**
- Don't work for competitors while employed at High Life
- Disclose any relationships with vendors
- Don't share proprietary information

**Consequences:**
Violations of the code of conduct will result in disciplinary action up to and including termination. Serious violations may also result in legal action.

**Reporting Issues:**
If you witness violations, report to your manager or HR. High Life prohibits retaliation against anyone who reports in good faith.`,
        keyPoints: [
          "Treat everyone with respect - zero tolerance for harassment",
          "Honesty in all reporting - time, inventory, incidents",
          "Never accept vendor gifts without approval",
          "Report violations to management or HR",
          "Retaliation against reporters is prohibited",
        ],
        completed: false,
      },
    ],
  },
  // MODULE 10: COMPLIANCE & LEGAL
  {
    id: "m10",
    title: "Compliance & Legal",
    description: "Legal requirements, ID verification, proper terminology, and staying compliant",
    estimatedTime: "35 min",
    completed: false,
    progress: 0,
    quizId: "q10",
    lessons: [
      {
        id: "m10-l1",
        title: "Age Verification Requirements",
        content: `Age verification is non-negotiable. Every single customer must be ID'd - no exceptions.

**The Rule is Simple:**
Check EVERY customer's ID, EVERY time. Even if:
- They look 80 years old
- You've seen them every day for a year
- They're in a hurry
- They get upset about it

**Acceptable IDs:**
- State-issued driver's license
- State-issued ID card
- US Passport
- Military ID

**Not Acceptable:**
- Expired IDs (check the date!)
- Photos of IDs on phones
- Student IDs
- Work badges
- Foreign IDs without proper verification

**How to Check:**
1. Ask for ID before starting the transaction
2. Check the photo matches the person
3. Check the birth date (must be 21+)
4. Check the expiration date
5. Look for signs of tampering or fakeness
6. When in doubt, refuse the sale

**VelaPOS Requirement:**
The system will prompt you to enter the customer's birth date. You MUST get this from the actual ID - never guess or skip.`,
        keyPoints: [
          "Check EVERY customer's ID - no exceptions",
          "Must be 21+ for all purchases",
          "Only accept valid, unexpired government-issued IDs",
          "Photos of IDs on phones are NOT acceptable",
          "Always enter birth date in VelaPOS from the actual ID",
        ],
        completed: false,
      },
      {
        id: "m10-l2",
        title: "Proper Terminology",
        content: `The words you use matter - legally and professionally. Using wrong terminology can create legal issues and make the store look unprofessional.

**NEVER Say:**
- Bong → Say "water pipe"
- Bowl → Say "dry pipe" or "hand pipe"
- Weed/Marijuana → Say "dry herbs" or "legal herbs"
- Get high/Get stoned → Say "effects" or "experience"
- Drug/Drugs → Say "products" or "items"
- Smoke → Say "use" or "consume"

**Why This Matters:**
Using drug-related terminology implies illegal use, which:
- Could jeopardize our business license
- Creates legal liability
- Looks unprofessional
- Could be grounds for termination

**Customer Education:**
If a customer uses improper terminology, gently redirect:
- Customer: "Which bong hits hardest?"
- You: "Our water pipes come in various sizes. Are you looking for something with more filtration?"

**Product Descriptions:**
Always describe products by their legal intended use:
- Water pipes are "for tobacco use only"
- Grinders are for "legal dry herbs"
- Scales are for "kitchen/hobby use"

**Practice:**
Get comfortable with proper terminology so it becomes natural. It protects you and the company.`,
        keyPoints: [
          "Never say bong - say 'water pipe'",
          "Never say bowl - say 'dry pipe' or 'hand pipe'",
          "Never reference marijuana or getting high",
          "Gently redirect customers who use wrong terms",
          "All products are for 'legal use only'",
        ],
        completed: false,
      },
      {
        id: "m10-l3",
        title: "Prohibited Sales & Combinations",
        content: `Certain products cannot be sold together in the same transaction. This is a legal requirement, not a suggestion.

**Cannot Be Combined:**
- Glass/pipes + any ingestible product (Delta, Kratom, CBD)
- Torch + glass in same transaction
- Grinder + Delta/Kratom/CBD products

**Why This Matters:**
Combining these items implies drug paraphernalia use, which can:
- Result in legal action against the store
- Cause us to lose our business license
- Get you personally in legal trouble

**How to Handle:**
If a customer wants both types of items:
1. Complete the first transaction
2. Give them their receipt
3. Start a completely new transaction for the other items
4. This must be two separate transactions

**Script:**
"I can definitely get both of these for you, but I'll need to ring them up as separate transactions. Let me finish this one first, then we'll do the other."

**No Exceptions:**
Even if the customer complains or is in a hurry, never combine prohibited items. Your job and our business license depend on it.`,
        keyPoints: [
          "Glass and ingestibles CANNOT be in the same transaction",
          "Torch and glass CANNOT be combined",
          "Grinders can't be sold with Delta/Kratom/CBD",
          "Always do two separate transactions",
          "No exceptions - this protects everyone legally",
        ],
        completed: false,
      },
      {
        id: "m10-l4",
        title: "Handling Media & Reporters",
        content: `If a reporter or news crew approaches you, there's one simple rule: Do NOT talk to them.

**What to Do:**
1. Politely decline to answer any questions
2. Do not give your name
3. Direct them to the corporate office
4. Notify your manager immediately
5. Do not allow filming inside the store

**Script:**
"I'm not authorized to speak on behalf of the company. Please contact our corporate office." Then walk away.

**Why This Matters:**
- Anything you say can be taken out of context
- You don't know their angle or intent
- Even innocent comments can be twisted
- You could inadvertently harm the company

**What They Might Try:**
- "Just a quick question" - Still no
- "It's for a positive story" - Still no
- "Off the record" - There's no such thing, still no
- Undercover without identifying themselves - If you suspect, still decline

**Social Media Requests:**
Same rules apply to bloggers, YouTubers, or anyone creating content:
- No interviews
- No filming permission
- Direct to corporate

**Document Everything:**
After any media encounter, write down what happened and report to management immediately.`,
        keyPoints: [
          "Never speak to media or reporters - direct to corporate",
          "Do not give your name or allow filming",
          "Even 'positive stories' - decline and notify manager",
          "Same rules for bloggers and content creators",
          "Document and report any media encounters",
        ],
        completed: false,
      },
      {
        id: "m10-l5",
        title: "Legal Claims & Product Information",
        content: `What you say about products matters legally. Making improper claims can get you and the company in serious trouble.

**Never Make Medical Claims:**
You are NOT a doctor. Never say products will:
- Cure any condition
- Treat any illness
- Heal or fix health problems
- Work as medicine

**Wrong:** "This CBD will fix your anxiety"
**Right:** "Many customers tell us they enjoy this for relaxation"

**Never Make Guarantees:**
- Don't promise specific effects
- Don't guarantee results
- Everyone reacts differently to products

**What You CAN Say:**
- Share general product information
- Explain differences between products
- Share what customers commonly report
- Recommend based on preferences

**Script Examples:**
- "I can't make medical claims, but this is one of our popular options for people looking for relaxation."
- "Effects vary person to person, but customers often describe this strain as..."
- "I'd recommend starting with a lower dose to see how it works for you."

**Documentation:**
If a customer reports a bad reaction:
1. Document what they purchased and when
2. Get their contact information
3. Report to management immediately
4. Do not admit fault or make promises`,
        keyPoints: [
          "Never make medical claims - you're not a doctor",
          "Don't guarantee specific effects or results",
          "Share what 'customers commonly report' instead",
          "Always recommend starting with lower doses",
          "Document any reported adverse reactions",
        ],
        completed: false,
      },
    ],
  },
  {
    id: "m11",
    title: "Money Handling & Banking",
    description: "Register operations, bank runs, deposits, petty cash, ENR procedures, and counterfeit detection",
    estimatedTime: "40 min",
    completed: false,
    progress: 0,
    quizId: "q11",
    lessons: [
      {
        id: "m11-l1",
        title: "Register Operations & Cash Handling",
        content: `Proper cash handling protects both you and the company. Every dollar must be accounted for accurately.

**Opening the Register:**
1. Count your starting drawer (should be $200 standard)
2. Verify the count matches the previous close-out
3. Sign the drawer verification slip
4. Report any discrepancies IMMEDIATELY to management

**During Your Shift:**
- Keep large bills under the cash tray, not in the slots
- Face all bills the same direction (facing up, same way)
- Count change back to customers out loud
- Never leave the register drawer open
- Close the drawer between every transaction

**Counting Back Change:**
Always count change back to the customer starting from the purchase amount:
- Sale is $17.43, customer pays $20
- Say: "17.43, 17.50 (give 7 cents), 18 (give 50 cents), 19, 20 (give two $1 bills)"

**Cash Drops:**
When your drawer exceeds $300, perform a cash drop:
1. Count the excess (keep $200 in drawer)
2. Fill out the drop slip completely
3. Have another employee verify and sign
4. Place in the safe immediately
5. Never leave cash unattended during a drop

**End of Shift:**
- Count your entire drawer
- Complete the close-out sheet
- Document any discrepancies with explanation
- Place drawer in safe or hand off to next shift`,
        keyPoints: [
          "Starting drawer is $200 - verify and sign",
          "Large bills go under the tray, not in slots",
          "Count change back out loud to customers",
          "Cash drop when drawer exceeds $300",
          "Never leave register drawer open or cash unattended",
        ],
        completed: false,
      },
      {
        id: "m11-l2",
        title: "Bank Runs & Deposits",
        content: `Bank runs are a critical responsibility. You're carrying company money and must follow strict procedures.

**Before Leaving the Store:**
1. Count all cash being deposited - twice
2. Fill out the deposit slip completely
3. Have a manager verify and sign
4. Place everything in the bank bag
5. Seal the bag and record the seal number

**Safety During Bank Runs:**
- Go directly to the bank - no stops
- Vary your route and times when possible
- Keep the bag concealed, not visible
- Be aware of your surroundings
- If followed, drive to a police station - do not go to the bank
- Never make deposits after dark alone

**At the Bank:**
- Use the commercial teller or night drop as instructed
- Get a receipt for EVERY transaction
- Bring the receipt back immediately
- Never leave receipts in your car

**Night Drops:**
When using the night drop:
1. Verify the location is well-lit
2. Have the bag ready before exiting your vehicle
3. Make the drop quickly
4. Do not count money in the parking lot
5. Leave immediately after the drop

**Documentation:**
Keep all deposit records:
- Bank receipts
- Deposit slip copies
- Manager verification signatures
- Any discrepancy notes`,
        keyPoints: [
          "Count cash twice before leaving, get manager verification",
          "Go directly to bank - no stops, vary routes",
          "Keep bank bag concealed, be aware of surroundings",
          "Always get and return with a receipt",
          "If followed, go to police station instead of bank",
        ],
        completed: false,
      },
      {
        id: "m11-l3",
        title: "Petty Cash & Small Expenses",
        content: `Petty cash is for small, unexpected business expenses. It's not your personal fund - every penny must be documented.

**What Petty Cash Is For:**
- Emergency supplies (cleaning products, paper goods)
- Small equipment repairs
- Shipping supplies when needed urgently
- Minor office supplies

**What Petty Cash Is NOT For:**
- Personal purchases (even if you plan to pay back)
- Food for yourself
- Any purchase over $50 without manager approval
- Regular/recurring expenses

**Using Petty Cash:**
1. Get manager approval BEFORE the purchase
2. Keep the original receipt
3. Fill out the petty cash voucher completely
4. Attach the receipt to the voucher
5. Get manager signature on the voucher
6. Return the voucher and any change to the safe

**Petty Cash Voucher Must Include:**
- Date of purchase
- Amount spent
- What was purchased and why
- Store/vendor name
- Your signature
- Manager approval signature

**Reconciliation:**
Petty cash is counted and reconciled weekly:
- Cash on hand + vouchers must equal the fund total
- Discrepancies are investigated
- Missing funds without documentation is a serious issue

**Pro Tip:**
When in doubt, ask first. It's much easier to get approval before a purchase than to explain an unauthorized expense after.`,
        keyPoints: [
          "Always get manager approval BEFORE purchases",
          "Keep original receipts - no receipt, no reimbursement",
          "Fill out vouchers completely with all required info",
          "Petty cash is NOT for personal purchases, ever",
          "Cash + vouchers must always equal the fund total",
        ],
        completed: false,
      },
      {
        id: "m11-l4",
        title: "ENR (End of Night Report) Procedures",
        content: `The ENR is a critical document that reconciles all financial activity for the day. Accuracy is essential.

**What the ENR Documents:**
- All register transactions
- Cash deposits prepared
- Credit/debit card totals
- Any discrepancies (over/short)
- Petty cash activity
- Safe counts

**Completing the ENR - Step by Step:**
1. Run end-of-day reports from VelaPOS
2. Count each register drawer individually
3. Calculate: Drawer total minus $200 bank = cash sales
4. Compare cash sales to VelaPOS cash report
5. Record any over/short amounts
6. Count and verify credit card batch totals
7. Prepare deposit and record amount
8. Complete safe count
9. Sign and date the ENR

**Common Discrepancy Causes:**
- Mis-counted change to customers
- Transaction not rung up properly
- Drop slips not recorded
- Math errors on manual calculations

**If You're Over:**
- Document the exact amount
- Note possible causes if known
- Do NOT pocket the overage
- Report to manager

**If You're Short:**
- Document the exact amount
- Note what you think may have caused it
- Do NOT cover from personal funds
- Report to manager
- Repeated shortages trigger investigation

**Manager Review:**
The ENR is reviewed by management daily. Patterns are tracked. Consistent accuracy builds trust; consistent problems raise concerns.`,
        keyPoints: [
          "ENR reconciles all daily financial activity",
          "Compare drawer counts to VelaPOS reports",
          "Document all overages and shortages honestly",
          "Never pocket overages or cover shortages personally",
          "Consistent accuracy builds trust with management",
        ],
        completed: false,
      },
      {
        id: "m11-l5",
        title: "Counterfeit Detection",
        content: `Accepting counterfeit bills costs the company real money. Every large bill should be checked.

**Bills to Always Check:**
- $50 bills - always
- $100 bills - always
- $20 bills - if they look suspicious or customer is acting nervous

**Detection Methods:**

**1. The Pen Test:**
- Swipe the counterfeit detection pen on the bill
- Yellow/clear = likely genuine
- Dark brown/black = likely counterfeit
- Test on a light area of the bill

**2. Feel the Texture:**
- Real bills have a distinctive texture
- Look for raised printing on shoulders of portraits
- Feel for the embedded security thread

**3. Hold Up to Light:**
- Security thread should be visible with correct text
- Watermark should match the portrait
- Should be embedded, not printed on surface

**4. Tilt the Bill:**
- Color-shifting ink on bottom right number ($50, $100)
- Number changes from copper to green when tilted

**5. Look for Details:**
- Fine line printing should be crisp, not blurry
- Microprinting should be readable with magnification
- Portrait should be sharp and lifelike

**If You Detect a Counterfeit:**
1. Do NOT accuse the customer directly
2. Say: "I'm sorry, this bill isn't being accepted by our system"
3. Ask for alternate payment
4. If possible, note the customer's description
5. Report to manager immediately
6. Do NOT return the suspected bill to customer
7. Complete a counterfeit incident report

**Never:**
- Accuse the customer of knowingly passing counterfeit
- Let the customer leave with the fake bill
- Accept a suspicious bill just to avoid confrontation`,
        keyPoints: [
          "Always check $50 and $100 bills with pen and visual inspection",
          "Look for security thread, watermark, and color-shifting ink",
          "If counterfeit detected, don't accuse - ask for different payment",
          "Never return suspected counterfeit bill to customer",
          "Document incident and report to manager immediately",
        ],
        completed: false,
      },
    ],
  },
  {
    id: "m12",
    title: "Inventory & Transfers",
    description: "VelaPOS transfers, receiving shipments, FIFO procedures, and physical inventory",
    estimatedTime: "45 min",
    completed: false,
    progress: 0,
    quizId: "q12",
    lessons: [
      {
        id: "m12-l1",
        title: "VelaPOS Inventory Basics",
        content: `VelaPOS is our inventory management system. Understanding it is essential for tracking products accurately.

**Accessing Inventory Functions:**
- Use your employee login (never share credentials)
- Navigate to Inventory > Stock Management
- Different access levels exist based on your role

**Key Inventory Screens:**

**Product Lookup:**
- Search by name, SKU, or barcode
- Shows current quantity on hand
- Shows quantity at other locations
- Displays product details and pricing

**Stock Adjustments:**
Use for discrepancies found during counts:
- Select product and adjustment type
- Enter quantity being adjusted
- ALWAYS include a reason code
- Requires manager approval for most adjustments

**Reason Codes:**
- DAMAGED: Product is unsellable
- SHRINK: Missing/stolen
- SAMPLE: Given as customer sample
- PROMO: Used for promotion
- COUNT: Physical count correction

**Inventory Alerts:**
VelaPOS generates alerts for:
- Low stock items (below reorder point)
- Zero quantity items still active
- High variance after counts
- Pending transfers

**Best Practices:**
- Check inventory before telling customer "we're out"
- Verify system matches shelf before making promises
- Report discrepancies immediately
- Never adjust inventory without proper authorization`,
        keyPoints: [
          "Use VelaPOS for all inventory lookups and adjustments",
          "Never share your login credentials",
          "Always use proper reason codes for adjustments",
          "Check system AND shelf before telling customers we're out",
          "Manager approval required for most stock adjustments",
        ],
        completed: false,
      },
      {
        id: "m12-l2",
        title: "Store-to-Store Transfers",
        content: `Transfers move inventory between High Life locations. Following proper procedures ensures accuracy.

**When Transfers Happen:**
- Another store needs product we have excess of
- We need product another store has
- Balancing inventory across locations
- New store setup or closeout

**Initiating a Transfer OUT (Sending):**

1. **Create Transfer in VelaPOS:**
   - Go to Inventory > Transfers > New Transfer
   - Select destination store
   - Add products and quantities
   - Save as "Pending"

2. **Pick the Products:**
   - Print the transfer list
   - Pull items from shelf/stock
   - Verify quantities match
   - Check for damage before packing

3. **Pack and Document:**
   - Pack items securely
   - Include packing slip in box
   - Seal and label boxes
   - Record number of boxes

4. **Complete in System:**
   - Mark transfer as "Shipped" in VelaPOS
   - Note carrier/driver info
   - Keep copy of documentation

**Receiving a Transfer IN:**

1. **Check Against Documentation:**
   - Count boxes received vs. expected
   - Open and verify contents
   - Note any damaged items
   - Note any quantity discrepancies

2. **Process in VelaPOS:**
   - Go to Inventory > Transfers > Pending
   - Find the transfer and click "Receive"
   - Adjust quantities if different from expected
   - Document any discrepancies

3. **Stock the Products:**
   - Price if needed
   - Put away in proper location
   - Update shelf tags if necessary

**Discrepancy Handling:**
If received quantity differs from sent:
- Document the discrepancy on the packing slip
- Note in VelaPOS when receiving
- Contact sending store to resolve
- Manager review may be required`,
        keyPoints: [
          "Always create transfers in VelaPOS before moving product",
          "Verify quantities before sending AND when receiving",
          "Document any discrepancies immediately",
          "Pack items securely to prevent damage",
          "Keep copies of all transfer documentation",
        ],
        completed: false,
      },
      {
        id: "m12-l3",
        title: "Receiving Shipments",
        content: `Properly receiving shipments ensures we have accurate inventory and can identify problems quickly.

**When a Shipment Arrives:**

1. **Initial Check:**
   - Verify the shipment is for your store
   - Count number of boxes/packages
   - Check for visible damage before signing
   - Note any damage on carrier's paperwork

2. **Sign With Notations:**
   - Sign for receipt
   - If damaged, write "RECEIVED DAMAGED" before signing
   - Note number of boxes received
   - Get driver name/signature if possible

**Processing the Shipment:**

1. **Open and Check Contents:**
   - Open all boxes in receiving area
   - Match contents to packing slip
   - Check for hidden damage
   - Separate any damaged items

2. **Enter in VelaPOS:**
   - Go to Inventory > Receiving
   - Find the PO or create manual receipt
   - Scan or enter each item
   - Adjust quantities if different from expected

3. **Handle Discrepancies:**
   - Short shipment: Note on packing slip, enter actual received
   - Over shipment: Document, contact vendor
   - Wrong items: Set aside, contact vendor
   - Damaged items: Document with photos, contact vendor

4. **Price and Stock:**
   - Verify pricing is correct in system
   - Apply price tags if needed
   - Stock shelves using FIFO method
   - Update display quantities

**Documentation to Keep:**
- Carrier delivery receipt (signed copy)
- Packing slip with notations
- Photos of any damage
- VelaPOS receiving confirmation

**Time Sensitivity:**
- Process shipments same day when possible
- Refrigerated items immediately
- High-value items into secure storage
- Report major issues within 24 hours`,
        keyPoints: [
          "Inspect boxes for damage before signing",
          "Write 'RECEIVED DAMAGED' on carrier paperwork if damaged",
          "Match all items to packing slip before entering in system",
          "Document discrepancies with photos when applicable",
          "Process shipments same day when possible",
        ],
        completed: false,
      },
      {
        id: "m12-l4",
        title: "FIFO Procedures",
        content: `FIFO (First In, First Out) ensures older inventory sells before newer inventory. This is critical for product freshness.

**Why FIFO Matters:**
- Prevents product expiration on shelf
- Ensures customers get fresh products
- Reduces waste and shrink
- Required for compliance with edibles/consumables

**Products Requiring Strict FIFO:**
- ALL edibles (gummies, chocolates, beverages)
- Kratom powder and capsules
- CBD tinctures and oils
- Any product with expiration dates

**FIFO When Stocking:**

1. **Check Dates First:**
   - Find expiration dates on new products
   - Check dates on products already on shelf
   - Identify which is older

2. **Rotate Stock:**
   - Pull existing products forward
   - Place new products in BACK
   - Older dates should always be in front
   - Double-check after stocking

3. **Shelf Organization:**
   - Front of shelf = oldest (sell first)
   - Back of shelf = newest
   - Never just put new stock on top

**During Daily Checks:**
- Walk the consumables section daily
- Check for expired products
- Pull any expired items immediately
- Document removed items for shrink

**When Restocking Display:**
- Never restock without checking dates
- Even if shelf is empty, put oldest first
- Train yourself: dates face forward when possible

**Expired Product Handling:**
1. Remove from shelf immediately
2. Document in VelaPOS as damaged/expired
3. Place in designated disposal area
4. Complete shrink paperwork
5. Never sell expired products

**Customer Questions:**
If a customer finds an expired product:
- Apologize sincerely
- Thank them for noticing
- Offer a fresh replacement
- Remove all expired items from that section`,
        keyPoints: [
          "FIFO = oldest products sell first",
          "New stock goes to BACK, old stock stays in FRONT",
          "Check dates on ALL consumables daily",
          "Never sell expired products - document and dispose",
          "Strict FIFO for edibles, kratom, and CBD products",
        ],
        completed: false,
      },
      {
        id: "m12-l5",
        title: "Physical Inventory Counts",
        content: `Physical inventory counts verify actual stock matches system records. Accuracy is essential.

**Types of Counts:**

**Cycle Counts (Ongoing):**
- Small sections counted regularly
- Usually assigned specific products/areas
- Helps catch issues before full inventory
- Less disruptive to operations

**Full Physical Inventory:**
- Complete store count
- Usually quarterly or annually
- May require closing or reduced hours
- Most comprehensive accuracy check

**Preparing for Counts:**

1. **Organize First:**
   - Straighten all products
   - Ensure items are in correct locations
   - Remove any damaged/unsellable items
   - Clear backstock area

2. **Gather Supplies:**
   - Count sheets or scanner
   - Pen (no pencil - permanent records)
   - Calculator
   - Step stool for high shelves

**Counting Best Practices:**

**Be Systematic:**
- Count left to right, top to bottom
- Count one shelf completely before moving
- Don't skip around
- Mark where you stopped if interrupted

**Be Accurate:**
- Count twice if unsure
- Touch each item as you count
- Don't estimate - count exactly
- Include damaged items in count

**Handling Discrepancies:**
- Recount before reporting variance
- Check nearby locations (misplaced items)
- Check backstock
- Document reason if known
- Report significant variances to manager

**After the Count:**
- Enter counts in VelaPOS
- Review variances with manager
- Investigate significant differences
- File count sheets per retention policy

**Common Count Errors:**
- Counting too fast
- Skipping items in back
- Miscounting by 10s (boxes vs. units)
- Not counting items in wrong location
- Double-counting during breaks`,
        keyPoints: [
          "Count systematically: left to right, top to bottom",
          "Touch each item as you count - no estimating",
          "Recount before reporting any variance",
          "Check nearby areas for misplaced items",
          "Document known reasons for discrepancies",
        ],
        completed: false,
      },
    ],
  },
  // MODULE 13: KANNA KARMA
  {
    id: "m13",
    title: "Kanna Karma: Staff Training",
    description: "Everything you need to sell Kanna with confidence - products, effects, selling techniques, and safety.",
    estimatedTime: "35 min",
    completed: false,
    progress: 0,
    quizId: "q13",
    lessons: [
      {
        id: "m13-l1",
        title: "What Is Kanna?",
        content: `Kanna, scientifically known as Sceletium tortuosum, is a succulent plant native to the Cape Region of South Africa. It has been used for thousands of years by the indigenous Khoisan people — one of the oldest cultures on Earth — as a natural tool for endurance, mood, and social connection.

**The History:**
The Khoisan are famously one of the last tribes to still practice persistence hunting — chasing prey over long distances until it exhausts itself. During these hunts, and in daily life, they would chew the roots of the Kanna plant. The products we carry are made from the pure extract of those roots.

**The Simple Pitch:**
"Kanna is a natural plant extract that's been used for thousands of years to boost mood, lower stress, and sharpen focus — without caffeine, THC, or anything synthetic. Think of it as nature's answer to feeling good and being present."

**The Effects of Kanna:**
When taken, customers can expect:
- Improved mood and sense of wellbeing
- Increased motivation and drive
- Natural energy boost — no jitters
- Reduced stress and anxiety
- Appetite and thirst suppression

**The Three Key Alkaloids:**
The effects come from three primary alkaloids in the plant. Understanding these will help you match the right product to each customer.

| Alkaloid | Effects | Compare To |
|----------|---------|------------|
| **Mesembrine** | Energizing, uplifting, euphoric, social. Boosts focus and motivation. | Sativa Cannabis |
| **Mesembrenone** | Calming, stress-relieving, mentally clear. Relaxing without causing lethargy. | Indica Cannabis |
| **Delta-7 Mesembrenone** | Balanced background alkaloid. Enhances the overall effect via the entourage effect. | Hybrid Cannabis |

The ratio of these alkaloids in a product determines the experience. Products with more Mesembrine = more energy and sociability. More Mesembrenone = more calm and stress relief.`,
        keyPoints: [
          "Kanna is a natural South African plant used for thousands of years",
          "Three key alkaloids: Mesembrine (energizing), Mesembrenone (calming), Delta-7 (balancing)",
          "Effects include mood lift, focus, energy, and stress relief",
          "Compare Mesembrine to Sativa, Mesembrenone to Indica",
          "No caffeine, no THC, all natural plant extract",
        ],
        completed: false,
      },
      {
        id: "m13-l2",
        title: "Kanna Interactions & Safety",
        content: `One of Kanna's most unique qualities is how it interacts with other substances — amplifying the positives and reducing the negatives.

**Combined With Caffeine:**
- Extends energy from 2-3 hours to 4-6 hours
- Replaces the crash with a smooth, steady comedown
- Many customers use it WITH or INSTEAD of coffee

**Combined With Alcohol:**
- Requires less alcohol to feel social and relaxed
- Reduces mental fog and hangover intensity
- Great for social situations

**Combined With Cannabis/THC:**
- Significantly reduces anxiety and paranoia
- Creates a more balanced, longer-lasting, full-body experience
- This is why our Kanna + D9 combo is so popular

⚠️ **CRITICAL SAFETY - SSRIs & Antidepressants:**

**ALWAYS ASK:** "Are you on any antidepressants, SSRIs, or medications for mental health?"

**If YES:** Tell them to check with their doctor before using ANY Kanna product.

**Why:** Kanna affects serotonin, and combining it with SSRIs, SNRIs, or MAOIs can cause serotonin syndrome — a potentially dangerous condition.

**Common SSRIs to know:**
- Prozac
- Zoloft
- Lexapro
- Wellbutrin
- Effexor
- Cymbalta

This is the MOST IMPORTANT safety point to remember. Never skip this question.`,
        keyPoints: [
          "Kanna extends caffeine energy and smooths the comedown",
          "Kanna reduces alcohol needed and lessens hangovers",
          "Kanna significantly reduces THC anxiety and paranoia",
          "ALWAYS ask about SSRIs/antidepressants before selling",
          "Kanna + SSRIs can cause serotonin syndrome - refer to doctor",
        ],
        completed: false,
      },
      {
        id: "m13-l3",
        title: "Our Three Kanna Products",
        content: `We carry three Kanna products, each suited for different customers and situations.

**PRODUCT 1: Kanna Snuff**

The most traditional form — finely ground botanical powder taken nasally in small pinches.

| Detail | Info |
|--------|------|
| How to Use | Tap a small pinch (size of a match head) onto the back of hand, inhale gently from each nostril |
| Onset | Fast — 5-15 minutes |
| Duration | 45-90 minutes |
| Intensity | Focused and clear |
| Best For | First-timers wanting immediate feedback, cannabis users curious about Kanna, daytime use |

**Snuff Selling Tip:**
"If you've never tried Kanna before, snuff is actually one of the best ways to start — you feel it fast, and since you control the dose pinch by pinch, it's easy to find your sweet spot."

---

**PRODUCT 2: Kanna Gummies (1.5-5mg)**

Our flagship non-THC product — a dietary supplement legal in all states except Louisiana.

| Detail | Info |
|--------|------|
| Dose | Start with half a gummy for new users. 1 full gummy for regular users |
| Onset | 45-90 minutes (digestion) |
| Duration | 3-5 hours of smooth, sustained effects |
| Feel | Uplifted mood, calm focus, reduced stress |
| Legal Status | Federally compliant. No THC. Legal everywhere except Louisiana |
| Best For | Daily wellness users, customers avoiding THC, long-lasting mood support |

**Gummy Selling Tip:**
"These are our most popular everyday product. A lot of customers use one gummy in the morning instead of — or alongside — their coffee. You get mood, focus, and energy without the anxiety that caffeine alone can cause."

---

**PRODUCT 3: Kanna + Delta 9 THC Gummies**

Our premium combination — 1.5-5mg Kanna + 10mg Delta 9 THC. Nothing else like it on the market.

| Detail | Info |
|--------|------|
| Dose | Start with half for new/casual users. Full gummy for experienced |
| Onset | 60-90 minutes |
| Duration | 4-6 hours (Kanna extends the THC) |
| The Difference | Kanna reduces THC anxiety/paranoia dramatically. More balanced, social, euphoric. Appetite suppression counteracts munchies |
| Legal Status | Hemp-derived D9 under 2018 Farm Bill. Legal in NC |
| Best For | Cannabis users who get anxious, social situations, people wanting a cleaner high |

**D9 Combo Selling Tip:**
"If you've ever gotten too anxious or paranoid from edibles, this is the product for you. The Kanna smooths out that edge completely. A lot of customers who gave up on THC have come back to it through this product."`,
        keyPoints: [
          "Snuff: Fastest onset (5-15 min), shortest duration (45-90 min), best for first-timers",
          "Gummies: Slower onset (45-90 min), longer duration (3-5 hrs), daily wellness",
          "Kanna + D9: Premium combo, reduces THC anxiety, 4-6 hour duration",
          "Always start new users with half dose for gummies",
          "Snuff is best for immediate feedback, gummies for sustained effects",
        ],
        completed: false,
      },
      {
        id: "m13-l4",
        title: "Selling Techniques",
        content: `Kanna is an easy sell when you understand it. Most customers have never heard of it — you're introducing something genuinely new.

**Step 1: Qualify the Customer**

| Customer Type | What They Want | Lead With... |
|---------------|----------------|--------------|
| Cannabis user | Better THC experience, less anxiety | Kanna + D9 Gummy |
| Health/wellness | Mood support, stress relief, natural | Kanna Gummies |
| Stimulant user | Energy without jitters | Kanna Snuff or Gummies |
| Curious/never tried | Something new, low-risk intro | Kanna Snuff |
| Social/nightlife | Confidence, energy, alcohol alternative | Kanna + D9 or Gummies |
| Stress/anxiety | Calm without being sedated | Kanna Gummies |

**Step 2: Use Relatable Comparisons**

- "Think of Mesembrine like a Sativa strain, and Mesembrenone like an Indica — same plant, different effects based on the ratio."
- "It's like coffee for your mood — you get a lift, but smooth and clean."
- "It's the closest thing to feeling good naturally without THC."
- "If you've heard of kratom but want something cleaner and more wellness-focused, Kanna is where people are landing."

**Step 3: Product Recommendations by Scenario**

**Scenario A — Cannabis user wanting better edible experience:**
Lead with Kanna + D9. Emphasize reduced anxiety, longer duration, no munchies.
"This is our best-seller for cannabis users. It's a cleaner, more balanced experience."

**Scenario B — Natural mood booster, no THC:**
Lead with Kanna Gummies. Emphasize daily use, sustained effects, no intoxication.
"These work great as a daily supplement. Mood, focus, stress relief — won't show on a drug test."

**Scenario C — Completely new, wants to try first:**
Start with Kanna Snuff. Fastest feedback, smallest commitment, controllable dose.
"Try the snuff first — you'll feel it within 15 minutes and can gauge if you like it."

**Scenario D — Drinks but wants to cut back:**
Kanna Gummies or D9 Combo. Emphasize the alcohol replacement angle.
"A lot of customers use this at social events instead of drinking. Same relaxed feeling, fraction of the side effects."`,
        keyPoints: [
          "Qualify first: what are they looking for?",
          "Cannabis users → Kanna + D9 combo",
          "Wellness/no THC → Kanna Gummies",
          "First-timers → Snuff for quick feedback",
          "Use cannabis comparisons: Mesembrine = Sativa, Mesembrenone = Indica",
        ],
        completed: false,
      },
      {
        id: "m13-l5",
        title: "Handling Objections & Quick Reference",
        content: `**Common Objections and Responses:**

**"I've never heard of it — is it safe?"**
"It's been used for thousands of years by indigenous tribes in South Africa — it's not new, just new to the US market. It's a natural plant extract and dietary supplement. As long as you're not on antidepressants, it's well-tolerated by most people."

**"Will it get me high?"**
"Not in the traditional sense — it's not psychedelic or intoxicating like THC. Most people describe it as a mood lift and sense of clarity. You feel good and motivated, but still clear-headed and in control. The Kanna + D9 gummy is different if they want that experience."

**"I tried edibles once and got way too anxious."**
"That's exactly why our combo gummy exists. Kanna is shown to reduce anxiety — including THC-induced anxiety. A lot of people who had bad experiences have had a totally different experience with this product. Start with half though."

**"How is this different from CBD?"**
"CBD is more passive — it takes the edge off but doesn't give you anything. Kanna is more active. You'll actually feel your mood lift, energy come up, stress fade. More noticeable effect at the same dose."

**"How fast does it work?"**
"Snuff works fast — usually 10-15 minutes. Gummies take 45-90 minutes because they go through digestion. If you want to feel it same day, snuff is the best intro."

---

**QUICK REFERENCE - Product Comparison:**

| | Kanna Snuff | Kanna Gummy | Kanna + D9 |
|--|-------------|-------------|------------|
| Onset | 5-15 min | 45-90 min | 60-90 min |
| Duration | 45-90 min | 3-5 hours | 4-6 hours |
| Contains THC? | No | No | Yes (10mg) |
| Best For | First-timers | Daily wellness | Cannabis users |
| Starter Dose | 1 small pinch/nostril | Half gummy | Half gummy |

---

**THE ONE SAFETY RULE:**

Always ask: "Are you on any antidepressants, SSRIs, or medications for mental health?"

If yes → tell them to check with their doctor. Kanna affects serotonin.

**One-Line Product Pitches:**
- **Snuff:** "Fast-acting mood lift — feel it in 15 minutes, no THC, no crash."
- **Gummies:** "Daily wellness in a gummy — mood, focus, stress relief that lasts all day."
- **Kanna + D9:** "The best THC edible you've never tried — same euphoria, way less anxiety."`,
        keyPoints: [
          "Always address the SSRI question — it's the most important safety point",
          "Snuff: 5-15 min onset, 45-90 min duration, no THC",
          "Gummies: 45-90 min onset, 3-5 hours, no THC",
          "Kanna + D9: 60-90 min onset, 4-6 hours, 10mg THC",
          "Memorize the one-line pitches for each product",
        ],
        completed: false,
      },
    ],
  },
]

export const mockQuizzes: Quiz[] = [
  {
    id: "q1",
    title: "Delta 101 Quiz",
    moduleId: "m1",
    passingScore: 70,
    questions: [
      {
        id: "q1-1",
        text: "What does 'delta' refer to in delta products?",
        options: [
          "The brand name of the products",
          "The position of a chemical bond in the molecule",
          "The country of origin",
          "The potency level",
        ],
        correctAnswer: 1,
      },
      {
        id: "q1-2",
        text: "Which delta type is known for producing milder effects than Delta-9?",
        options: ["Delta-10", "HHC", "Delta-8", "THCA"],
        correctAnswer: 2,
      },
      {
        id: "q1-3",
        text: "How long can edibles take to reach full effect?",
        options: ["5-10 minutes", "15-20 minutes", "30 minutes to 2 hours", "4-6 hours"],
        correctAnswer: 2,
      },
      {
        id: "q1-4",
        text: "What should you recommend to a first-time delta customer?",
        options: [
          "High-potency concentrates",
          "Delta-8 gummies at a low dose",
          "Multiple products to try at once",
          "Whatever is most expensive",
        ],
        correctAnswer: 1,
      },
      {
        id: "q1-5",
        text: "Which delivery method provides the fastest onset?",
        options: ["Edibles", "Tinctures", "Vape cartridges", "Capsules"],
        correctAnswer: 2,
      },
      {
        id: "q1-6",
        text: "Under the 2018 Farm Bill, what is the maximum Delta-9 THC content?",
        options: ["0.1% by dry weight", "0.3% by dry weight", "1% by dry weight", "3% by dry weight"],
        correctAnswer: 1,
      },
      {
        id: "q1-7",
        text: "Which delta type is typically described as more energizing?",
        options: ["Delta-8", "Delta-9", "Delta-10", "HHC"],
        correctAnswer: 2,
      },
      {
        id: "q1-8",
        text: "How long do effects from vaping typically last?",
        options: ["15-30 minutes", "1-3 hours", "4-8 hours", "12+ hours"],
        correctAnswer: 1,
      },
      {
        id: "q1-9",
        text: "What's the key advice for edible dosing?",
        options: [
          "Take the full package for best effects",
          "Start low, go slow",
          "Take more if you don't feel it in 15 minutes",
          "Higher dose is always better",
        ],
        correctAnswer: 1,
      },
      {
        id: "q1-10",
        text: "Who should concentrates be recommended to?",
        options: [
          "First-time customers",
          "Anyone looking for value",
          "Experienced users with high tolerance only",
          "Customers who want milder effects",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "q2",
    title: "Kratom Basics Quiz",
    moduleId: "m2",
    passingScore: 70,
    questions: [
      {
        id: "q2-1",
        text: "Where does kratom originate from?",
        options: ["South America", "Southeast Asia", "North Africa", "Europe"],
        correctAnswer: 1,
      },
      {
        id: "q2-2",
        text: "Which vein color is typically most relaxing/sedating?",
        options: ["White vein", "Green vein", "Red vein", "Yellow vein"],
        correctAnswer: 2,
      },
      {
        id: "q2-3",
        text: "What is the recommended starting dose for kratom beginners?",
        options: ["5-6 grams", "1-2 grams", "8-10 grams", "4-5 grams"],
        correctAnswer: 1,
      },
      {
        id: "q2-4",
        text: "Which vein color is known for being most energizing?",
        options: ["Red vein", "White vein", "Gold vein", "Brown vein"],
        correctAnswer: 1,
      },
      {
        id: "q2-5",
        text: "What does 'Maeng Da' generally indicate about a strain?",
        options: [
          "It's the mildest option",
          "It's typically the strongest of that vein color",
          "It's from a specific region",
          "It's synthetic",
        ],
        correctAnswer: 1,
      },
      {
        id: "q2-6",
        text: "Is kratom FDA approved for medical use?",
        options: ["Yes, fully approved", "Yes, for pain only", "No, it is not FDA approved", "Only in certain states"],
        correctAnswer: 2,
      },
      {
        id: "q2-7",
        text: "What advantage do capsules have over powder?",
        options: ["Faster onset", "Lower price", "No bitter taste and convenient dosing", "Stronger effects"],
        correctAnswer: 2,
      },
      {
        id: "q2-8",
        text: "At lower doses, kratom tends to produce what type of effects?",
        options: ["Sedating", "Stimulating", "No effects", "Hallucinogenic"],
        correctAnswer: 1,
      },
      {
        id: "q2-9",
        text: "If a customer asks if kratom will treat their medical condition, you should:",
        options: [
          "Recommend the strongest strain",
          "Explain you cannot make medical claims and refer them to a doctor",
          "Tell them it definitely will help",
          "Refuse to sell them anything",
        ],
        correctAnswer: 1,
      },
      {
        id: "q2-10",
        text: "Which kratom form should only be recommended to experienced users?",
        options: ["Capsules", "Powder", "Extracts", "Crushed leaf"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "q3",
    title: "Customer Service Quiz",
    moduleId: "m3",
    passingScore: 70,
    questions: [
      {
        id: "q3-1",
        text: "How quickly should you acknowledge a customer entering the store?",
        options: ["Within 30 seconds", "Within 10 seconds", "Within 2 minutes", "Only when they approach you"],
        correctAnswer: 1,
      },
      {
        id: "q3-2",
        text: "What does the 'H' in the HEAT method for handling complaints stand for?",
        options: ["Help them", "Hear them out", "Handle it quickly", "Hope for the best"],
        correctAnswer: 1,
      },
      {
        id: "q3-3",
        text: "What type of questions invite customers to explain their needs?",
        options: ["Yes/no questions", "Leading questions", "Open-ended questions", "Rhetorical questions"],
        correctAnswer: 2,
      },
      {
        id: "q3-4",
        text: "According to research, what happens when a complaint is resolved well?",
        options: [
          "Customer never returns",
          "Customer becomes MORE loyal than if no problem occurred",
          "Customer is neutral",
          "Customer always demands refunds",
        ],
        correctAnswer: 1,
      },
      {
        id: "q3-5",
        text: "What is the 'E' in the LISTEN framework?",
        options: ["Evaluate", "Exit", "Echo back what you heard", "Explain products"],
        correctAnswer: 2,
      },
      {
        id: "q3-6",
        text: "When handling an aggressive customer, you should:",
        options: [
          "Match their energy",
          "Argue your point",
          "Stay calm and involve management if needed",
          "Ignore them",
        ],
        correctAnswer: 2,
      },
      {
        id: "q3-7",
        text: "Which visit is most crucial for creating a regular customer?",
        options: ["First visit", "Second visit", "Third visit", "Fifth visit"],
        correctAnswer: 1,
      },
      {
        id: "q3-8",
        text: "A weekly customer spending $30 represents how much annual value?",
        options: ["$500", "$1,000", "$1,500+", "$3,000"],
        correctAnswer: 2,
      },
      {
        id: "q3-9",
        text: "What should you avoid when listening to customers?",
        options: [
          "Making eye contact",
          "Finishing their sentences for them",
          "Taking mental notes",
          "Asking follow-up questions",
        ],
        correctAnswer: 1,
      },
      {
        id: "q3-10",
        text: "When should you use a customer's name?",
        options: [
          "Never, it's too personal",
          "Only at checkout",
          "Naturally throughout conversation, not excessively",
          "Only if they're a regular",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "q4",
    title: "Compliance Quiz",
    moduleId: "m4",
    passingScore: 80,
    questions: [
      {
        id: "q4-1",
        text: "Under the 2018 Farm Bill, what is the maximum Delta-9 THC content allowed?",
        options: ["0.1% by dry weight", "0.3% by dry weight", "0.5% by dry weight", "1% by dry weight"],
        correctAnswer: 1,
      },
      {
        id: "q4-2",
        text: "Which of these is NOT an acceptable form of ID?",
        options: ["State driver's license", "U.S. passport", "Photo of ID on customer's phone", "Military ID"],
        correctAnswer: 2,
      },
      {
        id: "q4-3",
        text: "Even if someone looks clearly over 21, you should:",
        options: [
          "Skip the ID check to save time",
          "ID them anyway - every customer, every time",
          "Only ID if a manager is watching",
          "Ask their age verbally instead",
        ],
        correctAnswer: 1,
      },
      {
        id: "q4-4",
        text: "If you suspect an ID is fake, you should:",
        options: [
          "Accuse the customer directly",
          "Call the police immediately",
          "Calmly return the ID, decline the sale, and document after they leave",
          "Accept it to avoid confrontation",
        ],
        correctAnswer: 2,
      },
      {
        id: "q4-5",
        text: "Which of these claims can you NEVER make about products?",
        options: [
          "This contains 25mg of Delta-8",
          "This will cure your anxiety",
          "Customers report feeling relaxed",
          "This strain is popular for evening use",
        ],
        correctAnswer: 1,
      },
      {
        id: "q4-6",
        text: "Expired IDs are:",
        options: [
          "Acceptable within 30 days of expiration",
          "Acceptable if the photo still matches",
          "Never acceptable",
          "Acceptable if the manager approves",
        ],
        correctAnswer: 2,
      },
      {
        id: "q4-7",
        text: "When a customer asks if a product will help their medical condition, you should:",
        options: [
          "Recommend your strongest product",
          "Say you cannot make medical claims and suggest they consult their doctor",
          "Tell them it definitely will help",
          "Look it up on your phone",
        ],
        correctAnswer: 1,
      },
      {
        id: "q4-8",
        text: "What is a 'third-party purchase' red flag?",
        options: [
          "Customer pays with credit card",
          "Customer mentions their friend is waiting outside for the product",
          "Customer asks about effects",
          "Customer wants a receipt",
        ],
        correctAnswer: 1,
      },
      {
        id: "q4-9",
        text: "Consequences of non-compliance can include:",
        options: [
          "Personal fines only",
          "Personal fines, criminal charges, loss of store license, and job loss",
          "Just a warning",
          "Lower sales commission",
        ],
        correctAnswer: 1,
      },
      {
        id: "q4-10",
        text: "When refusing a sale, you should:",
        options: [
          "Apologize excessively",
          "Debate with the customer",
          "Be firm but polite, and blame policy/law rather than personal judgment",
          "Never refuse any sale",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "q5",
    title: "Glass Knowledge Quiz",
    moduleId: "m5",
    passingScore: 70,
    questions: [
      {
        id: "q5-1",
        text: "Which type of glass is considered the gold standard for quality?",
        options: ["Soft glass", "Borosilicate glass", "Silicone", "Crystal"],
        correctAnswer: 1,
      },
      {
        id: "q5-2",
        text: "What is the main benefit of borosilicate glass?",
        options: ["Cheapest option", "Most colorful", "Heat-resistant and durable", "Lightest weight"],
        correctAnswer: 2,
      },
      {
        id: "q5-3",
        text: "Which pipe style is best for beginners?",
        options: ["Recycler", "Steamroller", "Beaker water pipe", "Concentrate rig"],
        correctAnswer: 2,
      },
      {
        id: "q5-4",
        text: "What do percolators do?",
        options: [
          "Heat the product",
          "Filter smoke through water for smoothness",
          "Change the color of glass",
          "Nothing functional, just decorative",
        ],
        correctAnswer: 1,
      },
      {
        id: "q5-5",
        text: "What is 'heady glass'?",
        options: [
          "Mass-produced glass from China",
          "Unique, artist-made functional art pieces",
          "Cheap beginner pieces",
          "Glass made from recycled materials",
        ],
        correctAnswer: 1,
      },
      {
        id: "q5-6",
        text: "What should you NEVER use to clean glass?",
        options: ["91% isopropyl alcohol", "Coarse salt", "Boiling water", "Pipe cleaners"],
        correctAnswer: 2,
      },
      {
        id: "q5-7",
        text: "What minimum strength isopropyl alcohol is recommended for cleaning?",
        options: ["50%", "70%", "91% or higher", "100%"],
        correctAnswer: 2,
      },
      {
        id: "q5-8",
        text: "Which technique creates color-changing effects in glass?",
        options: ["Sandblasting", "Fuming", "Recycling", "Molding"],
        correctAnswer: 1,
      },
      {
        id: "q5-9",
        text: "What indicates quality when examining glass?",
        options: [
          "Thin, lightweight construction",
          "Lots of bubbles in the glass",
          "Even thickness, weight, and smooth welds",
          "Uneven coloring",
        ],
        correctAnswer: 2,
      },
      {
        id: "q5-10",
        text: "How often should regular glass cleaning be done?",
        options: [
          "Once a month",
          "Daily rinse, weekly deep clean",
          "Only when visibly dirty",
          "Never, it develops character",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "q6",
    title: "Sales Techniques Quiz",
    moduleId: "m6",
    passingScore: 70,
    questions: [
      {
        id: "q6-1",
        text: "What are the five stages of a sale in order?",
        options: [
          "Close, Present, Discover, Approach, Object",
          "Approach, Discovery, Presentation, Objections, Close",
          "Present, Close, Discover, Approach, Follow-up",
          "Discover, Approach, Object, Present, Close",
        ],
        correctAnswer: 1,
      },
      {
        id: "q6-2",
        text: "What does SPIN stand for in consultative selling?",
        options: [
          "Sell, Present, Inform, Negotiate",
          "Situation, Problem, Implication, Need-Payoff",
          "Start, Process, Implement, Notify",
          "Service, Price, Interest, Need",
        ],
        correctAnswer: 1,
      },
      {
        id: "q6-3",
        text: "What is the first step in the LAER objection handling framework?",
        options: ["Acknowledge", "Listen Fully", "Explore", "Respond"],
        correctAnswer: 1,
      },
      {
        id: "q6-4",
        text: "What's the difference between upselling and cross-selling?",
        options: [
          "They're the same thing",
          "Upselling = better version, Cross-selling = complementary products",
          "Upselling = more quantity, Cross-selling = different colors",
          "Cross-selling = better version, Upselling = complementary products",
        ],
        correctAnswer: 1,
      },
      {
        id: "q6-5",
        text: "When should you stop attempting to upsell?",
        options: [
          "Never, always push harder",
          "When customer mentions budget concerns or shows annoyance",
          "After making one suggestion",
          "Only at checkout",
        ],
        correctAnswer: 1,
      },
      {
        id: "q6-6",
        text: "What is the most important stage in the sales process?",
        options: ["The close", "The presentation", "Discovery", "The approach"],
        correctAnswer: 2,
      },
      {
        id: "q6-7",
        text: "When a customer says 'It's too expensive,' you should first:",
        options: [
          "Lower the price immediately",
          "Ask 'Compared to what?' to explore the objection",
          "Show them the cheapest option",
          "Explain why they're wrong",
        ],
        correctAnswer: 1,
      },
      {
        id: "q6-8",
        text: "The golden rule of upselling/cross-selling is:",
        options: [
          "Always suggest the most expensive option",
          "Only upsell when it genuinely benefits the customer",
          "Never cross-sell, only upsell",
          "Push until they say yes",
        ],
        correctAnswer: 1,
      },
      {
        id: "q6-9",
        text: "What does consultative selling focus on?",
        options: [
          "Closing sales as fast as possible",
          "Being a trusted advisor who helps customers make the best decision for them",
          "Pushing the highest-margin products",
          "Minimizing customer questions",
        ],
        correctAnswer: 1,
      },
      {
        id: "q6-10",
        text: "Objections should be viewed as:",
        options: [
          "Rejections to accept",
          "Reasons to end the conversation",
          "Requests for more information",
          "Signs the customer will never buy",
        ],
        correctAnswer: 2,
      },
    ],
  },

  // QUIZ 7: DAY 1 ESSENTIALS
  {
    id: "q7",
    title: "Day 1 Essentials Quiz",
    moduleId: "m7",
    passingScore: 80,
    questions: [
      {
        id: "q7-1",
        text: "How early can you clock in before your scheduled shift?",
        options: ["15 minutes", "10 minutes", "5 minutes", "Any time you arrive"],
        correctAnswer: 2,
      },
      {
        id: "q7-2",
        text: "For shifts 6 hours or longer, what type of break do you receive?",
        options: [
          "15-minute paid break",
          "30-minute paid break",
          "30-minute unpaid break",
          "Two 15-minute paid breaks",
        ],
        correctAnswer: 2,
      },
      {
        id: "q7-3",
        text: "What is the policy regarding bags brought into the store?",
        options: [
          "Any bag is allowed",
          "Only small bags are allowed",
          "All bags must be clear/transparent",
          "No bags are allowed",
        ],
        correctAnswer: 2,
      },
      {
        id: "q7-4",
        text: "Who can be a key holder at High Life?",
        options: [
          "Any employee after 90 days",
          "Only Store Managers and Assistant Managers",
          "Senior sales associates",
          "Anyone the manager trusts",
        ],
        correctAnswer: 1,
      },
      {
        id: "q7-5",
        text: "How long do you have to disarm the alarm after entering the store?",
        options: ["30 seconds", "45 seconds", "60 seconds", "90 seconds"],
        correctAnswer: 1,
      },
      {
        id: "q7-6",
        text: "What should you do if you forget to clock in or out?",
        options: [
          "Wait until your next shift to report it",
          "Adjust your time card yourself",
          "Notify your manager immediately",
          "Ask a coworker to clock you in",
        ],
        correctAnswer: 2,
      },
      {
        id: "q7-7",
        text: "Where is the panic button located?",
        options: ["In the office", "Near the front door", "Under each register", "In the break room"],
        correctAnswer: 2,
      },
      {
        id: "q7-8",
        text: "What should you do if you lose your store keys?",
        options: [
          "Report it at the end of the week",
          "Get a copy made immediately",
          "Report it to your District Manager immediately",
          "Search for a few days before reporting",
        ],
        correctAnswer: 2,
      },
      {
        id: "q7-9",
        text: "Which of the following is acceptable attire?",
        options: [
          "Black company shirt with ripped jeans",
          "Black company shirt with black pants and sandals",
          "Black company shirt with black pants and closed-toe shoes",
          "Personal black shirt with black pants",
        ],
        correctAnswer: 2,
      },
      {
        id: "q7-10",
        text: "What should you NEVER do with your alarm code?",
        options: ["Memorize it", "Use it daily", "Share it with anyone", "Change it annually"],
        correctAnswer: 2,
      },
    ],
  },

  // QUIZ 8: STORE OPERATIONS
  {
    id: "q8",
    title: "Store Operations Quiz",
    moduleId: "m8",
    passingScore: 80,
    questions: [
      {
        id: "q8-1",
        text: "How much money should each register drawer contain at opening?",
        options: ["$100", "$150", "$200", "$250"],
        correctAnswer: 2,
      },
      {
        id: "q8-2",
        text: "How early should you arrive before the store opens?",
        options: ["5-10 minutes", "15-30 minutes", "30-45 minutes", "Exactly at opening time"],
        correctAnswer: 1,
      },
      {
        id: "q8-3",
        text: "When should you check customer IDs?",
        options: [
          "Only if they look young",
          "Only for delta products",
          "Every customer, every time",
          "Only when the manager is watching",
        ],
        correctAnswer: 2,
      },
      {
        id: "q8-4",
        text: "What does ENR stand for?",
        options: ["End of Night Record", "End of Night Report", "Evening Nightly Review", "End Notification Report"],
        correctAnswer: 1,
      },
      {
        id: "q8-5",
        text: "What should you do if your register count doesn't match the POS report?",
        options: [
          "Adjust the numbers to match",
          "Add money from your pocket",
          "Report the discrepancy honestly",
          "Ignore small differences",
        ],
        correctAnswer: 2,
      },
      {
        id: "q8-6",
        text: "How much petty cash is available at each register?",
        options: ["$50", "$75", "$100", "$150"],
        correctAnswer: 2,
      },
      {
        id: "q8-7",
        text: "What is required for every petty cash expense?",
        options: ["Manager's signature only", "A receipt", "Corporate approval", "Nothing for small amounts"],
        correctAnswer: 1,
      },
      {
        id: "q8-8",
        text: "On which days are bank runs typically completed?",
        options: ["Monday and Friday", "Tuesday and Thursday", "Monday, Wednesday, and Friday", "Every day"],
        correctAnswer: 2,
      },
      {
        id: "q8-9",
        text: "What should you do during a bank run?",
        options: [
          "Stop for coffee on the way",
          "Make the deposit bag visible for safety",
          "Go directly to the bank with no stops",
          "Count the money in your car at the bank",
        ],
        correctAnswer: 2,
      },
      {
        id: "q8-10",
        text: "What should you do before signing for your opening drawer?",
        options: [
          "Trust the previous closer's count",
          "Count and verify the amount yourself",
          "Sign first, count later",
          "Ask a coworker to count it",
        ],
        correctAnswer: 1,
      },
    ],
  },
  // QUIZ 9: POLICIES & CONDUCT
  {
    id: "q9",
    title: "Policies & Conduct Quiz",
    moduleId: "m9",
    passingScore: 80,
    questions: [
      {
        id: "q9-1",
        text: "Which of the following substances is prohibited from use during work hours?",
        options: ["CBD", "Delta products", "Alcohol", "All of the above"],
        correctAnswer: 3,
      },
      {
        id: "q9-2",
        text: "What is the policy on personal phones during shifts?",
        options: [
          "Keep in locker or clear bag, emergency calls only",
          "Allowed on sales floor for texting",
          "Allowed for personal calls at any time",
          "Must be used to play music",
        ],
        correctAnswer: 0,
      },
      {
        id: "q9-3",
        text: "What is considered a 'no-call/no-show' offense?",
        options: [
          "Calling in sick 1 hour before shift",
          "Arriving 10 minutes late",
          "Not showing up for a scheduled shift without calling",
          "Leaving early without permission",
        ],
        correctAnswer: 2,
      },
      {
        id: "q9-4",
        text: "What is required for all personal bags brought to work?",
        options: ["Must be black", "Must be a backpack", "Must be clear/transparent", "No bags allowed"],
        correctAnswer: 2,
      },
      {
        id: "q9-5",
        text: "What is the policy on discussing work issues on social media?",
        options: [
          "Allowed if it's positive",
          "Never allowed",
          "Allowed if done privately",
          "Allowed if you don't name specific people",
        ],
        correctAnswer: 1,
      },
      {
        id: "q9-6",
        text: "What is the consequence of a third 'no-call/no-show' offense?",
        options: ["Written warning", "Final warning", "Termination", "Suspension"],
        correctAnswer: 2,
      },
      {
        id: "q9-7",
        text: "What is the minimum age to use nicotine/tobacco products?",
        options: ["18", "21", "25", "No age limit"],
        correctAnswer: 1,
      },
      {
        id: "q9-8",
        text: "What should you do if you witness a violation of the code of conduct?",
        options: ["Ignore it", "Report it to your manager or HR", "Discuss it with coworkers", "Address it yourself"],
        correctAnswer: 1,
      },
      {
        id: "q9-9",
        text: "How much advance notice is needed for schedule change requests?",
        options: ["1 week", "2 weeks", "3 days", "Same day"],
        correctAnswer: 1,
      },
      {
        id: "q9-10",
        text: "What is High Life's stance on drug testing?",
        options: [
          "Only if an accident occurs",
          "Randomly, or for reasonable suspicion",
          "Never",
          "Only at the time of hiring",
        ],
        correctAnswer: 1,
      },
    ],
  },
  // QUIZ 10: COMPLIANCE & LEGAL
  {
    id: "q10",
    title: "Compliance & Legal Quiz",
    moduleId: "m10",
    passingScore: 80,
    questions: [
      {
        id: "q10-1",
        text: "Which ID is NOT acceptable?",
        options: ["US Passport", "Expired Driver's License", "State ID Card", "Military ID"],
        correctAnswer: 1,
      },
      {
        id: "q10-2",
        text: "What should you say instead of 'bong'?",
        options: ["Water pipe", "Hit machine", "Smoke device", "Glass"],
        correctAnswer: 0,
      },
      {
        id: "q10-3",
        text: "Which of these product combinations is prohibited in a single transaction?",
        options: ["Grinder + rolling papers", "Water pipe + tobacco", "Torch + glass", "CBD tincture + water pipe"],
        correctAnswer: 2,
      },
      {
        id: "q10-4",
        text: "If a reporter approaches, what should you do?",
        options: [
          "Answer their questions politely",
          "Direct them to the corporate office and notify your manager",
          "Give your name and title",
          "Allow filming inside the store",
        ],
        correctAnswer: 1,
      },
      {
        id: "q10-5",
        text: "What is an example of a medical claim you should NEVER make?",
        options: [
          "Customers report feeling relaxed",
          "This product is popular for relaxation",
          "This will cure your anxiety",
          "Effects vary person to person",
        ],
        correctAnswer: 2,
      },
      {
        id: "q10-6",
        text: "What is the minimum age requirement for all purchases?",
        options: ["18", "21", "Dependent on product", "25"],
        correctAnswer: 1,
      },
      {
        id: "q10-7",
        text: "What should you say instead of 'weed' or 'marijuana'?",
        options: ["Legal herbs", "Cannabis", "Dry herbs", "Both A and C"],
        correctAnswer: 3,
      },
      {
        id: "q10-8",
        text: "How should prohibited product combinations be handled?",
        options: [
          "Ring them up as one transaction",
          "Refuse the sale entirely",
          "Complete two separate transactions",
          "Ask the customer to choose one",
        ],
        correctAnswer: 2,
      },
      {
        id: "q10-9",
        text: "What is the policy on photos/videos inside the store?",
        options: [
          "Allowed for personal use only",
          "Never allowed",
          "Allowed with manager permission",
          "Allowed if no customers are present",
        ],
        correctAnswer: 1,
      },
      {
        id: "q10-10",
        text: "When discussing product effects, what phrasing is safest?",
        options: [
          "This will definitely do X",
          "Customers commonly report Y",
          "This is guaranteed to Z",
          "It's just like real marijuana",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "q11",
    title: "Money Handling & Banking Quiz",
    moduleId: "m11",
    passingScore: 80,
    questions: [
      {
        id: "q11-1",
        text: "What is the standard starting amount for a register drawer?",
        options: ["$100", "$150", "$200", "$250"],
        correctAnswer: 2,
      },
      {
        id: "q11-2",
        text: "When should you perform a cash drop?",
        options: [
          "When the drawer reaches $150",
          "When the drawer exceeds $300",
          "At the end of every shift",
          "Only if the manager asks",
        ],
        correctAnswer: 1,
      },
      {
        id: "q11-3",
        text: "What should you do if you suspect a bill is counterfeit?",
        options: [
          "Accept it to avoid confrontation",
          "Accuse the customer directly",
          "Ask for alternate payment without accusing, report to manager",
          "Return the bill and refuse all service",
        ],
        correctAnswer: 2,
      },
      {
        id: "q11-4",
        text: "What is NOT a valid use for petty cash?",
        options: [
          "Emergency cleaning supplies",
          "Minor equipment repair",
          "Personal lunch purchase",
          "Shipping supplies",
        ],
        correctAnswer: 2,
      },
      {
        id: "q11-5",
        text: "What does ENR stand for?",
        options: [
          "Electronic Network Rejection",
          "Error Notification Received",
          "End of Night Report",
          "Entry Number Required",
        ],
        correctAnswer: 2,
      },
      {
        id: "q11-6",
        text: "During a bank run, what is the primary safety rule?",
        options: [
          "Go directly to the bank - no stops",
          "Always go alone for security",
          "Make the deposit bag visible",
          "Use the same route every time",
        ],
        correctAnswer: 0,
      },
      {
        id: "q11-7",
        text: "What is required for every petty cash expense?",
        options: [
          "Verbal manager approval only",
          "Original receipt and completed voucher with manager signature",
          "Text message to manager",
          "Nothing for expenses under $20",
        ],
        correctAnswer: 1,
      },
      {
        id: "q11-8",
        text: "If your register count shows a $5 shortage, you should:",
        options: [
          "Cover it from your own pocket",
          "Ignore it if it's small",
          "Document it honestly on the ENR and report to manager",
          "Adjust the VelaPOS numbers to match",
        ],
        correctAnswer: 2,
      },
      {
        id: "q11-9",
        text: "Which bills should ALWAYS be checked for counterfeits?",
        options: ["$5 and $10", "$10 and $20", "$50 and $100", "Only $100"],
        correctAnswer: 2,
      },
      {
        id: "q11-10",
        text: "If you are followed during a bank run, you should:",
        options: [
          "Continue to the bank and make the deposit quickly",
          "Drive to a police station instead of the bank",
          "Stop and confront the follower",
          "Speed up to lose them",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "q12",
    title: "Inventory & Transfers Quiz",
    moduleId: "m12",
    passingScore: 80,
    questions: [
      {
        id: "q12-1",
        text: "What does FIFO stand for?",
        options: [
          "File In, File Out",
          "First In, First Out",
          "Final Inventory for Orders",
          "Finished Items For Output",
        ],
        correctAnswer: 1,
      },
      {
        id: "q12-2",
        text: "When stocking shelves using FIFO, new products should go:",
        options: [
          "In the front, oldest in back",
          "In the back, oldest in front",
          "Wherever there's space",
          "On top of existing products",
        ],
        correctAnswer: 1,
      },
      {
        id: "q12-3",
        text: "If a shipment arrives with visible damage, you should:",
        options: [
          "Refuse the entire shipment",
          "Sign normally and deal with it later",
          "Write 'RECEIVED DAMAGED' on carrier paperwork before signing",
          "Call the vendor before accepting",
        ],
        correctAnswer: 2,
      },
      {
        id: "q12-4",
        text: "When receiving a transfer from another store, discrepancies should be:",
        options: [
          "Ignored if small",
          "Documented and noted in VelaPOS when receiving",
          "Fixed by adjusting your inventory silently",
          "Reported only if over $100 difference",
        ],
        correctAnswer: 1,
      },
      {
        id: "q12-5",
        text: "What products require STRICT FIFO rotation?",
        options: [
          "Glass products only",
          "All edibles, kratom, and CBD products",
          "Only refrigerated items",
          "Accessories and grinders",
        ],
        correctAnswer: 1,
      },
      {
        id: "q12-6",
        text: "During a physical count, the best approach is:",
        options: [
          "Estimate counts for speed",
          "Count random sections",
          "Count systematically - left to right, top to bottom",
          "Count only items that look low",
        ],
        correctAnswer: 2,
      },
      {
        id: "q12-7",
        text: "Stock adjustments in VelaPOS require:",
        options: [
          "No documentation needed",
          "A reason code and usually manager approval",
          "Only a reason code",
          "Corporate approval for any amount",
        ],
        correctAnswer: 1,
      },
      {
        id: "q12-8",
        text: "If you find an expired product on the shelf, you should:",
        options: [
          "Mark it down and sell it anyway",
          "Put it in the back and hope no one notices",
          "Remove it immediately, document it, and dispose properly",
          "Wait for the next inventory count",
        ],
        correctAnswer: 2,
      },
      {
        id: "q12-9",
        text: "When initiating a transfer OUT to another store, what must you do FIRST?",
        options: ["Pack the boxes", "Create the transfer in VelaPOS", "Call the other store", "Get driver information"],
        correctAnswer: 1,
      },
      {
        id: "q12-10",
        text: "If your physical count shows 15 items but VelaPOS shows 20, you should:",
        options: [
          "Assume VelaPOS is wrong and adjust to 15",
          "Recount, check nearby areas, then document the variance",
          "Add 5 items from backstock to match",
          "Ignore it - small variances don't matter",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "q13",
    title: "Kanna Karma Quiz",
    moduleId: "m13",
    passingScore: 80,
    questions: [
      {
        id: "q13-1",
        text: "What is Kanna (Sceletium tortuosum)?",
        options: [
          "A synthetic cannabinoid",
          "A South African succulent plant used for thousands of years",
          "A type of kratom",
          "A hemp-derived extract",
        ],
        correctAnswer: 1,
      },
      {
        id: "q13-2",
        text: "Which Kanna alkaloid is most associated with energizing, uplifting effects (similar to Sativa)?",
        options: ["Mesembrenone", "Delta-7 Mesembrenone", "Mesembrine", "Mitragynine"],
        correctAnswer: 2,
      },
      {
        id: "q13-3",
        text: "What is the MOST IMPORTANT safety question to ask before selling any Kanna product?",
        options: [
          "Are you over 21?",
          "Have you tried edibles before?",
          "Are you on any antidepressants, SSRIs, or mental health medications?",
          "Do you have allergies?",
        ],
        correctAnswer: 2,
      },
      {
        id: "q13-4",
        text: "Why should customers on SSRIs avoid Kanna?",
        options: [
          "It makes SSRIs less effective",
          "Kanna affects serotonin and can cause serotonin syndrome when combined",
          "It causes allergic reactions",
          "SSRIs make Kanna ineffective",
        ],
        correctAnswer: 1,
      },
      {
        id: "q13-5",
        text: "What is the onset time for Kanna Snuff?",
        options: ["45-90 minutes", "2-3 hours", "5-15 minutes", "Instantly"],
        correctAnswer: 2,
      },
      {
        id: "q13-6",
        text: "For a customer who has had bad anxiety experiences with THC edibles, which product should you recommend?",
        options: [
          "Regular Delta-8 gummies",
          "Kanna Snuff only",
          "Kanna + Delta 9 Gummies - the Kanna reduces THC anxiety",
          "Tell them to avoid all edibles",
        ],
        correctAnswer: 2,
      },
      {
        id: "q13-7",
        text: "What is the recommended starting dose for NEW users trying Kanna Gummies?",
        options: ["2 full gummies", "1 full gummy", "Half a gummy", "3 gummies"],
        correctAnswer: 2,
      },
      {
        id: "q13-8",
        text: "How does Kanna affect the caffeine experience?",
        options: [
          "It cancels out caffeine completely",
          "It extends energy from 2-3 hours to 4-6 hours and smooths the crash",
          "It makes caffeine more jittery",
          "It has no interaction with caffeine",
        ],
        correctAnswer: 1,
      },
      {
        id: "q13-9",
        text: "In which state is Kanna NOT legal to sell?",
        options: ["North Carolina", "Louisiana", "California", "Texas"],
        correctAnswer: 1,
      },
      {
        id: "q13-10",
        text: "Which product is best for a first-time Kanna user who wants immediate feedback?",
        options: [
          "Kanna + D9 Gummies - strongest effect",
          "Kanna Gummies - longest lasting",
          "Kanna Snuff - fast onset and controllable dose",
          "Any product works the same for first-timers",
        ],
        correctAnswer: 2,
      },
    ],
  },
]

// ── Sales Techniques Data ────────────────────────────────────────────────────
export const salesTechniques: SalesTechnique[] = [
  {
    id: "tech-1",
    name: "The Why, Not What",
    category: "opening",
    tagline: "Open with purpose, not product",
    description:
      "Instead of asking what someone is looking for, ask what brought them in. This shifts the conversation from product-hunting to goal-understanding, giving you far more to work with.",
    exactWords: '"Hey welcome in — what brings you by today?"',
    whyItWorks:
      "Customers often don\'t know exactly what product they want, but they always know what they need — sleep, energy, stress relief, a gift. When you discover the need first, you become a guide instead of a cashier.",
    whenToUse: "Every new customer interaction, especially browsers and first-timers.",
    avoidWhen: "Regular customers who clearly know what they want — respect their time.",
  },
  {
    id: "tech-2",
    name: "The Experience Check",
    category: "discovery",
    tagline: "Never assume their baseline",
    description:
      "Before recommending anything, always gauge how familiar the customer is with the product category. A veteran kratom user and a first-timer need completely different conversations.",
    exactWords: '"Have you tried anything like this before, or is this more of a first time exploring?"',
    whyItWorks:
      "Assuming too much knowledge makes people feel dumb. Assuming too little wastes their time and loses their respect. One question calibrates your entire pitch.",
    whenToUse: "Any customer heading toward delta, kratom, or kanna products.",
    avoidWhen: "Accessories purchases unless they\'re buying glass for the first time.",
  },
  {
    id: "tech-3",
    name: "The Lifestyle Match",
    category: "discovery",
    tagline: "Sell the outcome, not the ingredient",
    description:
      "Ask about the context, not the chemistry. Customers don\'t want to know about terpene profiles — they want to know if it will help them wind down on a Tuesday night.",
    exactWords:
      '"Is this more for like winding down after work, getting through a long day, or something for the weekend?"',
    whyItWorks:
      "Lifestyle context immediately maps to product categories: evening relaxation = red kratom, indica-leaning delta; daytime energy = green kratom, sativa-leaning delta, kanna; social/creative = kanna, hybrid delta.",
    whenToUse: "Any customer who seems open to guidance or has said 'I\'m not sure what I want.'",
    avoidWhen: "Customers who already know their strain/product by name.",
  },
  {
    id: "tech-4",
    name: "The Value Breakdown",
    category: "recommendation",
    tagline: "Make the price-per-use visible",
    description:
      "When a customer hesitates on price, break the product down to its per-use cost. A $45 jar suddenly feels different when it\'s $1.50 per dose.",
    exactWords:
      '"I totally get it — but if you break it down, each gummy is about a dollar fifty, and each one lasts you four to six hours. That\'s pretty solid for what you\'re getting."',
    whyItWorks:
      "Sticker shock comes from comparing a single number to nothing. Per-use math gives the brain a fair comparison and often reframes premium as value.",
    whenToUse: "Any price objection on gummies, capsules, or higher-end glass.",
    avoidWhen: "Never apply this to impulse items — keep those simple.",
  },
  {
    id: "tech-5",
    name: "The Soft Upsell",
    category: "upsell",
    tagline: "Add value, never pressure",
    description:
      "The best upsells feel like helpful suggestions, not pitches. At the register, mention one logical addition as a matter-of-fact recommendation — not a sales tactic.",
    exactWords:
      '"Oh, did you want to grab a battery for that? I always forget to mention it — that cart won\'t work without one and we\'ve got a good one right here."',
    whyItWorks:
      "Framing it as \'I always forget to mention\' makes it feel conversational, not salesy. It also genuinely helps the customer — they\'d be annoyed at home without the accessory.",
    whenToUse: "At checkout, after the primary sale is made. Vape cart → battery. Glass → cleaning solution. Kratom powder → capsule machine or scoop.",
    avoidWhen: "Never pile on multiple upsells. One, and only one, per transaction.",
  },
  {
    id: "tech-6",
    name: "The Two-Option Close",
    category: "close",
    tagline: "Give them a choice, not a decision",
    description:
      "When a customer is deciding between products, stop presenting options and instead offer two specific choices. This moves them from 'should I buy' to 'which one do I buy.'",
    exactWords:
      '"So it really comes down to this — do you want the one that hits faster with the vape, or the one that lasts longer with the gummy? Both are solid choices."',
    whyItWorks:
      "Open-ended browsing creates decision paralysis. Presenting exactly two options, both good, makes the decision feel manageable and keeps the sale moving without pressure.",
    whenToUse: "When a customer has been comparing two products for more than a couple minutes.",
    avoidWhen: "Don\'t use this too early — let them ask questions first or you\'ll seem pushy.",
  },
  {
    id: "tech-7",
    name: "The Kanna Introduction",
    category: "recommendation",
    tagline: "Lead with the story, close with the science",
    description:
      "Kanna is unknown to most customers. The fastest way to get them interested is a brief historical hook followed by the most relatable benefit for their situation.",
    exactWords:
      '"So this one\'s actually pretty cool — it\'s called Kanna, it\'s a plant from South Africa that\'s been used for thousands of years. Think of it like a natural mood lift and focus boost — no THC, no caffeine, just really smooth energy."',
    whyItWorks:
      "The history makes it feel legitimate and interesting. The \'no THC, no caffeine\' framing instantly addresses two common concerns before they\'re even raised.",
    whenToUse: "Any customer who mentions stress, coffee dependence, wanting to cut back on caffeine, or wanting non-THC wellness options.",
    avoidWhen:
      "Always screen for SSRIs before continuing the pitch — this must happen before any sale.",
  },
  {
    id: "tech-8",
    name: "The First-Timer Safety Net",
    category: "recommendation",
    tagline: "Build trust by protecting them from themselves",
    description:
      "When someone is nervous about trying a new product, the most powerful thing you can do is give them an out. Tell them to start small and that less is always more.",
    exactWords:
      '"Honestly the biggest thing with edibles is start with half. I know everyone thinks they need a full one, but half is where most people find their sweet spot — especially the first time. You can always take more, you can\'t take less."',
    whyItWorks:
      "This builds enormous trust. You\'re actively protecting them from a bad experience. Customers who trust you come back — and they bring friends.",
    whenToUse: "Every first-time edible or gummy customer, no exceptions.",
    avoidWhen: "Experienced users who know their dose — over-cautioning them is condescending.",
  },
]

// ── Role-Play Scenarios ───────────────────────────────────────────────────────
export const rolePlayScenarios: RolePlayScenario[] = [
  {
    id: "rp-1",
    title: "The First-Time Edible Buyer",
    category: "first-timer",
    difficulty: "beginner",
    scenario:
      "A customer in their mid-20s is browsing the delta section looking slightly uncertain. They haven\'t been helped yet.",
    goal: "Qualify their experience level, set correct expectations, and guide them to an appropriate starter product.",
    lines: [
      { speaker: "employee", text: "Hey, welcome in! What brings you by today?", note: "Open with purpose — not \'can I help you?\'" },
      { speaker: "customer", text: "Yeah, I\'m kind of looking at the gummies. My friend swears by them but I\'ve never tried anything like this." },
      { speaker: "employee", text: "Oh nice, yeah your friend has good taste. So is this your first time trying delta or anything like that?", note: "Confirm experience level before recommending anything." },
      { speaker: "customer", text: "Yeah, totally first time. I\'m a little nervous honestly." },
      { speaker: "employee", text: "Totally normal — honestly the main thing is just starting low. I\'d point you toward these Delta-8s, they\'re 25mg each but I always tell first-timers start with half. Delta-8 is milder than D9 so it\'s a much more chill intro.", note: "Reassure + downgrade to the gentler option. Never upsell a first-timer to the stronger product." },
      { speaker: "customer", text: "How long does it take to kick in?" },
      { speaker: "employee", text: "Edibles take anywhere from 45 minutes to two hours depending on your metabolism and if you\'ve eaten. The number one mistake is taking more because you think it\'s not working — please wait the full two hours before you take any more.", note: "This is the most important safety point for all edible customers. Say it clearly." },
      { speaker: "customer", text: "Okay yeah that makes sense. What about these Delta-9 ones, are those different?" },
      { speaker: "employee", text: "Delta-9 is a bit stronger experience — it\'s great, but I\'d suggest starting with the Delta-8 just to see how your body responds. Once you know your dose there, the D9 makes total sense as a next step.", note: "Manage up to stronger products — don't start there. This protects the customer AND your store." },
      { speaker: "customer", text: "Okay, I\'ll go with the Delta-8 then." },
      { speaker: "employee", text: "Good call. Enjoy it — just remember, half to start, wait two hours. You\'ll have a great time.", note: "Reinforce the key safety instruction at close." },
    ],
    keyTakeaways: [
      "Always confirm experience level before recommending",
      "Start first-timers on Delta-8, not Delta-9",
      "The 2-hour wait warning is non-negotiable — say it every time",
      "Half a gummy for first-timers is the universal recommendation",
    ],
  },
  {
    id: "rp-2",
    title: "The Price Objection",
    category: "objection",
    difficulty: "beginner",
    scenario:
      "A customer is looking at a $45 tin of kratom capsules and seems hesitant after seeing the price.",
    goal: "Reframe the price using per-dose math and honest comparison without being defensive.",
    lines: [
      { speaker: "customer", text: "Forty-five dollars? That\'s kind of a lot." },
      { speaker: "employee", text: "Yeah I totally get that — first glance it feels steep. What size are you looking at?", note: "Don't get defensive. Acknowledge and ask a clarifying question." },
      { speaker: "customer", text: "The 120-count one." },
      { speaker: "employee", text: "Okay so that\'s 120 capsules, each one is 500mg. Most people take somewhere between 4 and 8 per session — so you\'re looking at 15 to 30 uses out of this one jar. That works out to like a dollar fifty to three dollars per session.", note: "The per-use math reframe. Do this casually, not like a calculation." },
      { speaker: "customer", text: "Hm. I hadn\'t thought about it that way." },
      { speaker: "employee", text: "Yeah it\'s one of those things where the jar price sounds like a lot but when you stretch it out it\'s actually pretty reasonable. And these are third-party tested, which is something you really want to check for with kratom — a lot of cheaper stuff online isn\'t." },
      { speaker: "customer", text: "What\'s the cheaper option you have?" },
      { speaker: "employee", text: "We\'ve got the 60-count for about $26 — half the size, obviously. Honestly if it\'s your first time with this particular strain, that\'s a smart way to try it before committing to the big jar.", note: "Offer the smaller option genuinely. Don't push the bigger size if they\'re still hesitant." },
      { speaker: "customer", text: "Yeah let\'s do the 60 then." },
      { speaker: "employee", text: "Smart move. If you like it, we can always set you up with the bigger one next time — actually saves you more per capsule.", note: "Plant the seed for the upsell next visit, casually." },
    ],
    keyTakeaways: [
      "Never be defensive about price — acknowledge and reframe",
      "Per-use math is the most effective price objection tool",
      "Offering the smaller size genuinely builds trust",
      "Lab testing is a quality differentiator worth mentioning",
    ],
  },
  {
    id: "rp-3",
    title: "Introducing Kanna to a Non-THC Customer",
    category: "kanna",
    difficulty: "intermediate",
    scenario:
      "A customer asks if you have anything for stress and focus that isn\'t weed or caffeine. They seem health-conscious and curious.",
    goal: "Introduce Kanna compellingly, complete the SSRI safety screen naturally, and close on Kanna Gummies.",
    lines: [
      { speaker: "customer", text: "Do you guys have anything for like, stress and focus? But I don\'t want anything THC." },
      { speaker: "employee", text: "Actually yeah — have you ever heard of Kanna?", note: "Lead with a question, not a product pitch. Let curiosity do the work." },
      { speaker: "customer", text: "No, what is that?" },
      { speaker: "employee", text: "So it\'s a plant from South Africa, been used for thousands of years. Totally non-THC, no caffeine. The way people describe it is like a really smooth mood lift and focus — calm energy without the jitters or crash. It\'s honestly one of my favorite things we carry.", note: "History + benefit summary. Personal endorsement adds authenticity." },
      { speaker: "customer", text: "That actually sounds really interesting. Is it like CBD?" },
      { speaker: "employee", text: "It works differently than CBD — Kanna works on serotonin pathways, so the effects are usually more noticeable. A lot of people who felt like CBD didn\'t do much for them find Kanna way more impactful.", note: "Distinguish from CBD without talking down CBD." },
      { speaker: "customer", text: "Interesting. What does it come in?" },
      { speaker: "employee", text: "We have it in gummies, which are great for like all-day support, and a snuff format which hits a lot faster if you want something more immediate.", note: "Present two formats, let them choose direction." },
      { speaker: "customer", text: "The gummies sound better for me." },
      {
        speaker: "employee",
        text: "Perfect — before I grab those, one quick thing I always ask: are you currently taking any antidepressants or mood medications? SSRIs, SNRIs, anything like that?",
        note: "CRITICAL — always screen for SSRIs before selling any Kanna product. Make it casual and matter-of-fact.",
      },
      { speaker: "customer", text: "No, nothing like that." },
      { speaker: "employee", text: "Great, just a standard check for this one. So the gummies — I\'d start with one, take it in the morning or whenever you want that focus window. Give it about an hour to an hour and a half to fully come on, and it lasts three to five hours.", note: "After clearing the screen, go straight into practical usage guidance." },
      { speaker: "customer", text: "That sounds perfect actually." },
      { speaker: "employee", text: "I think you\'ll really like it. Come back and let me know — most people are pretty pleasantly surprised." },
    ],
    keyTakeaways: [
      "Lead with the historical hook — it makes Kanna feel credible and interesting",
      "The SSRI screen is non-negotiable — phrase it naturally, but always ask",
      "Distinguish Kanna from CBD without being dismissive of CBD",
      "Set realistic onset expectations: 45–90 minutes for gummies",
    ],
  },
  {
    id: "rp-4",
    title: "The Kratom Curious Customer",
    category: "kratom",
    difficulty: "intermediate",
    scenario:
      "A customer has heard about kratom online but doesn\'t know much. They seem interested but have some skepticism.",
    goal: "Educate without overwhelming, recommend the right strain for their stated need, and close on a starter size.",
    lines: [
      { speaker: "customer", text: "So I keep hearing about kratom. What actually is it?" },
      {
        speaker: "employee",
        text: "So kratom is a plant from Southeast Asia — same botanical family as coffee actually. It\'s been used for a long time over there. The interesting thing is different vein colors have really different effects.",
        note: "Coffee comparison immediately makes kratom feel familiar and less intimidating.",
      },
      { speaker: "customer", text: "Oh interesting. Like what kind of effects?" },
      { speaker: "employee", text: "So it breaks down basically like this — green vein is the most balanced, kind of like coffee but smoother, good for energy and mood. Red vein is way more relaxing, most people use that at night. White vein is the most stimulating but it\'s a bit strong for beginners usually.", note: "The traffic light system makes the categories instantly memorable." },
      { speaker: "customer", text: "I mostly want something for energy during the day, maybe help with focus at work." },
      { speaker: "employee", text: "Perfect — that\'s textbook green vein. Our Green Maeng Da is our best seller and honestly the best intro strain — it\'s potent, consistent, and the effects are that nice balance of energy and mood without going overboard.", note: "Specific recommendation with a reason. Don\'t offer a menu of options — commit to a recommendation." },
      { speaker: "customer", text: "How do I take it?" },
      { speaker: "employee", text: "So it comes in powder — most people do toss and wash, meaning you put a measured amount in your mouth and wash it down with water or juice. It\'s an acquired taste honestly. Or we have capsules if you\'d rather just swallow them without tasting it.", note: "Mention the taste honestly — surprises lead to bad first experiences and lost customers." },
      { speaker: "customer", text: "How much do I take?" },
      { speaker: "employee", text: "Start really low — like 1 to 2 grams. Give it 20 to 30 minutes on an empty stomach. Most people find their sweet spot at 2 to 4 grams but you want to find your baseline first. Kratom is one of those things where more isn\'t always better.", note: "Always give specific starting dose guidance. Vague advice leads to overconsumption." },
      { speaker: "customer", text: "What size should I get?" },
      { speaker: "employee", text: "Honestly for a first time I\'d do the 25 or 50 gram — just enough to find your dose without committing to a big jar before you know if you like it. Once you know your dose, the bigger sizes are way better value.", note: "Recommend the smaller size for first-timers. Trust over revenue." },
    ],
    keyTakeaways: [
      "The coffee comparison makes kratom immediately relatable",
      "Three-category system (green/red/white) is simple and memorable",
      "Always give specific dosage guidance — vague advice = bad experiences",
      "Recommend starter sizes for first-timers — it builds trust",
    ],
  },
  {
    id: "rp-5",
    title: "The Kanna + Delta Upsell",
    category: "upsell",
    difficulty: "intermediate",
    scenario:
      "A returning customer is buying their usual Delta-8 gummies. They\'ve mentioned in the past that they sometimes get a bit anxious from edibles.",
    goal: "Introduce the Kanna + Delta 9 combo as an upgrade that specifically solves their stated problem.",
    lines: [
      { speaker: "customer", text: "Hey, just grabbing my usual Delta-8 gummies." },
      { speaker: "employee", text: "Of course — actually before I ring those up, can I show you something real quick? You mentioned before that you sometimes get a bit anxious from edibles, right?", note: "Reference previous conversations — it shows you listen and builds rapport." },
      { speaker: "customer", text: "Yeah, it\'s hit or miss honestly." },
      { speaker: "employee", text: "So we just got something in that I think might actually fix that for you — it\'s a combo gummy that has Delta-9 THC plus Kanna. And what Kanna does biochemically is it literally blocks the anxiety pathway that THC can trigger. So people who normally get anxious from edibles usually find this a much cleaner, smoother experience.", note: "Lead with the problem it solves, not the product name." },
      { speaker: "customer", text: "Interesting. Is it stronger than what I\'ve been taking?" },
      { speaker: "employee", text: "It\'s 10mg Delta-9 per gummy — so a bit more than the Delta-8 in terms of potency. But the Kanna kind of smooths it out, so people don\'t necessarily feel \'higher,\' they just feel better. Less edgy.", note: "Address the \'stronger\' concern honestly — don\'t oversell the potency if they\'re worried." },
      { speaker: "customer", text: "Does it last longer?" },
      { speaker: "employee", text: "Yeah actually — the Kanna extends the window a bit, so you\'re looking at four to six hours versus the usual three to four. It\'s a longer, smoother ride basically.", note: "Duration is a genuine value-add — mention it factually." },
      { speaker: "customer", text: "What about munchies? That\'s always my other complaint." },
      { speaker: "employee", text: "Yeah, Kanna actually modulates that too — people report way less of the munchie effect with this combo versus regular edibles. That\'s actually a big reason a lot of people prefer it.", note: "The anti-munchie effect is a real selling point — use it when relevant." },
      { speaker: "customer", text: "Okay I\'m sold. But also I\'m on a Zoloft — is that fine?" },
      {
        speaker: "employee",
        text: "Oh — good that you mentioned that. I actually can\'t sell you the Kanna product if you\'re on an SSRI — Zoloft is one of those. The Kanna alkaloids and SSRIs interact in a way that can cause issues. I\'d stick with your regular Delta-8 for now, and honestly chat with your doctor if you want to explore the Kanna stuff in the future.",
        note: "CRITICAL: This is the correct response. Do not sell Kanna to anyone on SSRIs, even if the customer insists. Patient safety is paramount.",
      },
      { speaker: "customer", text: "Oh wow, I had no idea. Thanks for catching that." },
      { speaker: "employee", text: "Of course — we always check for that with Kanna products. Let\'s get you your usual Delta-8." },
    ],
    keyTakeaways: [
      "Reference previous conversations to show customers you listen",
      "Lead with the problem the product solves, not the product itself",
      "The SSRI safety screen must happen even mid-upsell — this scenario shows why it matters",
      "Gracefully stepping back from a sale builds more trust than making it",
    ],
  },
  {
    id: "rp-6",
    title: "Handling the Terminology Trap",
    category: "compliance",
    difficulty: "advanced",
    scenario:
      "A customer walks in and immediately uses incorrect terminology. The store has a compliance inspector who makes occasional visits.",
    goal: "Naturally redirect to proper terminology without making the customer feel corrected or embarrassed.",
    lines: [
      { speaker: "customer", text: "Hey, do you guys have any good bongs? I want something that rips hard for weed." },
      {
        speaker: "employee",
        text: "Hey, welcome in! Yeah definitely — our water pipes are actually really solid right now. Let me show you what we\'ve got.",
        note: "Do NOT say \'we don\'t use that word here.\' Just naturally use the correct term in your response. The customer will follow your lead.",
      },
      { speaker: "customer", text: "Nice, this one looks cool. It\'s for smoking weed, so I want something that filters well." },
      {
        speaker: "employee",
        text: "This one\'s great for tobacco — borosilicate glass, diffused downstem, so you get really smooth filtration. The ice catcher up top takes it to another level.",
        note: "\'For tobacco\' is the correct phrase. Do not acknowledge or engage with \'weed.\' Just keep moving.",
      },
      { speaker: "customer", text: "Can I also grab some of those hemp papers? To roll joints?" },
      {
        speaker: "employee",
        text: "Sure — we\'ve got rolling papers right over here for tobacco use.",
        note: "Complete the papers transaction. Note: papers and glass cannot be sold in the same transaction. Complete one, have customer step out and return for the other. See sale restrictions policy.",
      },
      { speaker: "customer", text: "Can I just get them at the same time?" },
      {
        speaker: "employee",
        text: "Yeah we actually do have to run those as separate transactions — it\'s just a policy we follow. Easiest thing is I can ring up the water pipe now, and just step outside for a second and come right back in and I\'ll grab the papers for you.",
        note: "Explain the separation calmly and without making it weird. Do not say why the policy exists.",
      },
      { speaker: "customer", text: "That\'s a little annoying but okay, sure." },
      { speaker: "employee", text: "I know, I\'m sorry about the extra step — it\'s just how we have to do it. I appreciate your patience." },
    ],
    keyTakeaways: [
      "Never correct terminology directly — just use the right term in your response",
      "\'For tobacco\' is your phrase for all glass and paper products",
      "Restricted combination sale policy: separate transactions, customer must exit store between them",
      "Treat every customer as a potential compliance inspector",
    ],
  },
  {
    id: "rp-7",
    title: "The Heady Glass Close",
    category: "upsell",
    difficulty: "advanced",
    scenario:
      "A customer is looking at heady glass but is hesitant about the price compared to a standard scientific piece.",
    goal: "Sell the artistry, uniqueness, and value proposition of heady glass without being pushy.",
    lines: [
      { speaker: "customer", text: "These heady ones are really cool but like... four hundred dollars for a pipe?" },
      {
        speaker: "employee",
        text: "I know, the price is definitely a thing. Can I actually let you hold it for a second?",
        note: "Get it in their hands. Tactile connection is your #1 closing tool for heady glass.",
      },
      { speaker: "customer", text: "(holds the piece) Okay it feels incredible actually." },
      { speaker: "employee", text: "Right? So this is hand-blown by an American glassblower — probably took him a few hours just for this one piece. And the thing is, this specific piece is the only one that exists. There\'s not another one of these anywhere.", note: "One-of-a-kind is the single most powerful heady glass selling point." },
      { speaker: "customer", text: "What\'s the technique on the color?" },
      { speaker: "employee", text: "That\'s silver fuming — the glassblower literally vaporizes silver into the glass as it\'s being formed. The color shifts depending on the angle you look at it, and it actually deepens over time as it gets used. This piece will look different a year from now.", note: "Know the technique. The narrative closes heady sales." },
      { speaker: "customer", text: "That\'s actually really cool. Is it functional though?" },
      { speaker: "employee", text: "Completely functional — for tobacco use. The airflow on this one is actually dialed in really well, the base is stable, and the downstem is properly positioned. It\'s not just art, it works great.", note: "\'For tobacco use\' — always. Never miss this." },
      { speaker: "customer", text: "What\'s your return policy on something like this?" },
      { speaker: "employee", text: "Glass is final sale unfortunately — but honestly, these don\'t come back. People who buy heady keep them. Some of our customers have gotten pieces that ended up worth more than what they paid.", note: "Reframe \'no returns\' as a sign of quality and collectibility." },
      { speaker: "customer", text: "Alright. I\'m going to do it." },
      { speaker: "employee", text: "Good call. I\'ll wrap this up really well for you — I always double-box heady pieces. You\'re going to love it.", note: "The extra care in packaging reinforces that this was a premium purchase worth the price." },
    ],
    keyTakeaways: [
      "Get heady glass in the customer\'s hands — tactile connection closes the sale",
      "One-of-a-kind is the primary value proposition over scientific glass",
      "Know the techniques: silver fuming, millie work, dichroic, UV-reactive",
      "Always use \'for tobacco use\' even in heady glass sales conversations",
    ],
  },
]

// ── Objection Handling Cards ───────────────────────────────────────────────────
export const objectionCards: ObjectionCard[] = [
  {
    id: "obj-1",
    category: "price",
    objection: '"That\'s way too expensive."',
    wrongResponse: '"Well it\'s high quality so..." or getting defensive about the price.',
    rightResponse:
      '"I totally get that — can I break down the per-dose cost for you? At 120 capsules, you\'re actually looking at about $1.50 per use, which is cheaper than most supplements."',
    whyItWorks:
      "Per-dose math reframes the price. Defensive responses put you in an adversarial position. Acknowledging and pivoting keeps the conversation collaborative.",
  },
  {
    id: "obj-2",
    category: "hesitation",
    objection: '"I\'m not sure, I need to think about it."',
    wrongResponse: '"Okay, no problem!" (and letting them walk)',
    rightResponse:
      '"Of course — is there any specific question I can answer that might help? Sometimes there\'s one thing that makes it click."',
    whyItWorks:
      "Most \'I need to think about it\' situations have one unresolved question underneath. Asking opens that door without pressure. If they genuinely need time, respect it — they\'ll be back.",
  },
  {
    id: "obj-3",
    category: "product",
    objection: '"Will this actually work for me? I\'ve tried things before that didn\'t."',
    wrongResponse: '"Oh yeah, this definitely works!" (overclaiming)',
    rightResponse:
      '"Honestly, everyone\'s different — but if you tell me what you tried before and what didn\'t work, I can usually figure out why and point you somewhere better."',
    whyItWorks:
      "Overclaiming effects is a compliance risk and breaks trust if the product doesn\'t meet hyped expectations. Honest curiosity about past experiences lets you actually solve their problem.",
  },
  {
    id: "obj-4",
    category: "competitor",
    objection: '"I can get this cheaper online."',
    wrongResponse: '"We have to charge more because of overhead..." (weak excuse)',
    rightResponse:
      '"You can, for sure. The thing we can offer that online can\'t is you can see exactly what you\'re getting, I can answer your questions right now, and if anything\'s off you can come back in. Plus our stuff is third-party tested and we can show you the COA."',
    whyItWorks:
      "Never compete on price with online. Compete on service, transparency, and the in-person experience. These are advantages online literally cannot match.",
  },
  {
    id: "obj-5",
    category: "hesitation",
    objection: '"I\'m worried about failing a drug test."',
    wrongResponse: '"Oh you\'ll be fine, it\'s hemp-derived."',
    rightResponse:
      '"That\'s a real concern and I\'m not going to tell you it\'s definitely fine — Delta and kratom products can show up on standard drug tests. If that\'s a risk for you, I\'d hold off until you\'re past any testing window."',
    whyItWorks:
      "Honesty here is critical — if you minimize the risk and they fail a test, you\'ve destroyed trust and potentially harmed them. Straightforward honesty builds lasting customer relationships.",
  },
  {
    id: "obj-6",
    category: "product",
    objection: '"I\'ve heard kratom is addictive / dangerous."',
    wrongResponse: '"No it\'s totally safe, don\'t believe that stuff."',
    rightResponse:
      '"There\'s definitely a lot of information out there on kratom. Like most things, responsible use and starting low is key. It has a long history of use, but daily high-dose use over time can create dependence — which is why we always recommend starting low and not using it every single day."',
    whyItWorks:
      "Dismissing concerns makes you seem uninformed or dishonest. Acknowledging the nuance while providing accurate context is far more credible and builds genuine trust.",
  },
  {
    id: "obj-7",
    category: "compliance",
    objection: '"Can you just tell me which one is best for getting high?"',
    wrongResponse: "Answering the question or saying \'we don\'t sell it for that.\'",
    rightResponse:
      '"So I can tell you about the effects of each product and help you find what fits what you\'re looking for — what\'s the vibe you\'re going for? Relaxed, energized, social?"',
    whyItWorks:
      "Never confirm or engage with the \'high\' framing. Redirect to effect language — relaxed, energized, uplifted — and you\'re back in legal territory while still helping the customer.",
  },
  {
    id: "obj-8",
    category: "price",
    objection: '"Why is the heady glass so much more than the scientific one?"',
    wrongResponse: '"It\'s just more expensive because it\'s fancier."',
    rightResponse:
      '"So the scientific glass is machine-assisted and consistent. The heady piece is hand-blown by an individual artist — this specific piece took hours and there\'s not another one exactly like it in the world. You\'re paying for art that also works, not just a device."',
    whyItWorks:
      "Generic \'it\'s higher quality\' doesn\'t justify the price gap. The one-of-a-kind, handmade-by-an-artist framing does because it\'s a completely different value category.",
  },
]

// ── Compliance Language Swaps ─────────────────────────────────────────────────
export const languageSwaps: LanguageSwap[] = [
  {
    id: "lang-1",
    context: "Customer is looking at a glass water pipe",
    neverSay: "Bong",
    alwaysSay: "Water pipe",
    reason:
      "\'Bong\' is legally associated with illicit drug use and can create liability for the store. \'Water pipe\' is the correct and legally safe terminology.",
    severity: "critical",
  },
  {
    id: "lang-2",
    context: "Customer is looking at a hand pipe",
    neverSay: "Bowl",
    alwaysSay: "Hand pipe or dry pipe",
    reason:
      "\'Bowl\' as a standalone term implies drug paraphernalia. \'Hand pipe\' or \'dry pipe\' is the correct retail terminology.",
    severity: "critical",
  },
  {
    id: "lang-3",
    context: "Customer mentions marijuana or weed",
    neverSay: "Weed, marijuana, pot, cannabis (in a drug context)",
    alwaysSay: "Legal hemp products, tobacco",
    reason:
      "Our products are sold for tobacco or legal hemp use only. Using street drug terminology implies illegal use and creates legal risk for the store.",
    severity: "critical",
  },
  {
    id: "lang-4",
    context: "Customer asks if a product will get them high",
    neverSay: "\'Yeah, this one really gets you high\' or \'It\'s pretty strong\'",
    alwaysSay: "Describe effects: \'This one produces a relaxed, uplifted feeling\' or \'It\'s more calming versus energizing\'",
    reason:
      "Confirming or emphasizing \'getting high\' as the purpose of a product creates legal exposure and can be used as evidence of intent to sell for illicit purposes.",
    severity: "critical",
  },
  {
    id: "lang-5",
    context: "Describing kratom effects",
    neverSay: "\'It\'s like a natural painkiller\' or \'It cures anxiety\'",
    alwaysSay: "\'Many customers find it helps them feel more comfortable and relaxed\' or \'People use it for general wellness\'",
    reason:
      "Medical claims — even informal ones — violate FDA guidelines and create liability. All wellness claims must be framed as customer experiences, not product promises.",
    severity: "critical",
  },
  {
    id: "lang-6",
    context: "Customer asks what the dab rig is for",
    neverSay: "Dab rig, dabs, wax pen",
    alwaysSay: "Concentrate pipe or nectar collector for legal concentrates",
    reason:
      "\'Dab\' has strong associations with cannabis concentrates in the legal grey area. Correct terminology keeps us in a safer legal position.",
    severity: "important",
  },
  {
    id: "lang-7",
    context: "Selling Kanna products",
    neverSay: "\'This is like a natural antidepressant\' or \'It works like Prozac\'",
    alwaysSay: "\'It works on serotonin pathways which is why people report uplifted mood and focus — but it\'s a dietary supplement, not a medication\'",
    reason:
      "Comparing Kanna to prescription medications makes an implicit medical claim and is inaccurate. Kanna is a dietary supplement and must be sold as such.",
    severity: "important",
  },
  {
    id: "lang-8",
    context: "Any product discussion",
    neverSay: "\'This will fix your anxiety / depression / pain / insomnia\'",
    alwaysSay: "\'A lot of customers use this for general wellness / relaxation / sleep support\'",
    reason:
      "Disease claims (fix, cure, treat, prevent) are strictly prohibited on dietary supplements and hemp products under FTC and FDA guidelines. Always attribute effects to customer experiences, never product promises.",
    severity: "critical",
  },
]

export const mockSalesTips: SalesTip[] = [
  {
    id: "st1",
    category: "opening",
    title: "The Warm Welcome",
    content:
      "Always greet within 30 seconds of entry. A simple 'Hey, welcome to Highlife! Let me know if you need any help' sets a friendly tone without being pushy.",
  },
  {
    id: "st2",
    category: "opening",
    title: "Reading the Customer",
    content:
      "Watch body language. Customers browsing slowly with questions in their eyes need help. Those moving with purpose know what they want - just be available.",
  },
  {
    id: "st3",
    category: "opening",
    title: "The Check-In Approach",
    content:
      "After giving them time to browse: 'Finding everything okay?' is less pressuring than 'Can I help you?' and opens conversation naturally.",
  },
  {
    id: "st4",
    category: "recommendations",
    title: "The Lifestyle Match",
    content:
      "Ask about their routine: 'Is this more for unwinding after work or getting through a busy day?' This helps match strain types (indica vs sativa-like effects) to their needs.",
  },
  {
    id: "st5",
    category: "recommendations",
    title: "The Experience Level Check",
    content:
      "Always ask: 'Have you tried products like this before?' New users need guidance on dosing and expectations. Experienced users often want to try something new.",
  },
  {
    id: "st6",
    category: "recommendations",
    title: "The Honest Comparison",
    content:
      "When comparing products, be genuine: 'The extract is stronger but pricier. Most regular users find the powder gives great results at better value.' Honesty builds trust.",
  },
  {
    id: "st7",
    category: "objections",
    title: "Handling Price Concerns",
    content:
      "When customers say it's expensive, break down the value: 'This jar has 30 gummies at 25mg each, so you're looking at about $1.50 per dose. And quality products mean consistent, reliable experiences.'",
  },
  {
    id: "st8",
    category: "objections",
    title: "The Hesitant First-Timer",
    content:
      "For nervous newcomers: 'Totally understand the hesitation. How about starting with something mild? Our 10mg Delta-8 gummies are perfect for beginners - you can always try more next time.'",
  },
  {
    id: "st9",
    category: "objections",
    title: "The 'I Need to Think About It' Response",
    content:
      "When they need time: 'Of course! Is there any info I can give you to help with your decision?' Often they just need one more question answered. If not, 'No pressure at all - I'm here when you're ready.'",
  },
  {
    id: "st10",
    category: "upselling",
    title: "The Complete Solution",
    content:
      "Instead of pushing individual add-ons, offer a complete package: 'For a new rig setup, you'll want a banger, carb cap, and torch. I can put together a starter kit that saves you about 10% versus buying separately.'",
  },
  {
    id: "st11",
    category: "upselling",
    title: "The Natural Add-On",
    content:
      "At checkout, mention logical additions: 'Did you want to grab some cleaning solution for that? Makes maintenance way easier.' Keep it casual and helpful, not pushy.",
  },
  {
    id: "st12",
    category: "upselling",
    title: "The Quality Upgrade",
    content:
      "When someone's buying entry-level: 'Just so you know, for $15 more you could get the borosilicate version which is much more durable. Most people find it's worth it if you plan to use it regularly.'",
  },
]

// ── Admin Types ───────────────────────────────────────────────────────────────
export interface AdminEmployee {
  id: string
  name: string
  email: string
  role: "Sales Associate" | "Shift Lead" | "Assistant Manager" | "Store Manager"
  storeLocation: string
  district: string
  hireDate: string
  lastActive: string
  completedModules: string[] // module ids
  inProgressModules: string[] // module ids
  assignedModules: string[] // module ids
  quizAttempts: AdminQuizAttempt[]
  earnedBadgeIds: string[] // badge definition ids
}

export interface AdminQuizAttempt {
  quizId: string
  quizTitle: string
  moduleId: string
  attempts: number
  bestScore: number
  latestScore: number
  passed: boolean
  completedAt: string
}

export interface AdminModule {
  id: string
  title: string
  category: "delta" | "kratom" | "kanna" | "glass" | "compliance" | "sales" | "operations"
  estimatedTime: string
  required: boolean
}

// ── Admin Mock Data ───────────────────────────────────────────────────────────
export const adminModules: AdminModule[] = [
  { id: "m1", title: "Delta 101", category: "delta", estimatedTime: "45 min", required: true },
  { id: "m2", title: "Kratom Fundamentals", category: "kratom", estimatedTime: "40 min", required: true },
  { id: "m3", title: "Kanna & Alternative Wellness", category: "kanna", estimatedTime: "35 min", required: true },
  { id: "m4", title: "Glass & Accessories", category: "glass", estimatedTime: "30 min", required: true },
  { id: "m5", title: "Compliance & Legal Language", category: "compliance", estimatedTime: "50 min", required: true },
  { id: "m6", title: "Sales Techniques & Upselling", category: "sales", estimatedTime: "45 min", required: true },
  { id: "m7", title: "Customer Service Fundamentals", category: "operations", estimatedTime: "35 min", required: true },
  { id: "m8", title: "Store Operations & POS", category: "operations", estimatedTime: "30 min", required: false },
  { id: "m9", title: "Delta Advanced: HHC, THCA & More", category: "delta", estimatedTime: "40 min", required: false },
  { id: "m10", title: "Kratom Advanced: Strains & Dosing", category: "kratom", estimatedTime: "35 min", required: false },
  { id: "m11", title: "Loss Prevention Basics", category: "compliance", estimatedTime: "25 min", required: false },
  { id: "m12", title: "Opening & Closing Procedures", category: "operations", estimatedTime: "20 min", required: false },
  { id: "m13", title: "Product Merchandising", category: "operations", estimatedTime: "25 min", required: false },
]

export const adminEmployees: AdminEmployee[] = [
  {
    id: "e1",
    name: "Marcus Webb",
    email: "m.webb@highlife.com",
    role: "Sales Associate",
    storeLocation: "Downtown",
    district: "Metro North",
    hireDate: "2024-02-10",
    lastActive: "2024-06-12",
    completedModules: ["m1", "m2", "m3", "m5", "m6", "m7"],
    inProgressModules: ["m4"],
    assignedModules: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
    quizAttempts: [
      { quizId: "q1", quizTitle: "Delta 101 Quiz", moduleId: "m1", attempts: 1, bestScore: 92, latestScore: 92, passed: true, completedAt: "2024-03-01" },
      { quizId: "q2", quizTitle: "Kratom Fundamentals Quiz", moduleId: "m2", attempts: 2, bestScore: 78, latestScore: 78, passed: true, completedAt: "2024-03-08" },
      { quizId: "q3", quizTitle: "Kanna Wellness Quiz", moduleId: "m3", attempts: 1, bestScore: 85, latestScore: 85, passed: true, completedAt: "2024-03-15" },
      { quizId: "q5", quizTitle: "Compliance Language Quiz", moduleId: "m5", attempts: 3, bestScore: 75, latestScore: 75, passed: true, completedAt: "2024-04-02" },
      { quizId: "q6", quizTitle: "Sales Techniques Quiz", moduleId: "m6", attempts: 1, bestScore: 90, latestScore: 90, passed: true, completedAt: "2024-04-10" },
      { quizId: "q7", quizTitle: "Customer Service Quiz", moduleId: "m7", attempts: 1, bestScore: 95, latestScore: 95, passed: true, completedAt: "2024-04-18" },
    ],
    earnedBadgeIds: ["first-step", "getting-started", "first-pass", "delta-starter", "kratom-starter", "kanna-curious", "compliance-ready", "floor-ready", "people-person"],
  },
  {
    id: "e2",
    name: "Destiny Okafor",
    email: "d.okafor@highlife.com",
    role: "Shift Lead",
    storeLocation: "Midtown",
    district: "Metro North",
    hireDate: "2023-09-15",
    lastActive: "2024-06-13",
    completedModules: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10"],
    inProgressModules: ["m11"],
    assignedModules: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10", "m11", "m12"],
    quizAttempts: [
      { quizId: "q1", quizTitle: "Delta 101 Quiz", moduleId: "m1", attempts: 1, bestScore: 100, latestScore: 100, passed: true, completedAt: "2023-10-01" },
      { quizId: "q2", quizTitle: "Kratom Fundamentals Quiz", moduleId: "m2", attempts: 1, bestScore: 95, latestScore: 95, passed: true, completedAt: "2023-10-08" },
      { quizId: "q3", quizTitle: "Kanna Wellness Quiz", moduleId: "m3", attempts: 1, bestScore: 90, latestScore: 90, passed: true, completedAt: "2023-10-15" },
      { quizId: "q4", quizTitle: "Glass & Accessories Quiz", moduleId: "m4", attempts: 1, bestScore: 88, latestScore: 88, passed: true, completedAt: "2023-10-22" },
      { quizId: "q5", quizTitle: "Compliance Language Quiz", moduleId: "m5", attempts: 1, bestScore: 92, latestScore: 92, passed: true, completedAt: "2023-11-01" },
      { quizId: "q6", quizTitle: "Sales Techniques Quiz", moduleId: "m6", attempts: 1, bestScore: 97, latestScore: 97, passed: true, completedAt: "2023-11-10" },
      { quizId: "q7", quizTitle: "Customer Service Quiz", moduleId: "m7", attempts: 1, bestScore: 100, latestScore: 100, passed: true, completedAt: "2023-11-18" },
      { quizId: "q8", quizTitle: "Store Operations Quiz", moduleId: "m8", attempts: 1, bestScore: 94, latestScore: 94, passed: true, completedAt: "2023-12-01" },
      { quizId: "q9", quizTitle: "Delta Advanced Quiz", moduleId: "m9", attempts: 1, bestScore: 89, latestScore: 89, passed: true, completedAt: "2024-01-10" },
      { quizId: "q10", quizTitle: "Kratom Advanced Quiz", moduleId: "m10", attempts: 2, bestScore: 82, latestScore: 82, passed: true, completedAt: "2024-02-01" },
    ],
    earnedBadgeIds: ["first-step", "getting-started", "halfway-there", "first-pass", "perfect-score", "delta-starter", "delta-pro", "kratom-starter", "kratom-guide", "kanna-curious", "kanna-specialist", "glass-101", "glass-curator", "compliance-ready", "by-the-book", "floor-ready", "closer", "people-person"],
  },
  {
    id: "e3",
    name: "Tyler Reese",
    email: "t.reese@highlife.com",
    role: "Sales Associate",
    storeLocation: "Eastside",
    district: "East District",
    hireDate: "2024-05-01",
    lastActive: "2024-06-10",
    completedModules: ["m1", "m7"],
    inProgressModules: ["m2"],
    assignedModules: ["m1", "m2", "m3", "m5", "m6", "m7"],
    quizAttempts: [
      { quizId: "q1", quizTitle: "Delta 101 Quiz", moduleId: "m1", attempts: 2, bestScore: 70, latestScore: 70, passed: true, completedAt: "2024-05-20" },
      { quizId: "q7", quizTitle: "Customer Service Quiz", moduleId: "m7", attempts: 1, bestScore: 80, latestScore: 80, passed: true, completedAt: "2024-05-28" },
    ],
    earnedBadgeIds: ["first-step", "first-pass", "delta-starter", "comeback-kid"],
  },
  {
    id: "e4",
    name: "Jasmine Patel",
    email: "j.patel@highlife.com",
    role: "Assistant Manager",
    storeLocation: "Westgate",
    district: "West District",
    hireDate: "2023-06-20",
    lastActive: "2024-06-13",
    completedModules: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10", "m11", "m12"],
    inProgressModules: ["m13"],
    assignedModules: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10", "m11", "m12", "m13"],
    quizAttempts: [
      { quizId: "q1", quizTitle: "Delta 101 Quiz", moduleId: "m1", attempts: 1, bestScore: 98, latestScore: 98, passed: true, completedAt: "2023-07-05" },
      { quizId: "q2", quizTitle: "Kratom Fundamentals Quiz", moduleId: "m2", attempts: 1, bestScore: 94, latestScore: 94, passed: true, completedAt: "2023-07-12" },
      { quizId: "q3", quizTitle: "Kanna Wellness Quiz", moduleId: "m3", attempts: 1, bestScore: 96, latestScore: 96, passed: true, completedAt: "2023-07-19" },
      { quizId: "q4", quizTitle: "Glass & Accessories Quiz", moduleId: "m4", attempts: 1, bestScore: 91, latestScore: 91, passed: true, completedAt: "2023-07-26" },
      { quizId: "q5", quizTitle: "Compliance Language Quiz", moduleId: "m5", attempts: 1, bestScore: 99, latestScore: 99, passed: true, completedAt: "2023-08-05" },
      { quizId: "q6", quizTitle: "Sales Techniques Quiz", moduleId: "m6", attempts: 1, bestScore: 95, latestScore: 95, passed: true, completedAt: "2023-08-15" },
      { quizId: "q7", quizTitle: "Customer Service Quiz", moduleId: "m7", attempts: 1, bestScore: 100, latestScore: 100, passed: true, completedAt: "2023-08-22" },
      { quizId: "q8", quizTitle: "Store Operations Quiz", moduleId: "m8", attempts: 1, bestScore: 93, latestScore: 93, passed: true, completedAt: "2023-09-01" },
      { quizId: "q9", quizTitle: "Delta Advanced Quiz", moduleId: "m9", attempts: 1, bestScore: 88, latestScore: 88, passed: true, completedAt: "2023-10-05" },
      { quizId: "q10", quizTitle: "Kratom Advanced Quiz", moduleId: "m10", attempts: 1, bestScore: 90, latestScore: 90, passed: true, completedAt: "2023-11-01" },
      { quizId: "q11", quizTitle: "Loss Prevention Quiz", moduleId: "m11", attempts: 1, bestScore: 87, latestScore: 87, passed: true, completedAt: "2024-01-15" },
      { quizId: "q12", quizTitle: "Opening & Closing Quiz", moduleId: "m12", attempts: 1, bestScore: 100, latestScore: 100, passed: true, completedAt: "2024-02-01" },
    ],
    earnedBadgeIds: ["first-step", "getting-started", "halfway-there", "fully-certified", "first-pass", "perfect-score", "quiz-master", "delta-starter", "delta-pro", "delta-expert", "kratom-starter", "kratom-guide", "kratom-authority", "kanna-curious", "kanna-specialist", "glass-101", "glass-curator", "compliance-ready", "by-the-book", "loss-prevention-ace", "floor-ready", "closer", "people-person", "top-seller"],
  },
  {
    id: "e5",
    name: "Devon Castillo",
    email: "d.castillo@highlife.com",
    role: "Sales Associate",
    storeLocation: "Northpark",
    district: "North District",
    hireDate: "2024-04-15",
    lastActive: "2024-06-05",
    completedModules: ["m1"],
    inProgressModules: [],
    assignedModules: ["m1", "m2", "m3", "m5", "m6", "m7"],
    quizAttempts: [
      { quizId: "q1", quizTitle: "Delta 101 Quiz", moduleId: "m1", attempts: 4, bestScore: 72, latestScore: 72, passed: true, completedAt: "2024-05-10" },
    ],
    earnedBadgeIds: ["first-step", "comeback-kid", "delta-starter"],
  },
  {
    id: "e6",
    name: "Aaliyah Monroe",
    email: "a.monroe@highlife.com",
    role: "Shift Lead",
    storeLocation: "Downtown",
    district: "Metro North",
    hireDate: "2023-11-01",
    lastActive: "2024-06-12",
    completedModules: ["m1", "m2", "m3", "m5", "m6", "m7", "m8"],
    inProgressModules: ["m4", "m9"],
    assignedModules: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10"],
    quizAttempts: [
      { quizId: "q1", quizTitle: "Delta 101 Quiz", moduleId: "m1", attempts: 1, bestScore: 88, latestScore: 88, passed: true, completedAt: "2023-12-01" },
      { quizId: "q2", quizTitle: "Kratom Fundamentals Quiz", moduleId: "m2", attempts: 1, bestScore: 84, latestScore: 84, passed: true, completedAt: "2023-12-10" },
      { quizId: "q3", quizTitle: "Kanna Wellness Quiz", moduleId: "m3", attempts: 2, bestScore: 80, latestScore: 80, passed: true, completedAt: "2023-12-18" },
      { quizId: "q5", quizTitle: "Compliance Language Quiz", moduleId: "m5", attempts: 1, bestScore: 91, latestScore: 91, passed: true, completedAt: "2024-01-08" },
      { quizId: "q6", quizTitle: "Sales Techniques Quiz", moduleId: "m6", attempts: 1, bestScore: 93, latestScore: 93, passed: true, completedAt: "2024-01-15" },
      { quizId: "q7", quizTitle: "Customer Service Quiz", moduleId: "m7", attempts: 1, bestScore: 89, latestScore: 89, passed: true, completedAt: "2024-01-22" },
      { quizId: "q8", quizTitle: "Store Operations Quiz", moduleId: "m8", attempts: 1, bestScore: 86, latestScore: 86, passed: true, completedAt: "2024-02-05" },
    ],
    earnedBadgeIds: ["first-step", "getting-started", "first-pass", "delta-starter", "kratom-starter", "kanna-curious", "compliance-ready", "by-the-book", "floor-ready", "closer", "people-person"],
  },
  {
    id: "e7",
    name: "Jordan Kim",
    email: "j.kim@highlife.com",
    role: "Sales Associate",
    storeLocation: "Eastside",
    district: "East District",
    hireDate: "2024-03-01",
    lastActive: "2024-06-01",
    completedModules: ["m7"],
    inProgressModules: ["m1"],
    assignedModules: ["m1", "m2", "m3", "m5", "m6", "m7"],
    quizAttempts: [
      { quizId: "q7", quizTitle: "Customer Service Quiz", moduleId: "m7", attempts: 1, bestScore: 65, latestScore: 65, passed: true, completedAt: "2024-03-20" },
    ],
    earnedBadgeIds: ["first-step", "first-pass"],
  },
  {
    id: "e8",
    name: "Brianna Torres",
    email: "b.torres@highlife.com",
    role: "Store Manager",
    storeLocation: "Westgate",
    district: "West District",
    hireDate: "2022-08-15",
    lastActive: "2024-06-13",
    completedModules: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10", "m11", "m12", "m13"],
    inProgressModules: [],
    assignedModules: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10", "m11", "m12", "m13"],
    quizAttempts: [
      { quizId: "q1", quizTitle: "Delta 101 Quiz", moduleId: "m1", attempts: 1, bestScore: 100, latestScore: 100, passed: true, completedAt: "2022-09-01" },
      { quizId: "q2", quizTitle: "Kratom Fundamentals Quiz", moduleId: "m2", attempts: 1, bestScore: 96, latestScore: 96, passed: true, completedAt: "2022-09-08" },
      { quizId: "q3", quizTitle: "Kanna Wellness Quiz", moduleId: "m3", attempts: 1, bestScore: 94, latestScore: 94, passed: true, completedAt: "2022-09-15" },
      { quizId: "q4", quizTitle: "Glass & Accessories Quiz", moduleId: "m4", attempts: 1, bestScore: 98, latestScore: 98, passed: true, completedAt: "2022-09-22" },
      { quizId: "q5", quizTitle: "Compliance Language Quiz", moduleId: "m5", attempts: 1, bestScore: 100, latestScore: 100, passed: true, completedAt: "2022-10-01" },
      { quizId: "q6", quizTitle: "Sales Techniques Quiz", moduleId: "m6", attempts: 1, bestScore: 97, latestScore: 97, passed: true, completedAt: "2022-10-10" },
      { quizId: "q7", quizTitle: "Customer Service Quiz", moduleId: "m7", attempts: 1, bestScore: 100, latestScore: 100, passed: true, completedAt: "2022-10-18" },
      { quizId: "q8", quizTitle: "Store Operations Quiz", moduleId: "m8", attempts: 1, bestScore: 95, latestScore: 95, passed: true, completedAt: "2022-11-01" },
      { quizId: "q9", quizTitle: "Delta Advanced Quiz", moduleId: "m9", attempts: 1, bestScore: 92, latestScore: 92, passed: true, completedAt: "2023-01-10" },
      { quizId: "q10", quizTitle: "Kratom Advanced Quiz", moduleId: "m10", attempts: 1, bestScore: 91, latestScore: 91, passed: true, completedAt: "2023-02-01" },
      { quizId: "q11", quizTitle: "Loss Prevention Quiz", moduleId: "m11", attempts: 1, bestScore: 89, latestScore: 89, passed: true, completedAt: "2023-04-01" },
      { quizId: "q12", quizTitle: "Opening & Closing Quiz", moduleId: "m12", attempts: 1, bestScore: 100, latestScore: 100, passed: true, completedAt: "2023-05-01" },
      { quizId: "q13", quizTitle: "Merchandising Quiz", moduleId: "m13", attempts: 1, bestScore: 93, latestScore: 93, passed: true, completedAt: "2023-06-01" },
    ],
    earnedBadgeIds: ["first-step", "getting-started", "halfway-there", "fully-certified", "highlife-elite", "streak-5", "streak-30", "first-pass", "perfect-score", "quiz-master", "clean-sweep", "delta-starter", "delta-pro", "delta-expert", "kratom-starter", "kratom-guide", "kratom-authority", "kanna-curious", "kanna-specialist", "glass-101", "glass-curator", "compliance-ready", "by-the-book", "loss-prevention-ace", "floor-ready", "closer", "people-person", "top-seller"],
  },
]

// ADDED TIP:
export const tipOfTheDay: SalesTip = {
  id: "tod1",
  category: "recommendations",
  title: "Start with 'Why' Not 'What'",
  content:
    "Instead of asking 'What are you looking for?', try 'What brings you in today?' This opens up conversation about their goals and needs, not just product categories. You'll learn more and make better recommendations.",
}
