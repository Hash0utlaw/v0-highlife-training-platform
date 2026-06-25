import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// This uses the service role key so it can create auth users server-side.
// Only callable with the correct SEED_SECRET header.
const SEED_SECRET = process.env.SEED_SECRET ?? "highlife-seed-2025"

const TEMP_PASSWORD = "Welcome123!"

type Employee = {
  firstName: string
  lastName: string
  storeName: string
  storeNumber: number
  role: string
  shirtSize: string
  hireDate: string | null
  isAdmin?: boolean
}

// Active employees only (terminated/terminating excluded)
const EMPLOYEES: Employee[] = [
  // District Managers
  { firstName: "Adam", lastName: "Stover", storeName: "District", storeNumber: 0, role: "District Manager", shirtSize: "", hireDate: null, isAdmin: true },
  { firstName: "Amaya", lastName: "Tallent", storeName: "District", storeNumber: 0, role: "District Manager", shirtSize: "", hireDate: null, isAdmin: true },
  // 01 - Central
  { firstName: "Colten", lastName: "Stanford", storeName: "Central", storeNumber: 1, role: "Shift Lead", shirtSize: "Small", hireDate: "2025-05-06" },
  { firstName: "Madelyn", lastName: "Francois", storeName: "Central", storeNumber: 1, role: "Manager", shirtSize: "Small", hireDate: "2025-08-13" },
  { firstName: "Kyle", lastName: "Lillian", storeName: "Central", storeNumber: 1, role: "Druid", shirtSize: "Medium", hireDate: "2026-06-09" },
  // 02 - Shelby
  { firstName: "Charles", lastName: "Boheler", storeName: "Shelby", storeNumber: 2, role: "Manager", shirtSize: "X-Large", hireDate: "2022-01-20" },
  { firstName: "Travis", lastName: "Falls", storeName: "Shelby", storeNumber: 2, role: "Shift Lead", shirtSize: "4X-Large", hireDate: "2023-12-14" },
  { firstName: "Manager", lastName: "Kasper", storeName: "Shelby", storeNumber: 2, role: "Manager", shirtSize: "X-Large", hireDate: null },
  { firstName: "April", lastName: "Crump", storeName: "Shelby", storeNumber: 2, role: "Full Time", shirtSize: "Large", hireDate: "2024-12-04" },
  // 03 - Cornelius
  { firstName: "Ivan", lastName: "Smoot", storeName: "Cornelius", storeNumber: 3, role: "Shift Lead", shirtSize: "Large", hireDate: "2024-08-24" },
  { firstName: "Landon", lastName: "Lugo", storeName: "Cornelius", storeNumber: 3, role: "Full Time", shirtSize: "Small", hireDate: "2026-02-11" },
  // 04 - Concord
  { firstName: "Paul", lastName: "Jones", storeName: "Concord", storeNumber: 4, role: "Full Time", shirtSize: "Large", hireDate: "2024-05-30" },
  { firstName: "Christina", lastName: "Pierce", storeName: "Concord", storeNumber: 4, role: "Manager", shirtSize: "Medium", hireDate: "2024-12-05" },
  { firstName: "Cheyenne", lastName: "Browning", storeName: "Concord", storeNumber: 4, role: "Shift Lead", shirtSize: "Medium", hireDate: "2025-07-30" },
  { firstName: "Justice", lastName: "Stewart", storeName: "Concord", storeNumber: 4, role: "Full Time", shirtSize: "Medium", hireDate: "2025-02-12" },
  // 05 - Columbia
  { firstName: "Justin", lastName: "Pittman", storeName: "Columbia", storeNumber: 5, role: "Store Manager", shirtSize: "4X-Large", hireDate: "2026-01-03" },
  { firstName: "Imanis", lastName: "Way", storeName: "Columbia", storeNumber: 5, role: "Full Time", shirtSize: "Medium", hireDate: "2025-03-12" },
  { firstName: "Ashley", lastName: "Whitley", storeName: "Columbia", storeNumber: 5, role: "Shift Lead", shirtSize: "4X-Large", hireDate: "2024-11-06" },
  { firstName: "Daniel", lastName: "Parker", storeName: "Columbia", storeNumber: 5, role: "Part Time", shirtSize: "Medium", hireDate: "2025-03-31" },
  // 06 - UNCC
  { firstName: "Blake", lastName: "Hickman", storeName: "UNCC", storeNumber: 6, role: "Manager", shirtSize: "Large", hireDate: "2024-04-17" },
  { firstName: "Juliet", lastName: "Jenkins", storeName: "UNCC", storeNumber: 6, role: "Shift Lead", shirtSize: "Medium", hireDate: "2023-03-23" },
  { firstName: "Donovan", lastName: "Elci", storeName: "UNCC", storeNumber: 6, role: "Shift Lead", shirtSize: "Medium", hireDate: "2024-04-18" },
  { firstName: "Yasmine", lastName: "Ferguson", storeName: "UNCC", storeNumber: 6, role: "Full Time", shirtSize: "Small", hireDate: "2024-06-22" },
  // 07 - N Tryon
  { firstName: "Diamond", lastName: "Norwood", storeName: "N Tryon", storeNumber: 7, role: "Shift Lead", shirtSize: "Medium", hireDate: "2025-02-17" },
  { firstName: "Latia", lastName: "Miller", storeName: "N Tryon", storeNumber: 7, role: "Part Time", shirtSize: "Large", hireDate: "2025-06-16" },
  { firstName: "Rain", lastName: "White", storeName: "N Tryon", storeNumber: 7, role: "Full Time", shirtSize: "X-Large", hireDate: "2025-03-03" },
  // 08 - Gastonia
  { firstName: "Princess", lastName: "Lizardo", storeName: "Gastonia", storeNumber: 8, role: "Manager", shirtSize: "Medium", hireDate: "2024-09-26" },
  { firstName: "Desmond", lastName: "Potocsky", storeName: "Gastonia", storeNumber: 8, role: "Shift Lead", shirtSize: "Medium", hireDate: "2024-12-05" },
  { firstName: "Clayton", lastName: "Falls", storeName: "Gastonia", storeNumber: 8, role: "Full Time", shirtSize: "X-Large", hireDate: "2025-04-02" },
  // 09 - Fort Mill
  { firstName: "Tyrek", lastName: "Crockett", storeName: "Fort Mill", storeNumber: 9, role: "Full Time", shirtSize: "X-Large", hireDate: "2022-04-13" },
  { firstName: "Matthew", lastName: "Rickel", storeName: "Fort Mill", storeNumber: 9, role: "Store Manager", shirtSize: "X-Large", hireDate: "2025-09-26" },
  { firstName: "Melissa", lastName: "Snipes", storeName: "Fort Mill", storeNumber: 9, role: "Shift Lead", shirtSize: "4X-Large", hireDate: "2025-10-27" },
  // 10 - Asheville
  { firstName: "Tarah", lastName: "Paul", storeName: "Asheville", storeNumber: 10, role: "Part Time", shirtSize: "", hireDate: "2026-02-14" },
  { firstName: "Donna", lastName: "Cleary", storeName: "Asheville", storeNumber: 10, role: "Manager", shirtSize: "Small", hireDate: "2023-11-15" },
  // 11 - Mooresville
  { firstName: "Steven", lastName: "Sherrill", storeName: "Mooresville", storeNumber: 11, role: "Manager", shirtSize: "2X-Large", hireDate: "2024-06-14" },
  { firstName: "Colton", lastName: "Miller", storeName: "Mooresville", storeNumber: 11, role: "Part Time", shirtSize: "Large", hireDate: "2024-08-27" },
  { firstName: "Kayla", lastName: "Gentry", storeName: "Mooresville", storeNumber: 11, role: "Full Time", shirtSize: "Large", hireDate: "2025-03-18" },
  { firstName: "Devon", lastName: "Wright", storeName: "Mooresville", storeNumber: 11, role: "Full Time", shirtSize: "Large", hireDate: "2025-01-19" },
  // 12 - Statesville
  { firstName: "Kalie", lastName: "Paschal", storeName: "Statesville", storeNumber: 12, role: "Manager", shirtSize: "Large", hireDate: "2024-10-26" },
  { firstName: "Xavier", lastName: "Doyle", storeName: "Statesville", storeNumber: 12, role: "Shift Lead", shirtSize: "Medium", hireDate: "2024-03-23" },
  { firstName: "Lucas", lastName: "Hodge", storeName: "Statesville", storeNumber: 12, role: "Full Time", shirtSize: "Large", hireDate: "2024-03-16" },
  { firstName: "Amber", lastName: "Kent", storeName: "Statesville", storeNumber: 12, role: "Full Time", shirtSize: "", hireDate: "2025-03-19" },
  // 13 - Moose
  { firstName: "Hunter", lastName: "Caulder", storeName: "Moose", storeNumber: 13, role: "Manager", shirtSize: "X-Large", hireDate: "2024-08-30" },
  { firstName: "Christopher", lastName: "Triston", storeName: "Moose", storeNumber: 13, role: "Shift Lead", shirtSize: "Large", hireDate: "2024-08-27" },
  { firstName: "Wilson", lastName: "Curtis", storeName: "Moose", storeNumber: 13, role: "Full Time", shirtSize: "Large", hireDate: "2024-06-13" },
  { firstName: "Kaleb", lastName: "Koonley", storeName: "Moose", storeNumber: 13, role: "Part Time", shirtSize: "2X-Large", hireDate: "2025-11-02" },
  // 14 - Hickory
  { firstName: "Sydney", lastName: "Short", storeName: "Hickory", storeNumber: 14, role: "Manager", shirtSize: "Small", hireDate: "2022-08-30" },
  { firstName: "William", lastName: "Hudson", storeName: "Hickory", storeNumber: 14, role: "Shift Lead", shirtSize: "Medium", hireDate: "2025-01-16" },
  { firstName: "Jae'nie", lastName: "Vaughn", storeName: "Hickory", storeNumber: 14, role: "Full Time", shirtSize: "X-Large", hireDate: "2025-12-19" },
  // 15 - Boone
  { firstName: "Caylnn", lastName: "Horning", storeName: "Boone", storeNumber: 15, role: "Shift Lead", shirtSize: "X-Large", hireDate: "2025-04-29" },
  // 16 - Salisbury
  { firstName: "Brandon", lastName: "Cameron", storeName: "Salisbury", storeNumber: 16, role: "Shift Lead", shirtSize: "X-Large", hireDate: "2022-12-22" },
  { firstName: "McKenna", lastName: "Miller", storeName: "Salisbury", storeNumber: 16, role: "Full Time", shirtSize: "X-Large", hireDate: "2024-04-06" },
  // 17 - Chapel Hill
  { firstName: "Lyshane", lastName: "Williams", storeName: "Chapel Hill", storeNumber: 17, role: "Full Time", shirtSize: "X-Large", hireDate: "2023-12-20" },
  // 18 - Greenville
  { firstName: "Cloey", lastName: "Lanhart", storeName: "Greenville", storeNumber: 18, role: "Manager", shirtSize: "4X-Large", hireDate: "2024-08-30" },
  { firstName: "Malorie", lastName: "Peters", storeName: "Greenville", storeNumber: 18, role: "Part Time", shirtSize: "Medium", hireDate: "2025-01-15" },
  { firstName: "Tristan", lastName: "Riddle", storeName: "Greenville", storeNumber: 18, role: "Shift Lead", shirtSize: "Large", hireDate: "2025-08-12" },
  // 19 - Morehead City
  { firstName: "Brooks", lastName: "Brooks", storeName: "Morehead City", storeNumber: 19, role: "Manager", shirtSize: "2X-Large", hireDate: "2022-12-14" },
  { firstName: "Skye", lastName: "Fricke", storeName: "Morehead City", storeNumber: 19, role: "Shift Lead", shirtSize: "X-Large", hireDate: "2025-01-27" },
  { firstName: "Anthony", lastName: "Howard", storeName: "Morehead City", storeNumber: 19, role: "Full Time", shirtSize: "2X-Large", hireDate: "2024-04-25" },
  { firstName: "Kelli", lastName: "Fell", storeName: "Morehead City", storeNumber: 19, role: "Full Time", shirtSize: "2X-Large", hireDate: "2025-06-04" },
  // 20 - Wilmington
  { firstName: "Michael", lastName: "Yasholak", storeName: "Wilmington", storeNumber: 20, role: "Part Time", shirtSize: "Large", hireDate: "2025-06-02" },
  { firstName: "Jake", lastName: "Palacios", storeName: "Wilmington", storeNumber: 20, role: "Full Time", shirtSize: "X-Large", hireDate: "2024-04-23" },
  { firstName: "Justice", lastName: "Green", storeName: "Wilmington", storeNumber: 20, role: "Full Time", shirtSize: "Small", hireDate: "2024-04-23" },
  { firstName: "Gwendolyn", lastName: "Saleh", storeName: "Wilmington", storeNumber: 20, role: "Full Time", shirtSize: "Medium", hireDate: "2025-06-09" },
  // 21 - Olive Loop
  { firstName: "Brian", lastName: "Ball", storeName: "Olive Loop", storeNumber: 21, role: "Store Manager", shirtSize: "Large", hireDate: "2025-01-26" },
  { firstName: "Audrey", lastName: "Olson", storeName: "Olive Loop", storeNumber: 21, role: "Shift Lead", shirtSize: "Medium", hireDate: "2025-02-27" },
  { firstName: "Payton", lastName: "Rocks", storeName: "Olive Loop", storeNumber: 21, role: "Full Time", shirtSize: "Large", hireDate: "2025-05-06" },
  // 22 - Raleigh
  { firstName: "Payton", lastName: "Griffin", storeName: "Raleigh", storeNumber: 22, role: "Shift Lead", shirtSize: "Large", hireDate: "2025-07-02" },
  { firstName: "William", lastName: "Horning", storeName: "Raleigh", storeNumber: 22, role: "Full Time", shirtSize: "4X-Large", hireDate: "2025-10-31" },
  // 23 - Monkey Junction
  { firstName: "Sabrina", lastName: "Nguyen", storeName: "Monkey Junction", storeNumber: 23, role: "Manager", shirtSize: "X-Large", hireDate: "2023-11-25" },
  { firstName: "Justin", lastName: "Cookman", storeName: "Monkey Junction", storeNumber: 23, role: "Full Time", shirtSize: "X-Large", hireDate: "2025-02-10" },
  { firstName: "Chris", lastName: "Bryant", storeName: "Monkey Junction", storeNumber: 23, role: "Part Time", shirtSize: "2X-Large", hireDate: "2025-09-28" },
  // 24 - Mooresville Commons
  { firstName: "Marcus", lastName: "Redman", storeName: "Mooresville Commons", storeNumber: 24, role: "Manager", shirtSize: "Small", hireDate: "2023-11-25" },
  { firstName: "Raelympalynn", lastName: "Hannah", storeName: "Mooresville Commons", storeNumber: 24, role: "Shift Lead", shirtSize: "Medium", hireDate: "2023-12-30" },
  { firstName: "Lilly", lastName: "Massey", storeName: "Mooresville Commons", storeNumber: 24, role: "Shift Lead", shirtSize: "Large", hireDate: "2025-07-26" },
  { firstName: "Andrew", lastName: "Thompson", storeName: "Mooresville Commons", storeNumber: 24, role: "Full Time", shirtSize: "3X-Large", hireDate: "2024-08-07" },
  // 25 - Burlington
  { firstName: "Quinton", lastName: "Roberts", storeName: "Burlington", storeNumber: 25, role: "Manager", shirtSize: "Medium", hireDate: "2023-03-24" },
  { firstName: "Cody", lastName: "Wilson", storeName: "Burlington", storeNumber: 25, role: "Shift Lead", shirtSize: "7X-Large", hireDate: "2024-08-27" },
  { firstName: "Hannah", lastName: "Walser", storeName: "Burlington", storeNumber: 25, role: "Full Time", shirtSize: "Large", hireDate: "2024-02-26" },
  // 26 - Greenville Blvd
  { firstName: "Emmanuel", lastName: "Whaley", storeName: "Greenville Blvd", storeNumber: 26, role: "Shift Lead", shirtSize: "2X-Large", hireDate: "2024-04-05" },
]

