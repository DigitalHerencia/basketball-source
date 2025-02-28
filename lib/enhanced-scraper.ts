import { DayPicker } from 'react-day-picker';
import { load } from "cheerio"
import { setTimeout } from "timers/promises"
import dbConnect from "@/lib/db"
import ScrapeLog from "@/models/ScrapeLog"
import Player from "@/models/Player"
import Team from "@/models/Team"
import Season from "@/models/Season"
import Game from "@/models/Game"

// Rate limiting configuration
const RATE_LIMIT = {
  requestsPerMinute: 20,
  minDelayBetweenRequests: 3000, // 3 seconds
}

// Cache configuration

// User agents to rotate
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
]

// Request queue for rate limiting
class RequestQueue {
  private queue: Array<() => Promise<void>> = []
  private processing = false
  private lastRequestTime = 0

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })

      if (!this.processing) {
        this.processQueue()
      }
    })
  }

  private async processQueue() {
    if (this.queue.length === 0) {
      this.processing = false
      return
    }

    this.processing = true
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime

    if (timeSinceLastRequest < RATE_LIMIT.minDelayBetweenRequests) {
      const delay = RATE_LIMIT.minDelayBetweenRequests - timeSinceLastRequest
      await setTimeout(delay)
    }

    const request = this.queue.shift()
    if (request) {
      this.lastRequestTime = Date.now()
      await request()
    }

    // Process next in queue
    this.processQueue()
  }
}

const requestQueue = new RequestQueue()

// Helper function to get a random user agent
function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
}

// Enhanced fetch function with rate limiting and user agent rotation
async function enhancedFetch(url: string): Promise<string> {
  return requestQueue.add(async () => {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": getRandomUserAgent(),
          Accept: "text/html,application/xhtml+xml,application/xml",
          "Accept-Language": "en-US,en;q=0.9",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
      }

      return await response.text()
    } catch (error) {
      console.error(`Error fetching ${url}:`, error)
      throw error
    }
  })
}

// Log scraping activity
async function logScrape(
  source: string,
  type: string,
  status: string,
  message?: string,
  itemsProcessed = 0,
): Promise<any> {
  await dbConnect()
  const startTime = new Date()

  const log = await ScrapeLog.create({
    source,
    type,
    status,
    message,
    itemsProcessed,
    startTime,
    endTime: status !== "in_progress" ? new Date() : undefined,
  })

  return log
}

// Update scrape log when complete
async function updateScrapeLog(id: string, status: string, message?: string, itemsProcessed?: number): Promise<any> {
  await dbConnect()
  return ScrapeLog.findByIdAndUpdate(
    id,
    {
      status,
      message,
      itemsProcessed: itemsProcessed !== undefined ? itemsProcessed : undefined,
      endTime: new Date(),
    },
    { new: true },
  )
}

// Scrape player data
export async function scrapePlayerData(playerId: string): Promise<any> {
  const url = `https://www.basketball-reference.com/players/${playerId.charAt(0)}/${playerId}.html`

  // Log the start of scraping
  const log = await logScrape(url, "player", "in_progress")

  try {
    const html = await enhancedFetch(url)
    const $ = load(html)

    // Extract player info
    const name = $('h1[itemprop="name"]').text().trim()
    const position = $('[itemprop="name"]').next().text().split("▪")[0].trim()

    // Extract player stats
    const careerStats: any = {}
    $("table#per_game tbody tr.full_table").each((_, row) => {
      const season = $(row).find('th[data-stat="season"]').text().trim()
      const team = $(row).find('td[data-stat="team_id"]').text().trim()
      const gp = Number.parseInt($(row).find('td[data-stat="g"]').text().trim(), 10)
      const pts = Number.parseFloat($(row).find('td[data-stat="pts_per_g"]').text().trim())
      const reb = Number.parseFloat($(row).find('td[data-stat="trb_per_g"]').text().trim())
      const ast = Number.parseFloat($(row).find('td[data-stat="ast_per_g"]').text().trim())

      careerStats[season] = { team, gp, pts, reb, ast }
    })

    // Update log with success
    await updateScrapeLog(log.id, "success", undefined, Object.keys(careerStats).length)

    return {
      id: playerId,
      name,
      position,
      stats: careerStats,
    }
  } catch (error) {
    // Update log with error
    await updateScrapeLog(log.id, "error", (error as Error).message)
    throw error
  }
}

