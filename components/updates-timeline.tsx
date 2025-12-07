"use client"

import { useState, useEffect } from "react"
import { Calendar, Sparkles, Settings, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"

type UpdateType = "novidade" | "patch" | "evento"

interface Update {
  id: string
  title: string
  description: string
  type?: UpdateType
  category?: UpdateType
  date: string
  image?: string
}

const categoryIcons = {
  patch: Settings,
  evento: PartyPopper,
  novidade: Sparkles,
} as const

const categoryColors = {
  patch: "from-blue-400 to-blue-600",
  evento: "from-yellow-400 to-yellow-600",
  novidade: "from-yellow-400 to-yellow-500",
} as const

const categoryLabels = {
  patch: "Patch",
  evento: "Evento",
  novidade: "Novidade",
} as const

export function UpdatesTimeline() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [filter, setFilter] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Busca os updates da API (sempre atualizados)
  useEffect(() => {
    async function fetchUpdates() {
      try {
        const res = await fetch("/api/updates", { cache: "no-store" })
        if (!res.ok) throw new Error("Falha ao carregar")
        const text = await res.text()

        let data
        try {
          data = JSON.parse(text)
        } catch (parseError) {
          console.error("Erro ao fazer parse do JSON:", parseError)
          data = []
        }

        if (Array.isArray(data)) {
          // Converte a string da data para objeto Date (necessário pro .sort())
          const formatted = data.map(u => ({
            ...u,
            date: new Date(u.date).toISOString(), // garante formato válido
          }))

          setUpdates(formatted)
        } else {
          console.warn("API não retornou um array, usando array vazio")
          setUpdates([])
        }
      } catch (err) {
        console.error(err)
        setUpdates([])
      } finally {
        setLoading(false)
      }
    }

    fetchUpdates()
  }, [])

  const filteredUpdates = filter
    ? updates.filter((u) => (u.type || u.category) === filter)
    : updates

  const sortedUpdates = [...filteredUpdates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground animate-pulse">Carregando atualizações...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <Button
          variant={filter === null ? "default" : "outline"}
          onClick={() => setFilter(null)}
          className={
            filter === null
              ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0"
              : "border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-400"
          }
        >
          Todas
        </Button>

        {Object.entries(categoryLabels).map(([key, label]) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            onClick={() => setFilter(key as UpdateType)}
            className={
              filter === key
                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0"
                : "border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-400"
            }
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {sortedUpdates.map((update) => {
            const updateType = (update.type || update.category) as UpdateType
            const Icon = categoryIcons[updateType]

            return (
              <div
                key={update.id}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-yellow-500/20 hover:border-yellow-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-2 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                
                <div className="flex items-start gap-5 relative z-10">
                  <div
                    className={`h-14 w-14 rounded-xl bg-gradient-to-br ${categoryColors[updateType]} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    <Icon className="h-7 w-7 text-white drop-shadow-lg" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase bg-gradient-to-r ${categoryColors[updateType]} text-white shadow-md`}
                      >
                        {categoryLabels[updateType]}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1.5" />
                        {new Date(update.date).toLocaleDateString("pt-BR")}
                      </div>
                    </div>

                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {update.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {update.description}
                    </p>

                    {update.image && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-yellow-500/30 group-hover:border-yellow-500/50 transition-colors duration-300">
                        <img
                          src={update.image}
                          alt={update.title}
                          className="max-h-96 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {!loading && sortedUpdates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Nenhuma atualização encontrada nesta categoria.
          </p>
        </div>
      )}
    </div>
  )
}