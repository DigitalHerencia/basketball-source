import { NextResponse } from "next/server"
import { scrapeNBAStandings } from "@/lib/scraper"

export async function GET() {
  try {
    const standings = await scrapeNBAStandings()

    return NextResponse.json(standings)
  } catch (error) {
    console.error("Error fetching standings:", error)
    return NextResponse.json({ error: "Failed to fetch standings" }, { status: 500 })
  }
}

