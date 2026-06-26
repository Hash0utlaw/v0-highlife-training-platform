"use server"

import { revalidatePath } from "next/cache"
import { createServiceClient } from "@/lib/supabase/service"

export type AdminActionResult = { success: true } | { success: false; error: string }

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

  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: formData.email,
    password: formData.password,
    email_confirm: true,
    user_metadata: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      role: formData.role,
      store_name: formData.storeName,
      store_number: formData.storeNumber ? parseInt(formData.storeNumber) : null,
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
    username: formData.email.split("@")[0],
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
  return { success: true }
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

  const { error } = await supabase.from("profiles").update({
    first_name: formData.firstName,
    last_name: formData.lastName,
    role: formData.role,
    store_name: formData.storeName || null,
    store_number: formData.storeNumber ? parseInt(formData.storeNumber) : null,
    hire_date: formData.hireDate || null,
    is_admin: formData.isAdmin,
    updated_at: new Date().toISOString(),
  }).eq("id", formData.userId)

  if (error) return { success: false, error: error.message }

  // Also sync user_metadata on the auth user
  await supabase.auth.admin.updateUserById(formData.userId, {
    user_metadata: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      role: formData.role,
      store_name: formData.storeName,
      store_number: formData.storeNumber ? parseInt(formData.storeNumber) : null,
    },
  })

  revalidatePath("/admin")
  return { success: true }
}

// ── Delete employee ───────────────────────────────────────────────────────
export async function deleteEmployee(userId: string): Promise<AdminActionResult> {
  const supabase = createServiceClient()

  const { error } = await supabase.auth.admin.deleteUser(userId)
  if (error) return { success: false, error: error.message }

  revalidatePath("/admin")
  return { success: true }
}
