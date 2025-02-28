"use client"

import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RefreshCcw, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AdminPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [scrapeLogs, setScrapeLogs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (isLoaded && (!isSignedIn || user?.publicMetadata.role !== "admin")) {
      redirect("/")
    }
  }, [isLoaded, isSignedIn, user])

  // Fetch scrape logs
  const fetchScrapeLogs = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/scrape-logs")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch scrape logs")
      }

      setScrapeLogs(data.logs)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  // Trigger data scraping
  const triggerScrape = async (type: string) => {
    try {
      setIsLoading(true)
      setError("")
      setSuccessMessage("")

      const response = await fetch("/api/admin/trigger-scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to trigger scrape")
      }

      setSuccessMessage(`${type} scrape initiated successfully`)
      fetchScrapeLogs()
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  // Load scrape logs on initial load
  useEffect(() => {
    if (isLoaded && isSignedIn && user?.publicMetadata.role === "admin") {
      fetchScrapeLogs()
    }
  }, [isLoaded, isSignedIn, user]) // Removed fetchScrapeLogs from dependencies

  if (!isLoaded || !isSignedIn) {
    return <div className="container py-10">Loading...</div>
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="scraping">Data Scraping</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Players</CardTitle>
                <CardDescription>Number of players in database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">2,500+</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Teams</CardTitle>
                <CardDescription>Number of teams in database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">30+</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Registered users on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">150+</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Data Scraping: NBA Standings</p>
                    <p className="text-sm text-muted-foreground">Completed successfully</p>
                  </div>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">New User Registration</p>
                    <p className="text-sm text-muted-foreground">user@example.com</p>
                  </div>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Data Scraping: Player Stats</p>
                    <p className="text-sm text-muted-foreground">Completed with 2 errors</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scraping">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Data Scraping Controls</CardTitle>
              <CardDescription>Manage data scraping operations</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert className="mb-4">
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={() => triggerScrape("players")} disabled={isLoading}>
                  Scrape Players
                </Button>
                <Button onClick={() => triggerScrape("teams")} disabled={isLoading}>
                  Scrape Teams
                </Button>
                <Button onClick={() => triggerScrape("standings")} disabled={isLoading}>
                  Scrape Standings
                </Button>
                <Button onClick={() => triggerScrape("games")} disabled={isLoading}>
                  Scrape Games
                </Button>
                <Button onClick={() => triggerScrape("all")} disabled={isLoading} variant="outline">
                  Scrape All Data
                </Button>
                <Button onClick={fetchScrapeLogs} disabled={isLoading} variant="outline">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refresh Logs
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scrape Logs</CardTitle>
              <CardDescription>Recent data scraping operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scrapeLogs.length > 0 ? (
                    scrapeLogs.map((log: any) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.type}</TableCell>
                        <TableCell className="truncate max-w-[200px]">{log.source}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              log.status === "success"
                                ? "bg-green-100 text-green-800"
                                : log.status === "error"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {log.status}
                          </span>
                        </TableCell>
                        <TableCell>{log.itemsProcessed}</TableCell>
                        <TableCell>{new Date(log.startTime).toLocaleString()}</TableCell>
                        <TableCell>{log.endTime ? new Date(log.endTime).toLocaleString() : "In Progress"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No scrape logs found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>2023-01-15</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>2023-02-20</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bob Johnson</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>2023-03-10</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Configure site-wide settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-medium">Site Name</label>
                  <Input defaultValue="Basketball Stats Hub" />
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Data Scraping Frequency</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Every 6 hours</option>
                    <option>Every 12 hours</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Enable User Registration</label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="enableRegistration" defaultChecked />
                    <label htmlFor="enableRegistration">Enable</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

