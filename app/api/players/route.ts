import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Player from "@/models/Player"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  await dbConnect()

  try {
    if (id) {
      const player = await Player.findById(id)
      if (!player) {
        return NextResponse.json({ error: "Player not found" }, { status: 404 })
      }
      return NextResponse.json(player)
    } else {
      const players = await Player.find({}).limit(50) // Limit to 50 for this example
      return NextResponse.json(players)
    }
  } catch (error) {
    console.error("Error fetching player data:", error)
    return NextResponse.json({ error: "Failed to fetch player data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  await dbConnect()

  try {
    const body = await request.json()
    const newPlayer = new Player(body)
    const savedPlayer = await newPlayer.save()
    return NextResponse.json(savedPlayer, { status: 201 })
  } catch (error) {
    console.error("Error creating player:", error)
    return NextResponse.json({ error: "Failed to create player" }, { status: 500 })
  }
}

