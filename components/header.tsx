"use client"

import type React from "react"

import { UserButton, SignInButton, useUser } from "@clerk/nextjs"
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
  const { isSignedIn, user } = useUser()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center h-16">
        <div className="flex items-center mr-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-40 h-20 mt-3">
              <Image src="/place-holder.png" alt="Basketball Stats Hub Logo" fill className="object-contain" priority />
            </div>
          </Link>
        </div>

        <nav className="items-center hidden mx-6 space-x-4 md:flex lg:space-x-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end flex-1">
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
          <div className="ml-4">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>

      <div className="container overflow-auto">
        <nav className="flex items-center py-2 space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors md:hidden hover:text-primary whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

