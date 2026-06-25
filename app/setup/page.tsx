"use client"

import { useState } from "react"
import { Loader2, Users, CheckCircle2, AlertCircle, SkipForward, ShieldCheck } from "lucide-react"

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

export default function SetupPage() {
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
      const body = await res.json()
      if (!res.ok) throw new Error(body.error ?? "Seed failed")
      setResponse(body as SeedResponse)
    } catch (err: unknown) {
      setFetchError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-start justify-center pt-12 px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Highlife Training — First-Time Setup</h1>
            <p className="text-sm text-muted-foreground">Provision all employee accounts in Supabase</p>
          </div>
        </div>

        {/* Info card */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This will create Supabase Auth accounts for all <strong className="text-foreground">active employees</strong> across all stores using the temporary password{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Welcome123!</code>.
            Each employee will be prompted to set their own password on first login. This page is safe to run multiple times — existing accounts are skipped automatically.
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Login format: <code className="font-mono bg-muted px-1 rounded">first.last</code> (e.g. <code className="font-mono bg-muted px-1 rounded">adam.stover</code>)</p>
            <p>• Temporary password: <code className="font-mono bg-muted px-1 rounded">Welcome123!</code></p>
            <p>• District managers (Adam Stover, Amaya Tallent) are created with admin access</p>
          </div>
        </div>

        {/* Action */}
        <button
          type="button"
          onClick={runSeed}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating accounts... this may take 30–60 seconds
            </>
          ) : (
            <>
              <Users className="h-4 w-4" />
              {response ? "Run Again (safe — skips existing)" : "Create All Employee Accounts"}
            </>
          )}
        </button>

        {/* Error */}
        {fetchError && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 rounded-xl text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {fetchError}
          </div>
        )}

        {/* Results */}
        {response && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{response.summary.created}</p>
                <p className="text-xs text-muted-foreground mt-1">Created</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-yellow-600">{response.summary.skipped}</p>
                <p className="text-xs text-muted-foreground mt-1">Skipped</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-red-600">{response.summary.errors}</p>
                <p className="text-xs text-muted-foreground mt-1">Errors</p>
              </div>
            </div>

            {response.summary.created > 0 && (
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 px-4 py-3 rounded-xl text-sm font-medium">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {response.summary.created} accounts created! Employees can now sign in at <strong>/login</strong> with their first.last username.
              </div>
            )}

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Full Results</p>
              </div>
              <div className="divide-y divide-border max-h-80 overflow-y-auto">
                {response.results.map((r) => (
                  <div key={r.username} className="flex items-center justify-between px-4 py-2.5 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-mono font-medium text-foreground truncate">{r.username}</p>
                      {r.error && <p className="text-xs text-red-500 truncate">{r.error}</p>}
                    </div>
                    <span className={`shrink-0 text-xs font-medium flex items-center gap-1 px-2 py-0.5 rounded-full ${
                      r.status === "created"
                        ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
                        : r.status === "error"
                        ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {r.status === "created" && <CheckCircle2 className="h-3 w-3" />}
                      {r.status === "error" && <AlertCircle className="h-3 w-3" />}
                      {r.status.startsWith("skipped") && <SkipForward className="h-3 w-3" />}
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
