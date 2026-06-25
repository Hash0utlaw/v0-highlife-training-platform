import { createServiceClient } from "@/lib/supabase/service"
import { adminModules, type AdminEmployee, type AdminQuizAttempt } from "@/lib/data"

/**
 * Fetches all employee profiles joined with their module progress,
 * quiz results, and earned badges. Uses the service-role client so RLS
 * is bypassed and admins can see every user's data.
 */
export async function fetchAdminEmployees(): Promise<AdminEmployee[]> {
  const supabase = createServiceClient()

  // Fetch all four tables in parallel
  const [profilesRes, progressRes, quizzesRes, badgesRes] = await Promise.all([
    supabase.from("profiles").select("*").order("last_name", { ascending: true }),
    supabase.from("module_progress").select("*"),
    supabase.from("quiz_results").select("*"),
    supabase.from("employee_badges").select("*"),
  ])

  const profiles = profilesRes.data ?? []
  const allProgress = progressRes.data ?? []
  const allQuizzes = quizzesRes.data ?? []
  const allBadges = badgesRes.data ?? []

  // Index by user_id for fast lookup
  const progressByUser = new Map<string, typeof allProgress>()
  for (const p of allProgress) {
    if (!progressByUser.has(p.user_id)) progressByUser.set(p.user_id, [])
    progressByUser.get(p.user_id)!.push(p)
  }

  const quizzesByUser = new Map<string, typeof allQuizzes>()
  for (const q of allQuizzes) {
    if (!quizzesByUser.has(q.user_id)) quizzesByUser.set(q.user_id, [])
    quizzesByUser.get(q.user_id)!.push(q)
  }

  const badgesByUser = new Map<string, typeof allBadges>()
  for (const b of allBadges) {
    if (!badgesByUser.has(b.user_id)) badgesByUser.set(b.user_id, [])
    badgesByUser.get(b.user_id)!.push(b)
  }

  // All known module IDs (used as "assigned" set since we assign globally)
  const allModuleIds = adminModules.map((m) => m.id)

  return profiles.map((profile): AdminEmployee => {
    const userId = profile.id
    const userProgress = progressByUser.get(userId) ?? []
    const userQuizzes = quizzesByUser.get(userId) ?? []
    const userBadges = badgesByUser.get(userId) ?? []

    // Map module progress
    const completedModules = userProgress
      .filter((p) => p.completed)
      .map((p) => p.module_id)

    const inProgressModules = userProgress
      .filter((p) => !p.completed && p.progress > 0)
      .map((p) => p.module_id)

    // Assigned = all modules (all employees have access to all modules)
    const assignedModules = allModuleIds

    // Aggregate quiz results: group by quiz_id, pick best score
    const quizMap = new Map<string, AdminQuizAttempt>()
    for (const q of userQuizzes) {
      const pct = q.total_questions > 0
        ? Math.round((q.score / q.total_questions) * 100)
        : 0

      const existing = quizMap.get(q.quiz_id)
      if (!existing) {
        quizMap.set(q.quiz_id, {
          quizId: q.quiz_id,
          quizTitle: q.quiz_title,
          moduleId: q.quiz_id, // quiz_id mirrors module_id convention
          attempts: 1,
          bestScore: pct,
          latestScore: pct,
          passed: q.passed,
          completedAt: q.completed_at,
        })
      } else {
        existing.attempts += 1
        if (pct > existing.bestScore) existing.bestScore = pct
        // Keep latest by completed_at
        if (new Date(q.completed_at) > new Date(existing.completedAt)) {
          existing.latestScore = pct
          existing.completedAt = q.completed_at
        }
      }
    }

    // Earned badge IDs map to allBadgeDefinitions ids via badge_id column
    const earnedBadgeIds = userBadges.map((b) => b.badge_id)

    const storeLine = profile.store_name
      ? profile.store_name === "District"
        ? "District Office"
        : profile.store_number
          ? `Store ${profile.store_number} · ${profile.store_name}`
          : profile.store_name
      : "—"

    // Use created_at as a proxy for last_active since we don't store it explicitly
    const lastActive = profile.updated_at ?? profile.created_at ?? new Date().toISOString()

    return {
      id: userId,
      name: `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() || profile.username || "Unknown",
      email: profile.username ? `${profile.username}@highlifesmokeshop.com` : "—",
      role: (profile.role as AdminEmployee["role"]) ?? "Sales Associate",
      storeLocation: storeLine,
      district: profile.store_name ?? "—",
      hireDate: profile.hire_date ?? profile.created_at ?? new Date().toISOString(),
      lastActive,
      completedModules,
      inProgressModules,
      assignedModules,
      quizAttempts: Array.from(quizMap.values()),
      earnedBadgeIds,
    }
  })
}
