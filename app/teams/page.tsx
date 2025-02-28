import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function TeamsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Teams</h1>

      <Card>
        <CardHeader>
          <CardTitle>Browse Teams</CardTitle>
          <CardDescription>Browse all NBA, ABA, and WNBA teams.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="nba">
            <TabsList className="mb-4">
              <TabsTrigger value="nba">NBA</TabsTrigger>
              <TabsTrigger value="wnba">WNBA</TabsTrigger>
              <TabsTrigger value="aba">ABA</TabsTrigger>
            </TabsList>

            <TabsContent value="nba">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(30)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/teams/team-${i + 1}`}
                    className="flex items-center p-3 border rounded-md hover:bg-muted/50"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium">Team Name {i + 1}</div>
                      <div className="text-sm text-muted-foreground">NBA</div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wnba">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(12)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/teams/wnba-team-${i + 1}`}
                    className="flex items-center p-3 border rounded-md hover:bg-muted/50"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium">WNBA Team {i + 1}</div>
                      <div className="text-sm text-muted-foreground">WNBA</div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="aba">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(10)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/teams/aba-team-${i + 1}`}
                    className="flex items-center p-3 border rounded-md hover:bg-muted/50"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium">ABA Team {i + 1}</div>
                      <div className="text-sm text-muted-foreground">ABA (Historical)</div>
                    </div>
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

