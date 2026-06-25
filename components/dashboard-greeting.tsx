"use client"

import { useState, useEffect } from "react"

export function DashboardGreeting({ firstName }: { firstName: string }) {
  const [greeting, setGreeting] = useState("Good morning")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 17) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  return (
    <>
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-1">{greeting}</p>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{firstName}</h1>
    </>
  )
}
