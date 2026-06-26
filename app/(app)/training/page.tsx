import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { mockModules } from "@/lib/data"
import TrainingListClient from "@/components/training-list-client"

export default async function TrainingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: progressRows } = await supabase
    .from("module_progress")
    .select("module_id, progress, completed")
    .eq("user_id", user.id)

  // Merge real DB progress onto the static module definitions
  const progressMap = new Map(
    (progressRows ?? []).map((r) => [r.module_id, r])
  )

  const modules = mockModules.map((m) => {
    const row = progressMap.get(m.id)
    return {
      ...m,
      progress: row?.progress ?? 0,
      completed: row?.completed ?? false,
    }
  })

  return <TrainingListClient modules={modules} />
}
