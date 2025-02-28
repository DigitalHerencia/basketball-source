import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// This would normally be fetched from an API
const gameScores = {
  today: [
    {
      id: "game1",
      homeTeam: "Boston",
      homeScore: 112,
      awayTeam: "New York",
      awayScore: 105,
      status: "Final",
      time: "7:00 PM ET",
    },
    {
      id: "game2",
      homeTeam: "Philadelphia",
      homeScore: 118,
      awayTeam: "Toronto",
      awayScore: 109,
      status: "Final",
      time: "7:30 PM ET",
    },
    {
      id: "game3",
      homeTeam: "Miami",
      homeScore: 104,
      awayTeam: "Atlanta",
      awayScore: 98,
      status: "Final",
      time: "8:00 PM ET",
    },
    {
      id: "game4",
      homeTeam: "Chicago",
      homeScore: 95,
      awayTeam: "Cleveland",
      awayScore: 101,
      status: "Final",
      time: "8:00 PM ET",
    },
    {
      id: "game5",
      homeTeam: "Dallas",
      homeScore: 120,
      awayTeam: "Houston",
      awayScore: 113,
      status: "Final",
      time: "8:30 PM ET",
    },
    {
      id: "game6",
      homeTeam: "Denver",
      homeScore: 124,
      awayTeam: "Utah",
      awayScore: 111,
      status: "Final",
      time: "9:00 PM ET",
    },
    {
      id: "game7",
      homeTeam: "Phoenix",
      homeScore: 115,
      awayTeam: "Sacramento",
      awayScore: 120,
      status: "Final",
      time: "10:00 PM ET",
    },
    {
      id: "game8",
      homeTeam: "LA Lakers",
      homeScore: 108,
      awayTeam: "LA Clippers",
      awayScore: 103,
      status: "Final",
      time: "10:30 PM ET",
    },
  ],
  yesterday: [
    {
      id: "game9",
      homeTeam: "Washington",
      homeScore: 98,
      awayTeam: "Charlotte",
      awayScore: 105,
      status: "Final",
      time: "7:00 PM ET",
    },
    {
      id: "game10",
      homeTeam: "Brooklyn",
      homeScore: 110,
      awayTeam: "Detroit",
      awayScore: 102,
      status: "Final",
      time: "7:30 PM ET",
    },
    {
      id: "game11",
      homeTeam: "Indiana",
      homeScore: 121,
      awayTeam: "Orlando",
      awayScore: 115,
      status: "Final",
      time: "7:30 PM ET",
    },
    {
      id: "game12",
      homeTeam: "Milwaukee",
      homeScore: 128,
      awayTeam: "Minnesota",
      awayScore: 119,
      status: "Final",
      time: "8:00 PM ET",
    },
    {
      id: "game13",
      homeTeam: "Oklahoma City",
      homeScore: 117,
      awayTeam: "San Antonio",
      awayScore: 105,
      status: "Final",
      time: "8:00 PM ET",
    },
    {
      id: "game14",
      homeTeam: "Portland",
      homeScore: 99,
      awayTeam: "Golden State",
      awayScore: 112,
      status: "Final",
      time: "10:00 PM ET",
    },
  ],
  tomorrow: [
    {
      id: "game15",
      homeTeam: "Boston",
      homeScore: 0,
      awayTeam: "Philadelphia",
      awayScore: 0,
      status: "Scheduled",
      time: "7:00 PM ET",
    },
    {
      id: "game16",
      homeTeam: "New York",
      homeScore: 0,
      awayTeam: "Toronto",
      awayScore: 0,
      status: "Scheduled",
      time: "7:30 PM ET",
    },
    {
      id: "game17",
      homeTeam: "Atlanta",
      homeScore: 0,
      awayTeam: "Miami",
      awayScore: 0,
      status: "Scheduled",
      time: "7:30 PM ET",
    },
    {
      id: "game18",
      homeTeam: "Cleveland",
      homeScore: 0,
      awayTeam: "Chicago",
      awayScore: 0,
      status: "Scheduled",
      time: "8:00 PM ET",
    },
    {
      id: "game19",
      homeTeam: "Houston",
      homeScore: 0,
      awayTeam: "Dallas",
      awayScore: 0,
      status: "Scheduled",
      time: "8:30 PM ET",
    },
    {
      id: "game20",
      homeTeam: "Utah",
      homeScore: 0,
      awayTeam: "Denver",
      awayScore: 0,
      status: "Scheduled",
      time: "9:00 PM ET",
    },
    {
      id: "game21",
      homeTeam: "Sacramento",
      homeScore: 0,
      awayTeam: "Phoenix",
      awayScore: 0,
      status: "Scheduled",
      time: "10:00 PM ET",
    },
    {
      id: "game22",
      homeTeam: "LA Clippers",
      homeScore: 0,
      awayTeam: "LA Lakers",
      awayScore: 0,
      status: "Scheduled",
      time: "10:30 PM ET",
    },
  ],
}

