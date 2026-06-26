"use server"

import { revalidatePath } from "next/cache"
import { createServiceClient } from "@/lib/supabase/service"

export type AdminActionResult =
  | { success: true; username?: string }
  | { success: false; error: string }

const INTERNAL_EMAIL_DOMAIN = "highlifetraining.internal"

// Build the canonical "first.last" username used for login.
function baseUsername(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase().replace(/[^a-z0-9]/g, "")}.${lastName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")}`
}

// Generate a username that is unique across the profiles table.
// `excludeId` lets an employee keep their own username when editing.
async function uniqueUsername(
  supabase: ReturnType<typeof createServiceClient>,
  firstName: string,
  lastName: string,
  excludeId?: string,
): Promise<string> {
  const base = baseUsername(firstName, lastName)
  let candidate = base
  let i = 1

  // Loop until we find a username not taken by a different user.
  while (true) {
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", candidate)
      .maybeSingle()

    if (!data || data.id === excludeId) return candidate
    i += 1
    candidate = `${base}${i}`
  }
}

// ── Add new employee ──────────────────────────────────────────────────────
export async function addEmployee(formData: {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  storeNumber: string
  storeName: string
  hireDate: string
  isAdmin: boolean
}): Promise<AdminActionResult> {
  const supabase = createServiceClient()

  // Login is username-based: the employee signs in with "first.last", which
  // maps to an internal email. Generate a unique username and build the email
  // from it so the new hire can actually log in.
  const username = await uniqueUsername(supabase, formData.firstName, formData.lastName)
  const email = `${username}@${INTERNAL_EMAIL_DOMAIN}`
  const displayName = `${formData.firstName} ${formData.lastName}`.trim()

  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password: formData.password,
    email_confirm: true,
    user_metadata: {
      username,
      first_name: formData.firstName,
      last_name: formData.lastName,
      display_name: displayName,
      role: formData.role,
      store_name: formData.storeName,
      store_number: formData.storeNumber ? parseInt(formData.storeNumber) : null,
      hire_date: formData.hireDate || null,
      is_admin: formData.isAdmin,
    },
  })

  if (authError || !authData.user) {
    return { success: false, error: authError?.message ?? "Failed to create auth user" }
  }

  const userId = authData.user.id

  // 2. Upsert profile row
  const { error: profileError } = await supabase.from("profiles").upsert({
    id: userId,
    first_name: formData.firstName,
    last_name: formData.lastName,
    display_name: displayName,
    username,
    role: formData.role,
    store_name: formData.storeName || null,
    store_number: formData.storeNumber ? parseInt(formData.storeNumber) : null,
    hire_date: formData.hireDate || null,
    is_admin: formData.isAdmin,
    updated_at: new Date().toISOString(),
  })

  if (profileError) {
    // Rollback: delete the auth user so we don't leave orphaned accounts
    await supabase.auth.admin.deleteUser(userId)
    return { success: false, error: profileError.message }
  }

  revalidatePath("/admin")
  return { success: true, username }
}

// ── Edit existing employee ────────────────────────────────────────────────
export async function editEmployee(formData: {
  userId: string
  firstName: string
  lastName: string
  role: string
  storeNumber: string
  storeName: string
  hireDate: string
  isAdmin: boolean
}): Promise<AdminActionResult> {
  const supabase = createServiceClient()

  // Read the current profile so we can keep the existing username when the
  // name hasn't actually changed, and preserve admin status (the edit form
  // does not expose an admin toggle, so we must not overwrite it).
  const { data: current, error: fetchError } = await supabase
    .from("profiles")
    .select("username, is_admin")
    .eq("id", formData.userId)
    .single()

  if (fetchError || !current) {
    return { success: false, error: fetchError?.message ?? "Employee not found" }
  }

  const displayName = `${formData.firstName} ${formData.lastName}`.trim()

  // The username/login email is derived from the name. If the name changed,
  // regenerate a unique username so the employee can still sign in with their
  // current name. If it resolves to their existing username, nothing changes.
  const desiredBase = baseUsername(formData.firstName, formData.lastName)
  const currentBase = current.username?.replace(/\d+$/, "") ?? ""
  let username = current.username as string

  if (desiredBase !== currentBase) {
    username = await uniqueUsername(supabase, formData.firstName, formData.lastName, formData.userId)
  }

  // 1. Update the profile (preserve is_admin from the existing record).
  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: formData.firstName,
      last_name: formData.lastName,
      display_name: displayName,
      username,
      role: formData.role,
      store_name: formData.storeName || null,
      store_number: formData.storeNumber ? parseInt(formData.storeNumber) : null,
      hire_date: formData.hireDate || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", formData.userId)

  if (error) return { success: false, error: error.message }

  // 2. Sync the auth user: the login email must match the new username, and
  // keep user_metadata in step. Without this the employee cannot log in.
  const { error: authError } = await supabase.auth.admin.updateUserById(formData.userId, {
    email: `${username}@${INTERNAL_EMAIL_DOMAIN}`,
    email_confirm: true,
    user_metadata: {
      username,
      first_name: formData.firstName,
      last_name: formData.lastName,
      display_name: displayName,
      role: formData.role,
      store_name: formData.storeName,
      store_number: formData.storeNumber ? parseInt(formData.storeNumber) : null,
      hire_date: formData.hireDate || null,
      is_admin: current.is_admin,
    },
  })

  if (authError) return { success: false, error: authError.message }

  revalidatePath("/admin")
  return { success: true, username }
}

// ── Delete employee ───────────────────────────────────────────────────────
export async function deleteEmployee(userId: string): Promise<AdminActionResult> {
  const supabase = createServiceClient()

  const { error } = await supabase.auth.admin.deleteUser(userId)
  if (error) return { success: false, error: error.message }

  revalidatePath("/admin")
  return { success: true }
}
