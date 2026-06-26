import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { mockModules } from "@/lib/data"
import TrainingModuleClient from "@/components/training-module-client"
import { revalidatePath } from "next/cache"

// ─── Server Action: save lesson/module progress ───────────────────────────────

async function saveLessonProgress(
  moduleId: string,
  completedLessonIds: string[],
  totalLessons: number
) {
  "use server"
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const progress = Math.round((completedLessonIds.length / totalLessons) * 100)
  const completed = completedLessonIds.length === totalLessons

  const module = mockModules.find((m) => m.id === moduleId)
  const moduleTitle = module?.title ?? moduleId

  await supabase.from("module_progress").upsert(
    {
      user_id: user.id,
      module_id: moduleId,
      module_title: moduleTitle,
      progress,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    },
    { onConflict: "user_id,module_id" }
  )

  revalidatePath("/training")
  revalidatePath("/dashboard")
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TrainingModulePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const module = mockModules.find((m) => m.id === id)
  if (!module) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="text-xl font-bold">Module Not Found</h1>
        <p className="text-muted-foreground text-sm">This training module does not exist.</p>
        <a href="/training" className="text-primary text-sm underline">Back to Training</a>
      </div>
    )
  }

  // Load existing progress for this module
  const { data: progressRow } = await supabase
    .from("module_progress")
    .select("progress, completed")
    .eq("user_id", user.id)
    .eq("module_id", id)
    .maybeSingle()

  // Determine which lessons are already done based on saved progress %
  // We mark the first N lessons as completed based on saved progress
  const savedProgress = progressRow?.progress ?? 0
  const completedCount = Math.round((savedProgress / 100) * module.lessons.length)
  const initialCompletedLessonIds = module.lessons
    .slice(0, completedCount)
    .map((l) => l.id)

  return (
    <TrainingModuleClient
      module={module}
      initialCompletedLessonIds={initialCompletedLessonIds}
      onSaveProgress={saveLessonProgress}
    />
  )
}
