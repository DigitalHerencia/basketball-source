"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

type TeamRecord = {
  id: string
  name: string
  wins: number
  losses: number
}

const eastTeams: TeamRecord[] = [
  { id: "cle", name: "Cleveland", wins: 48, losses: 10 },
  { id: "bos", name: "Boston", wins: 42, losses: 17 },
  { id: "nyk", name: "New York", wins: 38, losses: 20 },
  { id: "ind", name: "Indiana", wins: 33, losses: 24 },
  { id: "mil", name: "Milwaukee", wins: 32, losses: 25 },
  { id: "det", name: "Detroit", wins: 23, losses: 36 },
  { id: "orl", name: "Orlando", wins: 29, losses: 31 },
  { id: "mia", name: "Miami", wins: 27, losses: 30 },
]

const westTeams: TeamRecord[] = [
  { id: "okc", name: "Oklahoma City", wins: 47, losses: 11 },
  { id: "den", name: "Denver", wins: 38, losses: 20 },
  { id: "gsw", name: "Golden State", wins: 38, losses: 20 },
  { id: "hou", name: "Houston", wins: 37, losses: 22 },
  { id: "lal", name: "LA Lakers", wins: 35, losses: 21 },
  { id: "lac", name: "LA Clippers", wins: 32, losses: 26 },
  { id: "min", name: "Minnesota", wins: 32, losses: 27 },
  { id: "dal", name: "Dallas", wins: 31, losses: 28 },
]

export function NbaStandings() {
  return (
    <Tabs defaultValue="east">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="east">East</TabsTrigger>
          <TabsTrigger value="west">West</TabsTrigger>
        </TabsList>
        <div className="text-sm space-x-4">
          <Link href="/standings/summary" className="text-primary hover:underline">
            Summary
          </Link>
          <Link href="/standings/schedule" className="text-primary hover:underline">
            Schedule
          </Link>
          <Link href="/standings/leaders" className="text-primary hover:underline">
            Leaders
          </Link>
        </div>
      </div>

      <TabsContent value="east">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">East</TableHead>
                <TableHead className="w-[80px] text-center">W</TableHead>
                <TableHead className="w-[80px] text-center">L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eastTeams.map((team, index) => (
                <TableRow key={team.id}>
                  <TableCell>
                    <Link href={`/teams/${team.id}`} className="hover:text-primary">
                      {team.name} ({index + 1})
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">{team.wins}</TableCell>
                  <TableCell className="text-center">{team.losses}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="west">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">West</TableHead>
                <TableHead className="w-[80px] text-center">W</TableHead>
                <TableHead className="w-[80px] text-center">L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {westTeams.map((team, index) => (
                <TableRow key={team.id}>
                  <TableCell>
                    <Link href={`/teams/${team.id}`} className="hover:text-primary">
                      {team.name} ({index + 1})
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">{team.wins}</TableCell>
                  <TableCell className="text-center">{team.losses}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  )
}

