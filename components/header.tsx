"use client"

import type React from "react"

import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const navItems = [
  { name: "Players", href: "/players" },
  { name: "Teams", href: "/teams" },
  { name: "Seasons", href: "/seasons" },
  { name: "Leaders", href: "/leaders" },
  { name: "Scores", href: "/scores" },
  { name: "WNBA", href: "/wnba" },
  { name: "Draft", href: "/draft" },
]

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image src="/logo.svg" alt="Basketball Stats Hub Logo" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">BASKETBALL</span>
              <span className="text-sm font-medium text-muted-foreground">STATS HUB</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex-1 flex items-center justify-end">
          <form onSubmit={handleSearch} className="relative w-full max-w-sm mr-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Enter Person, Team, Section, etc"
              className="w-full pl-8 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Button type="submit" onClick={handleSearch} className="bg-primary hover:bg-primary/90">
            Search
          </Button>
          <div className="ml-4">
            <ModeToggle />
          </div>
        </div>
      </div>

      <div className="container overflow-auto">
        <nav className="flex items-center space-x-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium md:hidden transition-colors hover:text-primary whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

