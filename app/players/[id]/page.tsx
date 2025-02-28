import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar } from "@/components/ui/avatar"
import Link from "next/link"

// This would normally be fetched from an API
const playerData = {
  id: "example-player",
  name: "Example Player",
  position: "PG",
  height: "6-3",
  weight: "195 lbs",
  birthDate: "January 1, 1990",
  birthPlace: "Los Angeles, CA",
  college: "Example University",
  draft: "2012 Round 1, Pick 10",
  teams: [
    { name: "Team A", years: "2012-2016" },
    { name: "Team B", years: "2016-2020" },
    { name: "Team C", years: "2020-Present" },
  ],
  careerStats: {
    gp: 820,
    pts: 18.5,
    reb: 4.2,
    ast: 6.8,
    stl: 1.2,
    blk: 0.3,
    fg_pct: 0.465,
    fg3_pct: 0.375,
    ft_pct: 0.865,
  },
  seasonStats: [
    {
      season: "2023-24",
      team: "Team C",
      gp: 78,
      pts: 22.3,
      reb: 4.5,
      ast: 7.2,
      stl: 1.3,
      blk: 0.4,
      fg_pct: 0.475,
      fg3_pct: 0.385,
      ft_pct: 0.88,
    },
    {
      season: "2022-23",
      team: "Team C",
      gp: 75,
      pts: 21.8,
      reb: 4.3,
      ast: 7.0,
      stl: 1.2,
      blk: 0.3,
      fg_pct: 0.47,
      fg3_pct: 0.38,
      ft_pct: 0.875,
    },
    {
      season: "2021-22",
      team: "Team C",
      gp: 80,
      pts: 20.5,
      reb: 4.1,
      ast: 6.9,
      stl: 1.2,
      blk: 0.3,
      fg_pct: 0.465,
      fg3_pct: 0.375,
      ft_pct: 0.87,
    },
  ],
}

export default function PlayerPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                <img src={`/place-holder-logo.png?height=80&width=80`} alt={playerData.name} />
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{playerData.name}</CardTitle>
                <p className="text-muted-foreground">{playerData.position}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt className="text-muted-foreground">Born:</dt>
                    <dd>{playerData.birthDate}</dd>
                    <dt className="text-muted-foreground">Birthplace:</dt>
                    <dd>{playerData.birthPlace}</dd>
                    <dt className="text-muted-foreground">Height:</dt>
                    <dd>{playerData.height}</dd>
                    <dt className="text-muted-foreground">Weight:</dt>
                    <dd>{playerData.weight}</dd>
                    <dt className="text-muted-foreground">College:</dt>
                    <dd>{playerData.college}</dd>
                    <dt className="text-muted-foreground">Draft:</dt>
                    <dd>{playerData.draft}</dd>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Teams</h3>
                  <ul className="space-y-1 text-sm">
                    {playerData.teams.map((team, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{team.name}</span>
                        <span className="text-muted-foreground">{team.years}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Career Stats</h3>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt className="text-muted-foreground">Games:</dt>
                    <dd>{playerData.careerStats.gp}</dd>
                    <dt className="text-muted-foreground">Points:</dt>
                    <dd>{playerData.careerStats.pts}</dd>
                    <dt className="text-muted-foreground">Rebounds:</dt>
                    <dd>{playerData.careerStats.reb}</dd>
                    <dt className="text-muted-foreground">Assists:</dt>
                    <dd>{playerData.careerStats.ast}</dd>
                    <dt className="text-muted-foreground">FG%:</dt>
                    <dd>{(playerData.careerStats.fg_pct * 100).toFixed(1)}%</dd>
                    <dt className="text-muted-foreground">3P%:</dt>
                    <dd>{(playerData.careerStats.fg3_pct * 100).toFixed(1)}%</dd>
                    <dt className="text-muted-foreground">FT%:</dt>
                    <dd>{(playerData.careerStats.ft_pct * 100).toFixed(1)}%</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="regular">
                <TabsList className="mb-4">
                  <TabsTrigger value="regular">Regular Season</TabsTrigger>
                  <TabsTrigger value="playoffs">Playoffs</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="regular">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Season</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead>GP</TableHead>
                          <TableHead>PTS</TableHead>
                          <TableHead>REB</TableHead>
                          <TableHead>AST</TableHead>
                          <TableHead>STL</TableHead>
                          <TableHead>BLK</TableHead>
                          <TableHead>FG%</TableHead>
                          <TableHead>3P%</TableHead>
                          <TableHead>FT%</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {playerData.seasonStats.map((season, index) => (
                          <TableRow key={index}>
                            <TableCell>{season.season}</TableCell>
                            <TableCell>{season.team}</TableCell>
                            <TableCell>{season.gp}</TableCell>
                            <TableCell>{season.pts}</TableCell>
                            <TableCell>{season.reb}</TableCell>
                            <TableCell>{season.ast}</TableCell>
                            <TableCell>{season.stl}</TableCell>
                            <TableCell>{season.blk}</TableCell>
                            <TableCell>{(season.fg_pct * 100).toFixed(1)}%</TableCell>
                            <TableCell>{(season.fg3_pct * 100).toFixed(1)}%</TableCell>
                            <TableCell>{(season.ft_pct * 100).toFixed(1)}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="playoffs">
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">No playoff data available</p>
                  </div>
                </TabsContent>

                <TabsContent value="advanced">
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">Advanced statistics coming soon</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Game Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Game log data coming soon</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Similar Players</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <Link
                    href={`/players/similar-player-${i + 1}`}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50"
                  >
                    <Avatar className="h-8 w-8">
                      <img src={`/place-holder-logo.png?height=32&width=32`} alt={`Similar Player ${i + 1}`} />
                    </Avatar>
                    <span>Similar Player {i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

