import { fetchAdminEmployees } from "./fetch-admin-data"
import { AdminDashboardClient } from "@/components/admin-dashboard-client"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const employees = await fetchAdminEmployees()

  return <AdminDashboardClient initialEmployees={employees} />
}
