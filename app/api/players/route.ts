import { type NextRequest, NextResponse } from "next/server"
import { scrapePlayerData } from "@/lib/scraper"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const playerId = searchParams.get("id")

  if (!playerId) {
    return NextResponse.json({ error: "Player ID is required" }, { status: 400 })
  }

  try {
    const playerData = await scrapePlayerData(playerId)

    if (!playerData) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    return NextResponse.json(playerData)
  } catch (error) {
    console.error("Error fetching player data:", error)
    return NextResponse.json({ error: "Failed to fetch player data" }, { status: 500 })
  }
}

