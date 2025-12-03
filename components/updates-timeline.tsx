"use client"

import { useState } from "react"
import { updates } from "@/lib/updates-data"
import { Calendar, Sparkles, Settings, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"

const categoryIcons = {
  patch: Settings,
  evento: PartyPopper,
  novidade: Sparkles,
}

const categoryColors = {
  patch: "from-blue-400 to-blue-600",
  evento: "from-yellow-400 to-yellow-600",
  novidade: "from-yellow-400 to-yellow-500",
}

const categoryLabels = {
  patch: "Patch",
  evento: "Evento",
  novidade: "Novidade",
}

export function UpdatesTimeline() {
  const [filter, setFilter] = useState<string | null>(null)

  const filteredUpdates = filter ? updates.filter((update) => update.category === filter) : updates

  const sortedUpdates = [...filteredUpdates].sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <div>
      {/* Filtros - Simplified and cleaner */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <Button
          variant={filter === null ? "default" : "outline"}
          onClick={() => setFilter(null)}
          className={
            filter === null
              ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0"
              : "border-yellow-500/30 hover:bg-yellow-500/10"
          }
        >
          Todas
        </Button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            onClick={() => setFilter(key)}
            className={
              filter === key
                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0"
                : "border-yellow-500/30 hover:bg-yellow-500/10"
            }
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Timeline - More compact and clean */}
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {sortedUpdates.map((update) => {
            const Icon = categoryIcons[update.category]

            return (
              <div
                key={update.id}
                className="group relative p-5 rounded-lg bg-card border border-yellow-500/20 hover:border-yellow-500/50 transition-all hover:shadow-lg hover:shadow-yellow-500/15 hover:bg-card/80"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`h-12 w-12 rounded-lg bg-gradient-to-br ${categoryColors[update.category]} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold uppercase bg-gradient-to-r ${categoryColors[update.category]} text-white`}
                      >
                        {categoryLabels[update.category]}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1.5" />
                        {update.date.toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                      {update.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{update.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {sortedUpdates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Nenhuma atualização encontrada nesta categoria.</p>
        </div>
      )}
    </div>
  )
}
