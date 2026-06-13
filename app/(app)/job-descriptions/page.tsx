"use client"

import { useState } from "react"
import {
  Briefcase,
  Store,
  Map,
  UserCheck,
  UserCog,
  ChevronRight,
  TrendingUp,
  ClipboardList,
  Target,
  Gift,
  DollarSign,
  Building2,
  Phone,
  Info,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  jobDescriptions,
  standardLanguage,
  companyContact,
  type JobDescription,
  type JobItem,
} from "@/lib/job-descriptions-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  store: Store,
  map: Map,
  "user-check": UserCheck,
  "user-cog": UserCog,
}

// Individual expandable item row
function ExpandableItem({
  item,
  accentColor,
  index,
}: {
  item: JobItem
  accentColor: string
  index: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <li className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-secondary/30 transition-colors"
        aria-expanded={open}
      >
        <span
          className={cn(
            "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5",
            accentColor,
          )}
        >
          {index + 1}
        </span>
        <span className="flex-1 text-sm font-semibold text-foreground leading-snug">{item.title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <div className="ml-8 pl-0">
            <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
          </div>
        </div>
      )}
    </li>
  )
}

export default function JobDescriptionsPage() {
  const [selectedId, setSelectedId] = useState(jobDescriptions[0].id)
  const role = jobDescriptions.find((j) => j.id === selectedId) as JobDescription
  const RoleIcon = iconMap[role.icon] || Briefcase

  return (
    <div className="min-h-[calc(100dvh-64px)] md:min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Briefcase className="h-3.5 w-3.5 text-primary" />
            <span>Careers &amp; Roles</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
            Job Descriptions
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl leading-relaxed">
            Review the responsibilities, performance goals, and benefits for each role at Highlife.
            Tap any item to expand the full detail. Understanding your path helps you grow with the company.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Role selector chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {jobDescriptions.map((job) => {
            const Icon = iconMap[job.icon] || Briefcase
            const isActive = job.id === selectedId
            return (
              <button
                key={job.id}
                onClick={() => setSelectedId(job.id)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium border transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40",
                )}
              >
                <Icon className="h-4 w-4" />
                {job.title}
              </button>
            )
          })}
        </div>

        {/* Detail card */}
        <article className="space-y-5">
          {/* Title block */}
          <div className="bg-card border border-border rounded-2xl p-5 md:p-7">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                <RoleIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">{role.title}</h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Reports to {role.reportsTo}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-primary" />
                    <span className="font-semibold text-foreground">{role.compensation}</span>
                  </span>
                </div>
                {role.compensationNote && (
                  <p className="text-xs text-muted-foreground mt-2">{role.compensationNote}</p>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-5 pt-5 border-t border-border">
              {role.summary}
            </p>
          </div>

          {/* Responsibilities */}
          <section className="bg-card border border-border rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-1.5">
              <ClipboardList className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Key Responsibilities
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4 ml-6">
              Tap each responsibility to see the full expectation.
            </p>
            <ul className="space-y-2">
              {role.responsibilities.map((item, i) => (
                <ExpandableItem
                  key={i}
                  item={item}
                  index={i}
                  accentColor="bg-primary/10 text-primary"
                />
              ))}
            </ul>
          </section>

          {/* KPIs */}
          <section className="bg-card border border-border rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-1.5">
              <Target className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Key Performance Indicators
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4 ml-6">
              These are the metrics your performance will be measured against.
            </p>
            <ul className="space-y-2">
              {role.kpis.map((item, i) => (
                <ExpandableItem
                  key={i}
                  item={item}
                  index={i}
                  accentColor="bg-amber-400/10 text-amber-400"
                />
              ))}
            </ul>
          </section>

          {/* Benefits */}
          <section className="bg-card border border-border rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Salary &amp; Benefits
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {role.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-0.5 rounded-xl bg-secondary/40 border border-border px-4 py-3"
                >
                  <span className="text-xs font-semibold text-foreground">{benefit.label}</span>
                  <span className="text-xs text-muted-foreground leading-relaxed">{benefit.value}</span>
                </div>
              ))}
            </div>
            {role.benefitsNote && (
              <div className="flex gap-2.5 mt-4 rounded-xl bg-primary/5 border border-primary/20 px-4 py-3">
                <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">{role.benefitsNote}</p>
              </div>
            )}
            {role.salaryEffectiveDate && (
              <p className="text-xs text-muted-foreground mt-4">
                Salary effective date:{" "}
                <span className="font-medium text-foreground">{role.salaryEffectiveDate}</span>
              </p>
            )}
          </section>

          {/* Standard language */}
          <section className="bg-card border border-border rounded-2xl p-5 md:p-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Standard Language for All Positions
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-xs font-semibold text-foreground">Reporting Structure</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                  {standardLanguage.reportingStructure}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-foreground">Work Environment</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                  {standardLanguage.workEnvironment}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-foreground">Physical Requirements</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                  {standardLanguage.physicalRequirements}
                </dd>
              </div>
            </dl>
            <div className="flex gap-2.5 mt-4 pt-4 border-t border-border">
              <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">{standardLanguage.disclaimer}</p>
            </div>
          </section>

          {/* Company contact */}
          <section className="flex flex-col sm:flex-row sm:items-center gap-4 bg-card border border-border rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2.5">
              <Building2 className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">{companyContact.address}</span>
            </div>
            <a
              href={`tel:${companyContact.phone.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline sm:ml-auto"
            >
              <Phone className="h-4 w-4" />
              {companyContact.phone}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </section>
        </article>
      </div>
    </div>
  )
}
