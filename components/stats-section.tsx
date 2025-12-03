import { Users, Trophy, Zap, Flame } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "100+",
      label: "Jogadores Ativos",
    },
    {
      icon: Trophy,
      value: "100+",
      label: "Campeonatos",
    },
    {
      icon: Flame,
      value: "100+",
      label: "Eventos",
    },
    {
      icon: Zap,
      value: "99.9%",
      label: "Uptime do Servidor",
    },
  ]

  return (
    <section className="py-20 md:py-28 border-y border-yellow-500/20 bg-gradient-to-b from-black to-black/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">Estatísticas Play Cup</h2>
          <p className="text-lg text-yellow-400/80">Performance e comunidade incomparável</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center space-y-3 p-8 rounded-lg bg-gradient-to-br from-yellow-500/15 to-yellow-600/5 border border-yellow-500/30 hover:border-yellow-500/60 transition-all hover:shadow-xl hover:shadow-yellow-500/20"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-500/50 transition-all group-hover:scale-110">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-display font-bold text-yellow-400">{stat.value}</p>
                  <p className="text-xs md:text-sm text-yellow-400/70 mt-2 uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