// Scrape team data
export async function scrapeTeamData(teamId: string, season?: string): Promise<any> {
  const seasonParam = season ? `/teams/${teamId}/${season}.html` : `/teams/${teamId}/`
  const url = `https://www.basketball-reference.com${seasonParam}`

  // Log the start of scraping
  const log = await logScrape(url, "team", "in_progress")

  try {
    const html = await enhancedFetch(url)
    const $ = load(html)

    // Extract team info
    const name = $('h1[itemprop="name"]').text().split("Franchise")[0].trim()

    // Extract team record
    const record =
      $("div#meta div")
        .filter((_, el) => {
          return $(el).text().includes("Record:")
        })
        .text()
        .split("Record:")[1]
        ?.trim() || ""

    // Extract roster if available
    const roster: any[] = []
    $("table#roster tbody tr").each((_, row) => {
      const number = $(row).find('th[data-stat="number"]').text().trim()
      const playerName = $(row).find('td[data-stat="player"]').text().trim()
      const pos = $(row).find('td[data-stat="pos"]').text().trim()

      roster.push({ number, name: playerName, position: pos })
    })

    // Update log with success
    await updateScrapeLog(log.id, "success", undefined, roster.length)

    return {
      id: teamId,
      name,
      record,
      roster,
    }
  } catch (error) {
    // Update log with error
    await updateScrapeLog(log.id, "error", (error as Error).message)
    throw error
  }
}

// Scrape NBA standings
export async function scrapeNBAStandings(season?: string): Promise<any> {
  const seasonParam = season ? `/${season}` : ""
  const url = `https://www.basketball-reference.com/leagues/NBA${seasonParam}_standings.html`

  // Log the start of scraping
  const log = await logScrape(url, "standings", "in_progress")

  try {
    const html = await enhancedFetch(url)
    const $ = load(html)

    const east: any[] = []
    const west: any[] = []

    // Extract Eastern Conference standings
    $("table#confs_standings_E tbody tr").each((_, row) => {
      const team = $(row).find('th[data-stat="team_name"] a').text().trim()
      const wins = Number.parseInt($(row).find('td[data-stat="wins"]').text().trim(), 10)
      const losses = Number.parseInt($(row).find('td[data-stat="losses"]').text().trim(), 10)

      east.push({ team, wins, losses })
    })

    // Extract Western Conference standings
    $("table#confs_standings_W tbody tr").each((_, row) => {
      const team = $(row).find('th[data-stat="team_name"] a').text().trim()
      const wins = Number.parseInt($(row).find('td[data-stat="wins"]').text().trim(), 10)
      const losses = Number.parseInt($(row).find('td[data-stat="losses"]').text().trim(), 10)

      west.push({ team, wins, losses })
    })

    // Update log with success
    await updateScrapeLog(log.id, "success", undefined, east.length + west.length)

    return { east, west }
  } catch (error) {
    // Update log with error
    await updateScrapeLog(log.id, "error", (error as Error).message)
    throw error
  }
}

// Scrape game data
export async function scrapeGameData(gameId: string): Promise<any> {
  const url = `https://www.basketball-reference.com/boxscores/${gameId}.html`

  // Log the start of scraping
  const log = await logScrape(url, "game", "in_progress")

  try {
    const html = await enhancedFetch(url)
    const $ = load(html)

    // Extract game info
    const title = $("h1").text()
    const [awayTeam, homeTeam] = title.split(" at ")

    // Extract scores
    const scoreDiv = $("div.scorebox")
    const awayScore = Number.parseInt(scoreDiv.find("div.scores").first().find("div.score").text().trim(), 10)
    const homeScore = Number.parseInt(scoreDiv.find("div.scores").last().find("div.score").text().trim(), 10)

    // Extract player stats
    const playerStats: any = { away: [], home: [] }

    // Away team player stats
    $(`table#box-${gameId.split("").slice(0, 3).join("")}-game-basic tbody tr`).each((_, row) => {
      const player = $(row).find('th[data-stat="player"]').text().trim()
      if (player && player !== "Reserves") {
        const mp = $(row).find('td[data-stat="mp"]').text().trim()
        const pts = Number.parseInt($(row).find('td[data-stat="pts"]').text().trim(), 10)
        const trb = Number.parseInt($(row).find('td[data-stat="trb"]').text().trim(), 10)
        const ast = Number.parseInt($(row).find('td[data-stat="ast"]').text().trim(), 10)

        playerStats.away.push({ player, mp, pts, trb, ast })
      }
    })

    // Home team player stats
    $(`table#box-${gameId.split("").slice(3, 6).join("")}-game-basic tbody tr`).each((_, row) => {
      const player = $(row).find('th[data-stat="player"]').text().trim()
      if (player && player !== "Reserves") {
        const mp = $(row).find('td[data-stat="mp"]').text().trim()
        const pts = Number.parseInt($(row).find('td[data-stat="pts"]').text().trim(), 10)
        const trb = Number.parseInt($(row).find('td[data-stat="trb"]').text().trim(), 10)
        const ast = Number.parseInt($(row).find('td[data-stat="ast"]').text().trim(), 10)

        playerStats.home.push({ player, mp, pts, trb, ast })
      }
    })

    // Update log with success
    await updateScrapeLog(log.id, "success", undefined, playerStats.away.length + playerStats.home.length)

    return {
      id: gameId,
      awayTeam: awayTeam.trim(),
      homeTeam: homeTeam.trim(),
      awayScore,
      homeScore,
      playerStats,
    }
  } catch (error) {
    // Update log with error
    await updateScrapeLog(log.id, "error", (error as Error).message)
    throw error
  }
}

