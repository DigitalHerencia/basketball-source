import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function PlayersPage() {
  // In a real app, this would be fetched from an API
  const alphabetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">NBA & ABA Players</h1>

      <div className="mb-6">
        <form className="flex gap-2">
          <Input placeholder="Search for a player..." className="max-w-md" />
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            Search
          </button>
        </form>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Browse Players</CardTitle>
          <CardDescription>Browse all NBA and ABA players alphabetically or by team.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="alphabet">
            <TabsList className="mb-4">
              <TabsTrigger value="alphabet">Alphabetical</TabsTrigger>
              <TabsTrigger value="active">Active Players</TabsTrigger>
              <TabsTrigger value="team">By Team</TabsTrigger>
            </TabsList>

            <TabsContent value="alphabet">
              <div className="flex flex-wrap gap-2 mb-6">
                {alphabetLetters.map((letter) => (
                  <Link
                    key={letter}
                    href={`/players/alphabet/${letter.toLowerCase()}`}
                    className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-primary hover:text-primary-foreground"
                  >
                    {letter}
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(20)].map((_, i) => (
                  <Link key={i} href={`/players/player-${i + 1}`} className="p-2 border rounded-md hover:bg-muted/50">
                    <div className="font-medium">Player Name {i + 1}</div>
                    <div className="text-sm text-muted-foreground">2018-2024</div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(16)].map((_, i) => (
                  <Link key={i} href={`/players/player-${i + 1}`} className="p-2 border rounded-md hover:bg-muted/50">
                    <div className="font-medium">Active Player {i + 1}</div>
                    <div className="text-sm text-muted-foreground">Team Name</div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(30)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/teams/team-${i + 1}/roster`}
                    className="p-2 border rounded-md hover:bg-muted/50"
                  >
                    <div className="font-medium">Team {i + 1}</div>
                    <div className="text-sm text-muted-foreground">NBA</div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

