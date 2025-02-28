import { type NextRequest, NextResponse } from "next/server"
import { scrapeTeamData } from "@/lib/scraper"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const teamId = searchParams.get("id")

  if (!teamId) {
    return NextResponse.json({ error: "Team ID is required" }, { status: 400 })
  }

  try {
    const teamData = await scrapeTeamData(teamId)

    if (!teamData) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 })
    }

    return NextResponse.json(teamData)
  } catch (error) {
    console.error("Error fetching team data:", error)
    return NextResponse.json({ error: "Failed to fetch team data" }, { status: 500 })
  }
}