// Schedule regular data updates
export function scheduleDataUpdates() {
  console.log("Scheduled data updates initialized")

  // Update standings every hour
  setInterval(
    async () => {
      try {
        console.log("Updating NBA standings...")
        const standings = await scrapeNBAStandings()

        // Process and save standings to database
        await dbConnect()
        for (const conf of ["east", "west"]) {
          for (const team of standings[conf]) {
            await Team.findOneAndUpdate(
              { abbreviation: team.team },
              {
                $set: {
                  name: team.team,
                  abbreviation: team.team,
                  city: team.team.split(" ")[0],
                  conference: conf === "east" ? "Eastern" : "Western",
                },
              },
              { upsert: true, new: true },
            )
          }
        }
      } catch (error) {
        console.error("Error updating standings:", error)
      }
    },
    60 * 60 * 1000,
  ) // 1 hour

  let activePlayers: any;
  // Update player stats daily
  setInterval(
    async () => {
      try {
        console.log("Updating player statistics...")
        
        // Get list of active players from database
        await dbConnect()
        const activePlayers = await Player.find({ active: true }, { _id: 1 })
        
        // Update each player's stats
        for (const player of activePlayers) {
          for (const [season, stats] of Object.entries(player.stats)) {
          const statsObject = stats as { gp: number; pts: number; reb: number; ast: number };
          await Player.findOneAndUpdate(
            { _id: player._id, "stats.season": season },
            {
              $set: {
                "stats.$[elem].gamesPlayed": statsObject.gp,
                "stats.$[elem].points": statsObject.pts,
                "stats.$[elem].rebounds": statsObject.reb,
                "stats.$[elem].assists": statsObject.ast,
              },
            },
            {
              arrayFilters: [{ elem: { season } }],
              upsert: true,
              new: true,
            },
          )
        }
        }
     } catch (error) {
       activePlayers.forEach((player: { _id: any; }) => {
         console.error(`Error updating stats for player ${player._id}:`, error)
       })
     }
      },
      24 * 60 * 60 * 1000,
    ) 
  
    
    // Update game results daily
    setInterval(
      async () => {
        try {
          console.log("Updating game results...")
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          
          const formattedDate = yesterday.toISOString().split("T")[0].replace(/-/g, "")
          
          // Fetch games from yesterday
          const url = `https://www.basketball-reference.com/boxscores/?month=${yesterday.getMonth() + 1}&day=${yesterday.getDate()}&year=${yesterday.getFullYear()}`
          
          const html = await enhancedFetch(url)
          const $ = load(html)

          const gameIds: string[] = []
        $("div.game_summary").each((_, game) => {
          const link = $(game).find("p.links a").first().attr("href")
          if (link) {
            const gameId = link.split("/").pop()?.replace(".html", "")
            if (gameId) gameIds.push(gameId)
          }
      })

        // Process each game
        await dbConnect()
        for (const gameId of gameIds) {
          try {
            const gameData = await scrapeGameData(gameId)

            // Save game data to database
            // Find teams
            const homeTeam = await Team.findOne({ name: { $regex: gameData.homeTeam, $options: "i" } })
            const awayTeam = await Team.findOne({ name: { $regex: gameData.awayTeam, $options: "i" } })

            if (homeTeam && awayTeam) {
              // Find or create season
              const season = await Season.findOne({ year: yesterday.getFullYear().toString() })

              if (season) {
                // Create game record
                await Game.create({
                  date: yesterday,
                  homeTeam: homeTeam._id,
                  awayTeam: awayTeam._id,
                  homeScore: gameData.homeScore,
                  awayScore: gameData.awayScore,
                  season: season._id,
                  status: "Final",
                })
              }
            }

            // Rate limiting - wait between game requests
            await setTimeout(RATE_LIMIT.minDelayBetweenRequests)
          } catch (error) {
            console.error(`Error processing game ${gameId}:`, error)
          }
        }
      } catch (error) {
        console.error("Error updating game results:", error)
      }
    },
    24 * 60 * 60 * 1000,
  )
}