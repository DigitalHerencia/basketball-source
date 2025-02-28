"use client"

import { useState } from "react"

export function ImmaculateGrid() {
  const [selectedCell, setSelectedCell] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-3 gap-2">
      {[...Array(9)].map((_, i) => (
        <button
          key={i}
          className={`aspect-square rounded-md border-2 ${
            selectedCell === i
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
          }`}
          onClick={() => setSelectedCell(i)}
        />
      ))}
    </div>
  )
}