function toUsername(firstName: string, lastName: string, existing: Set<string>): string {
  const base = `${firstName.toLowerCase().replace(/[^a-z0-9]/g, "")}.${lastName.toLowerCase().replace(/[^a-z0-9]/g, "")}`
  if (!existing.has(base)) {
    existing.add(base)
    return base
  }
  // Handle duplicates by appending a number
  let i = 2
  while (existing.has(`${base}${i}`)) i++
  existing.add(`${base}${i}`)
  return `${base}${i}`
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("x-seed-secret")
  if (authHeader !== SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const results: { username: string; email: string; status: string; error?: string }[] = []
  const usernameSet = new Set<string>()

  for (const emp of EMPLOYEES) {
    const username = toUsername(emp.firstName, emp.lastName, usernameSet)
    const email = `${username}@highlifetraining.internal`

    // Check if user already exists
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single()

    if (existing) {
      results.push({ username, email, status: "skipped (already exists)" })
      continue
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: TEMP_PASSWORD,
      email_confirm: true,
      user_metadata: {
        username,
        first_name: emp.firstName,
        last_name: emp.lastName,
        display_name: `${emp.firstName} ${emp.lastName}`,
        store_number: emp.storeNumber,
        store_name: emp.storeName,
        role: emp.role,
        shirt_size: emp.shirtSize,
        hire_date: emp.hireDate,
        is_admin: emp.isAdmin ?? false,
      },
    })

    if (error) {
      results.push({ username, email, status: "error", error: error.message })
    } else {
      results.push({ username, email, status: "created" })
    }
  }

  const created = results.filter((r) => r.status === "created").length
  const skipped = results.filter((r) => r.status.startsWith("skipped")).length
  const errors = results.filter((r) => r.status === "error").length

  return NextResponse.json({ summary: { created, skipped, errors }, results })
}
