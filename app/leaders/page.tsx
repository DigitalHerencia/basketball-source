import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"

// This would normally be fetched from an API
const statLeaders = {
  points: [
    { id: "player1", name: "Player One", team: "Team A", value: 32.5 },
    { id: "player2", name: "Player Two", team: "Team B", value: 30.8 },
    { id: "player3", name: "Player Three", team: "Team C", value: 29.7 },
    { id: "player4", name: "Player Four", team: "Team D", value: 28.9 },
    { id: "player5", name: "Player Five", team: "Team E", value: 28.2 },
    { id: "player6", name: "Player Six", team: "Team F", value: 27.5 },
    { id: "player7", name: "Player Seven", team: "Team G", value: 27.1 },
    { id: "player8", name: "Player Eight", team: "Team H", value: 26.8 },
    { id: "player9", name: "Player Nine", team: "Team I", value: 26.3 },
    { id: "player10", name: "Player Ten", team: "Team J", value: 25.9 },
  ],
  rebounds: [
    { id: "player11", name: "Player Eleven", team: "Team K", value: 13.8 },
    { id: "player12", name: "Player Twelve", team: "Team L", value: 12.9 },
    { id: "player13", name: "Player Thirteen", team: "Team M", value: 12.5 },
    { id: "player14", name: "Player Fourteen", team: "Team N", value: 11.7 },
    { id: "player15", name: "Player Fifteen", team: "Team O", value: 11.2 },
    { id: "player16", name: "Player Sixteen", team: "Team P", value: 10.8 },
    { id: "player17", name: "Player Seventeen", team: "Team Q", value: 10.5 },
    { id: "player18", name: "Player Eighteen", team: "Team R", value: 10.2 },
    { id: "player19", name: "Player Nineteen", team: "Team S", value: 9.8 },
    { id: "player20", name: "Player Twenty", team: "Team T", value: 9.5 },
  ],
  assists: [
    { id: "player21", name: "Player Twenty One", team: "Team U", value: 11.2 },
    { id: "player22", name: "Player Twenty Two", team: "Team V", value: 10.5 },
    { id: "player23", name: "Player Twenty Three", team: "Team W", value: 9.8 },
    { id: "player24", name: "Player Twenty Four", team: "Team X", value: 9.3 },
    { id: "player25", name: "Player Twenty Five", team: "Team Y", value: 8.9 },
    { id: "player26", name: "Player Twenty Six", team: "Team Z", value: 8.5 },
    { id: "player27", name: "Player Twenty Seven", team: "Team AA", value: 8.2 },
    { id: "player28", name: "Player Twenty Eight", team: "Team BB", value: 7.9 },
    { id: "player29", name: "Player Twenty Nine", team: "Team CC", value: 7.6 },
    { id: "player30", name: "Player Thirty", team: "Team DD", value: 7.3 },
  ],
  steals: [
    { id: "player31", name: "Player Thirty One", team: "Team EE", value: 2.5 },
    { id: "player32", name: "Player Thirty Two", team: "Team FF", value: 2.3 },
    { id: "player33", name: "Player Thirty Three", team: "Team GG", value: 2.1 },
    { id: "player34", name: "Player Thirty Four", team: "Team HH", value: 2.0 },
    { id: "player35", name: "Player Thirty Five", team: "Team II", value: 1.9 },
    { id: "player36", name: "Player Thirty Six", team: "Team JJ", value: 1.8 },
    { id: "player37", name: "Player Thirty Seven", team: "Team KK", value: 1.7 },
    { id: "player38", name: "Player Thirty Eight", team: "Team LL", value: 1.6 },
    { id: "player39", name: "Player Thirty Nine", team: "Team MM", value: 1.5 },
    { id: "player40", name: "Player Forty", team: "Team NN", value: 1.4 },
  ],
  blocks: [
    { id: "player41", name: "Player Forty One", team: "Team OO", value: 3.2 },
    { id: "player42", name: "Player Forty Two", team: "Team PP", value: 2.9 },
    { id: "player43", name: "Player Forty Three", team: "Team QQ", value: 2.7 },
    { id: "player44", name: "Player Forty Four", team: "Team RR", value: 2.5 },
    { id: "player45", name: "Player Forty Five", team: "Team SS", value: 2.3 },
    { id: "player46", name: "Player Forty Six", team: "Team TT", value: 2.1 },
    { id: "player47", name: "Player Forty Seven", team: "Team UU", value: 2.0 },
    { id: "player48", name: "Player Forty Eight", team: "Team VV", value: 1.9 },
    { id: "player49", name: "Player Forty Nine", team: "Team WW", value: 1.8 },
    { id: "player50", name: "Player Fifty", team: "Team XX", value: 1.7 },
  ],
}

export default function LeadersPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">NBA Statistical Leaders</h1>

      <Tabs defaultValue="points">
        <TabsList className="mb-6">
          <TabsTrigger value="points">Points</TabsTrigger>
          <TabsTrigger value="rebounds">Rebounds</TabsTrigger>
          <TabsTrigger value="assists">Assists</TabsTrigger>
          <TabsTrigger value="steals">Steals</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>

        <TabsContent value="points">
          <Card>
            <CardHeader>
              <CardTitle>Points Per Game Leaders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">PPG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statLeaders.points.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <img src={`/placeholder.svg?height=32&width=32`} alt={player.name} />
                          </Avatar>
                          <Link href={`/players/${player.id}`} className="hover:text-primary">
                            {player.name}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/teams/${player.team.toLowerCase().replace(" ", "-")}`}
                          className="hover:text-primary"
                        >
                          {player.team}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-medium">{player.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rebounds">
          <Card>
            <CardHeader>
              <CardTitle>Rebounds Per Game Leaders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">RPG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statLeaders.rebounds.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <img src={`/placeholder.svg?height=32&width=32`} alt={player.name} />
                          </Avatar>
                          <Link href={`/players/${player.id}`} className="hover:text-primary">
                            {player.name}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/teams/${player.team.toLowerCase().replace(" ", "-")}`}
                          className="hover:text-primary"
                        >
                          {player.team}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-medium">{player.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assists">
          <Card>
            <CardHeader>
              <CardTitle>Assists Per Game Leaders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">APG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statLeaders.assists.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <img src={`/placeholder.svg?height=32&width=32`} alt={player.name} />
                          </Avatar>
                          <Link href={`/players/${player.id}`} className="hover:text-primary">
                            {player.name}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/teams/${player.team.toLowerCase().replace(" ", "-")}`}
                          className="hover:text-primary"
                        >
                          {player.team}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-medium">{player.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steals">
          <Card>
            <CardHeader>
              <CardTitle>Steals Per Game Leaders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">SPG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statLeaders.steals.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <img src={`/placeholder.svg?height=32&width=32`} alt={player.name} />
                          </Avatar>
                          <Link href={`/players/${player.id}`} className="hover:text-primary">
                            {player.name}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/teams/${player.team.toLowerCase().replace(" ", "-")}`}
                          className="hover:text-primary"
                        >
                          {player.team}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-medium">{player.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocks">
          <Card>
            <CardHeader>
              <CardTitle>Blocks Per Game Leaders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">BPG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statLeaders.blocks.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <img src={`/placeholder.svg?height=32&width=32`} alt={player.name} />
                          </Avatar>
                          <Link href={`/players/${player.id}`} className="hover:text-primary">
                            {player.name}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/teams/${player.team.toLowerCase().replace(" ", "-")}`}
                          className="hover:text-primary"
                        >
                          {player.team}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-medium">{player.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

