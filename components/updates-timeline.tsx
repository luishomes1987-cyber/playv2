"use client"

import { useState, useEffect } from "react"
import { Calendar, Sparkles, Settings, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"

type UpdateType = "novidade" | "patch" | "evento"

interface Update {
  id: string
  title: string
  description: string
  type: UpdateType
  date: string
  image?: string
}

const categoryIcons = {
  novidade: Sparkles,
  patch: Settings,
  evento: PartyPopper,
} as const

const categoryColors = {
  novidade: "from-yellow-400 to-yellow-500",
  patch: "from-blue-400 to-blue-600",
  evento: "from-green-400 to-green-600",
} as const

const categoryLabels = {
  novidade: "Novidade",
  patch: "Patch",
  evento: "Evento",
} as const

export function UpdatesTimeline() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [filter, setFilter] = useState<UpdateType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/updates", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        setUpdates(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = filter ? updates.filter(u => u.type === filter) : updates
  const sorted = [...filtered].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (loading) {
    return <div className="text-center py-20 text-muted-foreground">Carregando atualizações...</div>
  }

  return (
    <div>
      {/* FILTROS */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <Button
          variant={filter === null ? "default" : "outline"}
          onClick={() => setFilter(null)}
          className={filter === null ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700" : "border-yellow-500/30 hover:bg-yellow-500/10"}
        >
          Todas
        </Button>
        {(["novidade", "patch", "evento"] as const).map(type => (
          <Button
            key={type}
            variant={filter === type ? "default" : "outline"}
            onClick={() => setFilter(type)}
            className={filter === type ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700" : "border-yellow-500/30 hover:bg-yellow-500/10"}
          >
            {categoryLabels[type]}
          </Button>
        ))}
      </div>

      {/* LISTA */}
      <div className="max-w-3xl mx-auto space-y-4">
        {sorted.map(update => {
          const Icon = categoryIcons[update.type]
          return (
            <div
              key={update.id}
              className="group p-5 rounded-lg bg-card border border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${categoryColors[update.type]} flex-center flex-shrink-0`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
                    <span className={`px-3 py-1 rounded text-xs font-bold uppercase bg-gradient-to-r ${categoryColors[update.type]} text-white`}>
                      {categoryLabels[update.type]}
                    </span>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(update.date).toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition">
                    {update.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{update.description}</p>

                  {update.image && (
                    <img src={update.image} alt="" className="mt-4 rounded-lg border border-yellow-500/20 max-h-96 w-full object-cover" />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-12 text-lg text-muted-foreground">
          Nenhuma atualização encontrada.
        </div>
      )}
    </div>
  )
}
