import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { NbaStandings } from "@/components/nba-standings"
import { TrendingPlayers } from "@/components/trending-players"
import { ImmaculateGrid } from "@/components/immaculate-grid"

export default function Home() {
  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Basketball Stats and History</h1>
        <p className="text-muted-foreground">
          Statistics, scores, and history for the NBA, ABA, WNBA, and top European competition.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Tabs defaultValue="nba" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="nba">Every NBA & WNBA Player</TabsTrigger>
              <TabsTrigger value="team">Every NBA Team</TabsTrigger>
            </TabsList>
            <TabsContent value="nba" className="p-4 border rounded-lg">
              <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <Avatar className="w-16 h-16 mb-2">
                      <img src={`/place-holder-logo.png?height=64&width=64`} alt="Player" />
                    </Avatar>
                    <span className="text-xs text-center">Player {i + 1}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="team" className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <Link
                    href={`/teams/team-${i + 1}`}
                    key={i}
                    className="flex items-center p-2 border rounded hover:bg-muted/50"
                  >
                    <div className="w-8 h-8 mr-2 rounded-full bg-primary/20"></div>
                    <span className="text-sm">Team {i + 1}</span>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>2024-25 NBA Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <NbaStandings />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trending Player Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendingPlayers />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Play Immaculate Grid</CardTitle>
              <CardDescription>
                Put your basketball knowledge to the test with our daily basketball trivia game. Can you complete the
                grid?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImmaculateGrid />
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Play Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Debuts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="text-sm">
                    <Link href={`/players/player-${i + 1}`} className="hover:text-primary">
                      Player Name {i + 1}
                    </Link>{" "}
                    <span className="text-muted-foreground">(Team)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Born On This Day</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="text-sm">
                    <Link href={`/players/player-${i + 1}`} className="hover:text-primary">
                      Player Name {i + 1}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

