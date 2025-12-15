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

export interface Product {
  id: string
  name: string
  category: "delta" | "kratom" | "glass" | "accessories"
  image?: string
  description: string
  effects: string[]
  talkingPoints: string[]
  complianceNotes: string[]
  relatedProducts: string[]
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

// Mock Data
export const mockEmployee: Employee = {
  id: "EMP001",
  name: "Alex Johnson",
  email: "alex.johnson@highlife.com",
  role: "Sales Associate",
  storeLocation: "Downtown Location",
  completedModules: 3,
  totalModules: 10,
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
    description: "Premium delta-8 THC gummies with natural fruit flavors. Each gummy contains 25mg of delta-8 THC.",
    effects: ["Relaxation", "Mild euphoria", "Stress relief", "Improved sleep"],
    talkingPoints: [
      "Great for customers new to delta products",
      "Long-lasting effects compared to vapes",
      "Precise dosing with each gummy",
      "Lab-tested for purity and potency",
    ],
    complianceNotes: ["Must verify 21+ age", "Cannot make medical claims", "Derived from hemp with <0.3% Delta-9 THC"],
    relatedProducts: ["p2", "p3"],
  },
  {
    id: "p2",
    name: "Delta-9 THC Vape Cartridge",
    category: "delta",
    image: "/premium-vape-cartridge-gold-oil-cannabis-product-s.jpg",
    description: "High-quality delta-9 THC vape cartridge with ceramic coil technology for smooth hits.",
    effects: ["Quick onset", "Euphoria", "Creativity boost", "Relaxation"],
    talkingPoints: [
      "Fast-acting effects within minutes",
      "Ceramic coil prevents burnt taste",
      "Multiple strain options available",
      "510 thread compatible",
    ],
    complianceNotes: ["Must verify 21+ age", "Cannot make medical claims", "Hemp-derived product"],
    relatedProducts: ["p1", "p4"],
  },
  {
    id: "p3",
    name: "Green Maeng Da Kratom",
    category: "kratom",
    image: "/green-kratom-powder-in-white-bowl-with-kratom-leav.jpg",
    description: "Premium green vein Maeng Da kratom powder sourced from mature leaves.",
    effects: ["Energy boost", "Focus enhancement", "Mood elevation", "Mild pain relief"],
    talkingPoints: [
      "One of our most popular strains",
      "Great for daytime use",
      "Balanced effects between energy and relaxation",
      "Third-party lab tested",
    ],
    complianceNotes: ["Not FDA approved", "Cannot make medical claims", "Recommend starting with small dose"],
    relatedProducts: ["p5", "p6"],
  },
  {
    id: "p4",
    name: "Red Bali Kratom Capsules",
    category: "kratom",
    image: "/kratom-capsules-in-amber-bottle-supplement-product.jpg",
    description: "Red vein Bali kratom in convenient capsule form for easy dosing.",
    effects: ["Relaxation", "Stress relief", "Pain relief", "Sleep support"],
    talkingPoints: [
      "Perfect for customers who dislike powder taste",
      "Pre-measured doses for consistency",
      "Best for evening use",
      "Popular among returning customers",
    ],
    complianceNotes: ["Not FDA approved", "Cannot make medical claims", "Start with recommended dose"],
    relatedProducts: ["p3", "p5"],
  },
  {
    id: "p5",
    name: "Heady Glass Water Pipe",
    category: "glass",
    image: "/artistic-heady-glass-water-pipe-colorful-blown-gla.jpg",
    description: "Handcrafted heady glass water pipe with unique artistic design.",
    effects: [],
    talkingPoints: [
      "One-of-a-kind artistic piece",
      "American-made craftsmanship",
      "Functional art for collectors",
      "Unique gift option",
    ],
    complianceNotes: ["For tobacco use only", "Handle with care - glass product"],
    relatedProducts: ["p6", "p7"],
  },
  {
    id: "p6",
    name: "Scientific Glass Beaker",
    category: "glass",
    image: "/clear-scientific-glass-beaker-bong-with-ice-catche.jpg",
    description: "Scientific-style glass beaker with ice catcher and diffused downstem.",
    effects: [],
    talkingPoints: [
      "Durable borosilicate glass",
      "Ice catcher for cooler hits",
      "Easy to clean design",
      "Great everyday piece",
    ],
    complianceNotes: ["For tobacco use only", "Handle with care - glass product"],
    relatedProducts: ["p5", "p7"],
  },
  {
    id: "p7",
    name: "Premium Grinder",
    category: "accessories",
    image: "/premium-aluminum-herb-grinder-4-piece-matte-black-.jpg",
    description: "Four-piece aluminum grinder with kief catcher and sharp diamond teeth.",
    effects: [],
    talkingPoints: [
      "Sharp teeth for efficient grinding",
      "Kief catcher for bonus material",
      "Multiple color options",
      "Lifetime warranty",
    ],
    complianceNotes: ["For tobacco use only"],
    relatedProducts: ["p8"],
  },
  {
    id: "p8",
    name: "Rolling Tray Set",
    category: "accessories",
    image: "/premium-rolling-tray-set-with-accessories-organize.jpg",
    description: "Complete rolling tray set with magnetic lid and accessory compartments.",
    effects: [],
    talkingPoints: [
      "Everything needed in one set",
      "Great gift option",
      "Multiple design options",
      "Quality accessories included",
    ],
    complianceNotes: ["For tobacco use only"],
    relatedProducts: ["p7"],
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
  // ADDED MODULE: Phase 3: Policies & Conduct
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
  // ADDED MODULE: Phase 3: Compliance & Legal
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

// ADDED TIP:
export const tipOfTheDay: SalesTip = {
  id: "tod1",
  category: "recommendations",
  title: "Start with 'Why' Not 'What'",
  content:
    "Instead of asking 'What are you looking for?', try 'What brings you in today?' This opens up conversation about their goals and needs, not just product categories. You'll learn more and make better recommendations.",
}
