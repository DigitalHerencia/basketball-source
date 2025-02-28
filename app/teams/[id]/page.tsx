import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

// This would normally be fetched from an API
const teamData = {
  id: "example-team",
  name: "Example Team",
  abbreviation: "EXT",
  conference: "Eastern",
  division: "Atlantic",
  wins: 42,
  losses: 40,
  founded: 1967,
  arena: "Example Arena",
  location: "Example City, State",
  championships: [1975, 1982, 2008],
  coach: "Example Coach",
  roster: [
    { id: "player1", name: "Player One", position: "PG", number: 1, ppg: 18.5, rpg: 4.2, apg: 7.8 },
    { id: "player2", name: "Player Two", position: "SG", number: 2, ppg: 22.3, rpg: 5.1, apg: 3.2 },
    { id: "player3", name: "Player Three", position: "SF", number: 3, ppg: 16.8, rpg: 6.5, apg: 2.1 },
    { id: "player4", name: "Player Four", position: "PF", number: 4, ppg: 14.2, rpg: 9.8, apg: 1.5 },
    { id: "player5", name: "Player Five", position: "C", number: 5, ppg: 12.5, rpg: 11.2, apg: 1.2 },
    { id: "player6", name: "Player Six", position: "PG", number: 6, ppg: 8.5, rpg: 2.2, apg: 4.8 },
    { id: "player7", name: "Player Seven", position: "SG", number: 7, ppg: 9.3, rpg: 3.1, apg: 1.2 },
    { id: "player8", name: "Player Eight", position: "SF", number: 8, ppg: 7.8, rpg: 4.5, apg: 1.1 },
  ],
  seasonStats: {
    wins: 42,
    losses: 40,
    pointsPerGame: 112.5,
    oppPointsPerGame: 110.2,
    reboundsPerGame: 44.8,
    assistsPerGame: 24.3,
    stealsPerGame: 7.2,
    blocksPerGame: 5.1,
    turnoversPerGame: 13.5,
    fgPct: 0.465,
    threePtPct: 0.375,
    ftPct: 0.815,
  },
  recentGames: [
    { opponent: "Team A", result: "W", score: "120-115", date: "Apr 10, 2024" },
    { opponent: "Team B", result: "L", score: "105-110", date: "Apr 8, 2024" },
    { opponent: "Team C", result: "W", score: "118-102", date: "Apr 6, 2024" },
    { opponent: "Team D", result: "W", score: "125-120", date: "Apr 4, 2024" },
    { opponent: "Team E", result: "L", score: "98-105", date: "Apr 2, 2024" },
  ],
}

export default function TeamPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">{teamData.abbreviation}</span>
              </div>
              <div>
                <CardTitle className="text-2xl">{teamData.name}</CardTitle>
                <p className="text-muted-foreground">
                  {teamData.conference} Conference, {teamData.division} Division
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Team Information</h3>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt className="text-muted-foreground">Location:</dt>
                    <dd>{teamData.location}</dd>
                    <dt className="text-muted-foreground">Arena:</dt>
                    <dd>{teamData.arena}</dd>
                    <dt className="text-muted-foreground">Founded:</dt>
                    <dd>{teamData.founded}</dd>
                    <dt className="text-muted-foreground">Head Coach:</dt>
                    <dd>{teamData.coach}</dd>
                    <dt className="text-muted-foreground">Championships:</dt>
                    <dd>{teamData.championships.join(", ")}</dd>
                    <dt className="text-muted-foreground">Record:</dt>
                    <dd>
                      {teamData.wins}-{teamData.losses}
                    </dd>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Recent Games</h3>
                  <ul className="space-y-1 text-sm">
                    {teamData.recentGames.map((game, index) => (
                      <li key={index} className="flex justify-between">
                        <span>vs {game.opponent}</span>
                        <span className={game.result === "W" ? "text-green-600" : "text-red-600"}>
                          {game.result} {game.score}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Team Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="roster">
                <TabsList className="mb-4">
                  <TabsTrigger value="roster">Roster</TabsTrigger>
                  <TabsTrigger value="stats">Team Stats</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>

                <TabsContent value="roster">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">#</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Pos</TableHead>
                          <TableHead className="text-right">PPG</TableHead>
                          <TableHead className="text-right">RPG</TableHead>
                          <TableHead className="text-right">APG</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamData.roster.map((player) => (
                          <TableRow key={player.id}>
                            <TableCell>{player.number}</TableCell>
                            <TableCell>
                              <Link href={`/players/${player.id}`} className="hover:text-primary">
                                {player.name}
                              </Link>
                            </TableCell>
                            <TableCell>{player.position}</TableCell>
                            <TableCell className="text-right">{player.ppg}</TableCell>
                            <TableCell className="text-right">{player.rpg}</TableCell>
                            <TableCell className="text-right">{player.apg}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="stats">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Offense</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="grid grid-cols-2 gap-2 text-sm">
                          <dt className="text-muted-foreground">Points Per Game:</dt>
                          <dd>{teamData.seasonStats.pointsPerGame}</dd>
                          <dt className="text-muted-foreground">FG%:</dt>
                          <dd>{(teamData.seasonStats.fgPct * 100).toFixed(1)}%</dd>
                          <dt className="text-muted-foreground">3P%:</dt>
                          <dd>{(teamData.seasonStats.threePtPct * 100).toFixed(1)}%</dd>
                          <dt className="text-muted-foreground">FT%:</dt>
                          <dd>{(teamData.seasonStats.ftPct * 100).toFixed(1)}%</dd>
                          <dt className="text-muted-foreground">Assists Per Game:</dt>
                          <dd>{teamData.seasonStats.assistsPerGame}</dd>
                          <dt className="text-muted-foreground">Turnovers Per Game:</dt>
                          <dd>{teamData.seasonStats.turnoversPerGame}</dd>
                        </dl>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Defense</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="grid grid-cols-2 gap-2 text-sm">
                          <dt className="text-muted-foreground">Opp Points Per Game:</dt>
                          <dd>{teamData.seasonStats.oppPointsPerGame}</dd>
                          <dt className="text-muted-foreground">Rebounds Per Game:</dt>
                          <dd>{teamData.seasonStats.reboundsPerGame}</dd>
                          <dt className="text-muted-foreground">Steals Per Game:</dt>
                          <dd>{teamData.seasonStats.stealsPerGame}</dd>
                          <dt className="text-muted-foreground">Blocks Per Game:</dt>
                          <dd>{teamData.seasonStats.blocksPerGame}</dd>
                        </dl>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="schedule">
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">Full schedule coming soon</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

