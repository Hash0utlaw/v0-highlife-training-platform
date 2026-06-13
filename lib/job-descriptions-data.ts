export interface JobBenefit {
  label: string
  value: string
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
  responsibilities: string[]
  kpis: string[]
  benefits: JobBenefit[]
  benefitsNote?: string
  salaryEffectiveDate?: string
}

export const jobDescriptions: JobDescription[] = [
  {
    id: "shift-lead",
    title: "Shift Lead",
    shortTitle: "Shift Lead",
    icon: "user-check",
    level: 1,
    reportsTo: "Store Manager",
    compensation: "$20.00 / hour",
    summary:
      "The Shift Lead provides exceptional customer service, maintains product knowledge, supports store operations, and contributes to sales growth.",
    responsibilities: [
      "Deliver outstanding customer service",
      "Educate customers on products and promotions",
      "Meet individual sales expectations",
      "Process transactions accurately",
      "Maintain store cleanliness and presentation",
      "Receive and stock merchandise",
      "Assist with inventory counts",
      "Follow compliance and verification procedures",
      "Resolve customer concerns professionally",
      "Participate in training and team meetings",
      "Perform other duties as assigned",
    ],
    kpis: [
      "Individual sales performance",
      "Average transaction value",
      "Units per transaction",
      "Customer satisfaction feedback",
      "Attendance and punctuality",
      "Compliance adherence",
      "Inventory count accuracy",
      "Training completion rate",
    ],
    benefits: [
      { label: "Paid Time Off", value: "5 PTO days per calendar year" },
      { label: "Sick Days", value: "3 paid sick days per calendar year" },
      { label: "Medical, Vision & Dental", value: "Offered through BCBS after 90 days" },
      { label: "Life & AD&D", value: "100% company paid after 90 days" },
    ],
    salaryEffectiveDate: "6/14/2026",
  },
  {
    id: "assistant-manager",
    title: "Assistant Manager",
    shortTitle: "Assistant Mgr",
    icon: "user-cog",
    level: 2,
    reportsTo: "Store Manager",
    compensation: "Title update",
    summary:
      "The Assistant Manager supports the Store Manager in daily operations, team leadership, and driving store performance, stepping in to lead the store when the Store Manager is unavailable.",
    responsibilities: [
      "Support daily store operations alongside the Store Manager",
      "Help recruit, train, and develop staff",
      "Drive sales and customer retention",
      "Maintain compliance with company and regulatory requirements",
      "Assist with labor scheduling and payroll controls",
      "Support inventory accuracy and loss prevention",
      "Ensure exceptional customer service",
      "Lead team meetings in the Store Manager's absence",
      "Assist with cash handling and banking procedures",
      "Maintain store appearance and merchandising standards",
      "Perform other duties as assigned",
    ],
    kpis: [
      "Monthly sales goal attainment",
      "Gross profit margin achievement",
      "Inventory accuracy of 98% or higher",
      "Shrink/loss percentage below target",
      "Labor costs within budget",
      "Customer satisfaction scores",
      "Employee retention and turnover metrics",
      "Store audit score of 90% or higher",
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
  {
    id: "store-manager",
    title: "Store Manager",
    shortTitle: "Store Manager",
    icon: "store",
    level: 3,
    reportsTo: "District / Field Manager",
    compensation: "$50,000 / year",
    compensationNote:
      "Based on an average 50-hour work week. $961.53 weekly salary.",
    summary:
      "The Store Manager is responsible for overall store performance, team leadership, customer experience, compliance, inventory management, and achieving financial goals.",
    responsibilities: [
      "Manage daily store operations",
      "Recruit, train, and develop staff",
      "Drive sales and customer retention",
      "Maintain compliance with company and regulatory requirements",
      "Monitor labor scheduling and payroll controls",
      "Oversee inventory accuracy and loss prevention",
      "Ensure exceptional customer service",
      "Conduct team meetings and performance reviews",
      "Manage cash handling and banking procedures",
      "Maintain store appearance and merchandising standards",
      "Perform other duties as assigned",
    ],
    kpis: [
      "Monthly sales goal attainment",
      "Gross profit margin achievement",
      "Inventory accuracy of 98% or higher",
      "Shrink/loss percentage below target",
      "Labor costs within budget",
      "Customer satisfaction scores",
      "Employee retention and turnover metrics",
      "Store audit score of 90% or higher",
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
  {
    id: "district-manager",
    title: "District / Field Manager",
    shortTitle: "District Mgr",
    icon: "map",
    level: 4,
    reportsTo: "Assigned Supervisor",
    compensation: "$60,000 / year",
    summary:
      "The District Manager oversees multiple retail locations, ensuring operational excellence, sales growth, compliance, profitability, and leadership development across assigned stores.",
    responsibilities: [
      "Lead and support Store Managers within assigned district",
      "Drive sales performance and profitability",
      "Ensure compliance with company policies and state regulations",
      "Conduct regular store audits and inspections",
      "Analyze sales, labor, and inventory metrics",
      "Develop and coach management teams",
      "Support hiring, onboarding, and succession planning",
      "Monitor customer service standards",
      "Investigate and resolve escalated customer and employee concerns",
      "Execute company initiatives and strategic objectives",
      "Perform other duties as assigned",
    ],
    kpis: [
      "District sales growth versus prior year",
      "District EBITDA/profitability goals achieved",
      "Labor cost percentage maintained within budget",
      "Store audit scores of 90%+",
      "Employee turnover below company target",
      "Inventory shrink maintained below target levels",
      "Customer satisfaction scores above company benchmark",
      "Completion of monthly store visits and coaching sessions",
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
