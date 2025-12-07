import { Shield, Users, Zap, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Campeonato Premium",
    description: "Sistema competitivo profundo com mecânicas balanceadas e jogabilidade fluida",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "100+ jogadores ativos em tempo real competindo e se divertindo",
  },
  {
    icon: Zap,
    title: "Atualizações Semanais",
    description: "Novos conteúdos, mapas e eventos toda semana mantendo o jogo fresco",
  },
  {
    icon: Award,
    title: "Servidor Premium",
    description: "Infraestrutura de elite com 99.9% uptime e performance máxima",
  },
]

export function AboutSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black/20 to-black/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent animate-pulse-scale" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 8 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Por Que Escolher Play Cup?</h2>
          <p className="text-xl text-yellow-400/80 max-w-2xl mx-auto leading-relaxed">
            A melhor experiência de Campeonato no Brasil, campeonatos profissionais e
            comunidade premiada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 hover:border-yellow-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-3 animate-fade-in-up overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-500/60">
                  <feature.icon className="h-7 w-7 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
