import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { mockModules, allBadgeDefinitions, badgeTierMeta, badgeCategoryMeta } from "@/lib/data"
import ProfileClient from "@/components/profile-client"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  // Fetch all user data in parallel
  const [profileResult, moduleProgressResult, quizResultsResult, badgesResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("module_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false }),
    supabase
      .from("quiz_results")
      .select("*")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false }),
    supabase
      .from("employee_badges")
      .select("*")
      .eq("user_id", user.id)
      .order("earned_at", { ascending: false }),
  ])

  const profile = profileResult.data
  const moduleProgress = moduleProgressResult.data ?? []
  const quizResults = quizResultsResult.data ?? []
  const earnedBadges = badgesResult.data ?? []

  // Resolve name + metadata from profile row first, fall back to auth user_metadata
  const meta = user.user_metadata ?? {}
  const firstName = profile?.first_name || meta.first_name || ""
  const lastName = profile?.last_name || meta.last_name || ""
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Employee"
  const email = user.email ?? ""
  const role = profile?.role || meta.role || ""
  const storeName = profile?.store_name || meta.store_name || ""
  const storeNumber = profile?.store_number ?? meta.store_number ?? null
  const hireDate = profile?.hire_date || meta.hire_date || null
  const username = profile?.username || meta.username || ""

  const storeLabel =
    storeName === "District"
      ? "District Office"
      : storeName
      ? `Store ${storeNumber} · ${storeName}`
      : ""

  // Compute module stats
  const totalModules = mockModules.length
  const progressMap = new Map(moduleProgress.map((m) => [m.module_id, m]))
  const completedModules = mockModules.filter((m) => progressMap.get(m.id)?.completed).length
  const inProgressModules = mockModules.filter(
    (m) => !progressMap.get(m.id)?.completed && (progressMap.get(m.id)?.progress ?? 0) > 0
  ).length
  const notStartedModules = mockModules.filter(
    (m) => !progressMap.get(m.id)?.completed && (progressMap.get(m.id)?.progress ?? 0) === 0
  ).length
  const overallProgress =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

  // Quiz stats
  const avgScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce(
            (sum, q) => sum + Math.round((q.score / q.total_questions) * 100),
            0
          ) / quizResults.length
        )
      : 0

  // Badge IDs earned
  const earnedBadgeIds = earnedBadges.map((b) => b.badge_id)

  // Augment mockModules with real progress data
  const modulesWithProgress = mockModules.map((m) => {
    const p = progressMap.get(m.id)
    return {
      ...m,
      completed: p?.completed ?? false,
      progress: p?.progress ?? 0,
    }
  })

  return (
    <ProfileClient
      fullName={fullName}
      email={email}
      role={role}
      storeLabel={storeLabel}
      hireDate={hireDate}
      username={username}
      userId={user.id}
      overallProgress={overallProgress}
      completedModules={completedModules}
      inProgressModules={inProgressModules}
      notStartedModules={notStartedModules}
      totalModules={totalModules}
      avgScore={avgScore}
      quizResults={quizResults}
      earnedBadgeIds={earnedBadgeIds}
      allBadgeDefinitions={allBadgeDefinitions}
      badgeTierMeta={badgeTierMeta}
      badgeCategoryMeta={badgeCategoryMeta}
      modulesWithProgress={modulesWithProgress}
      earnedBadgesCount={earnedBadgeIds.length}
    />
  )
}
