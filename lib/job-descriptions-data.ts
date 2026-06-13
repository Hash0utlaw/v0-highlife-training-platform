export interface JobBenefit {
  label: string
  value: string
}

export interface JobItem {
  title: string
  detail: string
}

export interface JobDescription {
  id: string
  title: string
  shortTitle: string
  icon: string // lucide icon name
  level: number // for ordering / hierarchy display
  reportsTo: string
  compensation: string
  compensationNote?: string
  summary: string
  responsibilities: JobItem[]
  kpis: JobItem[]
  benefits: JobBenefit[]
  benefitsNote?: string
  salaryEffectiveDate?: string
}

export const jobDescriptions: JobDescription[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // SHIFT LEAD
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "shift-lead",
    title: "Shift Lead",
    shortTitle: "Shift Lead",
    icon: "user-check",
    level: 1,
    reportsTo: "Store Manager",
    compensation: "$20.00 / hour",
    summary:
      "The Shift Lead is the go-to person on the floor during their shift. You are responsible for delivering an exceptional customer experience, maintaining expert-level product knowledge, supporting smooth store operations, and personally contributing to the store's sales goals. When a manager is not present, you are the leader.",
    responsibilities: [
      {
        title: "Deliver Outstanding Customer Service",
        detail:
          "Greet every customer warmly and promptly. Ask open-ended questions to understand what they are looking for, make confident product recommendations, and ensure every person who walks out the door feels helped — not just sold to. Resolve complaints professionally and escalate to management when needed.",
      },
      {
        title: "Educate Customers on Products and Promotions",
        detail:
          "Stay current on all products in the store — including Delta, Kratom, Kanna, glass, accessories, and any new arrivals. Be able to explain how products work, what makes them different, and who they are best suited for. Proactively share current promotions, bundles, and loyalty program benefits with every customer.",
      },
      {
        title: "Meet Individual Sales Expectations",
        detail:
          "You are expected to hit your personal sales targets every shift. This means being active on the floor, engaging customers rather than waiting for them to ask questions, and following up on add-on opportunities. Track your own performance throughout the shift and adjust your approach if you are behind.",
      },
      {
        title: "Process Transactions Accurately",
        detail:
          "Handle all point-of-sale transactions with precision — correct product entry, accurate cash handling, proper change, and clean register closeouts. Never skip ID verification for age-restricted products. Report any discrepancies to the manager immediately.",
      },
      {
        title: "Maintain Store Cleanliness and Presentation",
        detail:
          "A clean store sells more. Keep all displays stocked, faced, and organized. Wipe down cases and counters regularly throughout the shift. Ensure the entrance, bathrooms, and back areas meet brand standards at all times — not just at open and close.",
      },
      {
        title: "Receive and Stock Merchandise",
        detail:
          "Check in deliveries against purchase orders, note and report discrepancies immediately, and ensure all products are properly priced, tagged, and merchandised on the sales floor or stored correctly in the back. Speed and accuracy at receiving prevents downstream inventory issues.",
      },
      {
        title: "Assist With Inventory Counts",
        detail:
          "Participate in scheduled and spot inventory counts. Count accurately and honestly — this data is used to calculate shrink, order new product, and evaluate store health. Do not estimate; count every unit.",
      },
      {
        title: "Follow Compliance and Verification Procedures",
        detail:
          "You are legally responsible for checking ID before selling any age-restricted product. No exceptions. Follow all company compliance guidelines, state regulations, and store-specific procedures. Failure to comply is grounds for immediate termination.",
      },
      {
        title: "Resolve Customer Concerns Professionally",
        detail:
          "Listen fully before responding. Acknowledge the issue, apologize when appropriate, and offer a solution within your authority. If a resolution is outside your scope, involve the manager — never argue with a customer or make promises you cannot keep.",
      },
      {
        title: "Lead the Floor in the Manager's Absence",
        detail:
          "As a Shift Lead, you are the highest authority when the Store Manager or Assistant Manager is not present. Make decisions confidently, keep the team focused and productive, handle customer escalations, and ensure all opening or closing procedures are completed correctly.",
      },
      {
        title: "Participate in Training and Team Meetings",
        detail:
          "Complete all assigned training modules on time through the Highlife training platform. Attend all scheduled team meetings. Apply what you learn immediately on the floor — training is not optional and not just for new hires.",
      },
    ],
    kpis: [
      {
        title: "Individual Sales Performance",
        detail:
          "Your sales are tracked every shift. You are expected to hit or exceed your assigned daily and weekly sales targets. Consistent underperformance relative to your peers will be addressed in coaching sessions.",
      },
      {
        title: "Average Transaction Value (ATV)",
        detail:
          "The average dollar amount per transaction in your sales. A strong ATV means you are recommending additional products, upselling premium options, and not leaving money on the table. Target is set by the Store Manager based on store averages.",
      },
      {
        title: "Units Per Transaction (UPT)",
        detail:
          "How many products the average customer buys when you help them. A UPT above 1.5 means you are effectively suggesting add-ons and complementary items. This is a direct reflection of your product knowledge and customer engagement.",
      },
      {
        title: "Customer Satisfaction Feedback",
        detail:
          "Based on any customer feedback, surveys, or direct manager observations. Consistent positive feedback demonstrates that you are delivering the Highlife customer experience. Negative feedback or complaints tied to you will be discussed and coached.",
      },
      {
        title: "Attendance and Punctuality",
        detail:
          "You are expected to arrive at least 5 minutes before your shift starts, ready to work. Unexcused absences and late arrivals directly impact the team. Your attendance record is reviewed during performance evaluations and affects your standing for raises and promotions.",
      },
      {
        title: "Compliance Adherence",
        detail:
          "Zero tolerance for skipping ID checks or violating any regulatory requirement. Any compliance failure is documented and can result in immediate termination. 100% compliance is the only acceptable standard.",
      },
      {
        title: "Inventory Count Accuracy",
        detail:
          "Your counts during inventory cycles are expected to match system records within a tight tolerance. Inaccurate counts create false shrink data and ordering errors. Accuracy above 98% is expected.",
      },
      {
        title: "Training Completion Rate",
        detail:
          "All assigned training modules must be completed by the due date set by your manager. Your completion percentage is visible to management and affects your eligibility for advancement. 100% completion on time is expected.",
      },
    ],
    benefits: [
      { label: "Paid Time Off", value: "5 PTO days per calendar year" },
      { label: "Sick Days", value: "3 paid sick days per calendar year" },
      { label: "Medical, Vision & Dental", value: "Offered through BCBS after 90 days" },
      { label: "Life & AD&D", value: "100% company paid after 90 days" },
    ],
    salaryEffectiveDate: "6/14/2026",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ASSISTANT MANAGER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "assistant-manager",
    title: "Assistant Manager",
    shortTitle: "Assistant Mgr",
    icon: "user-cog",
    level: 2,
    reportsTo: "Store Manager",
    compensation: "See offer letter",
    summary:
      "The Assistant Manager is the Store Manager's right hand. You are responsible for supporting daily operations, coaching the team, maintaining compliance, and stepping into full store leadership whenever the Store Manager is unavailable. This role is a direct pipeline to the Store Manager position.",
    responsibilities: [
      {
        title: "Support Daily Store Operations",
        detail:
          "Work side by side with the Store Manager to ensure the store runs efficiently every day. Own the opening or closing process when assigned. Ensure checklists are completed, the floor is presentation-ready, and the team is on task from the moment the shift starts to the moment it ends.",
      },
      {
        title: "Help Recruit, Train, and Develop Staff",
        detail:
          "Assist the Store Manager in interviewing candidates and selecting team members who represent Highlife values. Onboard new hires thoroughly — walk them through the training platform, shadow shifts, and product knowledge sessions. Identify top performers and help them advance. Address performance gaps early with honest, documented coaching.",
      },
      {
        title: "Drive Sales and Customer Retention",
        detail:
          "Set the example on the floor. Your personal sales numbers matter, but equally important is how you coach your team during live selling situations. Debrief your team after slow periods. Celebrate wins publicly and coach misses privately. Ensure promotions are being communicated to every customer.",
      },
      {
        title: "Maintain Compliance with Company and Regulatory Requirements",
        detail:
          "You are the compliance enforcer when the Store Manager is not present. Ensure every team member is carding customers, following state regulations, and adhering to all company policies without exception. Document any violations immediately and escalate to the Store Manager.",
      },
      {
        title: "Assist with Labor Scheduling and Payroll Controls",
        detail:
          "Support the Store Manager in building efficient schedules that meet customer demand while staying within the labor budget. Monitor clock-ins and clock-outs throughout the day. Catch and correct unapproved overtime before it posts. Every dollar over the labor budget comes off the bottom line.",
      },
      {
        title: "Support Inventory Accuracy and Loss Prevention",
        detail:
          "Conduct regular cycle counts and spot checks. Investigate discrepancies immediately — do not wait for the next full inventory. Observe team member behavior for internal theft indicators and report concerns to the Store Manager. A low shrink rate is a direct reflection of your daily diligence.",
      },
      {
        title: "Ensure Exceptional Customer Service",
        detail:
          "Intervene promptly in any customer situation that a sales associate cannot resolve. Set the tone for how your team treats customers — model the behavior you expect. Every escalated complaint should be handled with empathy, speed, and a real resolution.",
      },
      {
        title: "Lead Team Meetings and Communication in the Manager's Absence",
        detail:
          "When the Store Manager is off, you run the store completely. Hold the daily briefing, set the shift goals, address issues as they arise, and maintain accountability. Communicate anything material to the Store Manager during or after the shift.",
      },
      {
        title: "Assist with Cash Handling and Banking Procedures",
        detail:
          "Count all cash drawers with precision. Prepare bank deposits accurately and on the established schedule. Reconcile any discrepancies immediately and document them. No cash shortages should go unexplained.",
      },
      {
        title: "Maintain Store Appearance and Merchandising Standards",
        detail:
          "The store should look the same at 8pm as it does at opening. Maintain full, faced, and clean displays throughout the day. Ensure signage is current, prices are accurate, and any new merchandise is set to planogram before it opens for sale.",
      },
    ],
    kpis: [
      {
        title: "Monthly Sales Goal Attainment",
        detail:
          "Your store's monthly revenue target is set by the District Manager. The Assistant Manager is expected to help drive the store to 100% of goal or above every single month. Tracking your progress weekly — not just at month end — is critical to hitting the number.",
      },
      {
        title: "Gross Profit Margin Achievement",
        detail:
          "Revenue alone is not the goal — margin is. You are expected to protect the store's gross margin by minimizing markdowns, controlling shrink, and ensuring products are sold at their intended price point. Know your store's margin targets and flag any trends moving in the wrong direction.",
      },
      {
        title: "Inventory Accuracy of 98% or Higher",
        detail:
          "Every item in the store should be in the system. Inventory accuracy below 98% creates ordering errors, missed sales, and inflated shrink numbers. Your responsibility is to maintain tight controls between formal inventory cycles through daily spot checks and disciplined receiving procedures.",
      },
      {
        title: "Shrink / Loss Percentage Below Target",
        detail:
          "Shrink comes from shoplifting, internal theft, receiving errors, and damage. Your target is to keep total shrink below the company-set threshold for your store. Every dollar of shrink is a dollar that does not make it to the bottom line. Active floor presence and consistent compliance are your primary tools.",
      },
      {
        title: "Labor Costs Within Budget",
        detail:
          "Labor is the store's largest controllable expense. Your job is to ensure every scheduled hour is productive and that no unapproved overtime is incurred. If the store is slow, you should be proactively sending people home. If it is busy, you escalate to the Store Manager before you go over hours.",
      },
      {
        title: "Customer Satisfaction Scores",
        detail:
          "Measured through any customer feedback mechanisms the company uses. The goal is consistent, high ratings that reflect the Highlife experience. Address recurring themes in negative feedback immediately with coaching or process changes.",
      },
      {
        title: "Employee Retention and Turnover Metrics",
        detail:
          "High turnover is expensive and disruptive. Your job is to create an environment where good employees want to stay. This means fair scheduling, consistent communication, recognition of good work, and swift resolution of workplace issues. Turnover below the company average for your store tier is the target.",
      },
      {
        title: "Store Audit Score of 90% or Higher",
        detail:
          "District and company audits evaluate compliance, presentation, operations, and customer experience. A score of 90% or higher is the minimum acceptable standard. You should be conducting internal self-audits regularly so there are no surprises when the formal audit occurs.",
      },
    ],
    benefits: [
      { label: "Paid Time Off", value: "Per company handbook" },
      { label: "Sick Days", value: "Per company handbook" },
      { label: "Medical, Vision & Dental", value: "Offered through BCBS after 90 days" },
      { label: "Life & AD&D", value: "100% company paid after 90 days" },
    ],
    benefitsNote:
      "Assistant Manager is a newly titled position. Refer to your offer letter and the company handbook for full compensation and benefit details.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORE MANAGER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "store-manager",
    title: "Store Manager",
    shortTitle: "Store Manager",
    icon: "store",
    level: 3,
    reportsTo: "District / Field Manager",
    compensation: "$50,000 / year",
    compensationNote: "Based on an average 50-hour work week. $961.53 weekly salary.",
    summary:
      "The Store Manager owns their store completely. You are accountable for every aspect of store performance — sales, profitability, team development, compliance, inventory, and customer experience. The District Manager sets the goals; you are responsible for hitting them and building a team capable of sustaining that success long after you are not on the floor.",
    responsibilities: [
      {
        title: "Manage Daily Store Operations",
        detail:
          "Ensure every shift runs with the same high standard regardless of who is working. Open and close the store to brand standards. Hold the team accountable to every checklist, every procedure, and every expectation. Operational consistency is what separates strong stores from struggling ones.",
      },
      {
        title: "Recruit, Train, and Develop Staff",
        detail:
          "You are entirely responsible for the talent on your team. Screen candidates thoroughly. Hire people who represent Highlife values, not just people who are available. Onboard new hires completely — they should never feel thrown onto the floor unprepared. Conduct regular training check-ins and use the Highlife training platform as a tool to track development. Promote from within whenever possible.",
      },
      {
        title: "Drive Sales and Customer Retention",
        detail:
          "Your primary financial obligation is to hit your monthly sales goal. You must understand your daily sales pace relative to the goal at all times — not just at the end of the month. Use promotions, suggestive selling coaching, and team competitions to drive energy and results. Build relationships with returning customers so they ask for your store by name.",
      },
      {
        title: "Maintain Compliance with Company and Regulatory Requirements",
        detail:
          "As the Store Manager, every compliance failure in your store is your failure. You are responsible for ensuring your entire team is trained, tested, and following all ID verification, age restriction, and company policy requirements without exception. Conduct internal audits regularly and address any gaps immediately.",
      },
      {
        title: "Monitor Labor Scheduling and Payroll Controls",
        detail:
          "Build schedules that match your store's traffic patterns and sales volume while staying inside your approved labor budget. Review timecards daily. Approve no overtime without prior District Manager authorization. Mis-managed labor is one of the fastest ways to turn a profitable store unprofitable.",
      },
      {
        title: "Oversee Inventory Accuracy and Loss Prevention",
        detail:
          "You are accountable for every unit in your store. Conduct cycle counts regularly between formal inventory periods. Investigate all discrepancies before they grow. Monitor for both external and internal theft indicators. Your shrink number is one of the most closely watched metrics in your performance review.",
      },
      {
        title: "Ensure Exceptional Customer Service",
        detail:
          "Set the bar for what a Highlife customer experience looks and feels like. Lead by example every time you are on the floor. Coach team members in real time when service falls short. Build a culture where customers are treated like they are the reason the lights are on — because they are.",
      },
      {
        title: "Conduct Team Meetings and Performance Reviews",
        detail:
          "Hold a brief team meeting at minimum weekly — use it to share sales results, recognize wins, set the goal for the coming week, and address any operational issues. Conduct formal one-on-one performance reviews with every team member at least quarterly. Document coaching conversations and follow up on commitments made.",
      },
      {
        title: "Manage Cash Handling and Banking Procedures",
        detail:
          "You are accountable for your store's cash at all times. Ensure every deposit is accurate, made on schedule, and documented. Any cash variance must be investigated and explained in writing the same day it is discovered. Protect your store's assets like they are your own.",
      },
      {
        title: "Maintain Store Appearance and Merchandising Standards",
        detail:
          "Your store's visual presentation is a direct driver of customer confidence and purchase decisions. Ensure every display is full, faced, and priced correctly at all times. Execute all company-directed planograms and promotional sets on time. Walk your store every day with fresh eyes — if something looks wrong to you, it looks wrong to customers.",
      },
    ],
    kpis: [
      {
        title: "Monthly Sales Goal Attainment",
        detail:
          "Your sales goal is set by the District Manager at the beginning of each month based on store history, market conditions, and company growth targets. You are expected to hit 100% of goal minimum. Consistent attainment above goal positions your store — and you — for increased resources and compensation consideration. Consistent misses require a written action plan and weekly check-ins.",
      },
      {
        title: "Gross Profit Margin Achievement",
        detail:
          "Sales without margin is not success. You must hit both the top-line revenue goal and the gross profit margin target. Protect margin by eliminating unnecessary markdowns, minimizing damage, and ensuring your team is not giving away product through unauthorized discounts. Know your margin target and track it weekly.",
      },
      {
        title: "Inventory Accuracy of 98% or Higher",
        detail:
          "The system should reflect exactly what is on your shelves. An accuracy rate below 98% indicates receiving errors, unreported damage, theft, or count inaccuracies — all of which require immediate investigation. Conduct random spot checks on high-velocity items at least twice per week.",
      },
      {
        title: "Shrink / Loss Percentage Below Target",
        detail:
          "Shrink target is set by the District Manager and reviewed at every inventory cycle. Shrink above target requires a formal root cause analysis and corrective action plan within 48 hours. You are expected to know your current shrink number at all times — not just when audits happen.",
      },
      {
        title: "Labor Costs Within Budget",
        detail:
          "Your labor budget is expressed as a percentage of sales. As your sales grow, your labor budget grows proportionally — but you must never exceed it without District Manager pre-approval. Review your labor cost every week and adjust the following week's schedule accordingly. Consistent over-budget labor results in a formal performance conversation.",
      },
      {
        title: "Customer Satisfaction Scores",
        detail:
          "You are responsible for the overall customer experience in your store. Monitor all feedback — surveys, direct comments, and any online reviews mentioning your location. Respond to negative feedback with action, not just acknowledgment. Your satisfaction scores are reviewed by the District Manager monthly.",
      },
      {
        title: "Employee Retention and Turnover Metrics",
        detail:
          "Replacing a team member costs time, training resources, and sales productivity. Your goal is to build a stable team by hiring right, onboarding thoroughly, and creating a work environment where people want to stay. Turnover above the company benchmark triggers a review of your hiring and management practices.",
      },
      {
        title: "Store Audit Score of 90% or Higher",
        detail:
          "District and corporate audits cover compliance, operations, presentation, and customer experience. You should be conducting a full self-audit of your store at least once per month using the same criteria. Any score below 90% on an official audit requires a corrective action plan submitted to the District Manager within 24 hours.",
      },
    ],
    benefits: [
      { label: "Paid Time Off", value: "7 PTO days per calendar year" },
      { label: "Sick Days", value: "3 paid sick days per calendar year" },
      { label: "Paid Holidays", value: "New Year's Day, Thanksgiving Day, Christmas Day" },
      { label: "Additional Holidays", value: "2 additional paid holidays (choose from handbook list)" },
      { label: "Medical, Vision & Dental", value: "Offered through BCBS after 90 days" },
      { label: "Life & AD&D", value: "100% company paid after 90 days" },
    ],
    salaryEffectiveDate: "6/14/2026",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DISTRICT / FIELD MANAGER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "district-manager",
    title: "District / Field Manager",
    shortTitle: "District Mgr",
    icon: "map",
    level: 4,
    reportsTo: "Assigned Supervisor",
    compensation: "$60,000 / year",
    summary:
      "The District Manager is a multi-unit leader responsible for the total performance of all stores in their assigned district. You do not run a single store — you develop the leaders who do. Your job is to build systems, hold Store Managers accountable, drive profitable growth, and ensure every Highlife location operates at the highest possible standard.",
    responsibilities: [
      {
        title: "Lead and Support Store Managers Within Assigned District",
        detail:
          "Your Store Managers are your direct reports and your primary leverage point for district performance. Visit each store on a regular cadence — every store in your district should be seen at minimum twice per month. During visits, do not just observe; coach in real time, identify gaps, and follow up on prior commitments. Your Store Managers should feel supported, challenged, and clear on what is expected of them.",
      },
      {
        title: "Drive Sales Performance and Profitability",
        detail:
          "You own the district's revenue and profitability numbers. Set monthly sales goals for each store based on historical performance, market opportunity, and company growth targets. Track performance weekly — not monthly — and intervene with underperforming stores before the month is lost. Identify what is working in your top stores and replicate it across the district.",
      },
      {
        title: "Ensure Compliance with Company Policies and State Regulations",
        detail:
          "You are responsible for ensuring every store in your district operates within all legal and company compliance requirements at all times. This includes age verification, product restrictions, cash handling, employee documentation, and any state-specific regulatory requirements. A compliance failure in any store in your district reflects directly on your leadership.",
      },
      {
        title: "Conduct Regular Store Audits and Inspections",
        detail:
          "Complete a formal audit of every store in your district at minimum once per month using the company audit tool. Audit results should be shared with the Store Manager immediately, with a corrective action plan required for any score below 90%. Track audit trends over time — a store that consistently scores between 88–92% needs a different intervention than one that drops suddenly.",
      },
      {
        title: "Analyze Sales, Labor, and Inventory Metrics",
        detail:
          "Review your district's key performance data at minimum weekly. Know each store's current sales pace relative to monthly goal, labor cost percentage, inventory accuracy rate, and shrink percentage. Use this data to prioritize where you spend your time. The stores with the most acute performance gaps need your attention first.",
      },
      {
        title: "Develop and Coach Management Teams",
        detail:
          "Great districts are built on great Store Managers, who are built by great District Managers. Invest significant time in the professional development of your team. Conduct formal one-on-ones with every Store Manager monthly. Document coaching conversations and hold managers accountable to their commitments. Identify your future Store Managers from within your Shift Lead and Assistant Manager ranks and actively develop them.",
      },
      {
        title: "Support Hiring, Onboarding, and Succession Planning",
        detail:
          "Partner with Store Managers on all management-level hires in the district. Ensure every new Store Manager receives a structured onboarding process and has a clear 30/60/90-day plan with defined milestones. Maintain a succession bench for every Store Manager role in your district — no position should ever be left without a credible internal candidate who is ready to step up.",
      },
      {
        title: "Monitor Customer Service Standards",
        detail:
          "District-level customer service leadership means setting the standard and holding stores accountable to it. Review customer feedback trends across the district monthly. Visit stores during peak hours to experience the customer interaction firsthand. Coach Store Managers on how to build service cultures, not just service scripts.",
      },
      {
        title: "Investigate and Resolve Escalated Customer and Employee Concerns",
        detail:
          "When a complaint or concern escalates beyond the Store Manager's ability to resolve, it comes to you. Handle all escalations with urgency, professionalism, and documentation. Employee relations concerns must be handled in strict accordance with company HR policy. Nothing should be swept under the rug — transparency with your supervisors is expected.",
      },
      {
        title: "Execute Company Initiatives and Strategic Objectives",
        detail:
          "When the company launches a new product line, a system change, a rebranding effort, or a new operational standard, you are the primary conduit for execution in your district. Your job is to translate company strategy into store-level action plans, communicate clearly to your Store Managers, and ensure consistent implementation across every location.",
      },
    ],
    kpis: [
      {
        title: "District Sales Growth vs. Prior Year",
        detail:
          "Your primary financial metric. Every store in the district is measured against the same calendar period from the prior year. You are expected to deliver positive comparable sales growth across the district. Stores that are declining require an active intervention plan; stores that are growing deserve recognition and resource support to accelerate further.",
      },
      {
        title: "District EBITDA / Profitability Goals Achieved",
        detail:
          "Sales growth means nothing if it does not convert to profit. You are accountable for the district's earnings before interest, taxes, depreciation, and amortization. This means managing labor, shrink, and operational costs across all stores while driving the top line. Know your district's EBITDA target and track the key drivers that move it.",
      },
      {
        title: "Labor Cost Percentage Maintained Within Budget",
        detail:
          "Labor is the largest controllable expense in the P&L. Each store has a labor budget expressed as a percentage of sales. Your job is to ensure all Store Managers are building and executing efficient schedules and that no store is consistently running over budget. Intervene proactively — district-level labor overages that go unaddressed for more than two weeks are a management failure.",
      },
      {
        title: "Store Audit Scores of 90%+",
        detail:
          "Every store in your district should score 90% or above on every formal audit. Your district audit average is reviewed by senior leadership. A district average below 90% requires a formal improvement plan. A store that fails an audit two months in a row requires a Performance Improvement Plan for the Store Manager.",
      },
      {
        title: "Employee Turnover Below Company Target",
        detail:
          "High turnover in your district is a signal that something is broken — whether in hiring practices, management quality, scheduling, or culture. Your district's annualized turnover rate is tracked and compared to the company average. You are expected to stay at or below the company benchmark. Stores with turnover spikes should be investigated and coached immediately.",
      },
      {
        title: "Inventory Shrink Maintained Below Target Levels",
        detail:
          "You own the district's shrink numbers. Each store's shrink percentage at every inventory cycle is consolidated into a district total. You are expected to maintain shrink below the company-set threshold. Chronic shrink issues in a single store require a root cause investigation, a corrective action plan, and potentially a change in personnel if the pattern does not improve.",
      },
      {
        title: "Customer Satisfaction Scores Above Company Benchmark",
        detail:
          "Your district's aggregate customer satisfaction score is reviewed monthly. Stores that are consistently below benchmark need a service culture intervention, not just coaching on individual interactions. You are responsible for identifying systemic service issues and working with the Store Manager to design lasting fixes.",
      },
      {
        title: "Completion of Monthly Store Visits and Coaching Sessions",
        detail:
          "You are expected to visit every store in your district at minimum twice per month, complete a formal audit once per month, and conduct a documented one-on-one coaching session with every Store Manager monthly. These are not optional and are tracked by your supervisor. Skipped visits and missed coaching sessions are performance issues in this role.",
      },
    ],
    benefits: [
      { label: "Paid Time Off", value: "7 PTO days per calendar year" },
      { label: "Sick Days", value: "3 paid sick days per calendar year" },
      { label: "Paid Holidays", value: "3 paid holidays" },
    ],
  },
]

// Standard language that applies to every position
export const standardLanguage = {
  reportingStructure: "Reports directly to assigned supervisor.",
  workEnvironment: "Retail, office, warehouse, and field environments as applicable.",
  physicalRequirements:
    "Ability to sit, stand, walk, lift, bend, and perform job-related duties as required.",
  disclaimer:
    "This job description is not intended to be an exhaustive list of all responsibilities, duties, or qualifications associated with the position. Responsibilities may change based on business needs. Employees are expected to perform other duties as assigned by management.",
}

export const companyContact = {
  address: "5300 Old Pineville Rd STE 156, Charlotte, NC 28217",
  phone: "704-333-3972",
}

export function getJobDescription(id: string): JobDescription | undefined {
  return jobDescriptions.find((j) => j.id === id)
}
