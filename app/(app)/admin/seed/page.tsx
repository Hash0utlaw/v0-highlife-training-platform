"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, CheckCircle2, AlertCircle, SkipForward, Loader2 } from "lucide-react"

type SeedResult = {
  username: string
  email: string
  status: string
  error?: string
}

type SeedResponse = {
  summary: { created: number; skipped: number; errors: number }
  results: SeedResult[]
}

export default function SeedEmployeesPage() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<SeedResponse | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  async function runSeed() {
    setLoading(true)
    setFetchError(null)
    try {
      const res = await fetch("/api/seed-employees", {
        method: "POST",
        headers: { "x-seed-secret": "highlife-seed-2025" },
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? "Seed failed")
      }
      const data: SeedResponse = await res.json()
      setResponse(data)
    } catch (err: unknown) {
      setFetchError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Seed Employee Accounts</h1>
        <p className="text-muted-foreground text-sm">
          Creates Supabase Auth accounts for all active employees with the temporary password{" "}
          <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Welcome123!</span>.
          Employees will be prompted to change it on first login. Safe to run multiple times — existing accounts are skipped.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-5 w-5 text-primary" />
            Employee Provisioning
          </CardTitle>
          <CardDescription>
            80 active employees across 26 stores will be provisioned. Terminated employees are excluded.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={runSeed} disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating accounts...
              </>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                {response ? "Run Again" : "Create Employee Accounts"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {fetchError && (
        <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-950/30 px-4 py-3 rounded-md text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {fetchError}
        </div>
      )}

      {response && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-2xl font-bold text-green-600">{response.summary.created}</p>
                <p className="text-xs text-muted-foreground mt-1">Created</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-2xl font-bold text-yellow-600">{response.summary.skipped}</p>
                <p className="text-xs text-muted-foreground mt-1">Skipped</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-2xl font-bold text-red-600">{response.summary.errors}</p>
                <p className="text-xs text-muted-foreground mt-1">Errors</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border max-h-96 overflow-y-auto">
                {response.results.map((r) => (
                  <div key={r.username} className="flex items-center justify-between py-2 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium font-mono truncate">{r.username}</p>
                      {r.error && (
                        <p className="text-xs text-red-500 truncate">{r.error}</p>
                      )}
                    </div>
                    <Badge
                      variant={
                        r.status === "created"
                          ? "default"
                          : r.status === "error"
                          ? "destructive"
                          : "secondary"
                      }
                      className="shrink-0 text-xs"
                    >
                      {r.status === "created" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {r.status === "error" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {r.status.startsWith("skipped") && <SkipForward className="h-3 w-3 mr-1" />}
                      {r.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
