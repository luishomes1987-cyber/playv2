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
    <section className="py-24 md:py-32 border-y border-yellow-500/20 bg-gradient-to-b from-black to-black/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent animate-pulse-scale" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-yellow-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-yellow-400/40 rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 6 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="relative inline-block mb-4">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]" style={{ backgroundSize: '200% auto' }}>
              Estatísticas Play Cup
            </h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
          </div>
          <p className="text-xl text-yellow-400/80 drop-shadow-lg">Performance e comunidade incomparável</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="group relative flex flex-col items-center text-center space-y-4 p-10 rounded-2xl bg-gradient-to-br from-yellow-500/15 to-yellow-600/5 border border-yellow-500/30 hover:border-yellow-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/50 hover:-translate-y-4 animate-scale-in overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-yellow-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                </div>
                
                {/* Outer glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-center justify-center h-24 w-24 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-500/80 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 animate-float">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="h-12 w-12 text-white drop-shadow-2xl relative z-10" />
                  <div className="absolute inset-0 rounded-2xl animate-pulse-scale opacity-50">
                    <div className="absolute inset-0 rounded-2xl border-2 border-yellow-300/50" />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <p className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{stat.value}</p>
                  <p className="text-xs md:text-sm text-yellow-400/70 group-hover:text-yellow-400 uppercase tracking-wider font-medium transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
                
                {/* Corner decorations */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-yellow-400/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
