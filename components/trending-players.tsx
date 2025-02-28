import Link from "next/link"

const trendingPlayers = [
  { id: "lebron-james", name: "LeBron James" },
  { id: "luka-doncic", name: "Luka Dončić" },
  { id: "michael-jordan", name: "Michael Jordan" },
  { id: "stephen-curry", name: "Stephen Curry" },
  { id: "jayson-tatum", name: "Jayson Tatum" },
  { id: "nikola-jokic", name: "Nikola Jokić" },
  { id: "kevin-durant", name: "Kevin Durant" },
  { id: "cade-cunningham", name: "Cade Cunningham" },
]

export function TrendingPlayers() {
  return (
    <div>
      <ul className="flex flex-wrap gap-2">
        {trendingPlayers.map((player) => (
          <li key={player.id}>
            <Link href={`/players/${player.id}`} className="text-sm hover:text-primary">
              {player.name}
            </Link>
            {player.id !== trendingPlayers[trendingPlayers.length - 1].id && ", "}
          </li>
        ))}
      </ul>
    </div>
  )
}

