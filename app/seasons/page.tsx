import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// This would normally be fetched from an API
const seasons = {
  nba: [
    { year: "2023-24", champion: "Boston Celtics", mvp: "Nikola Jokić", finals_mvp: "Jayson Tatum" },
    { year: "2022-23", champion: "Denver Nuggets", mvp: "Joel Embiid", finals_mvp: "Nikola Jokić" },
    { year: "2021-22", champion: "Golden State Warriors", mvp: "Nikola Jokić", finals_mvp: "Stephen Curry" },
    { year: "2020-21", champion: "Milwaukee Bucks", mvp: "Nikola Jokić", finals_mvp: "Giannis Antetokounmpo" },
    { year: "2019-20", champion: "Los Angeles Lakers", mvp: "Giannis Antetokounmpo", finals_mvp: "LeBron James" },
    { year: "2018-19", champion: "Toronto Raptors", mvp: "Giannis Antetokounmpo", finals_mvp: "Kawhi Leonard" },
    { year: "2017-18", champion: "Golden State Warriors", mvp: "James Harden", finals_mvp: "Kevin Durant" },
    { year: "2017-18", champion: "Golden State Warriors", mvp: "James Harden", finals_mvp: "Kevin Durant" },
    { year: "2016-17", champion: "Golden State Warriors", mvp: "Russell Westbrook", finals_mvp: "Kevin Durant" },
    { year: "2015-16", champion: "Cleveland Cavaliers", mvp: "Stephen Curry", finals_mvp: "LeBron James" },
    { year: "2014-15", champion: "Golden State Warriors", mvp: "Stephen Curry", finals_mvp: "Andre Iguodala" },
  ],
  wnba: [
    { year: "2023", champion: "Las Vegas Aces", mvp: "A'ja Wilson", finals_mvp: "A'ja Wilson" },
    { year: "2022", champion: "Las Vegas Aces", mvp: "A'ja Wilson", finals_mvp: "Chelsea Gray" },
    { year: "2021", champion: "Chicago Sky", mvp: "Jonquel Jones", finals_mvp: "Kahleah Copper" },
    { year: "2020", champion: "Seattle Storm", mvp: "A'ja Wilson", finals_mvp: "Breanna Stewart" },
    { year: "2019", champion: "Washington Mystics", mvp: "Elena Delle Donne", finals_mvp: "Emma Meesseman" },
  ],
  aba: [
    { year: "1975-76", champion: "New York Nets", mvp: "Julius Erving", finals_mvp: "Julius Erving" },
    { year: "1974-75", champion: "Kentucky Colonels", mvp: "Julius Erving", finals_mvp: "Artis Gilmore" },
    { year: "1973-74", champion: "New York Nets", mvp: "Julius Erving", finals_mvp: "Julius Erving" },
    { year: "1972-73", champion: "Indiana Pacers", mvp: "Billy Cunningham", finals_mvp: "George McGinnis" },
    { year: "1971-72", champion: "Indiana Pacers", mvp: "Artis Gilmore", finals_mvp: "Freddie Lewis" },
  ],
}

export default function SeasonsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Basketball Seasons</h1>

      <Tabs defaultValue="nba">
        <TabsList className="mb-6">
          <TabsTrigger value="nba">NBA</TabsTrigger>
          <TabsTrigger value="wnba">WNBA</TabsTrigger>
          <TabsTrigger value="aba">ABA</TabsTrigger>
        </TabsList>

        <TabsContent value="nba">
          <Card>
            <CardHeader>
              <CardTitle>NBA Seasons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Season</th>
                      <th className="text-left py-3 px-4">Champion</th>
                      <th className="text-left py-3 px-4">MVP</th>
                      <th className="text-left py-3 px-4">Finals MVP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seasons.nba.map((season) => (
                      <tr key={season.year} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <Link href={`/seasons/nba/${season.year}`} className="text-primary hover:underline">
                            {season.year}
                          </Link>
                        </td>
                        <td className="py-3 px-4">{season.champion}</td>
                        <td className="py-3 px-4">{season.mvp}</td>
                        <td className="py-3 px-4">{season.finals_mvp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Link href="/seasons/nba" className="text-primary hover:underline">
                  View All NBA Seasons
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wnba">
          <Card>
            <CardHeader>
              <CardTitle>WNBA Seasons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Season</th>
                      <th className="text-left py-3 px-4">Champion</th>
                      <th className="text-left py-3 px-4">MVP</th>
                      <th className="text-left py-3 px-4">Finals MVP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seasons.wnba.map((season) => (
                      <tr key={season.year} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <Link href={`/seasons/wnba/${season.year}`} className="text-primary hover:underline">
                            {season.year}
                          </Link>
                        </td>
                        <td className="py-3 px-4">{season.champion}</td>
                        <td className="py-3 px-4">{season.mvp}</td>
                        <td className="py-3 px-4">{season.finals_mvp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Link href="/seasons/wnba" className="text-primary hover:underline">
                  View All WNBA Seasons
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aba">
          <Card>
            <CardHeader>
              <CardTitle>ABA Seasons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Season</th>
                      <th className="text-left py-3 px-4">Champion</th>
                      <th className="text-left py-3 px-4">MVP</th>
                      <th className="text-left py-3 px-4">Finals MVP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seasons.aba.map((season) => (
                      <tr key={season.year} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <Link href={`/seasons/aba/${season.year}`} className="text-primary hover:underline">
                            {season.year}
                          </Link>
                        </td>
                        <td className="py-3 px-4">{season.champion}</td>
                        <td className="py-3 px-4">{season.mvp}</td>
                        <td className="py-3 px-4">{season.finals_mvp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Link href="/seasons/aba" className="text-primary hover:underline">
                  View All ABA Seasons
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