export default function ScoresPage() {
  // In a real app, this would be the current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">NBA Scores</h1>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 border rounded-md">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>{currentDate}</span>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Today
          </Button>
          <Button variant="outline" size="sm">
            Yesterday
          </Button>
          <Button variant="outline" size="sm">
            Tomorrow
          </Button>
        </div>
      </div>

      <Tabs defaultValue="today">
        <TabsList className="mb-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameScores.today.map((game) => (
              <Card key={game.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">{game.status}</span>
                    <span className="text-sm text-muted-foreground">{game.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                      <Link
                        href={`/teams/${game.awayTeam.toLowerCase().replace(" ", "-")}`}
                        className="font-medium hover:text-primary"
                      >
                        {game.awayTeam}
                      </Link>
                    </div>
                    <div className="font-bold text-lg">{game.awayScore}</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                      <Link
                        href={`/teams/${game.homeTeam.toLowerCase().replace(" ", "-")}`}
                        className="font-medium hover:text-primary"
                      >
                        {game.homeTeam}
                      </Link>
                    </div>
                    <div className="font-bold text-lg">{game.homeScore}</div>
                  </div>
                  <div className="mt-3 pt-3 border-t text-center">
                    <Link href={`/games/${game.id}`} className="text-sm text-primary hover:underline">
                      Box Score
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="yesterday">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameScores.yesterday.map((game) => (
              <Card key={game.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">{game.status}</span>
                    <span className="text-sm text-muted-foreground">{game.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                      <Link
                        href={`/teams/${game.awayTeam.toLowerCase().replace(" ", "-")}`}
                        className="font-medium hover:text-primary"
                      >
                        {game.awayTeam}
                      </Link>
                    </div>
                    <div className="font-bold text-lg">{game.awayScore}</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                      <Link
                        href={`/teams/${game.homeTeam.toLowerCase().replace(" ", "-")}`}
                        className="font-medium hover:text-primary"
                      >
                        {game.homeTeam}
                      </Link>
                    </div>
                    <div className="font-bold text-lg">{game.homeScore}</div>
                  </div>
                  <div className="mt-3 pt-3 border-t text-center">
                    <Link href={`/games/${game.id}`} className="text-sm text-primary hover:underline">
                      Box Score
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tomorrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameScores.tomorrow.map((game) => (
              <Card key={game.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">{game.status}</span>
                    <span className="text-sm text-muted-foreground">{game.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                      <Link
                        href={`/teams/${game.awayTeam.toLowerCase().replace(" ", "-")}`}
                        className="font-medium hover:text-primary"
                      >
                        {game.awayTeam}
                      </Link>
                    </div>
                    <div className="font-bold text-lg">{game.status === "Scheduled" ? "-" : game.awayScore}</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                      <Link
                        href={`/teams/${game.homeTeam.toLowerCase().replace(" ", "-")}`}
                        className="font-medium hover:text-primary"
                      >
                        {game.homeTeam}
                      </Link>
                    </div>
                    <div className="font-bold text-lg">{game.status === "Scheduled" ? "-" : game.homeScore}</div>
                  </div>
                  <div className="mt-3 pt-3 border-t text-center">
                    <span className="text-sm text-muted-foreground">Game Preview</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

