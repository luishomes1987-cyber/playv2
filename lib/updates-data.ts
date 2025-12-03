import type { Update } from "./types"

export const updates: Update[] = [
  {
    id: "upd-1",
    title: "Novo Mapa: Zona de Combate Extrema",
    description:
      "Explorador a nova área de Campeonato com estruturas destruíveis, pontos de combate estratégicos e recompensas raras.",
    date: new Date("2025-01-20"),
    category: "novidade",
  },
  {
    id: "upd-2",
    title: "Balance de Armas - Temporada 2",
    description:
      "Ajustes significativos em armas, melhorias em shotguns e rebalanceamento de rifles para melhor experiência competitiva.",
    date: new Date("2025-01-18"),
    category: "patch",
  },
  {
    id: "upd-3",
    title: "Campeonato Play Cup Janeiro",
    description:
      "Inscrições abertas para o maior campeonato do mês! Prêmios acumulados chegando a R$ 50.000. Não perca esta chance!",
    date: new Date("2025-01-15"),
    category: "evento",
  },
  {
    id: "upd-4",
    title: "Sistema de Ranking Revitalizado",
    description:
      "Nova sistema de ranking com melhor matchmaking, recompensas progressivas e badges exclusivas para os tops jogadores.",
    date: new Date("2025-01-12"),
    category: "novidade",
  },
  {
    id: "upd-5",
    title: "Correções Críticas",
    description:
      "Fixados problemas de sincronização em zonas de combate e otimizações de performance para melhor estabilidade.",
    date: new Date("2025-01-08"),
    category: "patch",
  },
  {
    id: "upd-6",
    title: "Torneio Classificatório Semanal",
    description:
      "Novo formato de torneios semanais com premiação diária. Ganhe pontos e suba no ranking global da comunidade.",
    date: new Date("2025-01-05"),
    category: "evento",
  },
]
